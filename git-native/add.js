const execShellCommand = require("./execShellCommand");
module.exports = (folder, files) =>
  execShellCommand("git add " + files, folder);
