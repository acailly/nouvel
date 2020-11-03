const { listKeys, read } = require("../../@storage");

module.exports = async function (req, res) {
  const itemIds = await listKeys(`lists/example`);

  const items = await Promise.all(
    itemIds.map(async (itemId) => {
      return await read(`lists/example/${itemId}`);
    })
  );

  res.render("index.html", { items: items });
};
