const { listKeys, read } = require("../../@storage");

module.exports = async function (req, res) {
  const repositoriesIds = await listKeys(`repositories`);

  const repositories = await Promise.all(
    repositoriesIds.map(async (repositoryId) => {
      return await read(`repositories/${repositoryId}`);
    })
  );

  res.render("repositories.html", { repositories: repositories });
};
