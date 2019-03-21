import ImapClient from 'emailjs-imap-client'
const quotedPrintable = require('quoted-printable');

var config = {
  imap: {
    // user: 'kuzj3nec@yandex.ru', // qret1234
    // user: 'noreply@rumc31.ru', // qret1234
    // user: 'valimpetrov1993@gmail.com', // qret1234
    user: 'coupfdwn3n@gmail.com', // vvtfdvcgtp3r
    // user: 'jokcik@gmail.com', //qwer1996
    // user: 'ger123stfang@gmail.com', //52vvtgtp3r
    password: 'vvtfdvcgtp3r',
    // host: 'imap.yandex.com',
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    authTimeout: 30000
  }
};

(async() => {
  const client = new ImapClient(config.imap.host, config.imap.port, { auth: { user: config.imap.user, pass: config.imap.password }, logLevel: "error" });
  client.onerror = function(error){ console.log(error); };

  await client.connect();
  console.log(123);
  const messages = await client.search('INBOX', {unseen: true, since: new Date(2019, 0, 6, 0, 0, 0)});

  messages.forEach(async (message) => {
    let msg = (await client.listMessages('INBOX', `${message}:${message}`, ['uid', 'flags', 'body[]']));
    if (!msg) { return; }
    msg = msg[0];

    let value = msg['body[]'];
    const parse = quotedPrintable.decode(value);
    // console.log(value);

    // const contentType = "Content-Transfer-Encoding: quoted-printable";
    // const gg = value.substr(value.indexOf(contentType) + contentType.length);
    // const parse = Buffer.from(gg, 'base64').toString('binary');
    try  {
      const [token, ] = parse.match(/HONOR[^<]*/);
      console.log(token);
    } catch (e) {
      return;
    }
  });


})();



