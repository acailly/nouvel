const openpgp = require("openpgp");
const _inmemory_password_container = require("./_inmemory_password_container");

module.exports = async (encrypted) => {
  const password = _inmemory_password_container.password;

  const { data: decrypted } = await openpgp.decrypt({
    message: await openpgp.message.readArmored(encrypted),
    passwords: [password],
  });

  return decrypted;
};
