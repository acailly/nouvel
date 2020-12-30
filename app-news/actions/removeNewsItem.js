const removeNewsItem = require("../domain/removeNewsItem");

module.exports = async function (req, res) {
  const itemKey = req.body.key;

  await removeNewsItem(itemKey);

  res.redirect("back");
};
