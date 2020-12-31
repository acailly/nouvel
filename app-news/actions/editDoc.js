const { write } = require("../../@storage");

module.exports = async function (req, res) {
  const itemKey = req.body.key;
  const itemContentJson = req.body.value;
  const itemContent = JSON.parse(itemContentJson);

  await write(itemKey, itemContent);

  res.redirect("back");
};
