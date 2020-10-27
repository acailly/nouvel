const execShellCommand = require("./execShellCommand");
module.exports = (folder, remoteName, remoteUrl) =>
  execShellCommand(`git remote add ${remoteName} ${remoteUrl}`, folder);
