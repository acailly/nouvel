const git = require("isomorphic-git");
const fs = require("fs");

module.exports = async (folder) => {
  try {
    const localCommits = await git.log({
      fs,
      dir: folder,
      depth: 1,
    });
    const localOid =
      localCommits && localCommits.length ? localCommits[0].oid : null;
    return localOid;
  } catch (e) {
    return null;
  }
};
