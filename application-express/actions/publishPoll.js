const write = require("../../storage-file/write");

module.exports = function (req, res) {
  const pollId = req.params.id;

  write(`polls/${pollId}/status`, {
    id: "open",
    label: "Open",
  });

  res.redirect(302, `/polls/${pollId}/published`);
};
