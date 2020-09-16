const {listSubFolders, read} = require("../../storage");

module.exports = async function (req, res) {
  const pollsFolders = await listSubFolders(`polls`);

  const polls = await Promise.all(
    pollsFolders.map(async (pollFolder) => {
      const pollId = pollFolder;

      const info = await read(`polls/${pollId}/info`);
      const pollTitle = info.title;

      const status = await read(`polls/${pollId}/status`);
      const pollStatus = status.id;

      return {
        id: pollId,
        title: pollTitle,
        status: pollStatus,
      };
    })
  );

  res.render("polls.html", { polls: polls });
};
