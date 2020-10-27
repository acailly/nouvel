const execShellCommand = require("./execShellCommand");
module.exports = async (folder, remoteName) => {
  const output = execShellCommand("git diff --name-only --cached", folder);
  return output;
};
