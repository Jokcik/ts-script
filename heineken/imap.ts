import {Imap} from "../utils/imap";
import {authHeineken} from "./auth";

// const imap = new Imap("noreply@malign.ru", "qret1234", "yandex");
// const imap = new Imap("noreply@mail-box.club", "qret1234", "yandex");
const imap = new Imap("noreply@vtbmail.ru", "qret1234", "yandex");

(async () => {
  await imap.connect();
  functionReadMessages();

  imap.client.onupdate = (path, type, value) => readMessage(-1, value);
})();

async function functionReadMessages() {
  const messages = await imap.getMessagesIds();
  for (let i = 0; i < messages.length; ++i) {
    await readMessage(i, messages[i]);
  }
}

async function readMessage(idx: number, messageId: number) {
  const msg = await imap.getMessageById(messageId);

  let value = msg['body[]'];
  const match = new RegExp("<br />\\r\\n(.+)<br />").exec(value);
  if (!match) { return; }
  const code = match[1];

  const email = msg.envelope.to[0].address;
  const password = email.substr(0, email.indexOf("@"));
  const data = { code, email, password };

  authHeineken(code, email, password, idx);
  // authHeineken("957186342", "jokcik@yandex.ru", "19966991");
}
