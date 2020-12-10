const git = require("isomorphic-git");
const http = require("isomorphic-git/http/node");
const fs = require("fs");
module.exports = async (
  folder,
  remoteName,
  remoteBranch,
  username,
  password
) => {
  // Issue https://github.com/isomorphic-git/isomorphic-git/issues/398
  // When the local HEAD and the remote HEAD is the same, git push is failing with
  // a PushRejectedNonFastForward error
  // To avoid this, we check if local HEAD = remote HEAD and if it is, we don't push
  const remoteCommits = await git.log({
    fs,
    dir: folder,
    depth: 1,
    ref: `refs/remotes/${remoteName}/${remoteBranch}`,
  });
  const remoteOid =
    remoteCommits && remoteCommits.length ? remoteCommits[0].oid : null;
  const localCommits = await git.log({
    fs,
    dir: folder,
    depth: 1,
  });
  const localOid =
    localCommits && localCommits.length ? localCommits[0].oid : null;
  if (localOid === remoteOid) {
    return;
  }

  return await git.push({
    fs,
    http,
    dir: folder,
    remote: remoteName,
    remoteRef: remoteBranch,
    onAuth(url) {
      return { username, password };
    },
    corsProxy: "https://cors.isomorphic-git.org",
  });
};
