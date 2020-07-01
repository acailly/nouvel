const path = require("path");

const configuration = require("../../configuration");

const folderFileList = require("../../storage-file/folderFileList");
const fileReadContent = require("../../storage-file/fileReadContent");

module.exports = function (req, res) {
  const pollId = req.params.id;

  const pollTitle = fileReadContent(
    path.join(configuration.pollsFolder, pollId, "title.txt")
  );

  const optionsFiles = folderFileList(
    path.join(configuration.pollsFolder, pollId, "options")
  );
  const pollOptions = optionsFiles.map((optionFile) => {
    return fileReadContent(optionFile);
  });

  res.render("pollOptions.html", { pollId, pollTitle, pollOptions });
};
