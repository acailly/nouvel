const git = require("isomorphic-git");
const http = require("isomorphic-git/http/node");
const fs = require("fs");
module.exports = (folder, remoteName, remoteBranch) =>
  git.fetch({
    fs,
    http,
    dir: folder,
    corsProxy: "https://cors.isomorphic-git.org",
    remote: remoteName,
    remoteRef: remoteBranch,
  });
