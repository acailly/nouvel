const path = require("path");

const configuration = require("../../configuration");

const fileWriteExtension = require("../../storage-file/folderFileList");

module.exports = function (req, res) {
  const pollId = req.params.id;

  fileWriteExtension(
    path.join(configuration.pollsFolder, pollId),
    "status",
    "open"
  );

  res.redirect(302, `/polls/${pollId}/published`);
};
