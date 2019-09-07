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
  {email: "nsqorjc2@inbox.ru", password: "877484"},

  {email: "volyntseva.t@malign.ru", password: "314045"},
  {email: "b63cec12ad4c@malign.ru", password: "812609"},
  {email: "g.uhtomsky@malign.ru", password: "234996"},

  {email: "bpxlxui57@inbox.ru", password: "224720"},
  {email: "djjxwp131@inbox.ru", password: "767044"},
  {email: "yzqdjp247@mail.ru", password: "814762"},

  {email: "wxvvt167@mail.ru", password: "R387zRpA"},
  {email: "spgkp154@mail.ru", password: "LamhNQHZ"},
  {email: "sansaltire@malign.ru", password: "480402"},
  {email: "wxvvt132305@malign.ru", password: "qwer12349"},
];

let codes;

(async () => {
  codes = getCodes();
  let codeIdx = 0;
  let header;

  let lastI = { idx: -1, count: 0 };
  for (let i = 0; i < headers.length; ++i) {
    if (!header) {
      const body = { userName: headers[i].email, password: headers[i].password, grant_type: "password", client_id: "web", app_version: "browser-ozonshop"};
      const result = await request.post(`https://www.ozon.ru/api/oauth/v1/auth/token`, body, { headers: { authorization: 'Zy7YWSSxHEaE7aQsVVvS', cookie: 'access_token=GfQg4ub8H0aupDgEevkv; refresh_token=bpsn80hi2_Mu8xZu5P3t85WWMNyGBMEqoNC1Al3o96N0Az7CRmHYVXM3q-go5P3Wfsa9UMoa9b7HL7KM1fjXyd3N5h_isBtmN4HNexfuO3ef2iKWv2q85Pr4ZCS50Ld3e3OYiUnChtdRgOds1Y2fBrBaH8eHu8QMto0gRg_nvXeo7kJNtGLkmfQwbJSdBhYu2BfkB9WaDdmR24d1dXyfujtW1fuDZ67yEb5dEuRkQNnUki4U3FWK_YgcB5XmrTHuhWOjoNvLLDsMbQmOXZtQfwfO2CukcVLJ36usRfFma9SRHbGD1904EomPtZYRzh3kRE8JyYKy2UFH64qrywUl7Spr1EWS01rcXS_ZqwIy5Uwjzguc1Au3EnZlK6KFLkKRUTgtH7IManaag6aoU-HVRS1gE7WJVA7LNemt0IaAmXOhbAdiXhfmkg; token_expiration="2019-07-04T19:08:58.0185597+03:00"; SessionID=qyh4n2ldbzothl50e1hgpmoa; abGroup=4; xcid=914ec0e73b6afe036346048b5d75d607; visid_incap_1101384=H/RJztheS/qA5hKu1uybhfIIHl0AAAAAQUIPAAAAAAAPA2P8q9wvNdIq40DEgF93; nlbi_1101384=FdLRbANoAyPayz3EMHDFYwAAAADDuHZt/3kjTgqkJRozG6xE; incap_ses_799_1101384=OzJSP9Qfbm2kQPTYDp8WC/IIHl0AAAAAXRO5oGoI5xDtBhIS6fI73Q==; browser_pixelRatio=2; browser_network=good; _gcl_au=1.1.35772385.1562249469; _ga=GA1.2.1104183688.1562249472; _gid=GA1.2.71026476.1562249472; _dc_gtm_UA-37420525-1=1; _gat_UA-37420525-1=1; __sonar=8836994243185936424; __exponea_etc__=5a9a2a15-8ef9-4ac8-b6be-0e25b7d94732; __exponea_time2__=-0.03769636154174805; _fbp=fb.1.1562249473233.1610074476; tmr_detect=0%7C1562249473430; criteo_write_test=ChUIBBINbXlHb29nbGVSdGJJZBgBIAE; cto_lwid=03e3bf26-ed3d-4068-a0ac-5fef4d5fa608; flocktory-uuid=8407c308-444a-489a-a8e2-62018dfe266e-8; total_hits=36' } }, "url", false);
      if (result.data && result.data.access_token) {
        // console.log(headers[i], result.data.access_token);
        header = result.data.access_token;
      } else {
        console.log('error', result.data);
        i--;
        continue;
      }
    }

    // const result = await request.get("https://www.ozon.ru/my/account", { headers: { authorization: `Bearer ${header}`, cookie: 'access_token=GfQg4ub8H0aupDgEevkv; refresh_token=bpsn80hi2_Mu8xZu5P3t85WWMNyGBMEqoNC1Al3o96N0Az7CRmHYVXM3q-go5P3Wfsa9UMoa9b7HL7KM1fjXyd3N5h_isBtmN4HNexfuO3ef2iKWv2q85Pr4ZCS50Ld3e3OYiUnChtdRgOds1Y2fBrBaH8eHu8QMto0gRg_nvXeo7kJNtGLkmfQwbJSdBhYu2BfkB9WaDdmR24d1dXyfujtW1fuDZ67yEb5dEuRkQNnUki4U3FWK_YgcB5XmrTHuhWOjoNvLLDsMbQmOXZtQfwfO2CukcVLJ36usRfFma9SRHbGD1904EomPtZYRzh3kRE8JyYKy2UFH64qrywUl7Spr1EWS01rcXS_ZqwIy5Uwjzguc1Au3EnZlK6KFLkKRUTgtH7IManaag6aoU-HVRS1gE7WJVA7LNemt0IaAmXOhbAdiXhfmkg; token_expiration="2019-07-04T19:08:58.0185597+03:00"; SessionID=qyh4n2ldbzothl50e1hgpmoa; abGroup=4; xcid=914ec0e73b6afe036346048b5d75d607; visid_incap_1101384=H/RJztheS/qA5hKu1uybhfIIHl0AAAAAQUIPAAAAAAAPA2P8q9wvNdIq40DEgF93; nlbi_1101384=FdLRbANoAyPayz3EMHDFYwAAAADDuHZt/3kjTgqkJRozG6xE; incap_ses_799_1101384=OzJSP9Qfbm2kQPTYDp8WC/IIHl0AAAAAXRO5oGoI5xDtBhIS6fI73Q==; browser_pixelRatio=2; browser_network=good; _gcl_au=1.1.35772385.1562249469; _ga=GA1.2.1104183688.1562249472; _gid=GA1.2.71026476.1562249472; _dc_gtm_UA-37420525-1=1; _gat_UA-37420525-1=1; __sonar=8836994243185936424; __exponea_etc__=5a9a2a15-8ef9-4ac8-b6be-0e25b7d94732; __exponea_time2__=-0.03769636154174805; _fbp=fb.1.1562249473233.1610074476; tmr_detect=0%7C1562249473430; criteo_write_test=ChUIBBINbXlHb29nbGVSdGJJZBgBIAE; cto_lwid=03e3bf26-ed3d-4068-a0ac-5fef4d5fa608; flocktory-uuid=8407c308-444a-489a-a8e2-62018dfe266e-8; total_hits=36' } });
    // const match = result.data.match(/"points":(\d+).*"balance":(\d+),"/);
    //
    // if (match) {
    //   header = null;
    //   console.log(headers[i].email, `Денег: ${match[2]}. Баллов: ${match[1]}`);
    // } else {
    //   i--;
    // }

    // const code = codes[codeIdx++];
    const code = "SECRET";
    if (!code) { return; }

    if (lastI.count === 9) {
      lastI.count = 0;
      continue;
    }

    const body = { code };
    const result = await request.post(`https://www.ozon.ru/api/user/v5/discountCode/${code}`, body, { headers: { authorization: `Bearer ${header}`, cookie: 'access_token=GfQg4ub8H0aupDgEevkv; refresh_token=bpsn80hi2_Mu8xZu5P3t85WWMNyGBMEqoNC1Al3o96N0Az7CRmHYVXM3q-go5P3Wfsa9UMoa9b7HL7KM1fjXyd3N5h_isBtmN4HNexfuO3ef2iKWv2q85Pr4ZCS50Ld3e3OYiUnChtdRgOds1Y2fBrBaH8eHu8QMto0gRg_nvXeo7kJNtGLkmfQwbJSdBhYu2BfkB9WaDdmR24d1dXyfujtW1fuDZ67yEb5dEuRkQNnUki4U3FWK_YgcB5XmrTHuhWOjoNvLLDsMbQmOXZtQfwfO2CukcVLJ36usRfFma9SRHbGD1904EomPtZYRzh3kRE8JyYKy2UFH64qrywUl7Spr1EWS01rcXS_ZqwIy5Uwjzguc1Au3EnZlK6KFLkKRUTgtH7IManaag6aoU-HVRS1gE7WJVA7LNemt0IaAmXOhbAdiXhfmkg; token_expiration="2019-07-04T19:08:58.0185597+03:00"; SessionID=qyh4n2ldbzothl50e1hgpmoa; abGroup=4; xcid=914ec0e73b6afe036346048b5d75d607; visid_incap_1101384=H/RJztheS/qA5hKu1uybhfIIHl0AAAAAQUIPAAAAAAAPA2P8q9wvNdIq40DEgF93; nlbi_1101384=FdLRbANoAyPayz3EMHDFYwAAAADDuHZt/3kjTgqkJRozG6xE; incap_ses_799_1101384=OzJSP9Qfbm2kQPTYDp8WC/IIHl0AAAAAXRO5oGoI5xDtBhIS6fI73Q==; browser_pixelRatio=2; browser_network=good; _gcl_au=1.1.35772385.1562249469; _ga=GA1.2.1104183688.1562249472; _gid=GA1.2.71026476.1562249472; _dc_gtm_UA-37420525-1=1; _gat_UA-37420525-1=1; __sonar=8836994243185936424; __exponea_etc__=5a9a2a15-8ef9-4ac8-b6be-0e25b7d94732; __exponea_time2__=-0.03769636154174805; _fbp=fb.1.1562249473233.1610074476; tmr_detect=0%7C1562249473430; criteo_write_test=ChUIBBINbXlHb29nbGVSdGJJZBgBIAE; cto_lwid=03e3bf26-ed3d-4068-a0ac-5fef4d5fa608; flocktory-uuid=8407c308-444a-489a-a8e2-62018dfe266e-8; total_hits=36' } }, "json", false);
    const data: { message: string, code: "OK" | "Error" } = result.data;

    console.log(data, data.message, code);
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

    if (lastI.count == 9) {
      header = null;
      i++;
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
