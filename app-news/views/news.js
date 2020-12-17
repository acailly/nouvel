const { listKeys, read } = require("../../@storage");

module.exports = async function (req, res) {
  const itemIds = await listKeys(`news/items`);

  const items = await Promise.all(
    itemIds.map(async (itemId) => {
      return await read(`news/items/${itemId}`);
    })
  );

  res.render("news.html", { items: items });
};
