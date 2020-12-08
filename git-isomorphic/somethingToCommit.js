const git = require("isomorphic-git");
const fs = require("fs");
const path = require("path");
module.exports = async (folder) => {
  // Using wonderful command statusMatrix
  // See more at https://isomorphic-git.org/docs/en/statusMatrix.html
  const FILE = 0,
    HEAD = 1,
    WORKDIR = 2,
    STAGE = 3;

  const filenames = (await git.statusMatrix({ fs, dir: folder }))
    .filter((row) => row[HEAD] !== row[STAGE])
    .map((row) => row[FILE]);

  return filenames && filenames.length;
};
