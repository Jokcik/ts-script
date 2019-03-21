import {URLSearchParams} from "url";
import * as FormData from 'form-data';

(<any>global).fetch = require("node-fetch");
(<any>global).URLSearchParams = URLSearchParams;

const cookie = [];
// rumc
const cookie1 = "_ym_uid=1546798465681490297; _ym_d=1546798465; _gcl_au=1.1.1117927020.1546798465; _ym_isad=2; _ga=GA1.2.2060075.1546798466; _gid=GA1.2.1023725042.1546798466; ins-mig-done=1; spUID=1546798466475b833a661a1.b3d00b1e; scs=%7B%22t%22%3A1%7D; locale=ru_RU; cto_lwid=7d846fff-d551-419b-9fb0-e3985f627808; _fbp=fb.1.1546842758165.1605938364; ins-gaSSId=5ea86435-14de-885a-a3e7-a8b99fbec2db_1546852172; _ym_visorc_22749886=b; PageNumber=5; _gat_UA-44712776-4=1; insdrSV=12; laravel_session=eyJpdiI6InI4anJGb2FTUXRPV2QydEZJOXZLblE9PSIsInZhbHVlIjoicjFzZDlUZW5maTJnR3FcL1k0V3BESTQwYzdDbDhxV0ZtQ1RicXY3R2hvVzRVNm4reW5NS1lOVnhZS3ljZENcL3VwbzE0U3lqb3lXZDV3WTA4NkcwXC9VdFE9PSIsIm1hYyI6ImVkNjBkOWI1NGZjYWUzNjZlOTIzMDNhM2NjZWEwMWY5MzI2ODNkZTE5ZmNkZmYyYmE5ZWJiYTMxY2U5NGE1MTEifQ%3D%3D; 290ef0d8ab14d133b86253800cfe493341f50c69=eyJpdiI6ImNtSEkyQnJuMER2Y0J4RE5TZ2tkbGc9PSIsInZhbHVlIjoiK1wvMGdPVG4yVXIxXC9MTVZXN3czZDdxd2o2RWhVczl1MWlRR3RjZGVGeGdZYlhvVjlqWWZ3YllrcVQrWnk0clg5NXRZQnJnZUM1S2FoK3pzUE1QcGlxb1RGWnhcLzF0M3M5aTV0VjdkamN2d2xkbGpkNHB4NFVsWEI3YXYyR0tCU1k0N0w2NkFLZCt3bEdaYjdEb0I3WVZ1TldGXC9LaHl1V1V0OGYyWlA0WVg5RW5WR0drclwveUNoY3FzYmpvNTFlVGJFcHdQMGk4cnJ5SjF6V1VQQTRHWWh2UEFcL2NYRlZVQTBCVDlwV2hiSjZoUGdLVEd3K29XWDFCaTlSK05KQlh5TWk3Nk1HNlJsMmdOSVBxb0J1NW01Qk9QMXBJa1B6THRwMnB3XC9hZUJ1bzRCUXN1RHkrdGQyTkExeExwbndCbGNOZXNjd1ZUOFVlWjZzbzIzSGdqUzZuSEYwQTkremtwZGNCQlkwOUVlK2QrR3FOVVwvbWoyc3BRXC9jREdBVjZheGRxaTd2RzBKOHM2TDY3UmZDRkFHTkNidnlJdSt3QkJCekZneUtkd1pZU250OXQzcUVMck52ajNGbmY3cUJcL1dMbXlMcEVRMEFaaWhcLzVxUnpsY1RCdGh4QzNsakIwd2ZUVk53QkJrRkpYMW0zVEp2XC8rRjZoNVJld0VjMGJRK2FXUXR4bm1lZHJrd2ZvKzhlY1VmaFwvZFZEeVltd1VHS3lZQWJiZmkydElKV0FEWjFKZU51KzJ0Wkh2M0pQTVROOFpTNDB1Sk1cL1NOUlE0TjJuRjB5R2FHdWRBPT0iLCJtYWMiOiJjYWM3YmVkMmM3ODA1YzE5OWZlNzg1Njc4YzMxMjQ1YTViYWY5Mjk3MDJlZjczYTEzZjhkOGMwODMwOTNmODc2In0%3D; tmr_detect=0%7C1546854166038";

