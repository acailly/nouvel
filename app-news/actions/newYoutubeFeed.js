const { write } = require("../../@storage");

module.exports = async function (req, res) {
  const feedId = new Date().getTime().toString();

  const youtubeChannelTitle = req.body.title;
  const youtubeChannelURL = req.body.url;

  let youtubeChannelID = youtubeChannelURL;

  const youtubeChannelURLPrefix = "https://www.youtube.com/channel/";
  if (youtubeChannelURL.startsWith(youtubeChannelURLPrefix)) {
    youtubeChannelID = youtubeChannelURL.slice(youtubeChannelURLPrefix.length);
  }

  const youtubeChannelFeedURL = `https://www.youtube.com/feeds/videos.xml?channel_id=${youtubeChannelID}`;

  await write(`news/feeds/${feedId}`, {
    title: youtubeChannelTitle,
    url: youtubeChannelFeedURL,
  });

  res.redirect(302, `/feeds`);
};
