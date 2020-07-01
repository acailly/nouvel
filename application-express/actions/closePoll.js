const path = require("path");

const configuration = require("../../configuration");

const folderFileList = require("../../storage-file/folderFileList");
const fileReadExtension = require("../../storage-file/fileReadExtension");
const extensionWithoutDot = require("../../storage-file/extensionWithoutDot");
const folderNew = require("../../storage-file/folderNew");
const fileWriteContent = require("../../storage-file/fileWriteContent");
const fileWriteExtension = require("../../storage-file/fileWriteExtension");

module.exports = function (req, res) {
  const pollId = req.params.id;

  const gradesFiles = folderFileList(
    path.join(configuration.pollsFolder, pollId, "grades")
  );
  const pollGradesValues = gradesFiles.map((gradeFile) => {
    const gradeValue = extensionWithoutDot(gradeFile);
    return gradeValue;
  });

  const optionsFiles = folderFileList(
    path.join(configuration.pollsFolder, pollId, "options")
  );
  const pollOptionsIds = optionsFiles.map((optionFile) => {
    return extensionWithoutDot(optionFile);
  });

  const votersFolders = folderFileList(
    path.join(configuration.pollsFolder, pollId, "votes")
  );
  const pollVoters = votersFolders.map((voterFolder) => {
    return path.basename(voterFolder);
  });

  folderNew(path.join(configuration.pollsFolder, pollId, "results"));

  pollOptionsIds.map((optionId) => {
    folderNew(
      path.join(configuration.pollsFolder, pollId, "results", optionId)
    );

    const voteCount = pollVoters.length;

    const voteCountByGrade = pollGradesValues.map(() => 0);
    pollVoters.forEach((pollVoter) => {
      const voterAnswer = fileReadExtension(
        path.join(configuration.pollsFolder, pollId, "votes", pollVoter),
        optionId
      );

      const gradeIndex = pollGradesValues.findIndex(
        (gradeValue) => gradeValue === voterAnswer
      );
      voteCountByGrade[gradeIndex]++;
    });

    let optionScore = 0;
    let optionGradeValue;
    for (
      let gradeIndex = pollGradesValues.length - 1;
      gradeIndex >= 0;
      gradeIndex--
    ) {
      optionGradeValue = pollGradesValues[gradeIndex];
      optionScore += voteCountByGrade[gradeIndex];
      if (optionScore > voteCount / 2) {
        break;
      }
    }

    fileWriteContent(
      path.join(
        configuration.pollsFolder,
        pollId,
        "results",
        optionId,
        `score.${optionScore}`
      ),
      ""
    );

    fileWriteContent(
      path.join(
        configuration.pollsFolder,
        pollId,
        "results",
        optionId,
        `grade.${optionGradeValue}`
      ),
      ""
    );

    folderNew(
      path.join(
        configuration.pollsFolder,
        pollId,
        "results",
        optionId,
        "by-grade"
      )
    );

    pollGradesValues.forEach((pollGradeValue, pollGradeIndex) => {
      const voteCountForCurrentGrade = voteCountByGrade[pollGradeIndex];

      fileWriteContent(
        path.join(
          configuration.pollsFolder,
          pollId,
          "results",
          optionId,
          "by-grade",
          `${pollGradeValue}.${voteCountForCurrentGrade}`
        ),
        ""
      );
    });
  });

  let winnerOptionId;
  for (let gradeIndex = 0; gradeIndex < pollGradesValues.length; gradeIndex++) {
    const gradeValue = pollGradesValues[gradeIndex];
    const optionIndexesWithMatchingGrade = pollOptionsIds
      .map((pollOptionId, pollOptionIndex) => {
        const optionResultGradeValue = fileReadExtension(
          path.join(configuration.pollsFolder, pollId, "results", pollOptionId),
          "grade"
        );

        const optionResultScore = fileReadExtension(
          path.join(configuration.pollsFolder, pollId, "results", pollOptionId),
          "score"
        );

        if (optionResultGradeValue === gradeValue) {
          return {
            optionIndex: pollOptionIndex,
            optionScore: optionResultScore,
          };
        }
        return undefined;
      })
      .filter((v) => v !== undefined);
    if (optionIndexesWithMatchingGrade.length > 0) {
      const sortedOptionIndexesWithMatchingGrade = optionIndexesWithMatchingGrade.sort(
        (a, b) => {
          return b.score - a.score;
        }
      );
      const winnerOptionIndex =
        sortedOptionIndexesWithMatchingGrade[0].optionIndex;
      winnerOptionId = pollOptionsIds[winnerOptionIndex];
      break;
    }
  }

  fileWriteContent(
    path.join(
      configuration.pollsFolder,
      pollId,
      "results",
      `winner.${winnerOptionId}`
    ),
    ""
  );

  fileWriteExtension(
    path.join(configuration.pollsFolder, pollId),
    "status",
    "close"
  );

  res.redirect(302, `/polls/${pollId}/results`);
};
