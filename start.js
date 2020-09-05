const { get: getIdentity } = require("./identity");
const identity = getIdentity();
console.log(`Connected as ${identity.id}`);

// const startZDemocracyExpress = require("./zdemocracy-express/start-zdemocracy-express");
// startZDemocracyExpress();

const startListExpress = require("./list-express/start-list-express");
startListExpress();

// const startPublishingGitDumbHttp = require("./publish-gitdumbhttp/start-gitdumbhttp");
// startPublishingGitDumbHttp();

// const startPublishingLocaltunnel = require("./publish-localtunnel/start-localtunnel");
// startPublishingLocaltunnel();

// const startSynchronizationGit = require("./synchronization-git/start-synchronization-git");
// startSynchronizationGit();
