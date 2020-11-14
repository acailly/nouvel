const execShellCommand = require("./execShellCommand");
module.exports = async (folder, remoteName) => {
  try {
    return await execShellCommand(`git remote get-url ${remoteName}`, folder);
  } catch (e) {
    return;
  }
};
