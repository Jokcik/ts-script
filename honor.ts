import {URLSearchParams} from "url";
import * as FormData from 'form-data';

(<any>global).fetch = require("node-fetch");
(<any>global).URLSearchParams = URLSearchParams;

const cookie = "_ym_uid=1546798465681490297; _ym_d=1546798465; _gcl_au=1.1.1117927020.1546798465; _ym_isad=2; _ga=GA1.2.2060075.1546798466; _gid=GA1.2.1023725042.1546798466; ins-mig-done=1; spUID=1546798466475b833a661a1.b3d00b1e; scs=%7B%22t%22%3A1%7D; locale=ru_RU; cto_lwid=7d846fff-d551-419b-9fb0-e3985f627808; _fbp=fb.1.1546842758165.1605938364; ins-gaSSId=5ea86435-14de-885a-a3e7-a8b99fbec2db_1546852172; _ym_visorc_22749886=b; PageNumber=5; _gat_UA-44712776-4=1; insdrSV=12; laravel_session=eyJpdiI6InI4anJGb2FTUXRPV2QydEZJOXZLblE9PSIsInZhbHVlIjoicjFzZDlUZW5maTJnR3FcL1k0V3BESTQwYzdDbDhxV0ZtQ1RicXY3R2hvVzRVNm4reW5NS1lOVnhZS3ljZENcL3VwbzE0U3lqb3lXZDV3WTA4NkcwXC9VdFE9PSIsIm1hYyI6ImVkNjBkOWI1NGZjYWUzNjZlOTIzMDNhM2NjZWEwMWY5MzI2ODNkZTE5ZmNkZmYyYmE5ZWJiYTMxY2U5NGE1MTEifQ%3D%3D; 290ef0d8ab14d133b86253800cfe493341f50c69=eyJpdiI6ImNtSEkyQnJuMER2Y0J4RE5TZ2tkbGc9PSIsInZhbHVlIjoiK1wvMGdPVG4yVXIxXC9MTVZXN3czZDdxd2o2RWhVczl1MWlRR3RjZGVGeGdZYlhvVjlqWWZ3YllrcVQrWnk0clg5NXRZQnJnZUM1S2FoK3pzUE1QcGlxb1RGWnhcLzF0M3M5aTV0VjdkamN2d2xkbGpkNHB4NFVsWEI3YXYyR0tCU1k0N0w2NkFLZCt3bEdaYjdEb0I3WVZ1TldGXC9LaHl1V1V0OGYyWlA0WVg5RW5WR0drclwveUNoY3FzYmpvNTFlVGJFcHdQMGk4cnJ5SjF6V1VQQTRHWWh2UEFcL2NYRlZVQTBCVDlwV2hiSjZoUGdLVEd3K29XWDFCaTlSK05KQlh5TWk3Nk1HNlJsMmdOSVBxb0J1NW01Qk9QMXBJa1B6THRwMnB3XC9hZUJ1bzRCUXN1RHkrdGQyTkExeExwbndCbGNOZXNjd1ZUOFVlWjZzbzIzSGdqUzZuSEYwQTkremtwZGNCQlkwOUVlK2QrR3FOVVwvbWoyc3BRXC9jREdBVjZheGRxaTd2RzBKOHM2TDY3UmZDRkFHTkNidnlJdSt3QkJCekZneUtkd1pZU250OXQzcUVMck52ajNGbmY3cUJcL1dMbXlMcEVRMEFaaWhcLzVxUnpsY1RCdGh4QzNsakIwd2ZUVk53QkJrRkpYMW0zVEp2XC8rRjZoNVJld0VjMGJRK2FXUXR4bm1lZHJrd2ZvKzhlY1VmaFwvZFZEeVltd1VHS3lZQWJiZmkydElKV0FEWjFKZU51KzJ0Wkh2M0pQTVROOFpTNDB1Sk1cL1NOUlE0TjJuRjB5R2FHdWRBPT0iLCJtYWMiOiJjYWM3YmVkMmM3ODA1YzE5OWZlNzg1Njc4YzMxMjQ1YTViYWY5Mjk3MDJlZjczYTEzZjhkOGMwODMwOTNmODc2In0%3D; tmr_detect=0%7C1546854166038";

export class Honor {
  private url = "https://honor.huawei.ru/imei/sendcoupon";
  private urlDevice = "https://honor.huawei.ru/imei/getUserDeviceDetails";
  private homeUrl: string = "https://honor.huawei.ru/imei/";
  private homeSubscription: string = "https://honor.huawei.ru/imei/subscribe";

  private cookie: string;
  private token: string;

  constructor() {
  }


  public async init() {
    const req = await fetch(this.homeUrl);
    let cookie = req.headers.get('Set-Cookie');
    const text = await req.text();
    const regExp = new RegExp("meta name=\"_token\" content=\"(.*)\"");
    const [, token] = regExp.exec(text);

    this.cookie = cookie;
    this.token = token;
  }

  public async sendDevice() {
    const body = new URLSearchParams();
    body.append('deviceId', '1');

    const req = await fetch(this.urlDevice, { method: "POST", body, headers: { cookie: this.cookie } });
    let cookie = req.headers.get('Set-Cookie');
    this.cookie = cookie;

    const text = await req.text();
  }

  public async sendCoupon() {
    const email = `valerka${Date.now()}@rumc31.ru`;
    // const email = `valerka${Date.now()}@tartar.site`;
    const body = new FormData();
    this.token = 'nWliUI8JrYOo9Ll4fibs4sPQm6eroP0Q2ZC7NGvR';

    body.append('_token', this.token);
    body.append('Email', email);
    body.append('ConfirmEmail', email);

    body.append('textParameter[7]', '5020616140');

    body.append('agree', '1');
    body.append('terms_condition', '1');

    // console.log(body.getBoundary())
    this.cookie = cookie;

    console.log(email, this.token);

    const value = await fetch(this.homeSubscription, { method: "POST", body, headers: { cookie: this.cookie, 'X-Requested-With': 'XMLHttpRequest' } });
    console.log(await value.text());
    const value2 = await fetch(this.url, { method: "POST", headers: { cookie: this.cookie, 'X-Requested-With': 'XMLHttpRequest' } });
    console.log(await value2.text());
  }
}

(async () => {
  const honor = new Honor();
  await honor.init();
  await honor.sendDevice();

  f(honor);
})();

async function f(honor) {
  for (let i = 0; i < 1000; ++i) {
    await honor.sendCoupon();
  }
}
