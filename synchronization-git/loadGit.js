async function loadGit() {
  let git = null;

  const gitNative = require("../git-native");
  const isGitNativeSupported = await gitNative.isSupported();
  if (isGitNativeSupported) {
    git = gitNative;
  } else {
    const gitIsomorphic = require("../git-isomorphic");
    git = gitIsomorphic;
  }

  return git;
}

module.exports = loadGit;
