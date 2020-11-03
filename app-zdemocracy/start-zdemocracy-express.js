const path = require("path");
const express = require("express");
const ejs = require("ejs");

const configuration = require("../@configuration");

// VIEWS
const viewIndex = require("./views/index");
const viewPolls = require("./views/polls");
const viewPollOptions = require("./views/pollOptions");
const viewPublishedPoll = require("./views/publishedPoll");
const viewVoteForm = require("./views/voteForm");
const viewValidatedVote = require("./views/validatedVote");
const viewPollResults = require("./views/pollResults");
const view404 = require("./views/404");

// ACTIONS
const actionNewPoll = require("./actions/newPoll");
const actionAddOption = require("./actions/addOption");
const actionPublishPoll = require("./actions/publishPoll");
const actionValidateVoteForm = require("./actions/validateVoteForm");
const actionClosePoll = require("./actions/closePoll");

module.exports = function () {
  const app = express();
  app.use(express.urlencoded({ extended: true }));

  // from https://stackoverflow.com/questions/27383222/is-there-a-way-to-keep-the-file-extension-of-ejs-file-as-html
  app.engine(".html", ejs.__express);

  app.use(express.static(path.join(__dirname, "public")));
  app.set("views", path.join(__dirname, "views"));

  // ROUTES
  app.get("/", viewIndex);
  app.get("/polls", viewPolls);
  app.post("/new-poll", actionNewPoll);
  app.get("/polls/:id/options", viewPollOptions);
  app.post("/polls/:id/add-option", actionAddOption);
  app.post("/polls/:id/publish-poll", actionPublishPoll);
  app.get("/polls/:id/published", viewPublishedPoll);
  app.get("/polls/:id/vote", viewVoteForm);
  app.post("/polls/:id/validate-vote", actionValidateVoteForm);
  app.get("/polls/:id/voted", viewValidatedVote);
  app.post("/polls/:id/close", actionClosePoll);
  app.get("/polls/:id/results", viewPollResults);
  app.use(view404);

  app.listen(configuration.zdemocracyServerPort);
};
