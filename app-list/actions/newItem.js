const { write } = require("../../@storage");

module.exports = async function (req, res) {
  const itemId = new Date().getTime().toString();

  const itemTitle = req.body.title;

  await write(`lists/example/${itemId}`, {
    title: itemTitle,
  });

  res.redirect(302, `/`);
};
