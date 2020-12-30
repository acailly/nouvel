const { write, read } = require("../../@storage");
const { encrypt } = require("../../@secrets");
const configuration = require("../../@configuration");

module.exports = async function (req, res) {
  const encryptedPassword = await encrypt(req.body.password);

  let remotesInfo = await read(configuration.remoteListKey);
  if (!remotesInfo) {
    remotesInfo = {};
  }
  if (!remotesInfo.remotes) {
    remotesInfo.remotes = [];
  }
  remotesInfo.remotes.push({
    name: req.body.name,
    url: req.body.url,
    login: req.body.login,
    password: encryptedPassword,
  });

  await write(configuration.remoteListKey, remotesInfo);

  res.redirect(302, `/remotes`);
};
