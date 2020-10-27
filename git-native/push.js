const execShellCommand = require("./execShellCommand");
module.exports = (folder, remoteName, remoteBranch) =>
  execShellCommand(`git push ${remoteName} ${remoteBranch}`, folder);
