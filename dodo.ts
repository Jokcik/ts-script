import {URLSearchParams} from "url";
import * as fs from "fs";
import {emails, values} from "./config";
import {CheckCookie} from "./check-cookie";
import * as path from "path";
var msgpack = require("msgpack-lite");

(<any>global).fetch = require("node-fetch");
(<any>global).URLSearchParams = URLSearchParams;

const serts = [
  "82d78397ad96",
  "f82977936095",
  "df19d08ddfaf",
  "0e9a8943f90d",
  "9b1e788d94fa",
  "7104b179cde1",
  "402eae074079",
  "95a806c9f64e",
  "1ab4ba7547dc",
  "866b2dc8aa73",
  "e7df6f0f62c9",
  "8aafd7f3f823",
  "fff1880140cf",
  "1863f608feba",
  "ef7323671a0e",
  "a4df72675649",
  "e15b77d2fff2",
  "8359e9cb5569",
  "bfde7b1cca42",
  "c0501bf08c1f",
  "bda20301fbad",
  "67fc5af0dfb7",
  "1b2da8d64822",
  "6159b1b0d295",
  "bec70555ca30",
  "e0c69d4f5b20",
  "deaad45a3a7b",
  "4100c412f8ca",
];

async function card() {
  const res = await fetch("https://statsroyale.com/api/cards");
  const jsons = await res.json();

  for (let i = 0; i < jsons.length; ++i) {
    let json = jsons[i];
    const data = { id: i + 1, title: json.name, image: json.icon, cost: json.cost }
    console.log(JSON.stringify(data) + ',');
    // const text = `https://cdn.statsroyale.com/images/cards/full/${json.icon}.png`;
    // await download(text);
  }
}

async function checkIvi(serts: string[]) {
  let results = [];

  const params = new URLSearchParams();
  params.append("app_version", "870");
  params.append("session", "66edd3ba1667629992_1568915823-140394216bV_CevLTQAXRMiTBfjeI1g");

  for (let i = 0; i < serts.length; ++i) {
    params.delete("key");
    params.append("key", serts[i]);
    const res = await fetch("https://api.ivi.ru/mobileapi/billing/v1/certificate/activate", { method: "POST", body: params});
    const json = await res.json();
    json.promo = serts[i];

    results.push(json);
    console.log(i, serts[i], json.error.message);
    await sleep(1000);
  }

  return results;
}

checkIvi(serts);
// card();

const HttpsProxyAgent = require('https-proxy-agent');

function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

// (async() => {
//   const cookie = "_ga=GA1.3.1677643426.1544861703; flocktory-uuid=d0f23c23-b8ac-4e18-92ed-4fadfa4dea4a-7; dcse=0; _delivery_visitor_cookie=%7B%22id%22%3A%220f33988a9c0c8186ef9ec2c38b08c4c5fa93749324056adaa42b407bef6d5717%22%2C%22timestamp%22%3A1546155805%2C%22entrance_url%22%3A%22%252F%22%2C%22referer_url%22%3A%22%22%2C%22user_agent%22%3A%22Mozilla%252F5.0%2B%2528Macintosh%253B%2BIntel%2BMac%2BOS%2BX%2B10_14_2%2529%2BAppleWebKit%252F537.36%2B%2528KHTML%252C%2Blike%2BGecko%2529%2BChrome%252F70.0.3538.102%2BYaBrowser%252F18.11.1.716%2BYowser%252F2.5%2BSafari%252F537.36%22%7D; _ga=GA1.2.1454501850.1546155806; __zlcmid=q7hu5pMVE2s4ye; cto_lwid=5bedd563-7079-44d5-a9c8-815430846fc8; __sonar=15154050455466251028; visitor_identifier=3cb43435-87c5-4469-b33f-5e83b3c37abf; last_cpa_source=advcake_trackid; gdeslon.ru.user_id=2ad04650-7ece-4f91-b5d1-a59ff973b442; _fbp=fb.1.1549462838897.1999990236; isTrustedDeliveryBannerShowed=true; PHPSESSID=spudvadm4d7ss68j09cj5ig2b1; user_unic_ac_id=59761267-408c-c74e-2244-423f22f59f47; FD_ab_group=b; _gid=GA1.2.1237998867.1553153534; _gid=GA1.3.1237998867.1553153534; smartbanner-full-shown=true; _delivery_menu_fullsize_photo_experiment=1; _gat_UA-8804540-4=1; tmr_detect=1%7C1553195991429; auth_check=30cd29f9";
//   setInterval(() => f(cookie), 30000);
// })();

async function f(cookie) {
  try {
    const res = await fetch("https://belgorod.delivery-club.ru/ajax/bonus/", { headers: { cookie } });
    const json = await res.json();
    if (json.payload.errors[0].message.indexOf("извините, предложение ограничен") > -1) {
      return console.log(json.payload.errors[0].message);
    } else {
      throw new Error(json);
    }
  } catch (e) {
    await sendMessage(JSON.stringify(e.message));
    // console.log('error', JSON.stringify(e.message));
  }
}

async function sendMessage(message: string) {
  console.log(message);
  let tokenCrierbot: string = 'qCsQDwFmi8EzjG2ZBTL0K1MRUkHOygNX';
  return await fetch(`http://crierbot.appspot.com/${tokenCrierbot}/send?message=${encodeURIComponent(message)}`);
}

export function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}


async function download(url: string) {
  const fileName = url.split('/')[url.split('/').length - 1];
  const res = await fetch(url);
  await new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream(`${path.join(process.cwd(), 'clash', fileName)}`);
    (<any>res.body).pipe(fileStream);
    (<any>res.body).on("error", (err) => {
      reject(err);
    });
    fileStream.on("finish", function() {
      resolve();
    });
  });
}
