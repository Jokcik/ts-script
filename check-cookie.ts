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
  // private readFileName: string = 'cookie-fast.txt';
  private writeFileName: string = 'cook.txt';
  private fileHandle: string;
  private rd: Interface;

  private fileHandleAccess: string;
  private fileHandleInvalid: string;
  private fileHandleError: string;

  private cookieAccess: string = 'cookie/access.txt';
  private cookieInvalid: string = 'cookie/invalid.txt';
  private cookieError: string = 'cookie/error.txt';


  constructor() {
    this.rd = readline.createInterface({
      input: fs.createReadStream(this.readFileName),
      console: false
    });

    this.open();
  }

  private async open() {
    this.fileHandle = await fs.openAsync(this.writeFileName, "a+");
    this.fileHandleAccess = await fs.openAsync(this.cookieAccess, "a+");
    this.fileHandleInvalid = await fs.openAsync(this.cookieInvalid, "a+");
    this.fileHandleError = await fs.openAsync(this.cookieError, "a+");
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
        await sleep(20000);
      }
    });

    return;
  }

  public async writeCookie(cookie: string) {
    console.log('write', cookie);
    return;
  }

  public async write(cookie: string, status: 0 | 1 | -1) {
    switch (status) {
      case -1:
        await fs.writeAsync(this.fileHandleInvalid, `${cookie}\n`, null, 'ascii');
        break;
      case 0:
        await fs.writeAsync(this.fileHandleError, `${cookie}\n`, null, 'ascii');
        break;
      case 1:
        await fs.writeAsync(this.fileHandleAccess, `${cookie}\n`, null, 'ascii');
        break;
    }

    return;
  }
}

export const cookieService: CheckCookie = new CheckCookie();