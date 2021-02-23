const { read } = require("../../@storage");
const configuration = require("../../@configuration");

module.exports = async function (req, res) {
  const fetchFeedsInfo = await read("_local/feed_status");
  const queued = fetchFeedsInfo ? fetchFeedsInfo.queued : [];
  const started = fetchFeedsInfo ? fetchFeedsInfo.started : [];
  const finished = fetchFeedsInfo ? fetchFeedsInfo.finished : [];

  res.render("partials/feedsStatus.html", {
    queued,
    started,
    finished,
  });
};
