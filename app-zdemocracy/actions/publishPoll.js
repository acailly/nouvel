const { write } = require("../../@storage");

module.exports = async function (req, res) {
  const pollId = req.params.id;

  await write(`polls/${pollId}/status`, {
    id: "open",
    label: "Open",
  });

  res.redirect(302, `/polls/${pollId}/published`);
};
