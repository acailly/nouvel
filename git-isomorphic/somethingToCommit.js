const git = require("isomorphic-git");
const fs = require("fs");
module.exports = async (folder) => {
  const indexedFiles = await git.listFiles({ fs, dir: folder });
  return indexedFiles && indexedFiles.length;
};
