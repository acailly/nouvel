const {listKeys, read} = require("../../storage");

module.exports = function (req, res) {
  const pollId = req.params.id;

  const pollInfo = read(`polls/${pollId}/info`);
  const pollTitle = pollInfo.title;

  const pollVoters = listKeys(`polls/${pollId}/votes`);

  res.render("validatedVote.html", { pollId, pollTitle, pollVoters });
};