// kuznec
const cookie2 = "_gcl_au=1.1.1121010668.1546854401; _ga=GA1.2.68542588.1546854402; _gid=GA1.2.2085044828.1546854402; scs=%7B%22t%22%3A1%7D; ins-mig-done=1; spUID=15468544040982a2e8202c7.6627012b; _ym_uid=1546854406863881621; _ym_d=1546854406; _ym_isad=2; _fbp=fb.1.1546865604530.248672710; PageNumber=1; insdrSV=5; ins-gaSSId=fc4948e3-ede2-ece1-3c83-af3d9e33a226_1546872128; _ym_visorc_22749886=b; tmr_detect=0%7C1546872138191; laravel_session=eyJpdiI6IkdxS2d3c1ZxYnVoQXlYa05IYXl6M1E9PSIsInZhbHVlIjoiS1o3b016NFl5M21wN2doRUF1WjFqTkhqVU92WkNXVHFUS0JoT1JGRVZQTXN2cW14TGJhXC84MFh5a0IxUCtjU3c4bkRmVnEzZmxaNnBSa1ljbVZWb1NRPT0iLCJtYWMiOiI5OWQyNDkyMDljYWZmNDU2OTFhMmYzNjI3ODIwNzI4MzFiNmQ3YzZhYzMwZGMxZmJlOTdmOTEyYzg4Y2EyNWE4In0%3D; e4ea6d6768148b7a80badbfa7b7a40014d0816e8=eyJpdiI6IjVKeFBSNE1nc2RNVUduVUlMXC9kb3JRPT0iLCJ2YWx1ZSI6Ikgrd2ExVkd6RWNPT0RSSWtjdzVTQVwvMEZyczlIdUk1ZkRUblVkUVpoQW84OFNMNFVndmV4bU9jNFR3TnVSUm9pVkp5cEpJZlBnQ0hkc2VZbWhndVpEY2J1azNzcDhMS0xVMVNKVVJXN1NXZkJRcE4yaUFQcGlvUEhhRzZaUVY5N1RsWDN2UUtwb3dyWUdKQ1hQbUhjdXFGalZ6OWRBSDlTYlJrS1dKcWUwNFVMN05jUXdURHZRUTZlbElZTXNVVFhlTlJxZHk2M04zUUFXbXVMaFVRdzhwQzBLcDRnS2ptVXNtRnhlRGRRb3NWcmFUQ0ZqU1EyWGdXTzV3UFQ0ZXJJZ3pVK1VZS2gwcElDOCsyNEUrRlIxZzM4MkwzeWl3akRkejI2Wk5ZZkR5aWJkZTZadzZQOWdYMVI4VGJGRU5CZTFPayt1YysxVkF3S09TYXRFRG5cL0JBaEV3WWtJdUpuenY2Mm5cLzZ0MlF4cDBVQjVTamFFWlFnR0NLZHJWNzZTdmZSamJ5VmtQSWZwMXBsZzhLR3BtNVAzRVRMXC9NSGNDUGlTXC82ODlVTXBpSjlTbFNmMWNtWENza1lKd3dhUkhJUXZMdWhkTkxHV25ieFBITWh5QUlMa044aGxXVGZpeHlOSWZZaTJ3TWJhVnBxK2E2OFd4WlltT1lJcFBMU3F2MlFmVWpMaDF6alFUMExEbytsSDdsaXZseWFJbm53SkRKd0J2M1wvZ0Viam1KNHI1K3NYUHdyZGUySWYzYVBEeWFHRSIsIm1hYyI6IjAyMzQwNmQzMDEwNzAzMzY3YjA2NWU5ODAzY2ZiODY1Y2NiZTk1YTJmODQzYmQwMGMzMmNlYTdkZWI5OTBkZDQifQ%3D%3D";

