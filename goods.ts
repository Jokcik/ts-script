import {URLSearchParams} from "url";
import * as FormData from 'form-data';
import {sleep, SmsActivate} from "./sms-activate";
import {CheckCookie} from "./check-cookie";
import {famesLastName, famesName} from "./config";
import * as fs from "fs";

const HttpsProxyAgent = require('https-proxy-agent');
(<any>global).fetch = require("node-fetch");
(<any>global).URLSearchParams = URLSearchParams;

function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

function mergeCookie(cookie1, cookie2) {
  if (!cookie1) { return cookie2 }
  if (!cookie2) { return cookie1 }

  const split1 = cookie1.split('; ');
  const split2 = cookie2.split('; ');

  const split: string[] = [...split1, ...split2];
  return split.join('; ');
}

export class Goods {
  private sms = new SmsActivate();
  private tgToken = 'qCsQDwFmi8EzjG2ZBTL0K1MRUkHOygNX';
  private cookieService = new CheckCookie();
  public agent: any;


  private authUrl = "https://goods.ru/api/market/v1/securityService/extraAuthentication/authenticate";
  private keySendUrl = "https://goods.ru/api/market/v1/securityService/extraAuthentication/keySend";
  private cookie: string;
  private token: string;
  private ksid: string;

  public proxyList: string[] = [];


  private async initStartCookie() {
    try {
      const res = await fetch("https://goods.ru", this.fetchRequestInit({method: "GET"}));
      const text = await res.text();
      const regExpCookie = new RegExp("\"cart\":{\"id\":\"(.*?)\"");
      let cookie = res.headers.get('set-cookie');
      const [, token] = regExpCookie.exec(text);

      this.cookie = cookie;
      this.token = token;
    } catch (e) {
      throw new Error('initStartCookie');
    }

  }

  private async setKsid() {
    const regExpKsid = new RegExp("{ \"id\":\"(.*?)\"");
    const kasRes = await fetch("https://ru.fp.kaspersky-labs.com/oxwdsq", this.fetchRequestInit({method: "GET"}));
    const textKas = await kasRes.text();
    const [, ksid] = regExpKsid.exec(textKas);

    this.ksid = ksid;
  }

  private async getNumber(): Promise<string[]> {
    const balance = await this.sms.getBalance();
    console.log('balance');
    if (balance <= 1) {
      this.sendMessage("Недостаточно бабок");
      process.exit();
    }

    const res = await this.sms.getOtherNumber();
    return [res.id, res.number.toString()]
  }

  private sendMessage(message: string) {
    fetch(`http://crierbot.appspot.com/${this.tgToken}/send?message=${encodeURIComponent(message)}`);
  }

  public async initProxy() {
    this.proxyList = await this.cookieService.getProxys();
  }

