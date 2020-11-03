const execShellCommand = require("./execShellCommand");
module.exports = async (
  folder,
  remoteName,
  remoteUrl,
  remoteBranch,
  username,
  password
) => {
  let canFetch = true;

  try {
    // https://superuser.com/a/833286
    await execShellCommand(
      `git ls-remote --exit-code -h "${remoteUrl}"`,
      folder
    );
  } catch (e) {
    canFetch = false;
  }

  return canFetch;
};