// valimpetrov
const cookie3 = "_gcl_au=1.1.1121010668.1546854401; _ga=GA1.2.68542588.1546854402; _gid=GA1.2.2085044828.1546854402; scs=%7B%22t%22%3A1%7D; ins-mig-done=1; spUID=15468544040982a2e8202c7.6627012b; _ym_uid=1546854406863881621; _ym_d=1546854406; _ym_isad=2; _fbp=fb.1.1546865604530.248672710; insdrSV=5; tmr_detect=0%7C1546872138191; laravel_session=eyJpdiI6ImJURENkRHVBcXR1VXIySlhiWm1jVVE9PSIsInZhbHVlIjoiU1BBeXFScVppbGNCdG1SaER5RURhQkxHdWw3c1FcL2tvN2dvc1o5Y3M0OENSZmNBa3JucGJMZHFDZm5GZEVtVlNkTFRTWFVLRTZ3aGR4a0JmSHNUcTF3PT0iLCJtYWMiOiI3ZGRiMjlhMDZiODNkMTU2ODM3MzBmMWQ2Zjg5OTdjNTNjZTY2OWNlNzgzYmY3ZmYwMTM4NTQxMzk3OTBiNmFlIn0%3D; e4ea6d6768148b7a80badbfa7b7a40014d0816e8=eyJpdiI6ImJSZHJmV01pOVwvQ01Vd05VWmVaNGJnPT0iLCJ2YWx1ZSI6InJqYmNQUGw2VnBQRWpFbjJod1Y1TnF4MUh3dzBTK1VqMUdtZFFcL2RtNjd1dDVMaUJOOHRcL3hZRkF4SElYbzRVYnJpQmZlRGZMeVhtZThibTVWanVYRmdSeEFxNzN4c09SUVY0WUtFaUJ3c2ptdUhzNEFDXC9BSHdQQVl3eFNiSTUyS3JoVGlzMWcxUVFjbW5SbzRmdWNDcmZzQjlrU1hiXC9wRSthM05FWlM5d3NMK29NclZqTDNyZG9ncFwvMVpLSGFsUzJ5MXlpWXhxTFkyT1Zva1cxMWxwT0lRcFJTSzdTeExDZHJGWlwvdkRrWUt2NkxxcVVnR0l5RXNLZDllc2ViQnB2ekRMK3lpcGdUYVNPSFpFcUUzMUFKYTRCV2szTGRhVzRPUnM2NG5PTmEwZHFkRmZEM25OT2czWEFIWmt0YTRBaThtbm9lMVJNUHAwRXJmSlJKRmw3VEtETDlQdlpwdU5CeFFJbG02aVg0Q20zaVF4RXdCYjBqVlJxM2pZMmY0YkJiUkl2Z2FVU0Q0YWpKVTk5Z0pSbnh3WjZQckxGc0UzOFk3UTAwN0dyVEs4NW9SZlwvNkljSkY0XC9GQTcrUDhtZ2NxVWlsczNoYmVNYWlNRGtYZ0NRaWRKYk9Sa1lYcjNFMFdJSUZ6ZzNBakdzdkIrZHo5MmRVR2VNYlNmY0ZCaVFKWnZsYnRLTG1zWG80MHhVU1I3QXUwcWdJVlwvaHdWXC9SQ2VwcXo4Q2IzRm9nbHAxUVZFWUlVZHJNOUhrRUNMVFhZTzZKbXdadjBFbFBqZGtRXC95MWljUT09IiwibWFjIjoiNjg5YzNlMzIxMWMzN2Q3YmRmZWJiNjYzZjJhMTVlZmM2OGU0YjFiNDJhZmFhNzUyYjBjMzhjMTk3NGFhMTM1NSJ9";

