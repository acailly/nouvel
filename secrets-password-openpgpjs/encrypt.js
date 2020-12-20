const openpgp = require("openpgp");
const _inmemory_password_container = require("./_inmemory_password_container");

module.exports = async (text) => {
  const password = _inmemory_password_container.password;

  const { data: encrypted } = await openpgp.encrypt({
    message: openpgp.message.fromText(text),
    passwords: [password],
  });

  return encrypted;
};
