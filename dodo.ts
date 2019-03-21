import {URLSearchParams} from "url";
import * as fs from "fs";
import {emails, values} from "./config";
import {CheckCookie} from "./check-cookie";
var msgpack = require("msgpack-lite");

(<any>global).fetch = require("node-fetch");
(<any>global).URLSearchParams = URLSearchParams;

const serts = [
  "cc60e9b44786",
  "a233068594c6",
  "b59f69a14f35",
  "f50182e94639",
  "e2ac0e0a72cf",
  "a07440f272bc",
  "71aa4fb6efb9",
  "1a764989f3d8",
  "d2b1d26fdc21",
  "222a56d2cf0c",
  "96d840192169",
  "8a8eaf988707",
  "b377d693bb95",
  "24d4eb98406b",
  "824e4e0bca28",
  "7b980a82b61c",
  "0edf85519b79",
  "091c7ebbf306",
  "c3a83f367027",
  "4138eaf4f98c",
  "03edd64fdebd",
  "4c39b6539cb9",
  "5bbd02e1ec04",
  "9233ba16f753",
  "0e681a2e91c7",
  "db0d20e5a8cb",
  "cd66e8ffa148",
  "d6ea6456e21f",
];


const HttpsProxyAgent = require('https-proxy-agent');

function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

(async() => {
  // const type = [
  //   "coffee",
  //   "tom_yam",
  //   "heart",
  //   "pizza",
  // ];
  //
  // const score = [
  //   "1200",
  //   "2600",
  //   "2800",
  //   "3000",
  // ];
  //
  // for (let i = 0; i < type.length; ++i) {
  //   const id = '427408928';
  //   const sign = '414fe6be26ce99921ce29e24b40188a71d71455ce373b05fcf95b8a3be5085e9';
  //   const sig = 'https%3A%2F%2Fapi.vk.com%2Fapi.php6841550052902640305a4dd827552928dae33fea340dd5c8d4c2a888a38b3f471bffac4b624060ec72876c5caf27a4f8db4aa1acd015acb9c149fe9e421ca62efab1337ac48f67393639f93f7d092b13864f6080a23b5165ca59c98e7644736491dc280534840800c91ee145691d48dc371cdb8553e6de86001e012fd5229ed92a2ab6841550_52078e65d5e721b34bunknowne6db1d61';
  //   const res = await fetch("https://dodomarketing.azurewebsites.net/dodo-game/code.php", { "headers":{"accept":"*/*","accept-language":"uk,ru;q=0.9,en;q=0.8","cache-control":"no-cache","content-type":"application/x-www-form-urlencoded; charset=UTF-8","pragma":"no-cache","x-requested-with":"XMLHttpRequest"}, body:`type=${type[i]}&score=${score[i]}&viewer=${id}&sig=${sig}&sign=${sign}`,method:"POST" });
  //   console.log(await res.text());
  // }


  // for (let i = 0; i < 200; ++i) {
  //   f(i);
  // }
})();

