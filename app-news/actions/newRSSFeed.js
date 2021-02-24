const { write } = require("../../@storage");

module.exports = async function (req, res) {
  const feedId = new Date().getTime().toString();

  const feedTitle = req.body.title;
  const feedURL = req.body.url;

  await write(`news/feeds/${feedId}`, {
    title: feedTitle,
    url: feedURL,
  });

  res.redirect(302, `/feeds`);
};
