import {Utils} from "../utils/utils";
import {CustomRequest} from "../utils/request";
import {saveFormatterFileCode} from "../dirol/global-functions";

const utils = new Utils();
const request = new CustomRequest();

const headers: { email: string, password: string }[] = [
  {email: "gfwgt144@mail.ru", password: "457233"},
  {email: "pfzqi164@mail.ru", password: "768345"},
  {email: "kqrqlgy36@mail.ru", password: "193585"},
  {email: "cixqay119@mail.ru ", password: "332408"},
  {email: "srlofaj68@mail.ru", password: "310006"},
  {email: "cfemyva72@inbox.ru", password: "340673"},
  {email: "vlyjny158@inbox.ru", password: "105559"},
  {email: "uzwasc253@inbox.ru ", password: "811112"},
  {email: "unztt181@inbox.ru", password: "319792"},
  {email: "yxprv219@inbox.ru", password: "653792"},
  {email: "kusrmy122@inbox.ru", password: "386689"},
  {email: "pkbpas140@inbox.ru", password: "339994"},
  {email: "blwhww102@inbox.ru", password: "273737"},
  {email: "dzbvjv198@inbox.ru", password: "624073"},
  {email: "vlnhp201@inbox.ru", password: "544185"},
  {email: "krbpxa210@inbox.ru", password: "904958"},
  {email: "qetixze7@inbox.ru", password: "701894"},
  {email: "sdjdqq95@inbox.ru", password: "910922"},
  {email: "oaifuva16@inbox.ru", password: "215132"},
  {email: "glpscv24@inbox.ru", password: "784503"},
  {email: "miboh146@inbox.ru", password: "791627"},
  {email: "tktbnk198@inbox.ru", password: "766462"},
  {email: "cxlovy29@inbox.ru", password: "235016"},
  {email: "jcxkfj215@inbox.ru", password: "604474"},

  {email: "volyntseva.t@malign.ru", password: "314045"},
  {email: "b63cec12ad4c@malign.ru", password: "812609"},
  {email: "g.uhtomsky@malign.ru", password: "234996"},

  {email: "bpxlxui57@inbox.ru", password: "224720"},
  {email: "djjxwp131@inbox.ru", password: "767044"},
  {email: "yzqdjp247@mail.ru", password: "814762"},
];

let codes;

(async () => {
  codes = getCodes();
  let codeIdx = 0;
  let header;

  for (let i = 0; i < headers.length; ++i) {
    if (!header) {
      const body = { userName: headers[i].email, password: headers[i].password, grant_type: "password", client_id: "web", app_version: "browser-ozonshop" };
      const result = await request.post(`https://www.ozon.ru/api/oauth/v1/auth/token`, body, { headers: { authorization: 'Nj4JXpop7kpWPVy8pMtp' } }, "url", false);
      if (result.data && result.data.access_token) {
        console.log(headers[i], result.data.access_token);
        header = result.data.access_token;
      } else {
        console.log('error', result.data);
        continue;
      }
    }

    const code = codes[codeIdx++];
    if (!code) { return; }

    const body = { code };
    const result = await request.post(`https://www.ozon.ru/api/user/v5/discountCode/${code}`, body, { headers: { authorization: `Bearer ${header}` } }, "json", false);
    const data: { message: string, code: "OK" | "Error" } = result.data;

    console.log(data.message, code);
    if (data.code === "OK") {
      appendToUses(code);
      i--;
    } else if (data.message.indexOf("Исчерпан ежедневный лимит") > -1) {
      codeIdx--;
      header = null;
    } else if (data.message.indexOf("Неправильно введено кодовое слово") > -1) {
      appendToUses(code);
      i--;
    } else if (data.message.indexOf("Это кодовое слово уже было активировано другим пользователем") > -1) {
      appendToUses(code);
      i--;
    } else if (data.message.indexOf("Исчерпан ежедневный лимит введения кодовых слов") > -1) {
      codeIdx--;
      header = null;
    } else if (data.message.indexOf("Вы уже вводили это кодовое слово ранее") > -1) {
      console.log('error', data, data.message.indexOf("Вы уже вводили это кодовое слово ранее") > -1);
      appendToUses(code);
      header = null;
    } else {
      console.log('error', data, data.message.indexOf("Это кодовое слово уже было активировано другим пользователем") > -1);
      header = null;
    }
  }


  process.exit();
})();


function appendToUses(code: string) {
  utils.appendSyncFile('dirol/uses.txt', code);
}

function getCodes() {
  saveFormatterFileCode();
  // const file: string[] = utils.readSyncFile('dirol/output/OZON 250 рублей-01-06');
  const file: string[] = utils.readSyncFile('dirol/output/OZON 120 рублей-01-06');
  const codes = file.map(value => value.split(' ')[0]);
  return codes;
}
