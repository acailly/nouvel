const { remove } = require("../../@storage");

module.exports = async function (req, res) {
  const feedId = req.body.id;
  const itemKey = `news/feeds/${feedId}`;

  await remove(itemKey);

  res.redirect("back");
};
