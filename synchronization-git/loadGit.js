async function loadGit() {
  let git = null;

  const gitNative = require("../git-native");
  const isGitNativeSupported = await gitNative.isSupported();
  console.log(
    "[synchronization-git] Is native Git supported?",
    isGitNativeSupported
  );
  if (isGitNativeSupported) {
    git = gitNative;
  } else {
    const gitIsomorphic = require("../git-isomorphic");
    git = gitIsomorphic;
  }

  return git;
}

module.exports = loadGit;
