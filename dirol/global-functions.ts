import {IFormatCode, IPrizeDirol} from "./format-codes";
import {Utils} from "../utils/utils";

export const date = '01-06';
export const path = 'dirol/';
export const scoresFile = `${path}${'input/'}result-${date}.txt`;
export const prizesFile = `${path}${'input/'}resultPrizes-${date}.txt`;

const utils = new Utils();

function getFullFilename(part: string) {
  return `${path}${'output/'}${part}-${date}`;
}
export function saveFormatterFileCode() {
  const codes = getFormatCodes();
  codes.sort((a, b) => +new Date(b.prize.updated_at) - +new Date(a.prize.updated_at));

  let obj = {};
  for (let code of codes) {
    if (obj[code.prize.prize.name]) {
      obj[code.prize.prize.name].push(code);
    } else {
      obj[code.prize.prize.name] = [ code ];
    }
  }

  for (let name in obj) {
    utils.writeSyncFile(getFullFilename(name), obj[name].map(value => `${value.prize.code} ${value.prize.updated_at} ${value.email}`));
  }
}

function getFormatCodes(): IFormatCode[] {
  const prizes = utils.readSyncFile(prizesFile);
  const usesPromocodes = utils.readSyncFile(`${path}/uses.txt`);
  const result: IFormatCode[] = [];

  for (let prizeStr of prizes) {
    const match = prizeStr.match(/(.*?@.*?)\. Prizes: (.*)/);
    if (!match) { continue; }
    const prizes: IPrizeDirol[] = JSON.parse(match[2]);
    for (let prize of prizes) {
      if (usesPromocodes.indexOf(prize.code.trim()) > -1) { continue; }
      if (match[1].indexOf("flashbox.5july.org") > -1 || match[1].indexOf("mailforspam.com") > -1) {
        continue;
        // console.log('code', usesPromocodes);
      }


      result.push({ email: match[1], prize });
    }
  }

  return result;
}
