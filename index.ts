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
//   params.append('openhour_to', '01:40');
//   params.append('online_payment', '1');
//   params.append('promo_code', 'testtest');
//
//   const promos = [
//     "NY19K9UCTQR6L",
//     // "NY19KZI9TPW25",
//     // "NY19KIM4HXOU5",
//     // "NY19K4L5FLP7U",
//     // "NY19SEFLI0EZ3",
//     // "NY19KUEJS590S",
//     // "NY19S6IFUKJ6X",
//     // "NY19KIY979SJH",
//     // "NY19SX4ATF8BO",
//     // "NY19K8PDJU96C",
//     // "NY19KDI9B0FPX",
//     // "NY19KZY2XER6J",
//     // "NY19S1LDABLHU",
//     // "NY19KBXN7AH1L",
//     // "NY19SGR4WP5OF",
//     // "NY19K89J2LUXR",
//     // "NY19KVEBLJJ9B",
//     // "NY19K7I1E5ECR",
//     // "NY19K31GSH3FB",
//     // "NY19SZDW84XX4",
//     // "NY19S4T71NOPR",
//     // "NY19S3KWPETI8",
//     // "NY19KCXQIMNOT",
//     // "NY19K7RMHQDD9",
//     // "NY19K1CA3A6PX",
//     // "NY19KZ1ORX0YM",
//     // "NY19SSAFAPQ59",
//     // "NY19K2U08B6C1",
//     // "NY19KQYP26Q7L",
//     // "NY19SBQMEP3J5",
//     // "NY19SGE5LCGZY",
//     // "NY19K6L5CRT6U",
//     // "NY19KH6ZEL7BZ",
//     // "NY19KD6QE8LFO",
//
//
//   ];
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
