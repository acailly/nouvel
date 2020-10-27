const {listKeys, read} = require("../../storage");

module.exports = async function (req, res) {
  const pollId = req.params.id;

  const pollInfo = await read(`polls/${pollId}/info`);
  const pollTitle = pollInfo.title;

  const gradeIds = await listKeys(`polls/${pollId}/grades`);
  const grades = await Promise.all(
    gradeIds.map(async (gradeId) => {
      return await read(`polls/${pollId}/grades/${gradeId}`);
    })
  );
  const pollGrades = grades.sort((a, b) => a.position - b.position);

  const optionIds = await listKeys(`polls/${pollId}/options`);
  const options = await Promise.all(
    optionIds.map(async (optionId) => {
      return await read(`polls/${pollId}/options/${optionId}`);
    })
  );
  const pollOptions = options.sort((a, b) => a.position - b.position);

  const winner = await read(`polls/${pollId}/results/winner`);
  const pollWinnerOptionId = winner.optionId;
  const pollWinnerOption = pollOptions.find((option) => {
    return option.id === pollWinnerOptionId;
  });

  const pollOptionGrades = {};
  for (const option of pollOptions) {
    const pollOptionId = option.id;
    const pollOptionResults = await read(
      `polls/${pollId}/results/${pollOptionId}/results`
    );
    const pollOptionGradeId = pollOptionResults.gradeId;
    const pollOptionGrade = pollGrades.find(
      (pollGrade) => pollGrade.id === pollOptionGradeId
    );
    pollOptionGrades[pollOptionId] = pollOptionGrade.label;
  };

  const pollOptionResultsByGrade = {};
  for (const option of pollOptions) {
    const pollOptionId = option.id;

    const optionResultsByGrade = await read(
      `polls/${pollId}/results/${pollOptionId}/by-grade`
    );

    pollOptionResultsByGrade[pollOptionId] = optionResultsByGrade;
  };

  res.render("pollResults.html", {
    pollTitle,
    pollOptions,
    pollGrades,
    pollWinnerOption,
    pollOptionGrades,
    pollOptionResultsByGrade,
  });
};
