import {DeliveryNewYear} from "./delivery-new-year";
import {CheckCookie, cookieService} from "./check-cookie";
import {SimSms, sleep, SmsActivate} from "./sms-activate";

const token = 'qCsQDwFmi8EzjG2ZBTL0K1MRUkHOygNX';
const token2 = 'DSNaUpz2wisZ1bA3to4xKcPGO0uCqdYy';
const message = encodeURIComponent('У вас недостатно денег на балансе');
// const startEmail = 'jokcik';
const startEmail = 'valimpetrov1993';
const endEmail = '@gmail.com';

function mergeCookie(cookie1, cookie2) {
  const split1 = cookie1.split('; ');
  const split2 = cookie2.split('; ');

  const split: string[] = [...split1, ...split2];
  return split.join('; ');
}


export async function sendKopilkaAnd(delivery: DeliveryNewYear, cookie: string, sms?: SmsActivate | SimSms, id?: string) {
  const email = `${startEmail}+misha${Date.now()}${endEmail}`;
  const reqKopilka = await delivery.kopilka(email, cookie);
  const jsonRes = await reqKopilka.json();
  console.log(JSON.stringify(jsonRes));
  const payloadResult = jsonRes.payload;

  if (sms) {
    await sms.setStatus(id, 6);
  }

  if (!payloadResult.gift) {
    if (payloadResult.errors[0].message.indexOf('не пройдена') > 0) {
      await cookieService.write(cookie, -1);
    } else {
      await cookieService.write(cookie, 0);
    }

    return;
  } else {
    await cookieService.write(cookie, 1);
  }

  const delivery_code = payloadResult.gift.dc_code;
  const delivery_title = payloadResult.gift.title;
  console.log(email);
  const resMessage = `${delivery_title}. Код: ${delivery_code}. Отправлен на email: ${email}`;

  console.log(resMessage);
  (await fetch(`http://crierbot.appspot.com/${token}/send?message=${encodeURIComponent(resMessage)}`));
  (await fetch(`http://crierbot.appspot.com/${token2}/send?message=${encodeURIComponent(resMessage)}`));


  return;
}

export class VK {
  constructor() {
  }

  public async checkAdmin() {
    // const url = "https://vk.com/id427408928";
    const url = "https://vk.com/id157600027";

    const response = await fetch(url);
    const text = await response.text();
    const regExp = new RegExp("Online");
    const check = regExp.exec(text);

    if (check) {
      (await fetch(`http://crierbot.appspot.com/${token}/send?message=${encodeURIComponent("АДМИН НА САЙТЕ")}`));
      // (await fetch(`http://crierbot.appspot.com/${token}/send?message=${encodeURIComponent("АДМИН НА САЙТЕ")}`));
      process.exit();
    }

  }
}

export class SmsSenderDelivery {
  private cookieService = new CheckCookie(false);

  public async run(flag = 1) {
    let sms, id;
    try {
      if (flag) {
        sms = new SmsActivate();
      } else {
        sms = new SimSms();
      }
      const delivery = new DeliveryNewYear();

      const balance = await sms.getBalance();
      console.log('balance');
      if (balance <= 1) {
        await fetch(`http://crierbot.appspot.com/${token}/send?message=${message}`);
        process.exit();
      }

      const res = await fetch('http://belgorod.delivery-club.ru/kopilka/?utm_source=advcake&utm_campaign=admitad&utm_content=11232&utm_medium=cpa&advcake_params=dcfc744c446a6d96d23fb9a83df0fe18');
      let cookie = res.headers.get('set-cookie');
      const splits = cookie.split('; ');
      let number;
      try {
        const res = await sms.getOtherNumber();
        id = res.id;
        number = res.number;
      } catch (e) {
        console.log(new Date() + ' нет номера ' + e.message);
        await sleep(flag ? 2000 : 10000);
        return;
      }
      console.log('sms.getOtherNumber', id, number);
      // const number = '79155666668';
      // const number = '79606282599';

      const reqCode = await delivery.sendCode(number);
      const payload = (await reqCode.json()).payload;
      if (payload.errors) {
        await sms.setStatus(id, -1);
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
        await sms.setStatus(id, 6);
        return;
      }

      await this.cookieService.writeCookie(cookie);
      await sendKopilkaAnd(delivery, cookie, sms, id);
      // await sleep(50000);
      // process.exit();
    } catch (e) {
      try {
        await sms.setStatus(id, -1);
      } catch (e) {
        try {
          await sms.setStatus(id, 6);
        } catch (e) {
        }
      }

      console.log('error INDEX', e);
      return;
      // process.exit();
    }
  }
}


export const emails = [
  "bylot117@inbox.ru",
  "bahiwvry4@inbox.ru",
  "xkqbfi193@inbox.ru",
  "ajxulm197@list.ru",
  "ajxulm156@list.ru",
  "rjejim69@list.ru",
  "egohjo107@list.ru",
  "qprmz221@list.ru",
  "oorzxm122@list.ru",
  "vwtljz149@list.ru",
  "xqhqzzb62@list.ru",
  "wqafos34@list.ru",
  "rkbpug124@list.ru",
  "pncimo51@inbox.ru",
  "wrfyf134@inbox.ru",
  "pncimo73@inbox.ru",
  "eyoktc211@inbox.ru",
  "khtkn202@inbox.ru",
  "ecrjtoa76@inbox.ru",
  "eecefl18@inbox.ru",
  "ktybkm247@inbox.ru",
  "gtqsk105@inbox.ru",
  "pbacze26@inbox.ru",
  "abtdtz48@list.ru",
  "abtdt195@list.ru",
  "kpnccg21@mail.ru",
  "kpncc192@mail.ru",
  "omfbre218@mail.ru",
  "drlmhf242@mail.ru",
  "ulhomi159@mail.ru",
  "xjxcr215@mail.ru",
  "jaeoio118@mail.ru",
  "yhdqe179@mail.ru",
  "tymcu122@mail.ru",
  "xtrmgy27@mail.ru",
  "aomcuv254@mail.ru",
  "afasasfa.fasfasfa@mail.ru",
  "afasasfa.fasfasfa1@mail.ru",
  "afasasfa.fasfasfa2@mail.ru",
  "wwwwweeeee1@mail.ru",
  "wwwwweeeee2@mail.ru",
  "wwwwweeeee3@mail.ru",
  "bbbbbwwwww3@mail.ru",
  "bbbbbwwwww4@mail.ru",
  "bbbbbwwwww5@mail.ru",
  "bbbbbwwwww6@mail.ru",
  "bbbbbwwwww7@mail.ru",
  "wwwwwkkkkk1@mail.ru",
  "wwwwwkkkkk2@mail.ru",
  "wwwwwkkkkk3@mail.ru",
  "wwwwwkkkkk5@mail.ru",
  "wwwwwkkkkk6@mail.ru",
  "wwwwwkkkkk7@mail.ru",
  "wwwwwkkkkk8@mail.ru",
  "wwwwwkkkkk9@mail.ru",
  "wwwwwkkkkk11@mail.ru",
  "vvjley18@inbox.ru",
  "gfdgdgd46@yandex.ru",
];
