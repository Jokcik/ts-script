import {CustomRequest, tor} from "../utils/request";
import {Utils} from "../utils/utils";
import {headers} from "./auth";
import {ProxyManager} from "../utils/proxy-manager";

const utils = new Utils();
// request.setDefaultHeaders(headersSokolov);

(async () => {
  const proxy = new ProxyManager();
  startRegistration(proxy.getProxy());
})();

async function startRegistration(proxys: string[]) {
  for (let i = 0; i < 1000; ++i) {
    console.log('startRegistration', i)

    try {
      const request = new CustomRequest({ maxRedirects: 0 }, true);
      const res = await request.get("https://api.ipify.org/?format=json").catch(value => null);
      console.log(i, res.data);
      request.clearCookie();
      await f(i, request);
    } catch (e) {
      console.log('ERROR1');
    }

    await utils.sleep(3000);
    await tor.torNewSession();
    // request.clearCookie();
  }
}

let a = ['абвгдежздийакклмн'];
async function f(i: number, request: CustomRequest) {
  let { prefix } = utils.generateRandoms("", "");
  const phone = utils.generatePhoneFormatted();
  const regExp = utils.getRegExpToken();

  let email = prefix;
  email += i % 2 ? "@mail-box.club" : "@vtbmail.ru";

  const res = await request.get("https://sharethemoment.ru/member/register", { });
  if (!res || res.status !== 200) {
    console.log('ERROR2', res.status, res.statusText);
    return;
  }

  const [ ,token ] = regExp.exec(res.data);
  const data = {
    _token: token, from: 'site',
    first_name: 'Ив' + a[utils.randomBetween(0, a.length - 1)] + 'анов', email: email,
    last_name: 'Ив' + a[utils.randomBetween(0, a.length - 1)] + 'ан', phone: phone,
    password: prefix, password_confirmation: prefix,
    rules: '1', process_data: '1',
  };

  const register = await request.post("https://sharethemoment.ru/member/register/handle", data, {}, "url");
  const location = register.headers['location'];
  if (location.indexOf("?register=1") === -1) { return; }

  const res2 = await request.get(location);
  console.log(new Date(), 'Письмо отправлено: ', res2.data.indexOf("Для завершения регистрации введите проверочный код, который был отправлен на ваш электронный") > -1);
}
