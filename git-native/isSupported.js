const execShellCommand = require("./execShellCommand");
module.exports = async () => {
  let isSupported = true;

  try {
    execShellCommand(`git --version`, ".");
  } catch (e) {
    isSupported = false;
  }

  return isSupported;
};
