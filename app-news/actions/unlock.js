const { unlock } = require("../../@secrets");

module.exports = async function (req, res) {
  const password = req.body.password;
  unlock(password);

  res.redirect(302, `/news`);
};
