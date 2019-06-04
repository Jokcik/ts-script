import * as FormData from 'form-data'
import * as fs from "fs";
import {Utils} from "../utils/utils";
import {CustomRequest} from "../utils/request";
// import { jdenticon } from "jdenticon";
const fetch = require('node-fetch');
const sharp = require('sharp');


const utils = new Utils();
const request = new CustomRequest({});

(async () => {
for (let i = 0; i < 1; ++i) {
  const emails = utils.readSyncFile('dirol/output/result_domain01-06.txt');
  for (let email of emails) {
    const res = await request.post("https://pass.pepsico.digital/api/users/restore_password", { email }, { headers: { "Origin": "https://laysmusic.ru" } }, "url").catch(err => err.response);
    utils.appendSyncFile('dirol/lays.txt', `${email} ${res.data.message}`);
  }
  // const value = "data:image/jpg;base64,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";
  // var fs      = require('fs'),
  //   data        = value,
  //   base64Data,
  //   binaryData;
  //
  // base64Data  =   data.replace(/^data:image\/jpg;base64,/, "");
  // base64Data  +=  base64Data.replace('+', ' ');
  // binaryData  =   new Buffer(base64Data, 'base64').toString('binary');
  //
  // fs.writeFile("out.jpg", binaryData, "binary", function (err) {
  //   console.log(err); // writes out file without error, but it's not a valid image
  // });
  // // const form = new FormData();
  // // form.append('_csrf', 'cGwxNThCMmsVJXcMVjBxBBcPHGFzM1s5PSFXGH4YaBwgXVJvfnVBPw==');
  // // form.append('_key', "e99ca8143556fa7040c7");
  // // form.append('Check[_img]', "");
  // // form.append('Check[_img]', img, "484d5793f24d0205d0e1d7f239f1784529ef1189.png");
  // //
  // // let cookie = 'source=2d3ae5476e3cceda0335edb314d348eac4bebb59a8cb2d9ebe29fd94e1bc5e42a%3A2%3A%7Bi%3A0%3Bs%3A6%3A%22source%22%3Bi%3A1%3Bs%3A15%3A%224newsletter_ncp%22%3B%7D; _csrf=6b9b3e7f8d35e425308afc4cabb9837d936ebf7ed3bef88f92bdd7537630531da%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%22eIF9nrCogc-TKqiRMMf-FZZwP1cZF7sT%22%3B%7D; _ga=GA1.2.690684959.1556141085; _gid=GA1.2.1917942343.1556141085; _ym_uid=1556141085792625177; _ym_d=1556141085; _ym_isad=2; checkAge=1; PHPSESSIDMGN=11tpaiti7vqojorom1s561ccfl; _identity_mgn=b78c6dc85b692ff7d54188380bfcb219031efa0fa46fc4efcc440aa428381a69a%3A2%3A%7Bi%3A0%3Bs%3A13%3A%22_identity_mgn%22%3Bi%3A1%3Bs%3A49%3A%22%5B7278%2C%2226BkoC_NYmlsnAkxR9KRWNlHi7sk4iVp%22%2C2592000%5D%22%3B%7D; checkLogoName=663b2cd13c8b31697ee3522f8472cd271f40a3c086ac5b973b49c5447aaf513da%3A2%3A%7Bi%3A0%3Bs%3A13%3A%22checkLogoName%22%3Bi%3A1%3Bs%3A44%3A%22484d5793f24d0205d0e1d7f239f1784529ef1189.png%22%3B%7D; checkLogo=211fd924a2f594e25e1045b66d6349fe4bac02ac9e45b7a91e60fac7a17f34e3a%3A2%3A%7Bi%3A0%3Bs%3A9%3A%22checkLogo%22%3Bi%3A1%3Bs%3A31%3A%227dc7ee09724bc66e6cfe343a7e7.png%22%3B%7D; tmr_detect=0%7C1556142933759';
  // // let res = await fetch("https://orbit-promo.ru/action/site/check", {"headers":{cookie,"sec-fetch-dest":"empty","sec-fetch-site":"same-origin","sec-fetch-user":"?F","x-csrf-token":"cGwxNThCMmsVJXcMVjBxBBcPHGFzM1s5PSFXGH4YaBwgXVJvfnVBPw==","x-requested-with":"XMLHttpRequest"}, body: form,"method":"POST","mode":"cors"});
  // // console.log(await res.text());
}
})();
