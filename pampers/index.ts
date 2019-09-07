import {CustomRequest} from "../utils/request";
import {SmsActivate} from "../sms-activate";
import {AnticaptchaClient} from "../anticaptcha/anticaptcha";
import {Utils} from "../utils/utils";

const FormData = require("form-data");
const fetch = require("node-fetch");
const sms = new SmsActivate();
const anticaptcha = new AnticaptchaClient();
const pngToJpeg = require('png-to-jpeg');
const utils = new Utils();

const defHeaders = {
  "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
  "accept-encoding": "gzip, deflate, br",
  "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
  "cache-control": "no-cache",
  "pragma": "no-cache",
  "referer": "https://p.pgbonus.ru/",
  "sec-ch-ua": "Google Chrome 76",
  "sec-fetch-dest": "document",
  "sec-fetch-mode": "navigate",
  "sec-fetch-site": "same-origin",
  "sec-fetch-user": "?1",
  "sec-origin-policy": "0",
  "upgrade-insecure-requests": "1",
  "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36",
};

export class Pampers {

  async start() {
    const request = new CustomRequest({}, false);
    const res1 = await request.get("https://p.pgbonus.ru/");
    const cookie = request.cookie;
    const html = res1.data;
    const regExp = new RegExp("meta name=\"csrf-token\" content=\"(.*)\"");
    const [, token] = regExp.exec(html);
    console.log('token: ', token);

    // const [id, number] = await sms.getNumber();
    const regExpCaptcha = new RegExp("img id=\"registerform-captcha-image\".*src=\"(.*?)\"");
    const [, src] = regExpCaptcha.exec(html);

    const img = await fetch("https://p.pgbonus.ru" + src, { headers: { cookie } }).then(value => value.buffer()).then(value => value.toString('base64'));
    const jpg = await pngToJpeg({quality: 90})(new Buffer(img, 'base64'));
    const result = await anticaptcha.createTaskImage(jpg.toString('base64'));
    const captcha = result.solution.text;
    // const captcha = '';

    // console.log("https://p.pgbonus.ru" + src, captcha);

    // const formData2 = new FormData();
    // formData2.append("_csrf", token);
    // formData2.append("RegisterForm[name]", "valera");
    // formData2.append("RegisterForm[email]", "olegt623adf+nnrt7ldi@gmail.com");
    // formData2.append("RegisterForm[phone]", this.formatNumber("79028413798"));
    // formData2.append("RegisterForm[sms]", "54883");
    // formData2.append("RegisterForm[date]", "2020-05-05");
    // formData2.append("RegisterForm[agreement]", "1");
    // formData2.append("RegisterForm[captcha]", captcha);
    //
    // let a = await fetch("https://p.pgbonus.ru/", {"headers":{cookie: request.cookie,"sec-fetch-dest":"empty","sec-fetch-site":"same-origin","sec-fetch-user":"?F","x-csrf-token":token,"x-requested-with":"XMLHttpRequest"}, body: formData2 ,"method":"POST","mode":"cors"});
    // // let a = await request.post("https://p.pgbonus.ru/", formData2, { headers: { cookie: request.cookie, 'Content-Type': `multipart/form-data; boundary=${(<any>formData2)._boundary}` } }, null).catch(er => console.log(er));
    // console.log(await a.text());
    // return;

    const [id, phone] = await sms.getNumber();
    console.log({ phone: this.formatNumber(phone) });
    const res2 = await request.post("https://p.pgbonus.ru/site/ajax-send-code", { phone: encodeURIComponent(this.formatNumber(phone)) }, { headers: { cookie, "x-csrf-token": token, "x-requested-with": "XMLHttpRequest" } }, "url");
    console.log('res2', res2.data);

    const code = (await sms.getCode(id)).split(':')[1].trim();
    const email = `olegt623adf+${Math.random().toString(36).slice(2)}@gmail.com`;

    // const img = await fetch("https://p.pgbonus.ru" + src, { headers: { cookie } }).then(value => value.buffer()).then(value => value.toString('base64'));
    // const jpg = await pngToJpeg({quality: 90})(new Buffer(img, 'base64'));

    // let captcha = '';
    // while (true) {
    //   try {
    //     const result = await anticaptcha.createTaskImage(jpg.toString('base64'));
    //     captcha = result.solution.text;
    //     break;
    //   } catch (e) {
    //     console.log('err');
    //     await utils.sleep(1000);
    //   }
    // }


    const formData = new FormData();
    formData.append("_csrf", token);
    formData.append("RegisterForm[name]", "valerka");
    formData.append("RegisterForm[email]", email);
    formData.append("RegisterForm[phone]", this.formatNumber(phone));
    formData.append("RegisterForm[sms]", code);
    formData.append("RegisterForm[date]", "2020-05-05");
    formData.append("RegisterForm[agreement]", "1");
    formData.append("RegisterForm[captcha]", captcha);

    console.log(code, token, phone);
    const res3 = await fetch("https://p.pgbonus.ru/", {"headers":{ cookie,"sec-fetch-dest":"empty","sec-fetch-site":"same-origin","sec-fetch-user":"?F","x-csrf-token":token,"x-requested-with":"XMLHttpRequest"}, body: formData ,"method":"POST","mode":"cors"});
    sms.setStatus(id, 6);
    console.log('end');
  }

  private formatNumber(p: string) {
    return `+${p[0]}(${p[1] + p[2] + p[3]})${p[4] + p[5] + p[6]}-${p[7] + p[8]}-${p[9] + p[10]}`;
  }
}

// new Pampers().start()

utils.parallel(2, async () => {
  for (let i = 0; i < 1; ++i) {
    await new Pampers().start().catch(err => console.log('error', err));
  }
}, 2);
