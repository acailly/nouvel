const { write } = require("../../@storage");

module.exports = async function (req, res) {
  const repositoryId = new Date().getTime().toString();

  const itemTitle = req.body.title;

  await write(`repositories/${repositoryId}`, {
    name: req.body.name,
    branch: req.body.branch,
    remoteRepository: req.body.remoteRepository,
    enablePush: req.body.enablePush,
    login: req.body.login,
    password: req.body.password,
  });

  res.redirect(302, `/repositories`);
};
