import * as bluebird from 'bluebird';
import * as FS from 'fs';
import {Interface} from "readline";
import {DeliveryNewYear} from "./delivery-new-year";
import {sleep} from "./sms-activate";
import {sendKopilkaAnd} from "./utils";

const fs = bluebird.promisifyAll(FS);
const readline = require('readline');

export class CheckCookie {
  private readFileName: string = 'cookie.txt';
  private writeFileName: string = 'cook.txt';
  private fileHandle: string;
  private rd: Interface;

  constructor() {
    this.rd = readline.createInterface({
      input: fs.createReadStream(this.readFileName),
      console: false
    });

    this.open();
  }

  private async open() {
    this.fileHandle = await fs.openAsync(this.writeFileName, "a+");
  }

  public run() {
    const delivery = new DeliveryNewYear();
    const cookies = [];
    this.rd.on('line', line => cookies.push(line));
    this.rd.on('close', async () => {
      for (let i = 0; i < cookies.length; ++i) {
        try {
          await sendKopilkaAnd(delivery, cookies[i]);
        } catch (e) {
        }
        await sleep(1000);
      }
    });

    return;
  }

  public async writeCookie(cookie: string) {
    await fs.writeAsync(this.fileHandle, `${cookie}\n`, null, 'ascii');
    console.log('write', cookie);
    return;
  }
}