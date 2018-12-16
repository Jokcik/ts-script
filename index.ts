import {URLSearchParams} from 'url';
import * as opt from 'optimist';
import {CheckCookie} from "./check-cookie";
import {SmsSenderDelivery} from "./utils";

(<any>global).fetch = require("node-fetch");
(<any>global).URLSearchParams = URLSearchParams;

const argv = opt
  .usage('Usage: $0 --cookie [boolean] --service [smsactivate/simsms]')
  .default('cookie', 'true')
  .default('service', 'smsactivate')
  .demand(['cookie', 'service'])
  .argv;

(async () => {
  const isCookie = argv.cookie;
  const service = argv.service;

  if (isCookie === 'true') {
    const cookie = new CheckCookie();
    console.log(cookie);
    cookie.run();

    return;
  }

  const sender = new SmsSenderDelivery();
  for (let i = 0; i < 20000; ++i) {
    console.log(service === 'smsactivate' ? 1 : 0);
    await sender.run(service === 'smsactivate' ? 1 : 0);
  }

  process.exit();
})();

