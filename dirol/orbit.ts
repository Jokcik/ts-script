import * as FormData from 'form-data'
import * as fs from "fs";
// import { jdenticon } from "jdenticon";
const fetch = require('node-fetch');
const sharp = require('sharp');




(async () => {
for (let i = 0; i < 100; ++i) {
  let img = await sharp('dirol/484d5793f24d0205d0e1d7f239f1784529ef1189.png')
    .resize(500 + i, 200 + i)
    .toBuffer();

  const form = new FormData();
  form.append('_csrf', 'cGwxNThCMmsVJXcMVjBxBBcPHGFzM1s5PSFXGH4YaBwgXVJvfnVBPw==');
  form.append('_key', "e99ca8143556fa7040c7");
  form.append('Check[_img]', "");
  form.append('Check[_img]', img, "484d5793f24d0205d0e1d7f239f1784529ef1189.png");

  let cookie = 'source=2d3ae5476e3cceda0335edb314d348eac4bebb59a8cb2d9ebe29fd94e1bc5e42a%3A2%3A%7Bi%3A0%3Bs%3A6%3A%22source%22%3Bi%3A1%3Bs%3A15%3A%224newsletter_ncp%22%3B%7D; _csrf=6b9b3e7f8d35e425308afc4cabb9837d936ebf7ed3bef88f92bdd7537630531da%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%22eIF9nrCogc-TKqiRMMf-FZZwP1cZF7sT%22%3B%7D; _ga=GA1.2.690684959.1556141085; _gid=GA1.2.1917942343.1556141085; _ym_uid=1556141085792625177; _ym_d=1556141085; _ym_isad=2; checkAge=1; PHPSESSIDMGN=11tpaiti7vqojorom1s561ccfl; _identity_mgn=b78c6dc85b692ff7d54188380bfcb219031efa0fa46fc4efcc440aa428381a69a%3A2%3A%7Bi%3A0%3Bs%3A13%3A%22_identity_mgn%22%3Bi%3A1%3Bs%3A49%3A%22%5B7278%2C%2226BkoC_NYmlsnAkxR9KRWNlHi7sk4iVp%22%2C2592000%5D%22%3B%7D; checkLogoName=663b2cd13c8b31697ee3522f8472cd271f40a3c086ac5b973b49c5447aaf513da%3A2%3A%7Bi%3A0%3Bs%3A13%3A%22checkLogoName%22%3Bi%3A1%3Bs%3A44%3A%22484d5793f24d0205d0e1d7f239f1784529ef1189.png%22%3B%7D; checkLogo=211fd924a2f594e25e1045b66d6349fe4bac02ac9e45b7a91e60fac7a17f34e3a%3A2%3A%7Bi%3A0%3Bs%3A9%3A%22checkLogo%22%3Bi%3A1%3Bs%3A31%3A%227dc7ee09724bc66e6cfe343a7e7.png%22%3B%7D; tmr_detect=0%7C1556142933759';
  let res = await fetch("https://orbit-promo.ru/action/site/check", {"headers":{cookie,"sec-fetch-dest":"empty","sec-fetch-site":"same-origin","sec-fetch-user":"?F","x-csrf-token":"cGwxNThCMmsVJXcMVjBxBBcPHGFzM1s5PSFXGH4YaBwgXVJvfnVBPw==","x-requested-with":"XMLHttpRequest"}, body: form,"method":"POST","mode":"cors"});
  console.log(await res.text());
}
})();
