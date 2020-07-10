const listKeys = require("../../storage-file/listKeys");
const read = require("../../storage-file/read");
const write = require("../../storage-file/write");

module.exports = function (req, res) {
  const pollId = req.params.id;

  const gradeIds = listKeys(`polls/${pollId}/grades`);
  const grades = gradeIds.map((gradeId) => {
    return read(`polls/${pollId}/grades/${gradeId}`);
  });

  const optionIds = listKeys(`polls/${pollId}/options`);

  const voterIds = listKeys(`polls/${pollId}/votes`);

  optionIds.map((optionId) => {
    const voteCount = voterIds.length;

    const voteCountByGrade = {};
    gradeIds.forEach((gradeId) => {
      voteCountByGrade[gradeId] = 0;
    });
    voterIds.forEach((voterId) => {
      const voterAnswers = read(`polls/${pollId}/votes/${voterId}`);
      const voterAnswer = voterAnswers[optionId];

      voteCountByGrade[voterAnswer] += 1;
    });

    write(`polls/${pollId}/results/${optionId}/by-grade`, voteCountByGrade);

    let optionScore = 0;
    let optionGradeId;
    const gradesFromNoToYes = grades.sort((a, b) => {
      return b.position - a.position;
    });
    for (
      let gradeIndex = 0;
      gradeIndex < gradesFromNoToYes.length;
      gradeIndex++
    ) {
      const grade = gradesFromNoToYes[gradeIndex];
      optionGradeId = grade.id;
      optionScore += voteCountByGrade[grade.id];
      if (optionScore > voteCount / 2) {
        break;
      }
    }

    write(`polls/${pollId}/results/${optionId}/results`, {
      gradeId: optionGradeId,
      score: optionScore,
    });
  });

  let winnerOptionId;
  const gradesFromYesToNo = grades.sort((a, b) => {
    return a.position - b.position;
  });
  for (
    let gradeIndex = 0;
    gradeIndex < gradesFromYesToNo.length;
    gradeIndex++
  ) {
    const grade = gradesFromYesToNo[gradeIndex];
    const optionIdsWithMatchingGrade = optionIds
      .map((optionId) => {
        const optionResults = read(
          `polls/${pollId}/results/${optionId}/results`
        );

        if (optionResults.gradeId === grade.id) {
          return {
            optionId: optionId,
            optionResults: optionResults,
          };
        }
        return undefined;
      })
      .filter((v) => v !== undefined);
    if (optionIdsWithMatchingGrade.length > 0) {
      const sortedOptionIdsWithMatchingGrade = optionIdsWithMatchingGrade.sort(
        (a, b) => {
          return b.optionResults.score - a.optionResults.score;
        }
      );
      winnerOptionId = sortedOptionIdsWithMatchingGrade[0].optionId;
      break;
    }
  }

  write(`polls/${pollId}/results/winner`, {
    optionId: winnerOptionId,
  });

  write(`polls/${pollId}/status`, {
    id: "close",
    label: "Close",
  });

  res.redirect(302, `/polls/${pollId}/results`);
};
