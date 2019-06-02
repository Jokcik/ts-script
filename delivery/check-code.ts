import {URLSearchParams} from "url";
import {Utils} from "../utils/utils";

(<any>global).fetch = require("node-fetch");
(<any>global).URLSearchParams = URLSearchParams;

export interface PromoResult {
  success: number;
  error: string;
  promo: string;
  data: {
    total: number;
    overall: number;
    promo_discount: number;
    bonuses: number,
    promo: {
      title: string,
      score: number,
      type: string,
      offline:boolean;
    }
  }
}

let agent;
const utils = new Utils();

export class CheckCodeDelivery {
  private cookie: string = 'PHPSESSID=spudvadm4d7ss68j09cj5ig2b1';
  private token: string;

  public async checkPromo(promos: string[]): Promise<PromoResult[]> {
    let cookie = this.cookie;
    const affraidId = '35236'; // '36648'; // '9235';
    const productId = '307512081'; // '304088247'; // '303420034';
    const cost = '1000'; // '600'; // 390
    const openhourFrom = '12:00'; //'10:00'; //'11:00';
    const openhourTo = '23:00'; // '23:30'; // '23:59';
    const deliveryTimePreorder = "1"; // 2

    const phone2 = '928';
    const phone1 = '1065013';

    if (!this.token) {
      const req = await fetch("https://belgorod.delivery-club.ru", <any>{headers: { cookie }, agent });

      const text = await req.text();
      const regExp = new RegExp("meta name=\"csrf-token\" content=\"(.*)\"");
      const [, token] = regExp.exec(text);
      console.log('token: ', token);

      this.token = token;
    }

    const paramsCheckCard = new URLSearchParams();
    paramsCheckCard.append('s_id', affraidId);
    const resCheckCard = await fetch("https://belgorod.delivery-club.ru/ajax/cart/", <any>{headers: { cookie, 'x-csrf-token': this.token}, agent, body: paramsCheckCard, method:"POST" });
    const checkCard = await resCheckCard.text();
    console.log(checkCard);

    if (!+checkCard) {
      await this.appendItemToCard(affraidId, cookie, this.token, productId);
    }

    await utils.sleep(1000);
    const date = new Date();
    date.setDate(new Date().getDate() + 2);
    const strDate = date.toISOString().substr(0, 10);

    const params = new URLSearchParams();
    params.append('user_type', 'RegisteredWithoutAddress');
    params.append('name', 'Валентин');
    params.append('phone1', phone1);
    params.append('phone1_code', phone2);
    params.append('department_id', 'Выбрать ресторан');
    params.append('pickup_date', '0');
    params.append('pickup_time_h', '-1');
    params.append('pickup_time_m', '-1');
    params.append('person_count', '1');
    params.append('is_delivery_asap', '1');
    params.append('preorder_date', strDate);
    params.append('preorder_time_h', '19');
    params.append('preorder_time_m', '00');
    params.append('delivery_cost', '0');
    params.append('delivery_min_order', cost);
    params.append('ignore_warnings', '0');
    params.append('promo_discount', '0');
    params.append('promo_discount', '0');
    params.append('checkout_type', 'default');
    params.append('send', '1');
    params.append('checkout_locked', '0');
    params.append('affiliate_id', affraidId);
    params.append('delivery_24_hours', '0');
    params.append('delivery_time_preorder', deliveryTimePreorder);
    params.append('openhour_from', openhourFrom);
    params.append('openhour_to', openhourTo);
    params.append('online_payment', '1');
    params.append('promo_code', 'testtest');

    const results: PromoResult[] = [];
    for (let i = 0; i < promos.length; ++i) {
      results.push(await this.sendCheckPromocode(params, promos[i], cookie));
    }

    return results;
  }

  private async sendCheckPromocode(params: URLSearchParams, promo: string, cookie: string) {
    let result: any;

    params.delete('promo_code');
    params.append('promo_code', promo);

    const res = await fetch("https://belgorod.delivery-club.ru/ajax/promocode", <any>{ headers:{ cookie }, agent, body: params, method: "POST" });
    const json = await res.json();
    console.log(new Date().toISOString(), promo, JSON.stringify(json));
    result = { ...json, promo: promo };

    if (!json.success && json.error && json.error.indexOf("не существует") > -1) {
      // this.sendMessage(`${promo} не существует. ${JSON.stringify(json)}`);
      console.log(`${promo} не существует. ${JSON.stringify(json)}`);
    }

    let paramsDrop = new URLSearchParams();
    paramsDrop.append('affiliate_id', params.get('affiliate_id'));
    paramsDrop.append('delivery_cost', params.get('0'));
    const resDrop = await fetch("https://belgorod.delivery-club.ru/ajax/drop_promo", <any>{ headers:{ cookie }, agent, body: params, method: "POST" });
    // console.log(JSON.stringify(await resDrop.text()));
    await utils.sleep(3000);

    return result;
  }

  private async appendItemToCard(affraidId: string, cookie: string, token: string, productId: string) {
    console.log(token);

    let paramsCart = new URLSearchParams();
    paramsCart.append('product_id', productId);
    paramsCart.append('quantity', '2');
    paramsCart.append('s_id', affraidId);
    paramsCart.append('byWeight', '0');

    let card = await fetch("https://belgorod.delivery-club.ru/ajax/cart/", <any>{headers: { cookie, 'x-csrf-token': token }, agent, body: paramsCart, method:"POST", });
    console.log('card: ', await card.text());
  }
}
