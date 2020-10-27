const git = require("isomorphic-git");
const fs = require("fs");
module.exports = (folder) =>
  git.commit({
    fs,
    dir: folder,
    message: ":white_check_mark: Automatic sync git",
    author: {
      // TODO ACY
      name: "Mr. Test",
      email: "mrtest@example.com",
    },
  });
