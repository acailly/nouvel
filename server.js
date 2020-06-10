var express = require("express");
var ejs = require("ejs");

var polls = [
  {
    id: "aaa",
    title: "Est ce qu'on prend un chien ?",
    status: "open",
    options: ["oui", "non"]
  },
  {
    id: "bbb",
    title: "Qui va sortir les poubelles ?",
    status: "open",
    options: ["Alice", "Bob"]
  },
  {
    id: "ccc",
    title: "La meilleure série du moment ?",
    status: "open",
    options: ["Casa de papel", "Game of thrones"]
  },
  {
    id: "ddd",
    title: "De quelle couleur on repeint la chambre ?",
    status: "close",
    options: ["Bleu", "Rouge"]
  },
  {
    id: "eee",
    title: "Quand est ce qu'on prend l'apéro ?",
    status: "close",
    options: ["Maintenant", "Tout de suite"]
  }
]

var app = express();
app.use(express.urlencoded({extended: true}))

// from https://stackoverflow.com/questions/27383222/is-there-a-way-to-keep-the-file-extension-of-ejs-file-as-html
app.engine(".html", ejs.__express);


app.get("/", function (req, res) {
  res.render("index.html", {polls: polls});
});

app.post("/new", function (req, res) {
  const id = new Date().getTime().toString()
  const title = req.body.title
  const poll = {
    id,
    title,
    status: 'draft',
    options: []
  }
  polls.push(poll)
  res.redirect(302, `/polls/${poll.id}/options`);
});

app.get("/polls/:id/options", function (req, res) {
  const poll = polls.find(p => p.id === req.params.id)
  res.render("options.html", {poll});
});

app.post("/polls/:id/add-option", function (req, res) {
  const poll = polls.find(p => p.id === req.params.id)
  const option = req.body.option
  poll.options.push(option)
  res.redirect(302, `/polls/${poll.id}/options`);
});

app.get("/polls", function (req, res) {
  res.render("polls.html", {polls: polls});
});

app.post("/polls/:id/publish", function (req, res) {
  const poll = polls.find(p => p.id === req.params.id)
  poll.status = 'open'
  res.redirect(302, `/polls/${poll.id}/published`);
});

app.get("/polls/:id/published", function (req, res) {
  const poll = polls.find(p => p.id === req.params.id)
  res.render("published.html", {poll});
});

app.get("/polls/:id/results", function (req, res) {
  res.render("results.html");
});

app.get("/polls/:id/vote", function (req, res) {
  const poll = polls.find(p => p.id === req.params.id)
  res.render("vote.html", {poll});
});

app.get("/voted", function (req, res) {
  res.render("voted.html");
});

app.use(function (req, res, next) {
  res.status(404).render("404.html");
});

app.listen(8080);
