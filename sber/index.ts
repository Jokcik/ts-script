import {Utils} from "../utils/utils";

const crypto = require('crypto');
const httpsProxyAgent = require('https-proxy-agent');
const agent = new httpsProxyAgent('http://80.68.5.234:8080');

import {CustomRequest} from "../utils/request";

const utils = new Utils();
const request = new CustomRequest({ httpAgent: agent }, false);
// const request = new CustomRequest({ proxy: <any>{ host: '95.167.143.11', port: '8080' } }, false);

(async() => {
  // const values = utils.readSyncFile('okko.txt');
  // const unique = new Set([ ...values ]);
  //
  // for (let un of unique.values()) {
  //   utils.appendSyncFile('okko_unique.txt', un);
  // }
  utils.parallel(20, async () => {
    for (let i = 0; i < 1; ++i) {
      const hash = Math.random().toString(16).substr(2, 8);
      const token = crypto.createHash('sha256').update(hash + 'sber.id').digest('hex');
      const prod = 'okko';

      const res = await request.get(`https://www.sberbank.ru/promocodes?hash=${hash}&token=${token}&prod=${prod}`);
      const data = res.data;
      utils.appendSyncFile('okko.txt', data.code);
      console.log(i, data.code, hash, token);

      // await utils.sleep(100);
    }
  });


})();
