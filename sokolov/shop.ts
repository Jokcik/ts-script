import {CustomRequest} from "../utils/request";
import {AuthSokolov} from "./auth";
import {Utils} from "../utils/utils";

const utils = new Utils();

(async () => {
  let emails = utils.readSyncFile("sokolov/auth.txt").filter(value => !!value);
  utils.parallel(emails.length, (async (start, end) => {
    console.log(new Date(), 'START', start, end, );
    const request = new CustomRequest({}, false);
    const auth = new AuthSokolov(request);

    for (let i = start; i <= end; ++i) {
      await auth.auth(emails[i], "123456");
      // if (start === 0) {
      //   await request.torNewSession();
      // }

      console.log(new Date(), 'PARALLEL_START_EMAIL', emails[i]);
      await promo(request);
    }
    console.log(new Date(), 'END', start, end);
  }), 1);
})();

async function promo(request: CustomRequest) {
  const dataJson = { id: 10, ajax: "Y" };
  for (let i = 0; i < 10; ++i) {
    console.log(i);
    const res = await request.post("https://my.sokolov.ru/contest/quest/shop/", dataJson, {}, "url", false);
    const data = res.data;

    if (!(data && data.event && data.event[0] && data.event[0].type.indexOf("Поздравляем") > -1)) {
      return;
    }
  }
}
