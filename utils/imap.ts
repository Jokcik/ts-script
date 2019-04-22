import ImapClient from 'emailjs-imap-client'

const config = {
  imap: {
    // user: 'kuzj3nec@yandex.ru', // qret1234
    user: 'jokcik@yandex.ru', // qwer1234
    // user: 'noreply@rumc31.ru', // qret1234
    // user: 'valimpetrov1993@gmail.com', // qret1234
    // user: 'coupfdwn3n@gmail.com', // vvtfdvcgtp3r
    // user: 'jokcik@gmail.com', //qwer1996
    // user: 'ger123stfang@gmail.com', //52vvtgtp3r
    password: 'qwer1234',
    host: 'imap.yandex.com',
    // host: 'imap.gmail.com',
    port: 993,
    tls: true,
    authTimeout: 30000
  }
};

export type HostType = 'yandex' | 'gmail';
const hostMap: { [key: string]: string } = {
  'yandex': 'imap.yandex.com',
  'gmail': 'imap.gmail.com',
};


export class Imap {
  public client: ImapClient;

  constructor(user: string, password: string, host: HostType) {
    config.imap.user = user;
    config.imap.password = password;
    config.imap.host = hostMap[host];

    this.client = new ImapClient(config.imap.host, config.imap.port, { auth: { user: config.imap.user, pass: config.imap.password }, logLevel: "error" });
    this.client.onerror = function(error){ console.log(error); };
  }

  public async connect() {
    return await this.client.connect();
  }

  public async getMessagesIds(): Promise<number[]> {
    return await this.client.search('INBOX', { unseen: true, since: new Date(2019, 0, 6, 0, 0, 0)});
  }

  public async getMessageById(messageId: number) {
    let msg = (await this.client.listMessages('INBOX', `${messageId}:${messageId}`, ['uid', 'flags', 'envelope', 'body[]']));
    if (!msg) { return; }

    return msg[0];
  }
}