  public async start() {
    try {

      try {
        console.log('start1');
        await this.initStartCookie().catch(() => console.log(123));
        console.log('start2');
        await this.setKsid();
        console.log('start3');
      } catch (e) {
        // throw new Error('start');
      }


      const [id, number] = await this.getNumber();
      console.log('start4', id, number);
      try {
        const obj = {
          data: {
            context: "userCreate",
            phone: this.formatNumber(number), //9182903065
            token: this.token
          },
          meta: {}
        };

        console.log(this.token, {...obj, data: {phone: undefined}});

        const startAuth = await fetch(this.authUrl, this.fetchRequestInit({
          cookie: this.cookie,
          body: {...obj, data: {...obj.data, phone: undefined}}
        }));
        this.cookie = mergeCookie(this.cookie, startAuth.headers.get('set-cookie'));
        let stText = await startAuth.text();
        console.log('startAuth', JSON.stringify(stText));

        if (stText.indexOf('DOCTYPE HTML PUBLIC') > 0) { return; }

        const keySendRes = await fetch(this.keySendUrl, this.fetchRequestInit({cookie: this.cookie, body: obj}));
        this.cookie = mergeCookie(this.cookie, keySendRes.headers.get('set-cookie'));
        console.log(JSON.stringify(await keySendRes.text()));
        const text = await this.sms.getCode(id);
        const code = text.match(/(\d{4}?)/)[0];
        console.log(code);

        const objSendCode = {...obj, data: {...obj.data, phone: null, key: code}};
        const authSendRes = await fetch(this.authUrl, this.fetchRequestInit({cookie: this.cookie, body: objSendCode}));
        const jsonAuth = await authSendRes.json();
        console.log(jsonAuth);
        if (!jsonAuth.success) {
          console.log(jsonAuth);
          await this.sms.setStatus(id, 6);
          return;
        }

        this.cookie = mergeCookie(this.cookie, authSendRes.headers.get('set-cookie'));
        this.cookie += `oxxfgh=${this.ksid}#1#1800000#5000`;
        console.log(code);

        const mail = `${number}@yandex.ru`;
        const password = `qwer${number}`;
        const firstName = famesName[randomInteger(0, famesName.length - 1)];
        const lastName = famesLastName[randomInteger(0, famesLastName.length - 1)];

        const urlSearchParam = new URLSearchParams();
        urlSearchParam.append("ksid", this.ksid + "_0");
        urlSearchParam.append("firstname", firstName);
        urlSearchParam.append("lastname", lastName);
        urlSearchParam.append("email", mail);
        urlSearchParam.append("phone", number);
        urlSearchParam.append("password", password);
        urlSearchParam.append("repeatedPassword", password);
        urlSearchParam.append("agreement", "true");
        urlSearchParam.append("is_signed_ad", "false");
        urlSearchParam.append("token", this.token);
        urlSearchParam.append("isOAuthRegistration", "false");

        const resReg = await fetch("https://goods.ru/reg/ajax-reg/", this.fetchRequestInit({
          cookie: this.cookie,
          body: urlSearchParam,
          json: false
        }));
        this.cookie = mergeCookie(this.cookie, resReg.headers['set-cookie']);
        console.log(JSON.stringify(await resReg.text()));

        this.cookieService.write(this.cookie, 0);
        this.cookieService.write(`Phone: ${number}\nEmail: ${mail}\nPassword: ${password}`, 1);

        await this.sms.setStatus(id, 6);

        // set birthday
        const birthdayRes = await fetch("https://goods.ru/api/market/v1/securityService/profile/set", this.fetchRequestInit({
          cookie: this.cookie,
          body: {
            data: {
              profile: {
                birthDate: "16.01.1988",
                checkReceipt: "1",
                email: mail,
                firstName: firstName,
                gender: "M",
                lastName: lastName,
                phone: this.formatNumber(number),
                secondName: "",
              },
              token: this.token
            },
            meta: {}
          }
        }));

        console.log(JSON.stringify(await birthdayRes.text()));

      } catch (e) {
        try {
          await this.sms.setStatus(id, -1);
        } catch (e) {
          try {
            await this.sms.setStatus(id, 6);
          } catch (e) {
          }
        }

        console.log('error INDEX', e);
        return;

      }
    } catch (e) {
      console.log(e);
    }
  }


  private fetchRequestInit({cookie, body, method, json} = <any>{}) {
    method = method || "POST";
    json = json === undefined ? true : json;
    console.log('fetchRequestInit', json ? JSON.stringify(body) : body.get("ksid"));
    return <any>{
      agent: this.agent,
      headers: {
        'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 YaBrowser/18.11.1.716 Yowser/2.5 Safari/537.36",
        'X-Compress': null,
        cookie,
      },
      method,
      body: json ? JSON.stringify(body) : body,
      timeout: 10000
    }
  }

  private formatNumber(p: string) {
    return `+${p[0]} ( ${p[1] + p[2] + p[3]} ) ${p[4] + p[5] + p[6]} - ${p[7] + p[8]} - ${p[9] + p[10]}`;
  }
}


const goods = new Goods();

async function startGoods(goods: Goods) {
  console.log(goods.proxyList.length);
  for (let i = 0; i < goods.proxyList.length; ++i) {
    try {

    console.log('PROXY', i, goods.proxyList[i]);
    goods.agent = new HttpsProxyAgent(`http://${goods.proxyList[i]}`);

    const value = await goods.start()
      .catch((e) => {console.log(e); return new Error("123") });

    console.log('value = await goods.start()', value);
    }
    catch (e) {
      console.log(e);
    }
  }
}

