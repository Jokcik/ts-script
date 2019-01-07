import {URLSearchParams} from 'url';
import * as opt from 'optimist';
import {CheckCookie} from "./check-cookie";
import {SmsSenderDelivery} from "./utils";
import {sleep} from "./sms-activate";
import {DeliveryNewYear} from "./delivery-new-year";

(<any>global).fetch = require("node-fetch");
(<any>global).URLSearchParams = URLSearchParams;

const argv = opt
  .usage('Usage: $0 --cookie [boolean] --service [smsactivate/simsms] --fast [false/true]')
  .default('cookie', 'true')
  .default('fast', 'false')
  .default('service', 'smsactivate')
  .demand(['cookie', 'service'])
  .argv;

(async () => {
  const isCookie = argv.cookie;
  const service = argv.service;
  const fast: boolean = argv.fast === 'true';

  if (isCookie === 'true') {
    const cookie = new CheckCookie(fast);
    cookie.run();

    return;
  }

  for (let i = 1; i < 2; ++i) {
    start(service);
  }
})();

async function start(service: string) {
  const sender = new SmsSenderDelivery();
  for (let i = 0; i < 20000; ++i) {
    console.log(i);
    await sleep(1000);
    await sender.run(service === 'smsactivate' ? 1 : 0);
  }
  process.exit();
}

// (async () => {
//
//   let cookie = 'PHPSESSID=spudvadm4d7ss68j09cj5ig2b1';
//   const affraidId = '9235';
//   const productId = '303420034';
//   const phone2 = '926';
//   const phone1 = '7296597';
//   const openhourFrom = '11:00';
//   const openhourTo = '23:59';
//
//   const req = await fetch("https://belgorod.delivery-club.ru", {headers:{ cookie } });
//   const text = await req.text();
//   const regExp = new RegExp("meta name=\"csrf-token\" content=\"(.*)\"");
//   const [, token] = regExp.exec(text);
//   console.log('token: ', token);
//
//   const paramsCartEmpty = new URLSearchParams();
//   paramsCartEmpty.append('empty_cart', 'true');
//   paramsCartEmpty.append('s_id', affraidId);
//   const cardEmpry = await fetch("https://belgorod.delivery-club.ru/ajax/cart/", {headers: { cookie, 'x-csrf-token': token},body: paramsCartEmpty, method:"POST", });
//   console.log('empty: ', await cardEmpry.text());
//
//   const paramsCart = new URLSearchParams();
//   paramsCart.append('product_id', productId);
//   paramsCart.append('quantity', '1');
//   paramsCart.append('s_id', affraidId);
//   paramsCart.append('byWeight', '0');
//
//   const card = await fetch("https://belgorod.delivery-club.ru/ajax/cart/", {headers: { cookie, 'x-csrf-token': token },body: paramsCart, method:"POST", });
//   console.log('card: ', await card.text());
//
//
//   const params = new URLSearchParams();
//   params.append('user_type', 'RegisteredWithoutAddress');
//   params.append('phone1', phone1);
//   params.append('phone1_code', phone2);
//   params.append('department_id', 'Выбрать ресторан');
//   params.append('pickup_date', '0');
//   params.append('pickup_time_h', '-1');
//   params.append('pickup_time_m', '-1');
//   params.append('person_count', '1');
//   params.append('is_delivery_asap', '1');
//   params.append('preorder_date', '2019-01-01');
//   params.append('preorder_time_h', '19');
//   params.append('preorder_time_m', '00');
//   params.append('delivery_cost', '0');
//   params.append('delivery_min_order', '600');
//   params.append('ignore_warnings', '0');
//   params.append('promo_discount', '0');
//   params.append('promo_discount', '0');
//   params.append('checkout_type', 'default');
//   params.append('send', '1');
//   params.append('checkout_locked', '0');
//   params.append('affiliate_id', affraidId);
//   params.append('delivery_24_hours', '0');
//   params.append('delivery_time_preorder', '2');
//   params.append('openhour_from', openhourFrom);
//   params.append('openhour_to', openhourTo);
//   params.append('online_payment', '1');
//   params.append('promo_code', 'testtest');
//
//   const promos = [
//     // "NY19KW3V3ARNN",
//     // "NY19SV6NYGWDN",
//     // "NY19KRAG4CMYQ",
//     "NY19KZPQ9TZNR",
//   ];
//
//
//   for (let i = 0; i < promos.length; ++i) {
//     let promo = promos[i];
//     params.delete('promo_code');
//     params.append('promo_code', promo);
//
//     const res = await fetch("https://belgorod.delivery-club.ru/ajax/promocode", {headers:{ cookie },body: params, method:"POST", });
//
//     console.log(promo, JSON.stringify(await res.json()));
//     // await sleep(1000);
//
//     let paramsDrop = new URLSearchParams();
//     paramsDrop.append('affiliate_id', params.get('affiliate_id'));
//     paramsDrop.append('delivery_cost', params.get('0'));
//     const resDrop = await fetch("https://belgorod.delivery-club.ru/ajax/drop_promo", {headers:{ cookie },body: params, method:"POST"});
//     console.log(JSON.stringify(await resDrop.text()));
//     await sleep(1000);
//   }
//
//
// })();
























