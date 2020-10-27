const git = require("isomorphic-git");
module.exports = async () => {
  return Promise.resolve(!!git);
};
