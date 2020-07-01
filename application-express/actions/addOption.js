const path = require("path");

const configuration = require("../../configuration");

const folderFileList = require("../../storage-file/folderFileList");
const fileWriteContent = require("../../storage-file/fileWriteContent");

module.exports = function (req, res) {
  const pollId = req.params.id;

  const optionName = req.body.option;

  const optionsFiles = folderFileList(
    path.join(configuration.pollsFolder, pollId, "options")
  );
  const optionCount = optionsFiles.length;
  const optionPosition = optionCount + 1;
  const optionId = optionPosition;

  const optionFilename = `${optionPosition}.${optionId}`;

  fileWriteContent(
    path.join(configuration.pollsFolder, pollId, "options", optionFilename),
    optionName
  );

  res.redirect(302, `/polls/${pollId}/options`);
};
