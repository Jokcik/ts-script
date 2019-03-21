import {URLSearchParams} from "url";
import * as path from "path";

const mv = require('mv');
const fs = require('fs');
(<any>global).fetch = require("node-fetch");
(<any>global).URLSearchParams = URLSearchParams;

// https://oauth.vk.com/authorize?client_id=6825777&scope=notify,photos,friends,audio,video,notes,pages,docs,status,questions,offers,wall,groups,messages,notifications,stats,ads,offline&redirect_uri=http://api.vk.com/blank.html&display=page&response_type=token

export class Mcdonalds {
  private userId: string = "427408928"; //test
  private botId: string = "-9580285"; //

  public async start(accessToken: string) {
    // await this.sendMessage('#ВсеЕщеБигМак', accessToken);
    // await sleep(5000);
    // await this.sendMessage('Да', accessToken);
    // await sleep(5000);
    // await this.sendMessage('Да', accessToken);
    // await sleep(5000);

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
      await this.download("https://www.decodeit.ru/image.php?type=qr&value=095A45290917181F0442163F71757863647546564652580C0B09030454524D420F090E040B0501450C5F5F000F524957510E5A525F781E1E595755");
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
    const url = `https://api.vk.com/method/messages.send?user_id=${this.botId}&message=${encodeURIComponent(message)}&v=5.37&access_token=${token}`;
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
new Mcdonalds().start(token);

