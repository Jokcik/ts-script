import {CustomRequest} from "./utils/request";
import axios from 'axios'
import {URLSearchParams} from "url";

const quotedPrintable = require('quoted-printable');
(<any>global).fetch = require("node-fetch");


var config = {
  imap: {
    // user: 'kuzj3nec@yandex.ru', // qret1234
    user: 'jokcik@yandex.ru', // qwer1234
    // user: 'noreply@rumc31.ru', // qret1234
    // user: 'valimpetrov1993@gmail.com', // qret1234
    // user: 'coupfdwn3n@gmail.com', // vvtfdvcgtp3r
    // user: 'jokcik@gmail.com', //qwer1996
    // user: 'ger123stfang@gmail.com', //52vvtgtp3r
    password: 'qwer1234',
    host: 'imap.yandex.com',
    // host: 'imap.gmail.com',
    port: 993,
    tls: true,
    authTimeout: 30000
  }
};

(async() => {
  return a('957186342', 'jokcik@gmail.com', 'qret1234');
  // return getPromocode('957186342', 'jokcik@gmail.com', 'qret1234');


})();

const headers =
  {
    "sec-fetch-dest":"document",
    "sec-fetch-site":"same-origin",
    "sec-fetch-user":"?T",
    "sec-origin-policy":"0",
    "upgrade-insecure-requests":"1"
  };


async function a(code, email, password) {
  const regExp = new RegExp("name=\"_token\" value=\"(.*?)\"");
  const customRequest = new CustomRequest({ maxRedirects: 0 });
  customRequest.setDefaultHeaders(headers);

  const res1 = await customRequest.get('https://sharethemoment.ru/member/login');
  if (!res1 || res1.status !== 200) { return; }

  const [ ,token ] = regExp.exec(res1.data);
  const register = await customRequest.post("https://sharethemoment.ru/member/login/handle", { _token: token, email, password }, {}, "url");
  const res3 = await customRequest.post("https://sharethemoment.ru/member/cabinet/confirm", { _token: token, code }, { maxRedirects: 10 }, "url");
  let match = res3.data.match(/<spam class="g_code"> (.*)<\/spam>/)
  console.log(match[1]);
}

async function getPromocode(code, email, password) {
  const regExp = new RegExp("name=\"_token\" value=\"(.*?)\"");

  const res = await axios.get('https://sharethemoment.ru/member/login', { headers: { ...headers } })
    .catch((e) => {console.log(e); return null});
  if (!res || res.status !== 200) { return; }
  // console.log(await res.text());
  // process.exit();

  let cookie = "year=true; " + res.headers['set-cookie'].join(';');
  let cookieStart = cookie;
  const text = res.data;
  const [ ,token ] = regExp.exec(text);

  // const params = new URLSearchParams();
  // params.append("_token", "Cfy6jRN5lOZqb2mfBhZuRXzMCg3MM35up9YlzvNH");
  // // params.append("_token", token);
  // params.append("email", email);
  // params.append("password", password);
  var querystring = require('querystring');

  // console.log(params.toString());
  // const register = await fetch("https://sharethemoment.ru/member/login/handle", { headers: { ...headers, Cookie }, method: "POST", body: querystring.stringify({ _token: token, email, password }) })
  console.log(cookie);
  axios.interceptors.response.use((response) => {

    return response;
  }, error => {
    if (error.response.status === 302) {
      return error.response;
    }

    return Promise.reject(error)
  });

  axios.interceptors.request.use((config) => {
    config.headers['cookie'] = cookie;

    return config;
  }, error => Promise.reject(error));

  const register = await axios.post("https://sharethemoment.ru/member/login/handle", querystring.stringify({ _token: token, email, password }), {
    maxRedirects: 0, headers: { ...headers, cookie: cookie }
  }).catch((e) => {console.log(e); return null});
  if (!register) { return; }
  // console.log(register.url);
  // console.log(register);
  // return;
  // Cookie = register.headers.get('set-Cookie');
  cookie = "year=true; " + register.headers['set-cookie'].join(';');

  console.log(cookie);
  const cabinet = await axios.get('https://sharethemoment.ru/member/login', { headers: { ...headers, cookie: cookie } });
  // const cabinet = await fetch("https://sharethemoment.ru/member/cabinet?login=1", <any>{ headers: { ...headers, Cookie }, timeout: 1000 });
  let match = cabinet.data.match(/<spam class="g_code"> (.*)<\/spam>/)
  console.log(match);
}

