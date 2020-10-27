const git = require("isomorphic-git");
const fs = require("fs");
module.exports = (folder, remoteName) =>
  git.getConfig({ fs, dir: folder, path: `remote.${remoteName}.url` });
