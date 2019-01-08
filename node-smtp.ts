import ImapClient from 'emailjs-imap-client'
const quotedPrintable = require('quoted-printable');

var config = {
  imap: {
    // user: 'kuzj3nec@yandex.ru',
    user: 'noreply@rumc31.ru',
    password: 'qret1234',
    host: 'imap.yandex.com',
    port: 993,
    tls: true,
    authTimeout: 3000
  }
};

(async() => {
  const client = new ImapClient(config.imap.host, config.imap.port, { auth: { user: config.imap.user, pass: config.imap.password }, logLevel: "error" });
  client.onerror = function(error){ console.log(error); };

  await client.connect();
  const messages = await client.search('INBOX', {unseen: true});

  messages.forEach(async (message) => {
    console.log(message);
    let msg = (await client.listMessages('INBOX', `${message}:${message}`, ['uid', 'flags', 'body[]']));
    if (!msg) { return; }
    msg = msg[0];

    let value = msg['body[]'];
    const parse = quotedPrintable.decode(value);
    // const contentType = "Content-Type: text/html; charset=utf-8";
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



