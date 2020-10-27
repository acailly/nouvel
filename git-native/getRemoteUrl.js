const execShellCommand = require("./execShellCommand");
module.exports = (folder, remoteName) =>
  execShellCommand(`git remote get-url ${remoteName}`, folder);
