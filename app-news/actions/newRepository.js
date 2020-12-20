const { write } = require("../../@storage");
const { encrypt, decrypt } = require("../../@secrets");

module.exports = async function (req, res) {
  const repositoryId = new Date().getTime().toString();

  const encryptedPassword = await encrypt(req.body.password);

  await write(`repositories/${repositoryId}`, {
    name: req.body.name,
    branch: req.body.branch,
    remoteRepository: req.body.remoteRepository,
    enablePush: req.body.enablePush,
    login: req.body.login,
    password: encryptedPassword,
  });

  res.redirect(302, `/repositories`);
};
