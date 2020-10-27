const execShellCommand = require("./execShellCommand");
module.exports = (folder) =>
  execShellCommand(
    'git commit -m ":white_check_mark: Automatic sync git"',
    folder
  );
