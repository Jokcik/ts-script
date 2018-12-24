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
//   let cookie = 'PHPSESSID=8ldfuutqvub0g9fnfkd3hmnrr0';
//   const affraidId = '11470';
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
//     // "NY19K9B6EM6WK",
//     // "NY19KNCEYHV4W",
//     "NY19KTO3Y120O",
//     // "NY19KYLQPA6HH",
//     // "NY19K9Y9V92CV",
//     // "NY19S3BLBT3A0",
//     // "NY19K7URSIT2I",
//     // "NY19KK56Y4TKQ",
//     // "NY19KFN3TGRRM",
//     // "NY19KAAADWPZ7",
//     // "NY19K3VBN6K9T",
//     // "NY19SQMVZGCC9",
//     // "NY19S2X0TKM6M",
//     // "NY19SYGPTBFKF",
//     // "NY19KKWBED3SN",
//     // "NY19KR5JK8LAP",
//     // "NY19SMO1ZPIXJ",
//     // "NY19SU2ZIU1HZ",
//     // "NY19S276C9I8R",
//     // "NY19S7OSBNS85",
//     // "NY19SMWMBL9GV",
//     // "NY19K20YHS8XZ",
//     // "NY19SCLNHQGBX",
//     // "NY19K2M7G2389",
//     // "NY19SUVVCQ1B0",
//     // "NY19KY7KLQY47",
//     // "NY19K6V859V05",
//     // "NY19SNNYN3CE6",
//     // "NY19KNDLEFSZ9",
//     // "NY19KGH8EBK9Q",
//     // "NY19KNTY39SGB",
//     // "NY19KWEFOD02O",
//     // "NY19KQZWT39H7",
//     // "NY19K4UFHKORS",
//     // "NY19KHYIKJSJ0",
//     // "NY19KNO19T69T",
//     // "NY19KJR8F5GRE",
//     // "NY19K0HM82TLM",
//     // "NY19S7JHTKT9T",
//     // "NY19K4QU7UHC5",
//     // "NY19KQVVMFG3D",
//     // "NY19KKWSQBYUP",
//     // "NY19KTVCIH1JT",
//     // "NY19K0MP0UEJW",
//     // "NY19K3EV3EX2F",
//     // "NY19SBZPGR2UD",
//     // "NY19KZAOILV4E",
//     // "NY19KCS03UFID",
//     // "NY19KYXJQSZFZ",
//     // "NY19KLPSXPTS6",
//     // "NY19SSMG5V0HL",
//     // "NY19KU02I51UQ",
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
