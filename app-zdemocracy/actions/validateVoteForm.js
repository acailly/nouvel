const { listKeys, write } = require("../../@storage");

module.exports = async function (req, res) {
  const pollId = req.params.id;
  const name = req.body.name;

  const optionIds = await listKeys(`polls/${pollId}/options`);

  const answers = {};
  for (const optionId of optionIds) {
    const optionAnswer = req.body[`option_${optionId}`];
    answers[optionId] = optionAnswer;
  }
  await write(`polls/${pollId}/votes/${name}`, answers);

  res.redirect(302, `/polls/${pollId}/voted`);
};
