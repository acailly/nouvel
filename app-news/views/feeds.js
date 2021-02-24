const { listKeys, read } = require("../../@storage");

module.exports = async function (req, res) {
  const feedIds = await listKeys(`news/feeds`);

  const feeds = await Promise.all(
    feedIds.map(async (feedId) => {
      const feedContent = await read(`news/feeds/${feedId}`);
      return { id: feedId, ...feedContent };
    })
  );

  res.render("feeds.html", { feeds: feeds });
};
