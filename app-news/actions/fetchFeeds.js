const axios = require("axios");
const Parser = require("rss-parser");
const { listKeys, read, write, keyExists } = require("../../@storage");

const parser = new Parser({
  headers: {
    Accept: "application/rss+xml, application/xml",
  },
});

module.exports = async function (req, res) {
  const feedIds = await listKeys(`news/feeds`);

  const feeds = await Promise.all(
    feedIds.map(async (feedId) => {
      return await read(`news/feeds/${feedId}`);
    })
  );

  for (const feed of feeds) {
    let feedContent;
    try {
      const response = await axios.get(feed.url);
      feedContent = await parser.parseString(response.data);
    } catch (e) {
      console.error("[ERROR] Error with feed", feed.title, " - ", feed.url);
      continue;
    }

    const itemsWithTimestamp = feedContent.items.map((item) => {
      const timestamp = new Date(item.pubDate).getTime();
      item.timestamp = timestamp;
      return item;
    });

    for (const item of itemsWithTimestamp) {
      const entryHash = fastHash(item.link);
      const itemKey = `news/items/${feed.title}/${entryHash}`;

      // Item already exists
      if (await keyExists(itemKey)) {
        continue;
      }

      const newItem = {
        title: item.title,
        url: item.link,
        timestamp: item.timestamp,
      };
      await write(itemKey, newItem);
    }
  }

  res.redirect(302, `/`);
};

// From https://zserge.com/posts/rss/
function parseFeed(text) {
  const xml = new DOMParser().parseFromString(text, "text/xml");
  const map = (c, f) => Array.prototype.slice.call(c, 0).map(f);
  const tag = (item, name) =>
    (item.getElementsByTagName(name)[0] || {}).textContent;
  switch (xml.documentElement.nodeName) {
    case "rss":
      return map(xml.documentElement.getElementsByTagName("item"), (item) => ({
        link: tag(item, "link"),
        title: tag(item, "title"),
        timestamp: new Date(tag(item, "pubDate")),
      }));
    case "feed":
      return map(xml.documentElement.getElementsByTagName("entry"), (item) => ({
        link: map(item.getElementsByTagName("link"), (link) => {
          const rel = link.getAttribute("rel");
          if (!rel || rel === "alternate") {
            return link.getAttribute("href");
          }
        })[0],
        title: tag(item, "title"),
        timestamp: new Date(tag(item, "updated")),
      }));
  }
  return [];
}

//From https://stackoverflow.com/a/7616484
function fastHash(text) {
  var hash = 0,
    i,
    chr;
  for (i = 0; i < text.length; i++) {
    chr = text.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
