var express = require("express");
var ejs = require("ejs");

// From absolute Yes to absolute No
var grades = [
  {
    name: "Oui",
    value: "oui",
  },
  {
    name: "Pourquoi pas",
    value: "pourquoipas",
  },
  {
    name: "Bof",
    value: "bof",
  },
  {
    name: "Non",
    value: "non",
  },
];

var polls = [
  {
    id: "aaa",
    title: "Est ce qu'on prend un chien ?",
    status: "open",
    options: ["oui", "non"],
    votes: [
      {
        name: "Riri",
        answers: ["pourquoipas", "non"],
      },
      {
        name: "Fifi",
        answers: ["oui", "bof"],
      },
    ],
  },
  {
    id: "bbb",
    title: "Qui va sortir les poubelles ?",
    status: "open",
    options: ["Alice", "Bob"],
    votes: [
      {
        name: "Riri",
        answers: ["pourquoipas", "non"],
      },
      {
        name: "Fifi",
        answers: ["oui", "bof"],
      },
    ],
  },
  {
    id: "ccc",
    title: "La meilleure série du moment ?",
    status: "open",
    options: ["Casa de papel", "Game of thrones"],
    votes: [
      {
        name: "Riri",
        answers: ["pourquoipas", "non"],
      },
      {
        name: "Fifi",
        answers: ["oui", "bof"],
      },
    ],
  },
  {
    id: "ddd",
    title: "De quelle couleur on repeint la chambre ?",
    status: "close",
    options: ["Bleu", "Rouge"],
    votes: [
      {
        name: "Riri",
        answers: ["pourquoipas", "non"],
      },
      {
        name: "Fifi",
        answers: ["oui", "bof"],
      },
    ],
    optionResults: [
      {
        grade: { name: "Oui", value: "oui" },
        score: 1,
        voteCountByGrade: [1, 1, 1, 1],
      },
      {
        grade: { name: "Bof", value: "bof" },
        score: 1,
        voteCountByGrade: [1, 1, 1, 1],
      },
    ],
    winnerOption: "Bleu",
  },
  {
    id: "eee",
    title: "Quand est ce qu'on prend l'apéro ?",
    status: "close",
    options: ["Maintenant", "Tout de suite"],
    votes: [
      {
        name: "Riri",
        answers: ["pourquoipas", "non"],
      },
      {
        name: "Fifi",
        answers: ["oui", "bof"],
      },
    ],
    optionResults: [
      {
        grade: { name: "Oui", value: "oui" },
        score: 1,
        voteCountByGrade: [1, 1, 1, 1],
      },
      {
        grade: { name: "Bof", value: "bof" },
        score: 1,
        voteCountByGrade: [1, 1, 1, 1],
      },
    ],
    winnerOption: "Maintenant",
  },
];

var app = express();
app.use(express.urlencoded({ extended: true }));

// from https://stackoverflow.com/questions/27383222/is-there-a-way-to-keep-the-file-extension-of-ejs-file-as-html
app.engine(".html", ejs.__express);

app.get("/", function (req, res) {
  res.render("index.html", { polls: polls });
});

app.post("/new", function (req, res) {
  const id = new Date().getTime().toString();
  const title = req.body.title;
  const poll = {
    id,
    title,
    status: "draft",
    options: [],
    votes: [],
  };
  polls.push(poll);
  res.redirect(302, `/polls/${poll.id}/options`);
});

app.get("/polls/:id/options", function (req, res) {
  const poll = polls.find((p) => p.id === req.params.id);
  res.render("options.html", { poll });
});

app.post("/polls/:id/add-option", function (req, res) {
  const poll = polls.find((p) => p.id === req.params.id);
  const option = req.body.option;
  poll.options.push(option);
  res.redirect(302, `/polls/${poll.id}/options`);
});

app.get("/polls", function (req, res) {
  res.render("polls.html", { polls: polls });
});

app.post("/polls/:id/publish", function (req, res) {
  const poll = polls.find((p) => p.id === req.params.id);
  poll.status = "open";
  res.redirect(302, `/polls/${poll.id}/published`);
});

app.get("/polls/:id/published", function (req, res) {
  const poll = polls.find((p) => p.id === req.params.id);
  res.render("published.html", { poll });
});

app.get("/polls/:id/vote", function (req, res) {
  const poll = polls.find((p) => p.id === req.params.id);
  res.render("vote.html", { poll, grades });
});

app.post("/polls/:id/validate-vote", function (req, res) {
  const poll = polls.find((p) => p.id === req.params.id);
  const name = req.body.name;
  const answers = poll.options.map((option, optionIndex) => {
    const optionAnswer = req.body[`option_${optionIndex}`];
    return optionAnswer;
  });
  const vote = { name, answers };
  poll.votes.push(vote);
  res.redirect(302, `/polls/${poll.id}/voted`);
});

app.get("/polls/:id/voted", function (req, res) {
  const poll = polls.find((p) => p.id === req.params.id);
  res.render("voted.html", { poll });
});

app.post("/polls/:id/close", function (req, res) {
  const poll = polls.find((p) => p.id === req.params.id);

  const optionResults = poll.options.map((option, optionIndex) => {
    const voteCount = poll.votes.length;

    const voteCountByGrade = grades.map(() => 0);
    poll.votes.forEach((vote) => {
      const answer = vote.answers[optionIndex];
      const gradeIndex = grades.findIndex((grade) => grade.value === answer);
      voteCountByGrade[gradeIndex]++;
    });

    let voteSum = 0;
    let optionGrade;
    for (let gradeIndex = grades.length - 1; gradeIndex >= 0; gradeIndex--) {
      optionGrade = grades[gradeIndex];
      voteSum += voteCountByGrade[gradeIndex];
      if (voteSum > voteCount / 2) {
        break;
      }
    }

    return { grade: optionGrade, score: voteSum, voteCountByGrade };
  });
  poll.optionResults = optionResults;

  let winnerOption;
  for (let gradeIndex = 0; gradeIndex < grades.length; gradeIndex++) {
    const grade = grades[gradeIndex];
    const optionIndexesWithMatchingGrade = optionResults
      .map((optionResult, optionResultIndex) => {
        if (optionResult.grade.value === grade.value) {
          return {
            optionIndex: optionResultIndex,
            optionScore: optionResult.score,
          };
        }
        return undefined;
      })
      .filter((optionIndex) => optionIndex !== undefined);
    if (optionIndexesWithMatchingGrade.length > 0) {
      const sortedOptionIndexesWithMatchingGrade = optionIndexesWithMatchingGrade.sort(
        (a, b) => {
          return b.score - a.score;
        }
      );
      const winnerOptionIndex =
        sortedOptionIndexesWithMatchingGrade[0].optionIndex;
      winnerOption = poll.options[winnerOptionIndex];
      break;
    }
  }
  poll.winnerOption = winnerOption;

  poll.status = "close";
  res.redirect(302, `/polls/${poll.id}/results`);
});

app.get("/polls/:id/results", function (req, res) {
  const poll = polls.find((p) => p.id === req.params.id);
  res.render("results.html", { poll, grades });
});

app.use(function (req, res, next) {
  res.status(404).render("404.html");
});

app.listen(8080);
