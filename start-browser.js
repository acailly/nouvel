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
    fs.promises = require("./dist-browser/fsPromisified");

    //==== START THE APP ====

    // const { get: getIdentity } = require("./@identity");
    // const identity = getIdentity();
    // console.log(`Connected as ${identity.id}`);

    // const startZDemocracyExpress = require("./app-zdemocracy/start-zdemocracy-express");
    // startZDemocracyExpress();

    const appConfig = require("./app-list/app-config");
    const createBrowserApp = require("./dist-browser/create-app");
    createBrowserApp(appConfig);

    // const startPublishingGitDumbHttp = require("./expose-gitdumbhttp/start-gitdumbhttp");
    // startPublishingGitDumbHttp();

    // const startPublishingLocaltunnel = require("./expose-localtunnel/start-localtunnel");
    // startPublishingLocaltunnel();

    // const startSynchronizationGit = require("./synchronization-git/start-synchronization-git");
    // startSynchronizationGit();
  }
);
