const path = require("path");

const configuration = require("../../configuration");

const folderCopy = require("../../storage-file/folderCopy");
const fileWriteContent = require("../../storage-file/fileWriteContent");
const fileWriteExtension = require("../../storage-file/fileWriteExtension");
const folderNew = require("../../storage-file/folderNew");

module.exports = function (req, res) {
  const pollId = new Date().getTime().toString();
  folderCopy(
    path.join(configuration.templatesFolder, "poll"),
    path.join(configuration.pollsFolder, pollId)
  );

  const pollTitle = req.body.title;
  fileWriteContent(
    path.join(configuration.pollsFolder, pollId, "title.txt"),
    pollTitle
  );

  fileWriteExtension(
    path.join(configuration.pollsFolder, pollId),
    "status",
    "draft"
  );

  folderNew(path.join(configuration.pollsFolder, pollId, "options"));

  folderCopy(
    path.join(configuration.templatesFolder, "jugement-majoritaire", "grades"),
    path.join(configuration.pollsFolder, pollId, "grades")
  );

  folderNew(path.join(configuration.pollsFolder, pollId, "votes"));

  res.redirect(302, `/polls/${pollId}/options`);
};
