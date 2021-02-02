const { write, read } = require("../../@storage");
const configuration = require("../../@configuration");

module.exports = async function (req, res) {
  const remoteName = req.body.name;

  const remotesInfo = await read(configuration.distrib.pouchdb.remoteListKey);

  remotesInfo.remotes = remotesInfo.remotes.filter(
    (remoteInfo) => remoteInfo.name !== remoteName
  );

  await write(configuration.distrib.pouchdb.remoteListKey, remotesInfo);

  res.redirect("back");
};
