const { listKeys, read } = require("../../@storage");

module.exports = async function (req, res) {
  const feedIds = await listKeys(`news/feeds`);

  const feeds = await Promise.all(
    feedIds.map(async (feedId) => {
      return await read(`news/feeds/${feedId}`);
    })
  );

  res.render("feeds.html", { feeds: feeds });
};
