const git = require("isomorphic-git");
const fs = require("fs");
module.exports = (folder, remoteName, remoteBranch) =>
  git.merge({
    fs,
    dir: folder,
    theirs: `remotes/${remoteName}/${remoteBranch}`,
    author: {
      // TODO ACY
      name: "Mr. Test",
      email: "mrtest@example.com",
    },
  });
