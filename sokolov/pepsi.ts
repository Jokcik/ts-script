import {Utils} from "../utils/utils";
import {CustomRequest} from "../utils/request";

const utils = new Utils();

(async () => {
  let request = new CustomRequest();

  utils.parallel(10000, async (start, end, part) => {
    for (let i = start; i < end; ++i) {
      try {
        let res = await request.get("https://api.pepsi-football.dev-stage.ru/api/get-extra-promocode");
        utils.appendSyncFile('res-extra.txt', JSON.stringify(res.data));
        res = await request.get("https://api.pepsi-football.dev-stage.ru/api/get-simple-promocode");
        utils.appendSyncFile('res-simple.txt', JSON.stringify(res.data));
      } catch (e) {
        console.log(JSON.stringify(e.message));
        await request.torNewSession();
      }

    }}, 2)
})();
