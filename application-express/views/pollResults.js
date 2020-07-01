const path = require("path");

const configuration = require("../../configuration");

const folderFileList = require("../../storage-file/folderFileList");
const fileReadContent = require("../../storage-file/fileReadContent");
const fileReadExtension = require("../../storage-file/fileReadExtension");
const extensionWithoutDot = require("../../storage-file/extensionWithoutDot");

module.exports = function (req, res) {
  const pollId = req.params.id;

  const pollTitle = fileReadContent(
    path.join(configuration.pollsFolder, pollId, "title.txt")
  );

  const gradesFiles = folderFileList(
    path.join(configuration.pollsFolder, pollId, "grades")
  );
  const pollGrades = gradesFiles.map((gradeFile) => {
    const gradeValue = extensionWithoutDot(gradeFile);
    const gradeName = fileReadContent(gradeFile);
    return { name: gradeName, value: gradeValue };
  });

  const pollWinnerOptionId = fileReadExtension(
    path.join(configuration.pollsFolder, pollId, "results"),
    "winner"
  );

  const optionsFiles = folderFileList(
    path.join(configuration.pollsFolder, pollId, "options")
  );
  const pollOptions = optionsFiles.map((optionFile) => {
    return fileReadContent(optionFile);
  });

  let pollWinnerOption;
  optionsFiles.forEach((optionFile) => {
    const pollOptionId = extensionWithoutDot(optionFile);
    if (pollOptionId === pollWinnerOptionId) {
      pollWinnerOption = fileReadContent(optionFile);
    }
  });

  const pollOptionGrades = optionsFiles.map((optionFile) => {
    const pollOptionId = extensionWithoutDot(optionFile);
    const pollOptionGradeValue = fileReadExtension(
      path.join(configuration.pollsFolder, pollId, "results", pollOptionId),
      "grade"
    );
    const pollOptionGrade = pollGrades.find(
      (pollGrade) => pollGrade.value === pollOptionGradeValue
    );
    return pollOptionGrade.name;
  });

  const pollOptionResultsByGrade = optionsFiles.map((optionFile) => {
    const pollOptionId = extensionWithoutDot(optionFile);
    const currentOptionResultsByGrade = pollGrades.map((pollGrade) => {
      const gradeVoteCount = fileReadExtension(
        path.join(
          configuration.pollsFolder,
          pollId,
          "results",
          pollOptionId,
          "by-grade"
        ),
        pollGrade.value
      );
      return {
        name: pollGrade.name,
        voteCount: gradeVoteCount,
      };
    });
    return currentOptionResultsByGrade;
  });

  res.render("pollResults.html", {
    pollTitle,
    pollOptions,
    pollWinnerOption,
    pollOptionGrades,
    pollOptionResultsByGrade,
  });
};
