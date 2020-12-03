const git = require("isomorphic-git");
const http = require("isomorphic-git/http/node");
const fs = require("fs");
module.exports = (folder, remoteName, remoteBranch, username, password) =>
  git.push({
    fs,
    http,
    dir: folder,
    remote: remoteName,
    ref: remoteBranch,
    onAuth(url) {
      return { username, password };
    },
    corsProxy: "https://cors.isomorphic-git.org",
  });
