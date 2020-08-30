const {listKeys, read} = require("../../storage");

module.exports = function (req, res) {
  const pollId = req.params.id;

  const pollInfo = read(`polls/${pollId}/info`);
  const pollTitle = pollInfo.title;

  const optionIds = listKeys(`polls/${pollId}/options`);
  const options = optionIds.map((optionId) => {
    return read(`polls/${pollId}/options/${optionId}`);
  });
  const pollOptions = options.sort((a, b) => a.position - b.position);

  const gradeIds = listKeys(`polls/${pollId}/grades`);
  const grades = gradeIds.map((gradeId) => {
    return read(`polls/${pollId}/grades/${gradeId}`);
  });
  const pollGrades = grades.sort((a, b) => a.position - b.position);

  res.render("voteForm.html", {
    pollId,
    pollTitle,
    pollOptions,
    pollGrades,
  });
};
