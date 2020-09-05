const { listKeys, read } = require("../../storage");

module.exports = function (req, res) {
  const itemIds = listKeys(`lists/example`);
  const items = itemIds.map((itemId) => {
    return read(`lists/example/${itemId}`);
  });

  console.log("DEBUG", items);

  res.render("index.html", { items: items });
};
