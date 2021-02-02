const { read } = require("../../@storage");
const configuration = require("../../@configuration");

module.exports = async function (req, res) {
  const remotesInfo = await read(configuration.distrib.pouchdb.remoteListKey);
  const remotes = remotesInfo ? remotesInfo.remotes : [];

  res.render("remotes.html", { remotes: remotes });
};