const headers = {
"Host": "sharethemoment.ru",
"Sec-Fetch-Dest": "document",
"Sec-Fetch-Site": "same-origin",
"Sec-Fetch-User": "?T",
"Sec-Origin-Policy": "0",
"Upgrade-Insecure-Requests": "1",
"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36",
};

function permute(string: string) {
  // let field = '.';
  // const result = [];
  // for (let i = 1; i < string.length - 1; ++i) {
  //   let newStr = string.substr(0, i + 1) + '.' + string.substr(i + 1);
  //   result.push(newStr);
  //   for (let j = 1; j < newStr.length - 1; ++j) {
  //     let newStr2 = newStr.substr(0, j + 1) + '.' + newStr.substr(j + 1);
  //     result.push(newStr2);
  //     for (let z = 1; z < newStr.length - 1; ++z) {
  //       let newStr3 = newStr2.substr(0, z + 1) + '.' + newStr2.substr(z + 1);
  //       result.push(newStr3);
  //     }
  //   }
  // }
  // let res = result.filter(result => result.indexOf('..') === -1);
  // res = [ ...new Set(res) ];
  // console.log(res.length);
  //
  // // return res;

  return [  ]
}

async function start() {
  // await goods.initProxy();
  // await startGoods(goods);
  // ger123stfang@gmail.com
  const cookieService = new CheckCookie();
  const proxy = await cookieService.getProxys();

  let mailIdx = 0;
  for (let i = 0; i < proxy.length; ++i) {
    try {
      await a(proxy, i);
    } catch (e) {
      console.log(e);
    }
  }
}

async function a(proxy, i) {
  const prefix = 'ivan' + Math.random().toString(16).substr(2, 8);

  let mail = prefix;
  if (i % 10) {
    mail += "@mlign.ru";
  } else {
    mail += "@box.ru";
  }
  let phone = "+7 (915) ";
  phone += randomInteger(0, 9);
  phone += randomInteger(0, 9);
  phone += randomInteger(0, 9) + '-';
  phone += randomInteger(0, 9);
  phone += randomInteger(0, 9) + '-';
  phone += randomInteger(0, 9);
  phone += randomInteger(0, 9);

  // console.log(`${i}| email: ${mail}; password: ${prefix}, phone: ${phone}`);
  // return;

  const regExp = new RegExp("name=\"_token\" value=\"(.*?)\"");
  const agent = new HttpsProxyAgent(`http://${proxy[i]}`);
  // let agent;
  // console.log('START', i, proxy[i]);
  //
  // let test = await fetch("https://api.ipify.org/?format=json", <any>{ agent, timeout: 1000 })
  //   .catch(() => <any>null);
  // if (test && test.status === 200) {
  //   console.log('valid', proxy[i]);
  //   fs.appendFileSync("proxyvalid.txt", proxy[i] + "\n");
  //   return;
  // } else {
  //   console.log('invalid', proxy[i]);
  // }
  // //
  // return;

  // console.log(test.status, await test.text())
  // process.exit();

  // const res = await fetch("https://sharethemoment.ru/member/register", { body: params, method: "POST" });
  // const res = await fetch("https://sharethemoment.ru/member/register", <any>{ headers: { ...headers }, redirect: 'manual', agent, timeout: 5000 })
  const res = await fetch("https://sharethemoment.ru/member/register", <any>{ headers: { ...headers }, redirect: 'manual', agent, timeout: 5000 })
    // .catch((e) => {console.log(e); return null});
  if (!res || res.status !== 200) {
    console.log(proxy[i]);
    return;
  }

  // console.log(await res.text());
  // process.exit();

  let cookie = res.headers.get('set-cookie');
  const text = await res.text();
  const [ ,token ] = regExp.exec(text);
  // console.log(res.headers.values());
  cookie = cookie.replace("path=/, laravel_session=", " GMT; Max-Age=7200; path=/; laravel_session=");

  // process.exit();
  const params = new URLSearchParams();
  params.append("_token", token);
  params.append("from","site");
  params.append("first_name","Иванов");
  params.append("last_name","Иван");
  // params.appхотend("email", mails[0]);
  params.append("email", mail);
  params.append("phone",phone);
  params.append("password", prefix);
  params.append("password_confirmation",prefix);
  params.append("rules","1");
  params.append("process_data","1");

  console.log(i, token, params.toString());
  const register = await fetch("https://sharethemoment.ru/member/register/handle", <any>{  headers: { ...headers, cookie }, redirect: 'manual', agent, method: "POST", body: params })
    .catch((e) => {console.log(e); return null});
  if (!register) { return; }
  ///////////////////////////////////////

  console.log('register', await register.text());
  const location = register.headers.get('location');
  console.log('register', register.headers.get('location'));
  // return;
  cookie = register.headers.get('set-cookie');
  cookie = cookie.replace("path=/, laravel_session=", " GMT; Max-Age=7200; path=/; laravel_session=");
  // console.log('newCookie', cookie);
  // return;
  if (location.indexOf("?register=1") === -1) {
    return;
  }

  const res2 = await fetch(location, <any>{ headers: { ...headers, cookie }, agent, redirect: 'manual',  });
  //
  // cookie = res2.headers.get('set-cookie');
  // cookie = cookie.replace("path=/, laravel_session=", " GMT; Max-Age=7200; path=/; laravel_session=");

  const tex = await res2.text();
  console.log('555', tex);
  console.log();
  console.log();
  console.log();
  console.log();
  console.log();
  console.log();

  const par = new URLSearchParams();
  par.append("_token", token);
  par.append("code","88512412");
  const res3 = await fetch("https://sharethemoment.ru/member/cabinet/confirm", <any>{ headers: { ...headers, cookie, "Referer": "https://sharethemoment.ru/member/cabinet?register=1" }, agent, method: "POST", body: par });

  console.log(await res3.text());
  console.log('stop', proxy[i], token);
  process.exit();
  // mailIdx++;
}

