const { listKeys, read } = require("../../@storage");

module.exports = async function (req, res) {
  const pollId = req.params.id;

  const pollInfo = await read(`polls/${pollId}/info`);
  const pollTitle = pollInfo.title;

  const pollVoters = await listKeys(`polls/${pollId}/votes`);

  res.render("validatedVote.html", { pollId, pollTitle, pollVoters });
};
