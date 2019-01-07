import {URLSearchParams} from "url";
import {sleep} from "./sms-activate";

(async () => {

  let cookie = 'PHPSESSID=jmpp1nmc71eaopat5nj3rfamq4';
  const affraidId = '9221';
  const productId = '303078555';

  const req = await fetch("https://belgorod.delivery-club.ru", {headers:{ cookie } });
  const text = await req.text();
  const regExp = new RegExp("meta name=\"csrf-token\" content=\"(.*)\"");
  const [, token] = regExp.exec(text);
  console.log('token: ', token);

  const paramsCartEmpty = new URLSearchParams();
  paramsCartEmpty.append('empty_cart', 'true');
  paramsCartEmpty.append('s_id', affraidId);
  const cardEmpry = await fetch("https://belgorod.delivery-club.ru/ajax/cart/", {headers: { cookie, 'x-csrf-token': token},body: paramsCartEmpty, method:"POST", });
  console.log('empty: ', await cardEmpry.text());

  const paramsCart = new URLSearchParams();
  paramsCart.append('product_id', productId);
  paramsCart.append('quantity', '1');
  paramsCart.append('s_id', affraidId);
  paramsCart.append('byWeight', '0');

  const card = await fetch("https://belgorod.delivery-club.ru/ajax/cart/", {headers: { cookie, 'x-csrf-token': token },body: paramsCart, method:"POST", });
  console.log('card: ', await card.text());


  const params = new URLSearchParams();
  params.append('user_type', 'RegisteredWithoutAddress');
  params.append('phone1', '0529014');
  params.append('phone1_code', '925');
  params.append('department_id', 'Выбрать ресторан');
  params.append('pickup_date', '0');
  params.append('pickup_time_h', '-1');
  params.append('pickup_time_m', '-1');
  params.append('person_count', '1');
  params.append('is_delivery_asap', '1');
  params.append('preorder_date', '2019-01-01');
  params.append('preorder_time_h', '19');
  params.append('preorder_time_m', '00');
  params.append('delivery_cost', '0');
  params.append('delivery_min_order', '600');
  params.append('ignore_warnings', '0');
  params.append('promo_discount', '0');
  params.append('promo_discount', '0');
  params.append('checkout_type', 'default');
  params.append('send', '1');
  params.append('checkout_locked', '0');
  params.append('affiliate_id', affraidId);
  params.append('delivery_24_hours', '0');
  params.append('delivery_time_preorder', '2');
  params.append('openhour_from', '10:50');
  params.append('openhour_to', '23:59');
  params.append('online_payment', '1');
  params.append('promo_code', 'testtest');

  const promos = [
    // "NY19KW3V3ARNN",
    // "NY19SV6NYGWDN",
    // "NY19KRAG4CMYQ",
    "NY19KZPQ9TZNR",
  ];


  for (let i = 0; i < promos.length; ++i) {
    let promo = promos[i];
    params.delete('promo_code');
    params.append('promo_code', promo);

    const res = await fetch("https://belgorod.delivery-club.ru/ajax/promocode", {headers:{ cookie },body: params, method:"POST", });

    console.log(promo, JSON.stringify(await res.json()));
    // await sleep(1000);

    let paramsDrop = new URLSearchParams();
    paramsDrop.append('affiliate_id', params.get('affiliate_id'));
    paramsDrop.append('delivery_cost', params.get('0'));
    const resDrop = await fetch("https://belgorod.delivery-club.ru/ajax/drop_promo", {headers:{ cookie },body: params, method:"POST"});
    console.log(JSON.stringify(await resDrop.text()));
    await sleep(1000);
  }


})();
