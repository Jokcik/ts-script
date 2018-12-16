import * as SMSActiv from 'node-sms-activate-api';

// console.log(new SMSActiv('API_KEY'));

export class SmsActivate {
  private API_KEY = "38A3ccc0cdd208b3e836c962d13e4db6";
  private smsactivate = new SMSActiv(this.API_KEY);

  constructor() {
  }

  public getBalance() {
    return this.smsactivate.getBalance();
  }

  public getOtherNumber() {
    return this.smsactivate.getNumber('ot');
  }

  public async getCode(id: string) {
    try {
      const timeout = setTimeout(() => this.setStatus(id, -1), 1000 * 60 * 1);
      const result = await this.smsactivate.getCode(id);
      clearTimeout(timeout);

      return result;
    } catch (e) {
      throw new Error('getCode error' + e.message);
    }
  }

  public setStatus(id: string, status: number) {
    return this.smsactivate.setStatus(id, status);
  }
}

const SIMSms = require('node-simsms-api');
// const simsms = new SimSms('API_KEY');

export class SimSms {
  private API_KEY = "SMRrTIpHctZ9Y3wjEJPbo6LNHacn4f";
  private sms = new SIMSms(this.API_KEY);

  constructor() {
  }

  public getBalance() {
    return this.sms.get_balance();
  }

  public getOtherNumber() {
    return this.sms.get_number('Любой другой');
  }

  public async getCode(id: string) {
    try {
      const timeout = setTimeout(() => this.setStatus(id, -1), 1000 * 60 * 1);
      let result;

      while (true) {
        try {
          result = await this.sms.get_sms(id, 'Любой другой');
          break;
        } catch (e) {
          console.log(e.message);
        }
        await sleep(1000);

      }
      clearTimeout(timeout);

      console.log(result);
      return result;
    } catch (e) {
      throw new Error('getCode error' + e.message);
    }
  }

  public setStatus(id: string, status: number) {
    if (status === -1) {
      return this.sms.denial();
    }

    // return this.sms.setStatus(id, status);
  }
}

export function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}