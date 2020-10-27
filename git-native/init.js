const execShellCommand = require("./execShellCommand");
module.exports = (folder) => execShellCommand(`git init`, folder);
