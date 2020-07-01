const path = require("path");

const configuration = require("../../configuration");

const folderFileList = require("../../storage-file/folderFileList");
const extensionWithoutDot = require("../../storage-file/extensionWithoutDot");
const folderNew = require("../../storage-file/folderNew");
const fileWriteContent = require("../../storage-file/fileWriteContent");

module.exports = function (req, res) {
  const pollId = req.params.id;

  const name = req.body.name;

  const optionsFiles = folderFileList(
    path.join(configuration.pollsFolder, pollId, "options")
  );
  const pollOptionsIds = optionsFiles.map((optionFile) => {
    return extensionWithoutDot(optionFile);
  });

  folderNew(path.join(configuration.pollsFolder, pollId, "votes", name));

  pollOptionsIds.map((optionId, optionIndex) => {
    const optionAnswer = req.body[`option_${optionIndex}`];
    fileWriteContent(
      path.join(
        configuration.pollsFolder,
        pollId,
        "votes",
        name,
        `${optionId}.${optionAnswer}`
      ),
      ""
    );
  });

  res.redirect(302, `/polls/${pollId}/voted`);
};
