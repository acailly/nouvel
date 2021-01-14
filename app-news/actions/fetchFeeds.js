const axios = require("axios");
const Parser = require("rss-parser");
const Twitter = require("twitter-lite");
const { listKeys, read, write, keyExists } = require("../../@storage");
const { isLocked, decrypt } = require("../../@secrets");
const deletedFlagPathFromPath = require("../domain/deletedFlagPathFromPath");

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
    // Fetch feed content
    let items;
    try {
      items = await fetchFeedContent(feed);
    } catch (e) {
      console.error("[ERROR] Error with feed", feed.title);
      // DEBUG
      console.error(e);
      continue;
    }

    const feedFolder = `news/items/${feed.title}`;

    // Process each feed item
    for (const item of items) {
      const entryHash = fastHash(item.link);
      const itemKey = `${feedFolder}/${entryHash}`;

      // Item already exists, skip
      const itemAlreadyExists = await keyExists(itemKey);
      if (itemAlreadyExists) {
        continue;
      }

      // Item has already been deleted, skip
      const deletedFlagItemKey = deletedFlagPathFromPath(itemKey);
      const itemHasBeenDeleted = await keyExists(deletedFlagItemKey);
      if (itemHasBeenDeleted) {
        continue;
      }

      // Write new item
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
  return hash.toString();
}

async function fetchFeedContent(feed) {
  if (feed.type === "twitter") {
    return await fetchTwitterFeedContent(feed);
  }

  return await fetchRSSFeedContent(feed);
}

async function fetchTwitterFeedContent(feed) {
  let consumerKey = feed.consumer_key;
  let consumerSecret = feed.consumer_secret;
  let accessTokenKey = feed.access_token_key;
  let accessTokenSecret = feed.access_token_secret;

  if (!isLocked()) {
    consumerKey = await decrypt(consumerKey);
    consumerSecret = await decrypt(consumerSecret);
    accessTokenKey = await decrypt(accessTokenKey);
    accessTokenSecret = await decrypt(accessTokenSecret);
  }

  //From https://apps.twitter.com/
  const client = new Twitter({
    // TODO Activer quand il y a besoin de CORS
    // From https://github.com/draftbit/twitter-lite/issues/41#issuecomment-467403918
    // subdomain: "acailly-cors-anywhere.herokuapp.com/https://api",
    subdomain: "api",
    version: "1.1",
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
    access_token_key: accessTokenKey,
    access_token_secret: accessTokenSecret,
  });

  const params = {
    count: 200,
    //https://developer.twitter.com/en/docs/tweets/tweet-updates
    tweet_mode: "extended",
  };

  // https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-home_timeline.html
  const tweets = await client.get("statuses/home_timeline", params);

  console.log("DEBUG", tweets);

  const items = tweets.map((tweet) => {
    return {
      title: `${tweet.user.name} - ${tweet.full_text}`,
      link: `https://twitter.com/i/web/status/${tweet.id_str}`,
      timestamp: new Date(tweet.created_at).getTime(),
    };
  });

  return items;
}

async function fetchRSSFeedContent(feed) {
  // TODO Activer quand il y a besoin de CORS
  // const corsProxifiedURL = `https://acailly-cors-anywhere.herokuapp.com/${feed.url}`;
  const response = await axios.get(feed.url);
  const feedContent = await parser.parseString(response.data);

  const itemsWithTimestamp = feedContent.items.map((item) => {
    const timestamp = new Date(item.pubDate).getTime();
    item.timestamp = timestamp;
    return item;
  });

  return itemsWithTimestamp;
}
