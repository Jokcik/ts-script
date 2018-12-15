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
      const timeout = setTimeout(() => this.setStatus(id, -1), 1000 * 60 * 2);
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