// (async () => {
//   let arr = [
//     "NY19E6V0HLLSG",
//     "NY19EK52UJ8ND",
//     "NY19EXSBE2BCG",
//     "NY19ERS8Y2PZE",
//     "NY19ECMLWIN7C",
//     "NY19ECYTI94ND",
//     "NY19EP8NEVAVF",
//     "NY19EN36QWKIA",
//     "NY19EEVHI2H7C",
//     "NY19EA7YDCSND",
//     "NY19EZB0G9T7G",
//     "NY19ECH2WMLYA",
//     "NY19ELRCAN5YE",
//     "NY19E9J3ACMAC",
//     "NY19EDJ9HE6XA",
//     "NY19EIC2I2Z6C",
//     "NY19EM0NTSCLI",
//     "NY19E7WFH2F5H",
//     "NY19EKOQIEXIE",
//     "NY19E8YLZAJAC",
//     "NY19ERQER50YE",
//     "NY19EKQN94TQC",
//     "NY19EXA23ZVMD",
//     "NY19EHY48KX9B",
//     "NY19EMBI766GA",
//     "NY19E27KZRQ9B",
//     "NY19EEKHCN25C",
//     "NY19EYO0PY9WA",
//     "NY19E7DJGDK6G",
//     "NY19ETZSY3BKI",
//     "NY19EUNQZ7E4H",
//     "NY19EE1FZFQSB",
//     "NY19EHD60U6JI",
//     "NY19E6N70TU5C",
//     "NY19EVCJWGJBB",
//     "NY19EBZYTBLSB",
//     "NY19E9E5Q0O5C",
//     "NY19ESSV5UKGA",
//     "NY19ESR0MYJLZ",
//     "NY19EYHRC5SXE",
//     "NY19ELC1RE48B",
//     "NY19E4VSZTGDF",
//     "NY19ETT3UC9AB",
//     "NY19E62ITC5AB",
//     "NY19EG7G7ZK0D",
//     "NY19EV6VGTFXE",
//     "NY19ERMLFQN8B",
//     "NY19E0567GBXE",
//     "NY19E6O6XCAXE",
//     "NY19E00OA00PG",
//     "NY19ELKWYJURB",
//     "NY19ECPT9TO3P",
//     "NY19EMA05T0PG",
//     "NY19EOQEBQYCF",
//     "NY19EPU8MM2GE",
//     "NY19EO4W62A0D",
//     "NY19E1GYPCO9F",
//     "NY19ECNM0MOOC",
//     "NY19EJEIRY0II",
//     "NY19EPISODVGE",
//     "NY19EEN792WSF",
//     "NY19E82ZO8XII",
//     "NY19E7OY3134M",
//     "NY19EFGN8VOCF",
//     "NY19ESU0YRYZD",
//     "NY19E1VMCHMGE",
//     "NY19EOISL5QKD",
//     "NY19E5E9ATJ2H",
//     "NY19ELUUJGDOC",
//     "NY19E5HQDB5QB",
//     "NY19E0B40V2NC",
//     "NY19EQ4COFH2H",
//     "NY19E6Y8K57RF",
//     "NY19E5KVEOB7B",
//     "NY19E9G718JOG",
//     "NY19E1JNF34YD",
//     "NY19EUZQERZFE",
//     "NY19EIJUOXN1H",
//     "NY19EAYV3FB3C",
//     "NY19EGJC5ANBF",
//     "NY19E75GVZW6B",
//     "NY19EXTQFDNVE",
//     "NY19E771JWLVE",
//     "NY19ESV2GVUYD",
//     "NY19EB6BDJWMC",
//     "NY19E87HPECFE",
//     "NY19EVA6URK6B",
//     "NY19EEX1UX60H",
//     "NY19EQ5M5AAVE",
//     "NY19EIBM4E20H",
//     "NY19EQIB2U2NG",
//     "NY19EC4VDP2GI",
//     "NY19EUTTFIZNG",
//     "NY19E04ATJKCC",
//     "NY19EJEUUB2EE",
//     "NY19EB0WHKM2C",
//     "NY19EU31DKWVG",
//     "NY19EJ0KQFY0H",
//     "NY19E3U7UEVQF",
//     "NY19ECNDORIEE",
//   ];
//
//   for (let i = 0; i < arr.length; ++i) {
//     const token = 'DSNaUpz2wisZ1bA3to4xKcPGO0uCqdYy';
//     (await fetch(`http://crierbot.appspot.com/${token}/send?message=${encodeURIComponent(arr[i])}`));
//   }
// })();
