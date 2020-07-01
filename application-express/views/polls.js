const path = require("path");

const configuration = require("../../configuration");

const folderFileList = require("../../storage-file/folderFileList");
const fileReadContent = require("../../storage-file/fileReadContent");
const fileReadExtension = require("../../storage-file/fileReadExtension");

module.exports = function (req, res) {
  const pollsFolders = folderFileList(path.join(configuration.pollsFolder));
  const polls = pollsFolders.map((pollFollder) => {
    const pollId = path.basename(pollFollder);
    const pollTitle = fileReadContent(path.join(pollFollder, "title.txt"));
    const pollStatus = fileReadExtension(pollFollder, "status");
    return {
      id: pollId,
      title: pollTitle,
      status: pollStatus,
    };
  });

  res.render("polls.html", { polls: polls });
};
