const listSubFolders = require("../../storage-file/listSubFolders");
const read = require("../../storage-file/read");

module.exports = function (req, res) {
  const pollsFolders = listSubFolders(`polls`);

  const polls = pollsFolders.map((pollFolder) => {
    const pollId = pollFolder;

    const info = read(`polls/${pollId}/info`);
    const pollTitle = info.title;

    const status = read(`polls/${pollId}/status`);
    const pollStatus = status.id;

    return {
      id: pollId,
      title: pollTitle,
      status: pollStatus,
    };
  });

  res.render("polls.html", { polls: polls });
};
