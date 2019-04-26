import {CustomRequest} from "../utils/request";
export const headersSokolov = {
  "Sec-Fetch-Dest": "empty",
  "Sec-Fetch-Site": "same-origin",
  "Sec-Fetch-User": "?F",
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36",
  "X-Requested-With": "XMLHttpRequest",
};

export class AuthSokolov {
    constructor(private request: CustomRequest) {
      request.setDefaultHeaders(headersSokolov);
    }

    async auth(email: string, password: string) {
      const object = {
        "AJAX_CALL": "Y",
        "AUTH_FORM": "Y",
        "BACK_URL": "https://sokolov.ru/",
        // "USER_EMAIL": "valimpetrov1993@gmail.com",
        "USER_EMAIL": email,
        // "USER_PASSWORD": "qret1234",
        "USER_PASSWORD": password,
      };

      await this.request.get("https://sokolov.ru");
      return await this.request.post("https://sokolov.ru/ajax/authorized.php", object, {}, "url");
    }

    async register(email: string, phone: string) {
      const object = {
        REGISTER_FORM: "Y",
        AJAX_CALL: "Y",
        USER_REG_NAME: "Иван",
        USER_REG_EMAIL: email,
        USER_REG_PHONE: phone,
        USER_REG_PASS: "123456",
      };

      await this.request.get("https://sokolov.ru");
      let a = await this.request.post("https://sokolov.ru/ajax/registre.php", object, {}, "url", false);

      const objectFinish = {
        "MY_SOKOLOV": "Y",
        "AJAX_CALL": "Y",
        "BACK_URL": "",
        "RegistrationFinish[how_did_you_know]": "Реклама в интернете",
      };

      return await this.request.post("https://my.sokolov.ru/ajax/registration-finish.php", objectFinish, {}, "url", false);
    }

}
