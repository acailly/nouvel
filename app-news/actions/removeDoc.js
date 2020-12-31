const { remove } = require("../../@storage");

module.exports = async function (req, res) {
  const itemKey = req.body.key;

  await remove(itemKey);

  res.redirect("back");
};
