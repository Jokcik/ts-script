import {Utils} from "../utils/utils";
import {CustomRequest} from "../utils/request";
import {AuthSokolov} from "./auth";

const utils = new Utils();
const argv = process.argv;

(async () => {
  const request = new CustomRequest({}, true);
  const auth = new AuthSokolov(request);

  if (utils.getArg("reg")) {
    const count = utils.getArg("count");
    for (let i = 0; i < count; ++i) {
      try {
        await register(auth);
      } catch (e) {
        console.log(e.message);
      }
    }
  }

  if (utils.getArg("game")) {
    const offset = utils.getArg("offset") || 0;
    const count = utils.getArg("count");

    let emails = utils.readSyncFile("sokolov/auth.txt").filter(value => !!value);
    emails = +count ? emails.slice(offset, count + offset) : emails;
    utils.parallel(emails.length, (async (start, end) => {
      console.log(new Date(), 'START', start, end, );
      const request = new CustomRequest({}, true);
      const auth = new AuthSokolov(request);

      for (let i = start; i <= end; ++i) {
        if (start === 0) {
          await request.torNewSession();
        }

        console.log(new Date(), 'PARALLEL_START_EMAIL', emails[i]);
        await authSokolov(auth, emails[i], request);
      }
      console.log(new Date(), 'END', start, end);
    }));
  }
})();

async function register(auth: AuthSokolov) {
  const { result: username } = utils.generateRandoms("olegt623adf+e", '@gmail.com');
  const phone = utils.generatePhoneFormatted("7915", "");

  let res = await auth.register(username, phone);
  if (res.data.success) {
    console.log(JSON.stringify(res.data));
    utils.appendSyncFile("sokolov/auth.txt", username)
  }
}

async function authSokolov(auth: AuthSokolov, email: string, request: CustomRequest) {
  try {
    await auth.auth(email, "123456");
    for (let i = 0; i < 5; ++i) {
      const res = await game(i, request);
      if (res && res.error) {
        return console.log('ERROR', email, JSON.stringify(res.error));
      }

      if (res) { console.log('WIIIIN', email); }
    }
  } catch (e) {
    console.log('GAME ERROR', e.message);
  }
}


export async function game(i, request) {
  const params = { ajax: 'Y', start: true };
  const req = await request.post("https://my.sokolov.ru/quest/", params, {}, "url", false);
  const start = req.data;
  console.log("START_GAME", JSON.stringify(start));
  if (start.error) {
    return start;
  }

  let opened = new Map<string, number>();
  let cellId = 0;
  let cellIdNext = -1;
  for (let i = 0; i < start.field.steps * 2; ++i) {
    const start = i % 2 === 0;

    const cell_id = cellIdNext !== -1 ? cellIdNext : cellId++;
    const params = { ajax: 'Y', cell_id };
    // console.log(params);
    const result = await request.post("https://my.sokolov.ru/quest/", params, {}, "url", false);
    cellIdNext = -1;
    // console.log(JSON.stringify(result.data));
    if (result.data.event) {
      if (result.data.event[0] && result.data.event[0].type === 'win') {
        console.log('WIIIIIN');
        return true;
      }
      console.log('Что-то пошло не так', JSON.stringify(result.data.event));
      return false;
    }

    const openedReq = result.data.field.opened;
    const fixed = result.data.field.fixed;

    for (let fix of fixed) {
      opened.delete(fix.code);
    }

    for (let value of openedReq) {
      if (opened.has(value.code) && opened.get(value.code) !== value.id) {
        cellIdNext = opened.get(value.code);
      }
    }

    for (let value of openedReq) {
      opened.set(value.code, value.id);
    }

    // console.log('size: ' + opened.size);
    // console.log('result: ', cellIdNext, cellId, cell_id, start, i);
  }

}