async function f(start: number, end: number, proxys: string[]) {
  // for (let i = start; i < end; ++i) {
  //   for (let j = 0; j < 10; ++j) {
  const value = "%EF%BF%BD%EF%BF%BD_id%EF%BF%BD3fkw9qqs5ao%EF%BF%BD_stages%EF%BF%BD%EF%BF%BD%EF%BF%BDmatches%EF%BF%BD%EF%BF%BD%EF%BF%BDbo%01%EF%BF%BDscores%EF%BF%BD%01%00%EF%BF%BDplayers%EF%BF%BD%EF%BF%BD%EF%BF%BDid%EF%BF%BD9%EF%BF%BDrating%02%EF%BF%BDusername%EF%BF%BDtest11%EF%BF%BD%EF%BF%BDid%EF%BF%BDempty%EF%BF%BD_id%01%EF%BF%BD%EF%BF%BDbo%01%EF%BF%BDscores%EF%BF%BD%01%00%EF%BF%BDplayers%EF%BF%BD%EF%BF%BD%EF%BF%BDid%EF%BF%BD8%EF%BF%BDrating%02%EF%BF%BDusername%EF%BF%BDtest28%EF%BF%BD%EF%BF%BDid%EF%BF%BDempty%EF%BF%BD_id%02%EF%BF%BD%EF%BF%BDbo%01%EF%BF%BDscores%EF%BF%BD%01%00%EF%BF%BDplayers%EF%BF%BD%EF%BF%BD%EF%BF%BDid%EF%BF%BD7%EF%BF%BDrating%02%EF%BF%BDusername%EF%BF%BDtest27%EF%BF%BD%EF%BF%BDid%EF%BF%BDempty%EF%BF%BD_id%03%EF%BF%BD%EF%BF%BDbo%01%EF%BF%BDscores%EF%BF%BD%01%00%EF%BF%BDplayers%EF%BF%BD%EF%BF%BD%EF%BF%BDid%EF%BF%BD6%EF%BF%BDrating%02%EF%BF%BDusername%EF%BF%BDtest26%EF%BF%BD%EF%BF%BDid%EF%BF%BDempty%EF%BF%BD_id%04%EF%BF%BD%EF%BF%BDbo%01%EF%BF%BDscores%EF%BF%BD%01%00%EF%BF%BDplayers%EF%BF%BD%EF%BF%BD%EF%BF%BDid%EF%BF%BD5%EF%BF%BDrating%02%EF%BF%BDusername%EF%BF%BDtest25%EF%BF%BD%EF%BF%BDid%EF%BF%BDempty%EF%BF%BD_id%05%EF%BF%BD%EF%BF%BDbo%01%EF%BF%BDscores%EF%BF%BD%01%00%EF%BF%BDplayers%EF%BF%BD%EF%BF%BD%EF%BF%BDid%EF%BF%BD4%EF%BF%BDrating%02%EF%BF%BDusername%EF%BF%BDtest24%EF%BF%BD%EF%BF%BDid%EF%BF%BD1%EF%BF%BDrating%02%EF%BF%BDusername%EF%BF%BDtest21%EF%BF%BD_id%06%EF%BF%BD%EF%BF%BDbo%01%EF%BF%BDscores%EF%BF%BD%01%00%EF%BF%BDplayers%EF%BF%BD%EF%BF%BD%EF%BF%BDid%EF%BF%BD3%EF%BF%BDrating%02%EF%BF%BDusername%EF%BF%BDtest23%EF%BF%BD%EF%BF%BDid%EF%BF%BDempty%EF%BF%BD_id%07%EF%BF%BD%EF%BF%BDbo%01%EF%BF%BDscores%EF%BF%BD%01%00%EF%BF%BDplayers%EF%BF%BD%EF%BF%BD%EF%BF%BDid%EF%BF%BD2%EF%BF%BDrating%02%EF%BF%BDusername%EF%BF%BDtest22%EF%BF%BD%EF%BF%BDid%EF%BF%BDempty%EF%BF%BD_id%08%EF%BF%BD%EF%BF%BDmatches%EF%BF%BD%EF%BF%BD%EF%BF%BDbo%01%EF%BF%BDscores%EF%BF%BD%01%00%EF%BF%BDplayers%EF%BF%BD%EF%BF%BD%EF%BF%BDid%EF%BF%BD9%EF%BF%BDrating%02%EF%BF%BDusername%EF%BF%BDtest11%EF%BF%BD%EF%BF%BDid%EF%BF%BD8%EF%BF%BDrating%02%EF%BF%BDusername%EF%BF%BDtest28%EF%BF%BD_id%09%EF%BF%BD%EF%BF%BDbo%01%EF%BF%BDscores%EF%BF%BD%01%00%EF%BF%BDplayers%EF%BF%BD%EF%BF%BD%EF%BF%BDid%EF%BF%BD7%EF%BF%BDrating%02%EF%BF%BDusername%EF%BF%BDtest27%EF%BF%BD%EF%BF%BDid%EF%BF%BD6%EF%BF%BDrating%02%EF%BF%BDusername%EF%BF%BDtest26%EF%BF%BD_id%0A%EF%BF%BD%EF%BF%BDbo%01%EF%BF%BDscores%EF%BF%BD%01%00%EF%BF%BDplayers%EF%BF%BD%EF%BF%BD%EF%BF%BDid%EF%BF%BD5%EF%BF%BDrating%02%EF%BF%BDusername%EF%BF%BDtest25%EF%BF%BD%EF%BF%BDid%EF%BF%BD4%EF%BF%BDrating%02%EF%BF%BDusername%EF%BF%BDtest24%EF%BF%BD_id%0B%EF%BF%BD%EF%BF%BDbo%01%EF%BF%BDscores%EF%BF%BD%01%00%EF%BF%BDplayers%EF%BF%BD%EF%BF%BD%EF%BF%BDid%EF%BF%BD3%EF%BF%BDrating%02%EF%BF%BDusername%EF%BF%BDtest23%EF%BF%BD%EF%BF%BDid%EF%BF%BD2%EF%BF%BDrating%02%EF%BF%BDusername%EF%BF%BDtest22%EF%BF%BD_id%0C%EF%BF%BD%EF%BF%BDmatches%EF%BF%BD%EF%BF%BD%EF%BF%BDbo%01%EF%BF%BDscores%EF%BF%BD%01%00%EF%BF%BDplayers%EF%BF%BD%EF%BF%BD%EF%BF%BDid%EF%BF%BD9%EF%BF%BDrating%02%EF%BF%BDusername%EF%BF%BDtest11%EF%BF%BD%EF%BF%BDid%EF%BF%BD7%EF%BF%BDrating%02%EF%BF%BDusername%EF%BF%BDtest27%EF%BF%BD_id%0D%EF%BF%BD%EF%BF%BDbo%01%EF%BF%BDscores%EF%BF%BD%01%00%EF%BF%BDplayers%EF%BF%BD%EF%BF%BD%EF%BF%BDid%EF%BF%BD5%EF%BF%BDrating%02%EF%BF%BDusername%EF%BF%BDtest25%EF%BF%BD%EF%BF%BDid%EF%BF%BD3%EF%BF%BDrating%02%EF%BF%BDusername%EF%BF%BDtest23%EF%BF%BD_id%0E%EF%BF%BD%EF%BF%BDmatches%EF%BF%BD%EF%BF%BD%EF%BF%BDbo%01%EF%BF%BDscores%EF%BF%BD%EF%BF%BD%EF%BF%BD%EF%BF%BDplayers%EF%BF%BD%EF%BF%BD%EF%BF%BDid%EF%BF%BD9%EF%BF%BDrating%02%EF%BF%BDusername%EF%BF%BDtest11%EF%BF%BD%EF%BF%BDid%EF%BF%BD5%EF%BF%BDrating%02%EF%BF%BDusername%EF%BF%BDtest25%EF%BF%BD_id%0F%EF%BF%BDconfig%EF%BF%BD%EF%BF%BDtype%EF%BF%BDSINGLE_ELIMINATION%EF%BF%BDprizePlaces%02";
// encode from JS Object to MessagePack (Buffer)
  var buffer = msgpack.encode({"_id":"3fkw9qqs5ao","_stages":[{"matches":[{"bo":1,"scores":[1,0],"players":[{"id":"9","rating":2,"username":"test11"},{"id":"empty"}],"_id":1},{"bo":1,"scores":[1,0],"players":[{"id":"8","rating":2,"username":"test28"},{"id":"empty"}],"_id":2},{"bo":1,"scores":[1,0],"players":[{"id":"7","rating":2,"username":"test27"},{"id":"empty"}],"_id":3},{"bo":1,"scores":[1,0],"players":[{"id":"6","rating":2,"username":"test26"},{"id":"empty"}],"_id":4},{"bo":1,"scores":[1,0],"players":[{"id":"5","rating":2,"username":"test25"},{"id":"empty"}],"_id":5},{"bo":1,"scores":[1,0],"players":[{"id":"4","rating":2,"username":"test24"},{"id":"1","rating":2,"username":"test21"}],"_id":6},{"bo":1,"scores":[1,0],"players":[{"id":"3","rating":2,"username":"test23"},{"id":"empty"}],"_id":7},{"bo":1,"scores":[1,0],"players":[{"id":"2","rating":2,"username":"test22"},{"id":"empty"}],"_id":8}]},{"matches":[{"bo":1,"scores":[1,0],"players":[{"id":"9","rating":2,"username":"test11"},{"id":"8","rating":2,"username":"test28"}],"_id":9},{"bo":1,"scores":[1,0],"players":[{"id":"7","rating":2,"username":"test27"},{"id":"6","rating":2,"username":"test26"}],"_id":10},{"bo":1,"scores":[1,0],"players":[{"id":"5","rating":2,"username":"test25"},{"id":"4","rating":2,"username":"test24"}],"_id":11},{"bo":1,"scores":[1,0],"players":[{"id":"3","rating":2,"username":"test23"},{"id":"2","rating":2,"username":"test22"}],"_id":12}]},{"matches":[{"bo":1,"scores":[1,0],"players":[{"id":"9","rating":2,"username":"test11"},{"id":"7","rating":2,"username":"test27"}],"_id":13},{"bo":1,"scores":[1,0],"players":[{"id":"5","rating":2,"username":"test25"},{"id":"3","rating":2,"username":"test23"}],"_id":14}]},{"matches":[{"bo":1,"scores":[null,null],"players":[{"id":"9","rating":2,"username":"test11"},{"id":"5","rating":2,"username":"test25"}],"_id":15}]}],"config":{"type":"SINGLE_ELIMINATION","prizePlaces":2}});

// decode from MessagePack (Buffer) to JS Object
  const buffer2 = Buffer.from(buffer.toString());
  var data = msgpack.decode(buffer2); // => {"foo": "bar"}
  // console.log(data);
  console.log(buffer)
  console.log(buffer2)
  // console.log(buffer2.toString());

// if encode/decode receives an invalid argument an error is thrown
  //     const params = new URLSearchParams();
  //     params.append("key", "b4594ea22093");
  //     params.append("app_version", "690");
  //     params.append("session", "66edd3ba1667629992_1568915823-140394216bV_CevLTQAXRMiTBfjeI1g");
  //
  //     for (let i = 0; i < serts.length; ++i) {
  //       params.delete("key");
  //       params.append("key", serts[i]);
  //       const res = await fetch("https://api.ivi.ru/mobileapi/billing/v1/certificate/activate", { method: "POST", body: params});
  //       const json = await res.json();
  //       console.log(json.error.message.indexOf("банковской карты") === -1, serts[i], json.error.message);
  //       await sleep(1000);
  //     }
      // let body = { key: "df2352383e96", app_version: 870, session: "cf726f671624861417_1567306625-98984485w6UzahFPLbpfROBsQD3pBQ" };

      // const ip = proxys[i];
      // var agent = new HttpsProxyAgent(`http://${ip}`);
      //
      // const res = await fetch(`https://mamsy.ru/pizzarun/get-promocode/?partner=+johns&level=2`, <any>{ agent, timeout: 10000 }).catch(value => null);
      // if (res === null) { continue; }
      // let json;
      // try {
      //   json = await res.json();
      // } catch (e) {
      //   continue;
      // }
      // // const res = await fetch(`https://oauth.vk.com/token?grant_type=password&client_id=2274003&client_secret=hHbZxrka2uZ6jB1inYsH&username=${username}&password=${password}`, <any>{ timeout: 10000 });
      // fs.appendFileSync("papa/papajohns_l3.txt", `${json.data.promocode}\n`);
      // // console.log(a1, a2, await res.text());
      // // await sleep(2000);
    // }
  // }

}

