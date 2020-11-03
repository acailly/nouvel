const execShellCommand = require("./execShellCommand");
module.exports = async (folder, remoteName) => {
  try {
    await execShellCommand(`git remote get-url ${remoteName}`, folder);
  } catch (e) {
    return;
  }
};
