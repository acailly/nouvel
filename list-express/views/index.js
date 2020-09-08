const { listKeys, read } = require("../../storage");

module.exports = async function (req, res) {
  const itemIds = listKeys(`lists/example`);
  const items = itemIds.map((itemId) => {
    return read(`lists/example/${itemId}`);
  });

  res.render("index.html", { items: items });
  // window.renderView("index.html", { items: items });
};
