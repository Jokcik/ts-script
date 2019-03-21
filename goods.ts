import {URLSearchParams} from "url";
import * as FormData from 'form-data';
import {sleep, SmsActivate} from "./sms-activate";
import {CheckCookie} from "./check-cookie";
import {famesLastName, famesName} from "./config";

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

async function start() {
  await goods.initProxy();
  await startGoods(goods);
}

start();
