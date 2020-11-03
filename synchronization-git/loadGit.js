const configuration = require("../@configuration");

async function loadGit() {
  if (configuration.useNativeGit) {
    const gitNative = require("../git-native");
    const isGitNativeSupported = await gitNative.isSupported();
    if (isGitNativeSupported) {
      console.log("[synchronization-git] Use native Git");
      return gitNative;
    }
  }

  console.log("[synchronization-git] Use isomorphic Git");
  const gitIsomorphic = require("../git-isomorphic");
  return gitIsomorphic;
}

module.exports = loadGit;
