const path = require("path")

const rootDataFolder = path.join(__dirname, "..", "zDemocracy-lowtech-data")

const createApp = require("./create-app")
const app = createApp(rootDataFolder)
app.listen(8080);

const syncDaemon = require("./sync-git/sync-daemon")
syncDaemon([
    rootDataFolder
], 20000)