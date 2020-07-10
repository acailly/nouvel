const listKeys = require("../../storage-file/listKeys");
const write = require("../../storage-file/write");

module.exports = function (req, res) {
  const pollId = req.params.id;
  const name = req.body.name;

  const optionIds = listKeys(`polls/${pollId}/options`);

  const answers = {};
  optionIds.map((optionId) => {
    const optionAnswer = req.body[`option_${optionId}`];
    answers[optionId] = optionAnswer;
  });
  write(`polls/${pollId}/votes/${name}`, answers);

  res.redirect(302, `/polls/${pollId}/voted`);
};
