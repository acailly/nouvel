const execShellCommand = require("./execShellCommand");
module.exports = (folder) => execShellCommand("git update-server-info", folder);
