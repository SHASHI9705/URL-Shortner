const { nanoid } = require("nanoid");

const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url required" });
  const shortId = nanoid(8);
  await URL.create({
    shortID: shortId,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });
  return res.render("home", {
    id: shortId,
  });
}

async function handleGetAnalytics(req, res) {
  const shortID = req.params.shortID;
  const result = await URL.findOne({ shortID });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};
