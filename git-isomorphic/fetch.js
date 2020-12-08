const git = require("isomorphic-git");
const http = require("isomorphic-git/http/node");
const fs = require("fs");
module.exports = (folder, remoteName, remoteBranch) =>
  git.fetch({
    fs,
    http,
    dir: folder,
    corsProxy: "https://cors.isomorphic-git.org",
    // TODO ACY Cette ligne est pour ne pas être en mode shallow parce que
    //j'ai peur que ca casse le push, mais est ce vraiment le cas ? à tester
    depth: 1000000000,
    remote: remoteName,
    remoteRef: remoteBranch,
  });
