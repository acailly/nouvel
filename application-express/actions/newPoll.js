const {listKeys, read, write} = require("../../storage");

module.exports = function (req, res) {
  const pollId = new Date().getTime().toString();

  const pollTitle = req.body.title;
  write(`polls/${pollId}/info`, {
    title: pollTitle,
  });

  write(`polls/${pollId}/status`, {
    id: "draft",
    label: "Draft",
  });

  const templateGradeIds = listKeys(`templates/jugement-majoritaire/grades`);
  templateGradeIds.forEach((gradeId) => {
    const templateGrade = read(
      `templates/jugement-majoritaire/grades/${gradeId}`
    );
    write(`polls/${pollId}/grades/${gradeId}`, templateGrade);
  });

  res.redirect(302, `/polls/${pollId}/options`);
};
