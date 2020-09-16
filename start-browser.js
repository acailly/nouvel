//==== BROWSER FIXES ====
// to fix the iconv-lite error with streams
process.versions.node = undefined;
// to use promisify until a better solution: https://github.com/browserify/browserify/issues/1978
require("util.promisify/shim")();
//=======================

// const { get: getIdentity } = require("./identity");
// const identity = getIdentity();
// console.log(`Connected as ${identity.id}`);

// const startZDemocracyExpress = require("./zdemocracy-express/start-zdemocracy-express");
// startZDemocracyExpress();

const startListBrowser = require("./list-express/start-list-browser");
startListBrowser();

// const startPublishingGitDumbHttp = require("./publish-gitdumbhttp/start-gitdumbhttp");
// startPublishingGitDumbHttp();

// const startPublishingLocaltunnel = require("./publish-localtunnel/start-localtunnel");
// startPublishingLocaltunnel();

// const startSynchronizationGit = require("./synchronization-git/start-synchronization-git");
// startSynchronizationGit();
