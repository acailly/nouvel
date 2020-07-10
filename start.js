const startApplicationExpress = require("./application-express/start-application-express");
startApplicationExpress();

const startPublishingLocaltunnel = require("./publish-localtunnel/start-localtunnel");
startPublishingLocaltunnel();

const startSynchronizationGit = require("./synchronization-git/start-synchronization-git");
startSynchronizationGit();
