const path = require("path");

const configuration = require("../../configuration");

const folderFileList = require("../../storage-file/folderFileList");
const fileReadContent = require("../../storage-file/fileReadContent");

module.exports = function (req, res) {
  const pollId = req.params.id;

  const pollTitle = fileReadContent(
    path.join(configuration.pollsFolder, pollId, "title.txt")
  );

  const votersFolders = folderFileList(
    path.join(configuration.pollsFolder, pollId, "votes")
  );
  const pollVoters = votersFolders.map((voterFolder) => {
    return path.basename(voterFolder);
  });

  res.render("validatedVote.html", { pollId, pollTitle, pollVoters });
};
