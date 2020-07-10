const listKeys = require("../../storage-file/listKeys");
const write = require("../../storage-file/write");

module.exports = function (req, res) {
  const pollId = req.params.id;

  const optionName = req.body.option;

  const optionIds = listKeys(`polls/${pollId}/options`);
  const optionCount = optionIds.length;
  const optionPosition = optionCount + 1;
  const optionId = "" + optionPosition;

  write(`polls/${pollId}/options/${optionId}`, {
    id: optionId,
    label: optionName,
    position: optionPosition,
  });

  res.redirect(302, `/polls/${pollId}/options`);
};
