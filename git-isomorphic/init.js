const git = require("isomorphic-git");
const fs = require("fs");
module.exports = (folder) => git.init({ fs, dir: folder });
