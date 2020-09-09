const { write } = require("../../storage");

module.exports = function (req, res) {
  console.log("DEBUG", "POSTTTTTTTTTTTTTTTTTTTTT")
  const itemId = new Date().getTime().toString();

  const itemTitle = req.body.title;
  write(`lists/example/${itemId}`, {
    title: itemTitle,
  });

  res.redirect(302, `/`);
};
