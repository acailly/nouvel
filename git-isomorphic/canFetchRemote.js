const git = require("isomorphic-git");
const http = require("isomorphic-git/http/node");
const fs = require("fs");
module.exports = async (folder, remoteName, remoteUrl, remoteBranch) => {
  let canFetch = true;

  try {
    await git.fetch({
      fs,
      http,
      dir: folder,
      corsProxy: "https://cors.isomorphic-git.org",
      remote: remoteName,
      remoteRef: remoteBranch,
      onAuth(url) {
        return { username: "acailly", password: "XXXX" }; // TODO ACY
      },
      depth: 1,
      singleBranch: true,
      tags: false,
    });
  } catch (e) {
    console.log("Syncing git - No, cannot fetch", remoteName);
    console.log("DEBUG", e);
    canFetch = false;
  }

  return canFetch;
};
