import {CustomRequest} from "../utils/request";
import {Utils} from "../utils/utils";

const utils = new Utils();

export const headers = {
  "Host": "sharethemoment.ru",
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Site": "same-origin",
  "Sec-Fetch-User": "?T",
  "Sec-Origin-Policy": "0",
  "Upgrade-Insecure-Requests": "1",
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36",
};

export async function authHeineken(code, email, password, idx, name = '') {
  const request = new CustomRequest({ maxRedirects: 0 });
  const regExp = utils.getRegExpToken();
  request.setDefaultHeaders(headers);

  const res1 = await request.get('https://sharethemoment.ru/member/login');
  if (!res1 || res1.status !== 200) { return; }

  const [ ,token ] = regExp.exec(res1.data);
  const login = await request.post("https://sharethemoment.ru/member/login/handle", { _token: token, email, password }, {}, "url");
  const res3 = await request.post("https://sharethemoment.ru/member/cabinet/confirm", { _token: token, code }, {}, "url");
  // const res5 = await request.get("https://sharethemoment.ru/member/cabinet?login=1", {});
  let res4 = await request.get("https://sharethemoment.ru/member/cabinet?login=1", {});
  let match = res4.data.match(/<spam class="g_code"> (.*)<\/spam>/);
  if (!match) {
    res4 = await request.get("https://sharethemoment.ru/member/cabinet?login=1", {});
    match = res4.data.match(/<spam class="g_code"> (.*)<\/spam>/);
  }

  if (!match) {
    res4 = await request.get("https://sharethemoment.ru/member/cabinet?login=1", {});
    match = res4.data.match(/<spam class="g_code"> (.*)<\/spam>/);
  }

  if (!match || !match[1]) { console.log('error'); return; }

  utils.appendSyncFile(`heineken/promocodes_${name}_ivi.txt`, match[1]);
  console.log(idx, email, match[1]);
}
