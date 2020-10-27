const execShellCommand = require("./execShellCommand");
module.exports = (folder, remoteName, remoteBranch) =>
  execShellCommand(`git merge ${remoteName}/${remoteBranch}`, folder);
