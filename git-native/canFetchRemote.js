const execShellCommand = require("./execShellCommand");
module.exports = async (folder, remoteName, remoteUrl, remoteBranch) => {
  let canFetch = true;

  try {
    // https://superuser.com/a/833286
    await execShellCommand(
      `git ls-remote --exit-code -h "${remoteUrl}"`,
      folder
    );
  } catch (e) {
    console.log("Syncing git - No, cannot fetch", remoteName);
    canFetch = false;
  }

  return canFetch;
};
