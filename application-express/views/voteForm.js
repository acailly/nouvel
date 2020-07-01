const path = require("path");

const configuration = require("../../configuration");

const folderFileList = require("../../storage-file/folderFileList");
const fileReadContent = require("../../storage-file/fileReadContent");
const extensionWithoutDot = require("../../storage-file/extensionWithoutDot");

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

  const gradesFiles = folderFileList(
    path.join(configuration.pollsFolder, pollId, "grades")
  );
  const pollGrades = gradesFiles.map((gradeFile) => {
    const gradeName = fileReadContent(gradeFile);
    const gradeValue = extensionWithoutDot(gradeFile);
    return { name: gradeName, value: gradeValue };
  });

  res.render("voteForm.html", {
    pollId,
    pollTitle,
    pollOptions,
    pollGrades,
  });
};
