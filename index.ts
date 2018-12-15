import {SmsActivate} from "./sms-activate";
import {DeliveryNewYear} from "./delivery-new-year";
import {URLSearchParams} from 'url';

(<any>global).fetch = require("node-fetch");
(<any>global).URLSearchParams = URLSearchParams;

const token = 'qCsQDwFmi8EzjG2ZBTL0K1MRUkHOygNX';
const token2 = 'DSNaUpz2wisZ1bA3to4xKcPGO0uCqdYy';
const message = encodeURI('У вас недостатно денег на балансе');
const email = 'jokcik@gmail.com';

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function mergeCookie(cookie1, cookie2) {
  const split1 = cookie1.split('; ');
  const split2 = cookie2.split('; ');

  const split: string[] = [...split1, ...split2];
  return split.join('; ');
}


const func = (async () => {
  try {
    const sms = new SmsActivate();
    const delivery = new DeliveryNewYear();

    const balance = await sms.getBalance();
    if (balance <= 1) {
      await fetch(`http://crierbot.appspot.com/${token}/send?message=${message}`);
      process.exit();
    }

    const res = await fetch('http://belgorod.delivery-club.ru/kopilka/?utm_source=advcake&utm_campaign=admitad&utm_content=11232&utm_medium=cpa&advcake_params=dcfc744c446a6d96d23fb9a83df0fe18');
    let cookie = res.headers.get('set-cookie');
    const splits = cookie.split('; ');
    let id, number;
    try {
      const res = await sms.getOtherNumber();
      id = res.id;
      number = res.number;
    } catch (e) {
      console.log(new Date() + ' нет номера ' + e.message);
      return;
    }
    console.log('sms.getOtherNumber', id, number);
    // const number = '79155666668';
    // const number = '79606282599';

    const reqCode = await delivery.sendCode(number);
    const payload = (await reqCode.json()).payload;
    if (payload.errors) {
      return console.log('error', JSON.stringify(payload));
    }

    cookie = mergeCookie(cookie, reqCode.headers.get('set-cookie'));
    const requestId = payload.request_id;

    const text = await sms.getCode(id);
    const code = text.match(/\d+/)[0];

    console.log('text sms', text);
    console.log('code sms', code);

    // rl.question('enterCode:  ', async code => {
    const reqLogin = await delivery.login(code, requestId, cookie);
    cookie = mergeCookie(cookie, reqLogin.headers.get('set-cookie'));

    const json = await reqLogin.json();
    if (json.payload.errors) {
      console.log('код неверный');
      return;
    }

    const reqKopilka = await delivery.kopilka(email, cookie);
    const jsonRes = await reqKopilka.json();
    console.log(JSON.stringify(jsonRes));
    const payloadResult = jsonRes.payload;
    await sms.setStatus(id, 6);

    const delivery_code = payloadResult.gift.dc_code;
    const delivery_title = payloadResult.gift.title;
    const resMessage = `${delivery_title}. Код: ${delivery_code}`;

    console.log(resMessage);
    (await fetch(`http://crierbot.appspot.com/${token}/send?message=${encodeURI(resMessage)}`));
    (await fetch(`http://crierbot.appspot.com/${token2}/send?message=${encodeURI(resMessage)}`));

    return;
    // process.exit();
  } catch (e) {
    console.log('error INDEX', e);
    return;
    // process.exit();
  }

  // rl.close();
  // });

});

async function start() {
  for (let i = 0; i < 20000; ++i) {
    await func();
  }

  process.exit();
}

start();
