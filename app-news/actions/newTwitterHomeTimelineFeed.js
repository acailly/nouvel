const { write } = require("../../@storage");
const { encrypt } = require("../../@secrets");

module.exports = async function (req, res) {
  const feedId = new Date().getTime().toString();

  const feedTitle = req.body.title;
  const consumer_key = await encrypt(req.body.consumerKey);
  const consumer_secret = await encrypt(req.body.consumerSecret);
  const access_token_key = await encrypt(req.body.accessTokenKey);
  const access_token_secret = await encrypt(req.body.accessTokenSecret);

  await write(`news/feeds/${feedId}`, {
    type: "twitter",
    title: feedTitle,
    consumer_key,
    consumer_secret,
    access_token_key,
    access_token_secret,
  });

  res.redirect(302, `/feeds`);
};