start();


// curl 'https://sharethemoment.ru/member/cabinet/confirm' -H 'Connection: keep-alive' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache' -H 'Origin: https://sharethemoment.ru' -H 'Upgrade-Insecure-Requests: 1' -H 'Content-Type: application/x-www-form-urlencoded' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36' -H 'Sec-Fetch-Dest: document' -H 'Sec-Fetch-Site: same-origin' -H 'Sec-Fetch-User: ?T' -H 'Sec-Origin-Policy: 0' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3' -H 'Referer: https://sharethemoment.ru/member/cabinet?register=1' -H 'Accept-Encoding: gzip, deflate, br' -H 'Accept-Language: ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7' -H 'Cookie: XSRF-TOKEN=eyJpdiI6Imd6Q3puVmprSitnVG9CM1FFMFllQUE9PSIsInZhbHVlIjoiNmczVnhQeFZwUmppS2N3dllaYklzMHBVdVNUY2t4WlRsMlFZRmcxVzJjclwvVER4TGR1RGROT2VEZ3F0Q2RwQzMiLCJtYWMiOiI3NjYzYTk5MTE3YzBkNDk2NTBhMTViYzk2MTlmOGViYjE4MjYwNjhjNGM3YzEwZDUzNTVkZDQ1MjNhMzJlMDc3In0%3D; laravel_session=eyJpdiI6IkYzenZqWDRudDMrcm9GQVR3c0d2UHc9PSIsInZhbHVlIjoiajRubjgwTFo3aXNpZ2I2M1RhajBJTWxzbk9qaUhEZ0NVVDJWOFJVbjI3dno3TE1lQ01kb0dySlFNN2pRaHV5RyIsIm1hYyI6ImJhZWUyZTQxNGI2NDYyMmFhMzU0MjNhNzgyMTNkYzBhMDVhMGJiNzdjZDk3ZWY3MTMyOGUwNmFkZjgzNThmYWEifQ%3D%3D;' --data '_token=BboeONO22zxVaKl5U7gcckzNZqxx0UWAmUwC4E2l&code=fsd' --compressed
