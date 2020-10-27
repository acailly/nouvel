const execShellCommand = require("./execShellCommand");
module.exports = (folder, remoteName, remoteBranch) =>
  execShellCommand(`git fetch ${remoteName} ${remoteBranch}`, folder);
