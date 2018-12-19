import {URLSearchParams} from 'url';
import * as opt from 'optimist';
import {CheckCookie} from "./check-cookie";
import {SmsSenderDelivery} from "./utils";
import {sleep} from "./sms-activate";

(<any>global).fetch = require("node-fetch");
(<any>global).URLSearchParams = URLSearchParams;

const argv = opt
  .usage('Usage: $0 --cookie [boolean] --service [smsactivate/simsms]')
  .default('cookie', 'true')
  .default('service', 'smsactivate')
  .demand(['cookie', 'service'])
  .argv;

(async () => {
  const isCookie = argv.cookie;
  const service = argv.service;

  if (isCookie === 'true') {
    const cookie = new CheckCookie();
    cookie.run();

    return;
  }

  const sender = new SmsSenderDelivery();
  for (let i = 0; i < 20000; ++i) {
    console.log(service === 'smsactivate' ? 1 : 0);
    await sender.run(service === 'smsactivate' ? 1 : 0);
  }

  process.exit();
})();

// (async () => {
//
//   let cookie = 'PHPSESSID=8ldfuutqvub0g9fnfkd3hmnrr0';
//   const affraidId = '36648';
//
//   const params = new URLSearchParams();
//   params.append('user_type', 'RegisteredWithoutAddress');
//   params.append('phone1', '1918965');
//   params.append('phone1_code', '925');
//   params.append('department_id', 'Выбрать ресторан');
//   params.append('pickup_date', '0');
//   params.append('pickup_time_h', '-1');
//   params.append('pickup_time_m', '-1');
//   params.append('person_count', '1');
//   params.append('is_delivery_asap', '1');
//   params.append('preorder_date', '0');
//   params.append('preorder_time_h', '-1');
//   params.append('preorder_time_m', '-1');
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
//   params.append('delivery_time_preorder', '1');
//   params.append('delivery_time_preorder', '1');
//   params.append('openhour_from', '11:00');
//   params.append('openhour_to', '00:40');
//   params.append('online_payment', '1');
//   params.append('promo_code', 'testtest');
//
//   const promos = [
//     "NY19SN3FY7KRN",
//
//     "NY19SLJHQL5HE",
//     "NY19SHFF90DD4",
//     "NY19SZ8NORAMQ",
//     // "NY19SS93JRY7C",
//     // "NY19SNEEBJMUK",
//     // "NY19SGMMHSWPD",
//     // "NY19SXQ1N25QU",
//     // "NY19S27AS70RX",
//     // "NY19SPDPISVFN",
//     // "NY19SZJGP04LY",
//     // "NY19ST9VTH8F1",
//     // "NY19SND22J1KZ",
//     // "NY19S3Y19R109",
//     // "NY19SZGYVZ2K8",
//     // "NY19SL2Z6L42H",
//     // "NY19SOMCR6LPG",
//     // "NY19SD4ZFX32K",
//     // "NY19SS73S8IHC",
//     // "NY19SV9SBMOFZ",
//     // "NY19SO8HZY65P",
//     // "NY19SOVYJJJD8",
//     // "NY19SZ2UI74P4",
//     // "NY19S1IQLWHJA",
//     // "NY19SJ8O8WYNP",
//     // "NY19S501746AN",
//     // "NY19SM8OHK1Z3",
//     // "NY19S5XCI8FMJ",
//     // "NY19SSND9JB6J",
//     // "NY19SD2A9FO9G",
//     // "NY19S76MMIKV3",
//     // "NY19S4ODI1G4V",
//     // "NY19S2QGZ8R69",
//     // "NY19SOT5C1ZPA",
//     // "NY19SYTRP34ST",
//     // "NY19S4KSJUBKN",
//     // "NY19SGG0LWMHY",
//     // "NY19S01ILO1X7",
//     // "NY19SF0EW34JJ",
//     // "NY19SK2IX68E6",
//     // "NY19SG0Y10ZK0",
//     // "NY19SPNC3LPZR",
//     // "NY19SEOD27PZY",
//     // "NY19S62DLURIK",
//     // "NY19S4YI2BQ89",
//     // "NY19SJYXWMX7D",
//     // "NY19STTU0RCFV",
//     // "NY19S1ZK8GO4I",
//     // "NY19SEVEO0XU7",
//     // "NY19S1ZSHO7AQ",
//     // "NY19SN3FY7KRN",
//     // "NY19S5BIQFJJ9",
//     // "NY19SZHJ7MYYJ",
//     // "NY19S770EM897",
//     // "NY19SWTHL1EMV",
//     // "NY19S7IO7MI1H",
// ];
//
//   for (let i = 0; i < promos.length; ++i) {
//     let promo = promos[i];
//     params.delete('promo_code');
//     params.append('promo_code', promo);
//
//     const res = await fetch("https://belgorod.delivery-club.ru/ajax/promocode", {headers:{ cookie },body: params, method:"POST", });
//
//     console.log(promo, JSON.stringify(await res.json()));
//     await sleep(1000);
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
