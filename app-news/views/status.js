module.exports = function (req, res, next) {
  const status = new Date().toString();
  // TODO ACY
  console.log("DEBUG status", status);

  res.render("partials/status.html", {
    status,
  });
};
