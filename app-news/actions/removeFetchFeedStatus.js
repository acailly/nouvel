const { remove } = require("../../@storage");

module.exports = async function (req, res) {
  await remove("_local/feed_status");
  res.redirect("back");
};