// ger123stfang@gmail.com
const cookie4 = "_gcl_au=1.1.1121010668.1546854401; _ga=GA1.2.68542588.1546854402; _gid=GA1.2.2085044828.1546854402; scs=%7B%22t%22%3A1%7D; ins-mig-done=1; spUID=15468544040982a2e8202c7.6627012b; _ym_uid=1546854406863881621; _ym_d=1546854406; _ym_isad=2; _fbp=fb.1.1546865604530.248672710; insdrSV=5; tmr_detect=0%7C1546872138191; laravel_session=eyJpdiI6ImFkczk5MVwvNm9iK0hxOERYT2pSR0ZBPT0iLCJ2YWx1ZSI6ImlHRFc5NFY1RHB3NTNZZFBoRW92Z0thRWx6Z0dlcFFNcXN3TDZUcjVYMWlyTXFSN3hOMEdhdHF5MFBwZlwveDM1MDJtTGN5XC9rTDlMZmZGQWdzUlwvYnpBPT0iLCJtYWMiOiI2ZWM3ODM4M2UyYTgxMGQ0MTMwNTY1ZWRmMDY5NjdhZmUyMjJkNDYwMjJlMzgzYjU3ZjE2MWZkM2JhMDU5NjBiIn0%3D; e4ea6d6768148b7a80badbfa7b7a40014d0816e8=eyJpdiI6IjBFdTlLc1VzdURMMjREWE1FTnREMkE9PSIsInZhbHVlIjoibEE2K2l2d1F0TjNPRnZJS016Vis1QVNKTXhVVzhUeVZhcjdrS0pFdlNcL2JmZVp4ZitDWXNhR1wvVFdtVWM3b2o4Z21wMUZBbjlUN1ZhOUsrSThmYzFaY2IzSXZNRU1mUGlGbWFKZ1pVR2REdFJjbFwvN3VQRkZ6bHN6OWJjWkhvd2V1dGMra2lnQVh1aGQ0WFZFQnpqVjU4YjBrQXBmeVoyYUpRZ2hsSlJjc2JxS2NEQkxic1ZhSG4wXC84ZU5zbjZGZlBxRFhhU1haSzdER1hxSHM2OGZJMHJsckJIZG84NTFoUkdCN1wvUnRMQjFkVTBra2JzUnh5ZnpwQzNlN0d1SjBDd0ptU3g5VWo2dThlQTFCa1FkQ0Q0S1BWSVgxNTNBTnBUem5HYWY4T3FcL2lweVwvVFwvY2lnRjdpMGNSNXlUeEtCTEVCTWdpaEprRytBNUVXT1lDU3hBWWtCU0hQbUU1cHhOWWF0OHRGTnlIRzFoY3BLTXkxTEw3d1crUVJpYW12N25jMnpibThSM0hhckhLYWw4NmtTV0MwcFQ5Nm96Z2pjS2FaUjgya3kwalwvSUYzSmxXNEgyNCt0azczc0JOWVdmQm0xOWtTQlZoTmFFc3pOTWVBdGljNGMzQXd6WFllVVNwcGdHMjBjWmdBb1wvSlJOVjBPd3NyMytnXC9KdHdNS2QzNEdnR3FDMVJ4N3dMeTJQXC9QeXlTVmN5VGFKSnY1bjZGOEhtRlwvRmlQQ3FRb0hVbWtLTVk5cXdjYVB2SlNKUnVOYUtQZXcxUEIwNXdGUFZQSzMxMGhvUEE9PSIsIm1hYyI6ImQ1MzdhNDc5OGJjMDQyYzYxZDZlYWZiNjM4ZjNmYTczMWJjNGEzODY2NmI5MjZmYzczMWQxYjgyNzdiNTg1ZDcifQ%3D%3D";

