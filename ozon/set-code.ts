import {Utils} from "../utils/utils";
import {CustomRequest} from "../utils/request";
import {saveFormatterFileCode} from "../dirol/global-functions";

const utils = new Utils();
const request = new CustomRequest({}, false);

const headers: { email: string, password: string }[] = [
  {email: "sk8max@yandex.ru", password: "87654321"},
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
  {email: "gfwgt144@mail.ru", password: "457233"},

  {email: "volyntseva.t@malign.ru", password: "314045"},
  {email: "b63cec12ad4c@malign.ru", password: "812609"},
  {email: "g.uhtomsky@malign.ru", password: "234996"},

  {email: "bpxlxui57@inbox.ru", password: "224720"},
  {email: "djjxwp131@inbox.ru", password: "767044"},
];

let codes;

(async () => {
  codes = getCodes();
  let codeIdx = 0;
  let header;

  let lastI = { idx: -1, count: 0 };
  for (let i = 0; i < headers.length; ++i) {
    if (!header) {
      const body = { userName: headers[i].email, password: headers[i].password, grant_type: "password", client_id: "web", app_version: "browser-ozonshop" };
      const result = await request.post(`https://www.ozon.ru/api/oauth/v1/auth/token`, body, { headers: { authorization: 'Zy7YWSSxHEaE7aQsVVvS' } }, "url", false);
      if (result.data && result.data.access_token) {
        console.log(headers[i], result.data.access_token);
        header = result.data.access_token;
      } else {
        console.log('error', result.data);
        continue;
      }
    }

    // const result = await request.get("https://www.ozon.ru/my/account", { headers: { authorization: `Bearer ${header}`, cookie: 'access_token=T0rZ1z6vH02NS2eUK2Iz; refresh_token=zKaQcUjyZljo-iIb0MW_C2v_rcJbLov4bwHBSw26y4YPnV6vNuh4Iyi_tR3Tqi81_TErNpeRjhn3Sy_4pjoRzLQtRoak7VcBnPgXG7YTzUQNRX2WyGB1Pbp3bXzN5jFZyGsxMzsAUGhhSgYwZy7zAVu0lkzL2RZH-K_A4xFtB8mdMuJf1xANj7oKrb5_FNHN2yS0r3-U9C87PPy4kcd2kNUFPYzBEFSQdNt2WbuU_laxwD6DkTzBnrPFQJRJlwJ0dZwEJTeFG7EtaWav1NofQQMGUVa7kJS-3pbGq1mqFt9DR-PtJFVByv_TtNanlPdEfI07TpZE_p8nFd6J8uYkz4vMm5-ia3YW6Lz4cn_atSI2QncWi8OIMbfqUmi7SLF9o60cFlcdMsxfqdiMeih4AoE1A5d10iDU52bg0ThnNl5RLaMkF-WBgg; token_expiration="2019-06-07T01:09:45.3511327+03:00"; SessionID=aj2cn4yl4c0rvchkq5t415oa; abGroup=28; xcid=72faa14bc3da07ed5803331948f67fb5; visid_incap_1101384=Efou5aU1RkKrsfPFCrSHpZGB+VwAAAAAQUIPAAAAAACYur8GlSbN2YzLiaCf3gM4; nlbi_1101384=VjAIC/mWMwbtGOhZMHDFYwAAAAAxBPQsFACB4ycDBaDkBjGA; incap_ses_377_1101384=zuaRR+sbcwjCPfWnHGA7BZGB+VwAAAAAndOYvtKECAZOLF/HMMPzcQ==; browser_pixelRatio=1; browser_network=good; _gcl_au=1.1.1613441742.1559855509; _ga=GA1.2.1259029105.1559855510; _gid=GA1.2.2018448773.1559855510; _dc_gtm_UA-37420525-1=1; _gat_UA-37420525-1=1; __exponea_etc__=db27b16f-1366-4b59-8b57-8e9a00a70878; __exponea_time2__=-0.0027930736541748047; __sonar=10127853969969343246; _fbp=fb.1.1559855510103.1160659555; flocktory-uuid=8e48875c-5521-4399-80ae-ac5bd152494c-5; cto_lwid=f551b826-17d4-4836-8043-029681597792; criteo_write_test=ChUIBBINbXlHb29nbGVSdGJJZBgBIAE; tmr_detect=0%7C1559855526344; total_hits=17' } });
    // const match = result.data.match(/"balance":(\d+),"/);
    //
    // if (match) {
    //   header = null;
    //   console.log(headers[i].email, match[1]);
    // } else {
    //   i--;
    // }

    // const code = lastI.count === 1 ? "OZON7D9IL5" : codes[codeIdx++];
    const code = codes[codeIdx++];
    if (!code) { return; }

    if (lastI.count === 9) {
      lastI.count = 0;
      continue;
    }

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

    if (lastI.idx !== i) {
      lastI.idx = i;
      lastI.count = 0;
    } else {
      lastI.count++;
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
