const execShellCommand = require("./execShellCommand");

module.exports = async (folder) => {
  try {
    return await execShellCommand("git rev-parse HEAD", folder);
  } catch (e) {
    return null;
  }
};
