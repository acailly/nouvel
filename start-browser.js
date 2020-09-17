//==== BROWSER FIXES ====

// to fix the iconv-lite error with streams
process.versions.node = undefined;
// to use promisify until a better solution: https://github.com/browserify/browserify/issues/1978
require("util.promisify/shim")();

//==== FS EMULATION =====

BrowserFS.configure(
  {
    // fs: "InMemory",
    // fs: "LocalStorage",
    fs: "IndexedDB",
    options: {
      storeName: "app",
    },
  },
  function (e) {
    if (e) {
      throw e;
    }
    console.log("BrowserFS is ready-to-use!");

    // FIX : implement fs.promises
    const fs = require("fs");
    fs.promises = require("./browser/fsPromisified");

    //==== START THE APP ====

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
  }
);
