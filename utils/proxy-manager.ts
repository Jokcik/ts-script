import {Utils} from "./utils";

const utils = new Utils();

export class ProxyManager {

  constructor() {
  }

  public getProxy(): string[] {
    return utils.readSyncFile('utils/proxy.txt');
  }
}
