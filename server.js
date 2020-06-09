var express = require("express");
var ejs = require("ejs");

var app = express();

// from https://stackoverflow.com/questions/27383222/is-there-a-way-to-keep-the-file-extension-of-ejs-file-as-html
app.engine(".html", ejs.__express);

app.get("/", function (req, res) {
  res.render("index.html");
});

app.get("/options", function (req, res) {
  res.render("options.html");
});

app.get("/options2", function (req, res) {
  res.render("options2.html");
});

app.get("/options3", function (req, res) {
  res.render("options3.html");
});

app.get("/polls", function (req, res) {
  res.render("polls.html");
});

app.get("/publish", function (req, res) {
  res.render("publish.html");
});

app.get("/results", function (req, res) {
  res.render("results.html");
});

app.get("/vote", function (req, res) {
  res.render("vote.html");
});

app.get("/voted", function (req, res) {
  res.render("voted.html");
});

app.use(function (req, res, next) {
  res.status(404).render("404.html");
});

app.listen(8080);
