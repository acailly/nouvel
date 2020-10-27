const git = require("isomorphic-git");
const fs = require("fs");
module.exports = (folder, remoteName, remoteUrl) =>
  git.addRemote({
    fs,
    dir: folder,
    remote: remoteName,
    url: remoteUrl,
  });
