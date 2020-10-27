const {listKeys, read, write} = require("../../storage");

module.exports = async function (req, res) {
  const pollId = req.params.id;

  const gradeIds = await listKeys(`polls/${pollId}/grades`);
  const grades = await Promise.all(
    gradeIds.map(async (gradeId) => {
      return await read(`polls/${pollId}/grades/${gradeId}`);
    })
  );

  const optionIds = await listKeys(`polls/${pollId}/options`);

  const voterIds = await listKeys(`polls/${pollId}/votes`);

  for (const optionId of optionIds) {
    const voteCount = voterIds.length;

    const voteCountByGrade = {};
    gradeIds.forEach((gradeId) => {
      voteCountByGrade[gradeId] = 0;
    });
    for (const voterId of voterIds) {
      const voterAnswers = await read(`polls/${pollId}/votes/${voterId}`);
      const voterAnswer = voterAnswers[optionId];

      voteCountByGrade[voterAnswer] += 1;
    };

    await write(`polls/${pollId}/results/${optionId}/by-grade`, voteCountByGrade);

    let optionScore = 0;
    let optionGradeId;
    const gradesFromNoToYes = grades.sort((a, b) => {
      return b.position - a.position;
    });

    for (const grade of gradesFromNoToYes) {
      optionGradeId = grade.id;
      optionScore += voteCountByGrade[grade.id];
      if (optionScore > voteCount / 2) {
        break;
      }
    }

    await write(`polls/${pollId}/results/${optionId}/results`, {
      gradeId: optionGradeId,
      score: optionScore,
    });
  };

  let winnerOptionId;
  const gradesFromYesToNo = grades.sort((a, b) => {
    return a.position - b.position;
  });

  for (const grade of gradesFromYesToNo) {
    const optionIdsWithMatchingGrade = await Promise.all(
      optionIds
        .map(async (optionId) => {
          const optionResults = await read(
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
        .filter((v) => v !== undefined)
    );
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

  await write(`polls/${pollId}/results/winner`, {
    optionId: winnerOptionId,
  });

  await write(`polls/${pollId}/status`, {
    id: "close",
    label: "Close",
  });

  res.redirect(302, `/polls/${pollId}/results`);
};
