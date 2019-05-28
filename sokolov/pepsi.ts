import {Utils} from "../utils/utils";
import {CustomRequest} from "../utils/request";

const utils = new Utils();

(async () => {
  let request = new CustomRequest({ timeout: 10000,  }, false);
  const proxys = utils.readSyncFile("utils/proxy_new.txt");
  let i = 0;

  utils.parallel(100000, async (start, end, part) => {
    let httpsAgent = utils.getHttpsAgent(proxys[i++]);
    for (let i = start; i < end; ++i) {
      try {
        let res = await request.get("https://api.pepsi-football.dev-stage.ru/api/get-extra-promocode", { httpsAgent });
        utils.appendSyncFile('res-extra.txt', JSON.stringify(res.data));
        // res = await request.get("https://api.pepsi-football.dev-stage.ru/api/get-simple-promocode");
        // utils.appendSyncFile('res-simple.txt', JSON.stringify(res.data));
      } catch (e) {
        console.log(proxys[i], JSON.stringify(e.message));
        httpsAgent = utils.getHttpsAgent(proxys[i++]);

        utils.saveSyncFile("utils/proxy_new.txt", proxys.slice(i).join('\n'));
        // await request.torNewSession();
      }

    }}, 1)
})();
