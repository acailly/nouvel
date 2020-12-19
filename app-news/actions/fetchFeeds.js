const axios = require("axios");
const Parser = require("rss-parser");
const Twitter = require("twitter");
const { listKeys, read, write } = require("../../@storage");
const shouldAddNewItem = require("../rules/shouldAddNewItem");

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
    let items;
    try {
      items = await fetchFeedContent(feed);
    } catch (e) {
      console.error("[ERROR] Error with feed", feed.title);
      continue;
    }

    for (const item of items) {
      const entryHash = fastHash(item.link);
      const itemKey = `news/items/${feed.title}/${entryHash}`;

      // Item should not be created (already exists, deleted, whatever)
      if (!(await shouldAddNewItem(itemKey))) {
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

  res.redirect("back");
};

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

async function fetchFeedContent(feed) {
  if (feed.type === "twitter") {
    return await fetchTwitterFeedContent(feed);
  }

  return await fetchRSSFeedContent(feed);
}

async function fetchTwitterFeedContent(feed) {
  //From https://apps.twitter.com/
  const client = new Twitter({
    consumer_key: feed.consumer_key,
    consumer_secret: feed.consumer_secret,
    access_token_key: feed.access_token_key,
    access_token_secret: feed.access_token_secret,
  });

  const params = {
    count: 200,
    //https://developer.twitter.com/en/docs/tweets/tweet-updates
    tweet_mode: "extended",
  };

  const fetchPromise = new Promise((resolve, reject) => {
    // https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-home_timeline.html
    client.get("statuses/home_timeline", params, function (error, tweets) {
      if (error) {
        reject(error);
      }
      const items = tweets.map((tweet) => {
        return {
          title: `${tweet.user.name} - ${tweet.full_text}`,
          link: `https://twitter.com/i/web/status/${tweet.id_str}`,
          timestamp: new Date(tweet.created_at).getTime(),
        };
      });
      resolve(items);
    });
  });
  return await fetchPromise;
}

async function fetchRSSFeedContent(feed) {
  const response = await axios.get(feed.url);
  const feedContent = await parser.parseString(response.data);

  const itemsWithTimestamp = feedContent.items.map((item) => {
    const timestamp = new Date(item.pubDate).getTime();
    item.timestamp = timestamp;
    return item;
  });

  return itemsWithTimestamp;
}