export function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

(async () => {
  f(0, 0, []);
  // const check = new CheckCookie();
  // const proxys = await check.getProxys();
  // const max = 500;
  // const h = Math.ceil(proxys.length / max);
  // for (let i = 0; i < max; ++i) {
  //   f(i * h, i * h + h, proxys);
  // }
})();

// for (let i = 0; i < 100; ++i) {
// }
//
// }

// fetch("https://dodomarketing.azurewebsites.net/dodo-game/code.php", {"credentials":"omit","headers":{"accept":"*/*","accept-language":"uk,ru;q=0.9,en;q=0.8","cache-control":"no-cache","content-type":"application/x-www-form-urlencoded; charset=UTF-8","pragma":"no-cache","x-requested-with":"XMLHttpRequest"},"referrer":"https://dodomarketing.azurewebsites.net/dodo-game/game.php?api_url=https://api.vk.com/api.php&api_id=6841550&api_settings=0&viewer_id=529026403&viewer_type=0&sid=5a4dd827552928dae33fea340dd5c8d4c2a888a38b3f471bffac4b624060ec72876c5caf27a4f8db4aa1a&secret=cd015acb9c&access_token=149fe9e421ca62efab1337ac48f67393639f93f7d092b13864f6080a23b5165ca59c98e7644736491dc28&user_id=0&group_id=53484080&is_app_user=0&auth_key=c91ee145691d48dc371cdb8553e6de86&language=0&parent_language=0&is_secure=1&stats_hash=e012fd5229ed92a2ab&ads_app_id=6841550_52078e65d5e721b34b&referrer=unknown&lc_name=e6db1d61&sign=414fe6be26ce99921ce29e24b40188a71d71455ce373b05fcf95b8a3be5085e9&hash=","referrerPolicy":"no-referrer-when-downgrade","body":"type=tom_yam&score=2000&viewer=529026403&sign=414fe6be26ce99921ce29e24b40188a71d71455ce373b05fcf95b8a3be5085e9&sig=https%3A%2F%2Fapi.vk.com%2Fapi.php6841550052902640305a4dd827552928dae33fea340dd5c8d4c2a888a38b3f471bffac4b624060ec72876c5caf27a4f8db4aa1acd015acb9c149fe9e421ca62efab1337ac48f67393639f93f7d092b13864f6080a23b5165ca59c98e7644736491dc280534840800c91ee145691d48dc371cdb8553e6de86001e012fd5229ed92a2ab6841550_52078e65d5e721b34bunknowne6db1d61","method":"POST","mode":"cors"});
//
// const puppeteer = require('puppeteer');
//
// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://delivery-club.store/123');
//   const value = await page.evaluate(() => document.documentElement.innerHTML );
//   console.log(value);
//
//   await browser.close();
// })();
// let routes = [
//   '',
//   'products',
//   'how-use',
//   'products/ivi',
//   'products/goods',
//   'products/Mvideo',
//   'products/delivery-club',
//   'contact',
//   'operations',
//   // 'faq/goods'
// ];
// const fs = require("fs");
// const fetch = require('node-fetch');
//
// const startPath = '/var/www/html/magazine';
// (async ()=> {
//   for (let i = 0; i < routes.length; ++i) {
//     let route = routes[i];
//     const res = await fetch('http://localhost:3000/render?url=https://delivery-club.store/' + route);
//     // const res = await fetch('https://delivery-club.store/' + route);
//     const text = await res.text();
//     const regExp = new RegExp("<script[\\s\\S]*?>[\\s\\S]*?<\\/script>", "g");
//
//     console.log(text.replace(regExp, ""));
//
//     // const path = startPath + '/static/html/' + route + '.html';
//     // fs.writeFileSync(path, text);
//   }
// })();
