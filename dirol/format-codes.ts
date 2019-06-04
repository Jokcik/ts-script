import {Utils} from "../utils/utils";
import {date, path, saveFormatterFileCode, scoresFile} from "./global-functions";

export interface IPrizeDirol {
  updated_at: string;
  code: string;
  pin: any;
  certificate: boolean;
  prize: {
    id: number;
    name: string;
    cost: number;
    icon: string;
  }
}

export interface IFormatCode {
  email: string;
  prize: IPrizeDirol;
}

const utils = new Utils();

(async () => {
  sortScore();
  // saveFormatterFileCode();

  process.exit();
})();

function sortScore() {
  const scores = utils.readSyncFile(scoresFile);
  let result: any[] = [];
  for (let score of scores) {
    const match = score.match(/ (.*?@.*?)\. Points: (.*)/);
    if (match) {
      result.push({ email: match[1], points: match[2] });
    }
  }

  result.sort((a, b) => b.points - a.points);
  utils.writeSyncFile(`${path}${'output/'}result${date}.txt`, result.map(value => `${value.email} ${value.points}`));
}


