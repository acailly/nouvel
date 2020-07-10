const listKeys = require("../../storage-file/listKeys");
const read = require("../../storage-file/read");

module.exports = function (req, res) {
  const pollId = req.params.id;

  const pollInfo = read(`polls/${pollId}/info`);
  const pollTitle = pollInfo.title;

  const gradeIds = listKeys(`polls/${pollId}/grades`);
  const grades = gradeIds.map((gradeId) => {
    return read(`polls/${pollId}/grades/${gradeId}`);
  });
  const pollGrades = grades.sort((a, b) => a.position - b.position);

  const optionIds = listKeys(`polls/${pollId}/options`);
  const options = optionIds.map((optionId) => {
    return read(`polls/${pollId}/options/${optionId}`);
  });
  const pollOptions = options.sort((a, b) => a.position - b.position);

  const winner = read(`polls/${pollId}/results/winner`);
  const pollWinnerOptionId = winner.optionId;
  const pollWinnerOption = pollOptions.find((option) => {
    return option.id === pollWinnerOptionId;
  });

  const pollOptionGrades = {};
  pollOptions.forEach((option) => {
    const pollOptionId = option.id;
    const pollOptionResults = read(
      `polls/${pollId}/results/${pollOptionId}/results`
    );
    const pollOptionGradeId = pollOptionResults.gradeId;
    const pollOptionGrade = pollGrades.find(
      (pollGrade) => pollGrade.id === pollOptionGradeId
    );
    pollOptionGrades[pollOptionId] = pollOptionGrade.label;
  });

  const pollOptionResultsByGrade = {};
  pollOptions.map((option) => {
    const pollOptionId = option.id;

    const optionResultsByGrade = read(
      `polls/${pollId}/results/${pollOptionId}/by-grade`
    );

    pollOptionResultsByGrade[pollOptionId] = optionResultsByGrade;
  });

  res.render("pollResults.html", {
    pollTitle,
    pollOptions,
    pollGrades,
    pollWinnerOption,
    pollOptionGrades,
    pollOptionResultsByGrade,
  });
};
