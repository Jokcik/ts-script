import {URLSearchParams} from "url";
import * as fs from "fs";
import * as path from "path";
var msgpack = require("msgpack-lite");

(<any>global).fetch = require("node-fetch");
(<any>global).URLSearchParams = URLSearchParams;

const serts = [
  "a42baecdd465",
  "dc07ecf5ff38",
  "e76a89144c47",
  "a698d97943ea",
  "a026e5857fae",
  "0aa2af29ff46",
  "9f3ae74a91cd",
  "04a7a1cca301",
  "acc4f0355f91",
  "a29409692f7a",
  "30fb112cf3c4",
  "8c8406513b78",
  "b44eb093bdd4",
  "b1dde1c562a0",
  "1666ea1bf67a",
  "e0f44e62739c",
  "173ac9f4f747",
  "d189b1e487c6",
  "36cb0d3ad093",
  "d13699b1bb4a",
  "2cc5ba92c969",
  "d3a8b303235b",
  "0eadda572f36",
  "5b90d04aec27",
  "cdf74db7424f",
  "38429140fb43",
  "2808faf5ab3e",
  "f58c64118390",
  "d279961ad660",
  "b0efcf2060af",
  "91fc955bc09a",
  "8cf365a9e730",
  "f68b94754cca",
  "694ba0325d60",
  "8b13f178f100",
  "b0c8358f3916",
  "19c1cd341a34",
  "30594f7227ed",
  "6bce30176f64",
  "c3bc51bb4599",
  "12bf8d0cbfce",
  "f2ba65bade1c",
  "97da8a0999f0",
  "5e88209652e2",
  "cb25f99116d7",
  "cd1510dd8b5e",
  "466b2a13a80e",
  "d0dddb1104ed",
  "229b485adfa8",
  "012974b4ad0b",
  "ff31101acb5b",
  "03bccf3eefe2",
  "c0af44ca663d",
  "b362d96bdcde",
  "2a7c8bc59fd0",
  "47a2f0ff3d67",
  "4d538235ae92",
  "64b993fed13c",
  "fe8500637bf2",
  "9887de3f9512",
  "9f269ea10900",
  "81ff226336bc",
  "64b55a54bd8b",
  "9d1e4c1e7c72",
  "2fe4e07120b0",
  "88e8c43baffb",
  "89a7b804443f",
  "e42079a507d9",
  "ad6d9a8f3122",
  "0c21be0dba93",
  "0d3919aaef50",
  "f90c24a8b6e2",
  "3f4f9e1acfba",
  "694baa73bd44",
  "dd2b3a90f3f2",
  "feb70c73e46e",
  "35b7f0dc2d0d",
  "9f49959a1432",
  "e4e069edb933",
  "8296c65903e3",
  "ba0bea13aa4a",
  "98610503749c",
  "3ab287eb57a4",
  "a3379045ce13",
  "832367fb5732",
  "f2bf686e7257",
  "d74059c42388",
  "ebb98f2c2c44",
  "b0ad25c4167a",
  "859ea9c9566f",
  "0f7135691cbe",
  "fc4cc370751a",
  "774b10207ab5",
  "0d491170ca3e",
  "01140e8b9cdd",
  "ab424bb43d8d",
  "178f8afd7d98",
  "56538cdb3ce2",
  "eb52e7e659c0",
  "c9b424abb338",
  "987bcc9c9215",
  "264c00d549cc",
  "d4c8d1d12ac7",
  "01959bc32dc7",
  "c1398d34e852",
  "65968bd55688",
  "10c04064d97e",
  "d3690a7f608a",
  "7f42fe9b7cc3",
  "b045c24a427f",
  "ef461befd6d9",
  "bc5289f50f37",
  "d44e3bcc3c36",
  "ae7afb78fe9a",
  "cbf1e42263f8",
  "b8b0c46631ed",
  "e0e6571aed0e",
  "6de9df60bc6a",
  "34ddcf0685ae",
  "990f1a3cc1ec",
  "2e69b6b2d3b3",
  "caf190be3996",
  "36e34c3e8aff",
  "c6221ce4bb40",
  "cdef1b439d3e",
  "9925aab7399e",
  "8342d8a67708",
  "024c35bc63b6",
  "51d2c42e47b4",
  "4bac66b00f20",
  "1cf19d47e79f",
  "b855cbae297b",
  "6dd674801b5a",
  "75065e24b20f",
  "91e5bbcb163f",
  "3eb02e45adad",
  "a787620ee16b",
  "2489b80a7ef7",
  "44d9f40ed0a3",
  "5b04e8f93a84",
  "8e2873775753",
  "ef912236a13c",
  "b68c4d6ecfdd",
  "88d5372914c5",
  "7877d52d7baf",
  "c11dd685f1ee",
  "2cd6c7772960",
  "5f49eb1fe8fc",
  "def8130ee0bd",
  "61369324b222",
  "eda8906a2c8a",
  "182de7fa3fa8",
  "39c76d7a0e78",
  "60e24ef159b9",
  "bd14e3dbcbe4",
  "3ed4280d65bc",
  "e7fb2646a5fc",
  "7c9d508fc278",
  "d361bb484a22",
  "94e55338f71a",
  "7dae2d54862c",
  "c427ea48048a",
  "30d404bb6749",
  "b1669b79ed03",
  "211587bc0e0e",
  "cc73647fc081",
  "0ae543fb3fd8",
  "d2e9c50c9eaa",
  "1c75731f0600",
  "3f937f54f5f4",
  "9f6151b3651e",
  "8d4f80daed82",
  "e889eb15aec3",
  "18cc1698dc24",
  "0a73c6b2acdd",
  "8a5a540bf59d",
  "48c984115b95",
  "2b1b7886f6c9",
  "48413bf3872e",
  "86f87ea5e422",
  "2f8d25750bc9",
  "c0561ff1c68e",
  "26e9c31553e2",
  "b67d1675e000",
  "e1ebf4b42f1a",
  "453557d800bc",
  "8fc36df63252",
  "fb0d50def707",
  "429b9e4d8db3",
  "936d4752addb",
  "f6e179c7cc37",
  "99ada9a138fd",
  "d2160c2594f2",
  "c5db72b2df1f",
  "921fc91c785d",
  "64b24550a3d1",
  "b097819924b8",
  "d0d55228f172",
  "b30efdd278c1",
  "1c704a53ac48",



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
