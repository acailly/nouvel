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

  res.render("publishedPoll.html", { pollId, pollTitle, pollOptions });
};
