const git = require("isomorphic-git");
const fs = require("fs");
module.exports = (folder, files) =>
  git.add({ fs, dir: folder, filepath: files });
