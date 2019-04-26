import {Utils} from "../utils/utils";
import {CustomRequest} from "../utils/request";
import {AuthSokolov} from "./auth";

const utils = new Utils();
const argv = process.argv;
console.log(argv);

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

    let emails = utils.readSyncFile("sokolov/auth.txt");
    emails = emails.slice(offset, count + offset);
    for (let email of emails) {
      await authSokolov(auth, email, request);
    }
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
      await game(i, request);
    }
  } catch (e) {
    console.log('GAME ERROR', e.message);
  }
}


export async function game(i, request) {
  const params = { ajax: 'Y', start: true };
  const req = await request.post("https://my.sokolov.ru/quest/", params, {}, "url", false);
  const start = req.data;
  if (start.error) {
    return console.log('START', i, start);
  }

  let opened = new Map<string, number>();
  let cellId = 0;
  let cellIdNext = -1;
  for (let i = 0; i < start.field.steps * 2; ++i) {
    const start = i % 2 === 0;

    const cell_id = cellIdNext !== -1 ? cellIdNext : cellId++;
    const params = { ajax: 'Y', cell_id };
    console.log(params);
    const result = await request.post("https://my.sokolov.ru/quest/", params, {}, "url", false);
    cellIdNext = -1;
    console.log(JSON.stringify(result.data));
    if (result.data.event && result.data.event[0] && result.data.event[0].type === 'win') {
      console.log('WIIIIIN');
      return;
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

    console.log('size: ' + opened.size);
    console.log('result: ', cellIdNext, cellId, cell_id, start, i);
  }

}
