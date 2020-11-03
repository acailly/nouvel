const { listKeys, write } = require("../../@storage");

module.exports = async function (req, res) {
  const pollId = req.params.id;

  const optionName = req.body.option;

  const optionIds = await listKeys(`polls/${pollId}/options`);
  const optionCount = optionIds.length;
  const optionPosition = optionCount + 1;
  const optionId = "" + optionPosition;

  await write(`polls/${pollId}/options/${optionId}`, {
    id: optionId,
    label: optionName,
    position: optionPosition,
  });

  res.redirect(302, `/polls/${pollId}/options`);
};
