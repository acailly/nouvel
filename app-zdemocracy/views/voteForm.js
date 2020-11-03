const { listKeys, read } = require("../../@storage");

module.exports = async function (req, res) {
  const pollId = req.params.id;

  const pollInfo = await read(`polls/${pollId}/info`);
  const pollTitle = pollInfo.title;

  const optionIds = await listKeys(`polls/${pollId}/options`);
  const options = await Promise.all(
    optionIds.map(async (optionId) => {
      return await read(`polls/${pollId}/options/${optionId}`);
    })
  );
  const pollOptions = options.sort((a, b) => a.position - b.position);

  const gradeIds = await listKeys(`polls/${pollId}/grades`);
  const grades = await Promise.all(
    gradeIds.map(async (gradeId) => {
      return await read(`polls/${pollId}/grades/${gradeId}`);
    })
  );
  const pollGrades = grades.sort((a, b) => a.position - b.position);

  res.render("voteForm.html", {
    pollId,
    pollTitle,
    pollOptions,
    pollGrades,
  });
};
