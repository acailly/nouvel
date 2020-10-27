const {listKeys, read} = require("../../storage");

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

  res.render("publishedPoll.html", { pollId, pollTitle, pollOptions });
};
