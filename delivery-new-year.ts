export class DeliveryNewYear {
  private baseurl: string = 'https://belgorod.delivery-club.ru/ajax/';

  private codeUrl: string = 'user_otp/';
  private loginUrl: string = 'login_otp/';
  private kopilkaUrl: string = 'kopilka/';

  public sendCode(phone: string) {
    const params = new URLSearchParams();
    params.append('phone', phone);

    try {
      return fetch(`${this.baseurl}${this.codeUrl}`, { method: 'POST', body: params })
    } catch (e) {
      console.log('sendCode ERROR', e);
      throw new Error('sendCode ERROR' + JSON.stringify(e));
    }
  }

  public login(opt: string, request_id: string, cookie) {
    const params = new URLSearchParams();
    params.append('otp', opt);
    params.append('request_id', request_id);

    console.log(opt, request_id, cookie);

    try {
      return fetch(`${this.baseurl}${this.loginUrl}`, { method: 'POST', body: params, headers: { cookie, 'x-csrf-token': 'veeS_bf6J1um9SAHQmjv3iPT6B1KhvRtCDJGZb6U4Tc' } });
    } catch (e) {
      console.log('login ERROR', e);
      throw new Error('login ERROR' + JSON.stringify(e));
    }
  }

  public kopilka(email: string, cookie: string) {
    const params = new URLSearchParams();
    params.append('email', email);

    try {
      return fetch(`${this.baseurl}${this.kopilkaUrl}`, { method: 'POST', body: params, headers: { cookie } })
    } catch (e) {
      console.log('kopilka ERROR', e);
      throw new Error('kopilka ERROR' + JSON.stringify(e));
    }

  }
}