// coupfdwn3n@gmail.com
const cookie5 = "_gcl_au=1.1.1121010668.1546854401; _ga=GA1.2.68542588.1546854402; _gid=GA1.2.2085044828.1546854402; scs=%7B%22t%22%3A1%7D; ins-mig-done=1; spUID=15468544040982a2e8202c7.6627012b; _ym_uid=1546854406863881621; _ym_d=1546854406; _ym_isad=2; _fbp=fb.1.1546865604530.248672710; insdrSV=5; tmr_detect=0%7C1546872138191; laravel_session=eyJpdiI6IitvM29rSjQ2aVNsRjVhdjNUT0t0Nmc9PSIsInZhbHVlIjoicm11SjgwYUoyT1RHQ3FqWjJcL0xlejlOMGhHSzJtVmMwK1VWbUNLaHptXC9kQTFpWmZ1NzZicFk5bUdOTCttM2djbXphSFVvek16Nzc5M0VOYzBReUJaUT09IiwibWFjIjoiNmJlNDQ4NWJmYzlkMWFhYTdjODVkYzI5OWMyYmFhMmUwN2QxNzliNDM4YjFkMmUzNDZhZWRiMjA2NWU4NmZlMiJ9; e4ea6d6768148b7a80badbfa7b7a40014d0816e8=eyJpdiI6ImJXZG82N2JhbUJES1hDT2ZhbG5YRHc9PSIsInZhbHVlIjoicTBSNnQyd1ZzcHFYbjdjQldaa1dudkwxb2lnWkdCV01FSFMyODM0MFVKdll1UXJlbSt3SU5NVEIwSUF6QndUQTQ2aTY0T25CeEdpWGdWYzJXNXR2dDMyNFF0eTBTUCtQalR3VkxzcFRURmtHUUhGYzNKelp3YThIenFJaUZKZ2x2T1N6aWFLXC82WnhjNWdSbnJcL2FcL2MzMnlpVFpMa0ZkamFaRmVWdUpoNkRURXlHNkxMRHhKVVB3cjdUak16Z3dkdG1hQk04aGQ2c21WYjdMQUN5K1VnVDNVOCtYYzh5amk5NDlnNjlFYyt0Vis4ZDc3MVhkNFN0emlaOFRLbHlSWlpSVjlyTHZaRHByWDVYYU9zYlFzdGlRYjJOUHBReHowdnQ0ZDRhYzhpSUZ0NDRjK2dJcnRFb09QK0VGc0FqOFFRcCtvU090OGxVNTVQb0RabjFtdGFxR25wcU9hN2t5amVod0w3WUp3dTc1ZDhndG9zWlNDNFE3Q2ljZ2dEN1NtOWJSWFByOEZocXZ3NXBWbVZ3K3poOEEzdEp5SkVnZGV0bFwvVTRxMFJQMlwvVFRXNkx0YlRUVGJHd0J3eVZvQjN3QmVMQVg3bjJ0WVRZYXh0dGtlUFwveVEwaEpmTzlvck96MmtEd09OVTZXSUJJVzhKOU9kRWE1Z1wvWWtrYWtVOUY0ZVRjZjdxcjdlS0VLSTg0bFB0M2I1SFNXUWIwMG1uZjF6bFp6aDJvRjRIMHFGMjBnOTZ6bmVZS3g0SXd5akVtU0JhXC9ockxrUWhyWFRiemFMZnI0SlJ3PT0iLCJtYWMiOiI0ZWRhN2U3ZTU0ZTFlNzY5OGNmMjNkYzg4NTNkMDJiYmIyOWNiYzAyMTNmZmZjN2FlODQ3M2NmYjdiOGNmODg4In0%3D";

cookie.push(cookie1, cookie2, cookie3, cookie4, cookie5);

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
    // const email = `puzanovskayalina@yandex.ru`;
    // const email = `valerka${Date.now()}@tartar.site`;
    const body = new FormData();

    // kuznec
    // this.token = '5lFwdvUPlq8gUDDm60YdaWDPIyjUhIQAFd9368zU';

    // valim
    this.token = '5lFwdvUPlq8gUDDm60YdaWDPIyjUhIQAFd9368zU';

    body.append('_token', this.token);
    body.append('Email', email);
    body.append('ConfirmEmail', email);

    body.append('textParameter[7]', '5020616140');

    body.append('agree', '1');
    body.append('terms_condition', '1');

    // console.log(body.getBoundary())

    console.log(email, this.token);

    // const value = await fetch(this.homeSubscription, { method: "POST", body, headers: { cookie: this.cookie, 'X-Requested-With': 'XMLHttpRequest' } });
    // console.log(await value.text());
    for (let i = 0; i < cookie.length; ++i) {
      this.cookie = cookie[i];

      const value2 = await fetch(this.url, { method: "POST", headers: { cookie: this.cookie, 'X-Requested-With': 'XMLHttpRequest' } });
      console.log(await value2.text());
      process.exit();
    }

  }
}

(async () => {
  const honor = new Honor();
  // await honor.init();
  // await honor.sendDevice();

  f(honor);
})();

async function f(honor) {
  // for (let i = 0; i < 1000; ++i) {
    await honor.sendCoupon();
    // await sleep(50000);
  // }
}

export function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
