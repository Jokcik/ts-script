import * as FS from 'fs';
import * as bluebird from 'bluebird';
import * as minimist from 'minimist';
import * as tunnel from "tunnel";

const fs = bluebird.promisifyAll(FS);
export class Utils {
  private args = minimist(process.argv.slice(2));

  public sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  public getHttpsAgent(proxy: string) {
    const [ip, port] = proxy.split(':');
    return tunnel.httpsOverHttp(<any>{
      proxy: {
        host: ip,
        port: +port,
      },
    });
  }

  public getRegExpToken() {
    return new RegExp("name=\"_token\" value=\"(.*?)\"");
  }

  public randomBetween(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  }

  public appendSyncFile(fileName: string, data: string, newLine: boolean = true) {
    if (newLine) { data += "\n"; }
    return fs.appendFileSync(fileName, data);
  }

  public saveSyncFile(fileName: string, data: string) {
    return fs.writeFileSync(fileName, data);
  }

  public readSyncFile(fileName: string): string[] {
    return fs.readFileSync(fileName).toString().split("\n");
  }

  public generateRandoms(start: string, postfix: string) {
    const prefix = start + Math.random().toString(16).substr(2, 8);
    return { result: prefix + postfix, prefix }
  }

  public getArg(key: string) {
    return this.args[key];
  }

  public parallel(count: number, func: (start: number, end: number, part: number) => any, threads: number = 20) {
    threads = threads > count ? count : threads;
    const h = Math.ceil(count / threads);
    for (let i = 0; i < count; ++i) {
      let start = i * h;
      let end = start + h - 1;
      if (end >= count) { end = count - 1; }
      if (start >= count) { return ; }

      func(start, end, i);
    }
  }
  
  public generatePhoneFormatted(phone: string = "+7 (915) ", seporator = '-') {
    phone += this.randomBetween(0, 9);
    phone += this.randomBetween(0, 9);
    phone += this.randomBetween(0, 9) + seporator;
    phone += this.randomBetween(0, 9);
    phone += this.randomBetween(0, 9) + seporator;
    phone += this.randomBetween(0, 9);
    phone += this.randomBetween(0, 9);

    return phone;
  }
}
