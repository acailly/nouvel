const execShellCommand = require("./execShellCommand");
module.exports = (folder, remoteName, remoteBranch, username, password) =>
  execShellCommand(`git push ${remoteName} ${remoteBranch}`, folder);
