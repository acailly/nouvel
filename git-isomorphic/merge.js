const git = require("isomorphic-git");
const fs = require("fs");
module.exports = async (folder, remoteName, remoteBranch) => {
  const branches = await git.listBranches({ fs, dir: folder });
  if (!branches || !branches.length) {
    // Isomorphic git does not handle merge when repository is empty
    // see https://github.com/isomorphic-git/isomorphic-git/issues/685
  } else {
    await git.merge({
      fs,
      dir: folder,
      theirs: `remotes/${remoteName}/${remoteBranch}`,
      author: {
        // TODO ACY
        name: "Mr. Test",
        email: "mrtest@example.com",
      },
    });
  }
  // Merge command does not checkout the result of the merge
  // see https://github.com/isomorphic-git/isomorphic-git/issues/1286
  await git.checkout({
    fs,
    dir: folder,
    remote: remoteName,
    ref: remoteBranch,
  });
};
