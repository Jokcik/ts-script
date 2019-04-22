import * as FS from 'fs';
import * as bluebird from 'bluebird';

const fs = bluebird.promisifyAll(FS);
export class Utils {
  public sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
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

  public readSyncFile(fileName: string): string[] {
    return fs.readFileSync(fileName).toString().split("\n");
  }

  public generateRandoms(start: string, postfix: string) {
    const prefix = start + Math.random().toString(16).substr(2, 8);
    return { result: prefix + postfix, prefix }
  }
  
  public generatePhoneFormatted(phone: string = "+7 (915) ") {
    phone += this.randomBetween(0, 9);
    phone += this.randomBetween(0, 9);
    phone += this.randomBetween(0, 9) + '-';
    phone += this.randomBetween(0, 9);
    phone += this.randomBetween(0, 9) + '-';
    phone += this.randomBetween(0, 9);
    phone += this.randomBetween(0, 9);

    return phone;
  }
}
