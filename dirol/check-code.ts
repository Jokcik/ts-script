import {Utils} from "../utils/utils";

const utils = new Utils();


(async () => {
  // const arr = "0123456789abcdefghijklmnopqrstuvwxyz".toUpperCase();
  const arr = [ '1', '3', '4', 'A', 'B', 'C', 'D', 'E', 'F', 'H', 'K', 'M', 'N', 'P', 'Q', 'R', 'T', 'W', 'X', 'Z' ];
  const system = arr.length;

  const promos = [ 'A1111111', ...utils.readSyncFile('dirol/promos.txt') ];
  const result: { sum: number, sum2: number, promo: string, number: string }[] = [];
  let obj = {};
  let v = {};
  for (let promo of promos) {
    let sum = 0;
    let sum2 = 0;
    let number = '';
    for (let i = 0; i < promo.length; ++i) {
      let par = (arr.indexOf(promo[promo.length - 1 - i]) + 1) * Math.pow(system, i);
      sum += par;
      // sum2 += arr.indexOf(promo[promo.length - 1 - i]) + 1;
      number += " " + format(arr.indexOf(promo[i]));
    }

    if (obj[promo.substr(5)]) {
      v[promo] = v[promo] ? v[promo] + 1 : 1;
      console.log(promo, obj[promo.substr(4)])
    }

    obj[promo.substr(4)] = promo;
    result.push({ sum, promo, number, sum2 });
  }

  // console.log(v);

  let array = [];
  let step = 1;
  for (let i = 0; i < result.length - step; i += step) {
    let start = result[0];
    let end = result[i + step];

    let newSum = end.sum - start.sum;
    // array.push({ sum: format(newSum, 8), promo1: end.promo + ":" + end.number, promo2: start.promo + ":" + start.number });
    array.push({ sum: newSum, promo1: end.promo + ":" + end.number, promo2: start.promo + ":" + start.number, sum2: start.sum2 });
  }

  // array.sort((a, b) => a.sum - b.sum || (a.promo2.charCodeAt(7)) - (b.promo2.charCodeAt(7)));
  array.sort((a, b) => a.sum - b.sum || a.sum2 - b.sum2);
  // array.sort((a, b) => a.sum2 - b.sum2);
  array.forEach(value => console.log(JSON.stringify(value)));
})();


function format(value: number, max = 2) {
  let str = value.toString();
  if (str.length !== 8) {
    let value = '';
    for (let i = 0; i < max - str.length; ++i) {
      value += " "
    }
    return value + str;
  }

  return str;
}


// source=2d3ae5476e3cceda0335edb314d348eac4bebb59a8cb2d9ebe29fd94e1bc5e42a%3A2%3A%7Bi%3A0%3Bs%3A6%3A%22source%22%3Bi%3A1%3Bs%3A15%3A%224newsletter_ncp%22%3B%7D; _csrf=6b9b3e7f8d35e425308afc4cabb9837d936ebf7ed3bef88f92bdd7537630531da%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%22eIF9nrCogc-TKqiRMMf-FZZwP1cZF7sT%22%3B%7D; _ga=GA1.2.690684959.1556141085; _gid=GA1.2.1917942343.1556141085; _ym_uid=1556141085792625177; _ym_d=1556141085; _ym_isad=2; checkAge=1; PHPSESSIDMGN=11tpaiti7vqojorom1s561ccfl; _identity_mgn=b78c6dc85b692ff7d54188380bfcb219031efa0fa46fc4efcc440aa428381a69a%3A2%3A%7Bi%3A0%3Bs%3A13%3A%22_identity_mgn%22%3Bi%3A1%3Bs%3A49%3A%22%5B7278%2C%2226BkoC_NYmlsnAkxR9KRWNlHi7sk4iVp%22%2C2592000%5D%22%3B%7D; checkLogoName=663b2cd13c8b31697ee3522f8472cd271f40a3c086ac5b973b49c5447aaf513da%3A2%3A%7Bi%3A0%3Bs%3A13%3A%22checkLogoName%22%3Bi%3A1%3Bs%3A44%3A%22484d5793f24d0205d0e1d7f239f1784529ef1189.png%22%3B%7D; checkLogo=211fd924a2f594e25e1045b66d6349fe4bac02ac9e45b7a91e60fac7a17f34e3a%3A2%3A%7Bi%3A0%3Bs%3A9%3A%22checkLogo%22%3Bi%3A1%3Bs%3A31%3A%227dc7ee09724bc66e6cfe343a7e7.png%22%3B%7D; tmr_detect=0%7C1556142933759
// source=2d3ae5476e3cceda0335edb314d348eac4bebb59a8cb2d9ebe29fd94e1bc5e42a%3A2%3A%7Bi%3A0%3Bs%3A6%3A%22source%22%3Bi%3A1%3Bs%3A15%3A%224newsletter_ncp%22%3B%7D; _csrf=6b9b3e7f8d35e425308afc4cabb9837d936ebf7ed3bef88f92bdd7537630531da%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%22eIF9nrCogc-TKqiRMMf-FZZwP1cZF7sT%22%3B%7D; _ga=GA1.2.690684959.1556141085; _gid=GA1.2.1917942343.1556141085; _ym_uid=1556141085792625177; _ym_d=1556141085; _ym_isad=2; checkAge=1; PHPSESSIDMGN=11tpaiti7vqojorom1s561ccfl; _identity_mgn=b78c6dc85b692ff7d54188380bfcb219031efa0fa46fc4efcc440aa428381a69a%3A2%3A%7Bi%3A0%3Bs%3A13%3A%22_identity_mgn%22%3Bi%3A1%3Bs%3A49%3A%22%5B7278%2C%2226BkoC_NYmlsnAkxR9KRWNlHi7sk4iVp%22%2C2592000%5D%22%3B%7D; checkLogoName=663b2cd13c8b31697ee3522f8472cd271f40a3c086ac5b973b49c5447aaf513da%3A2%3A%7Bi%3A0%3Bs%3A13%3A%22checkLogoName%22%3Bi%3A1%3Bs%3A44%3A%22484d5793f24d0205d0e1d7f239f1784529ef1189.png%22%3B%7D; checkLogo=211fd924a2f594e25e1045b66d6349fe4bac02ac9e45b7a91e60fac7a17f34e3a%3A2%3A%7Bi%3A0%3Bs%3A9%3A%22checkLogo%22%3Bi%3A1%3Bs%3A31%3A%227dc7ee09724bc66e6cfe343a7e7.png%22%3B%7D; _gat_gtag_UA_43489348_22=1; tmr_detect=0%7C1556143576112

