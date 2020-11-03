const git = require("isomorphic-git");
const http = require("isomorphic-git/http/node");
const fs = require("fs");
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
    await git.fetch({
      fs,
      http,
      dir: folder,
      corsProxy: "https://cors.isomorphic-git.org",
      remote: remoteName,
      remoteRef: remoteBranch,
      onAuth(url) {
        return { username, password };
      },
      depth: 1,
      singleBranch: true,
      tags: false,
    });
  } catch (e) {
    canFetch = false;
  }

  return canFetch;
};
