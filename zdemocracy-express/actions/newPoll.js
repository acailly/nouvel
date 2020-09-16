const {listKeys, read, write} = require("../../storage");

module.exports = async function (req, res) {
  const pollId = new Date().getTime().toString();

  const pollTitle = req.body.title;
  await write(`polls/${pollId}/info`, {
    title: pollTitle,
  });

  await write(`polls/${pollId}/status`, {
    id: "draft",
    label: "Draft",
  });

  const templateGradeIds = await listKeys(`templates/jugement-majoritaire/grades`);
  
  for (const gradeId of templateGradeIds) {
    const templateGrade = await read(
      `templates/jugement-majoritaire/grades/${gradeId}`
    );
    await write(`polls/${pollId}/grades/${gradeId}`, templateGrade);
  };

  res.redirect(302, `/polls/${pollId}/options`);
};
