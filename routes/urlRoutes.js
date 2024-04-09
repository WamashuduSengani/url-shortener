const express = require("express");
const router = express.Router();
const isValidUrl = require("../services/validation");
const { findUrl, createAndSaveUrl } = require("../services/database");
const Url = require("../models/url");

router.post("/api/url/shorten", async (req, res) => {
  const { originalUrl } = req.body;

  // Validate URL
  if (!isValidUrl(originalUrl)) {
    return res
      .status(400)
      .json({ error: "Invalid URL. Please enter a valid URL." });
  }

  try {
    // Check if the URL has already been shortened
    let url = await findUrl(originalUrl);

    if (url) {
      // If the URL is in the database, return it
      res.json(url);
    } else {
      // If the URL is not in the database, create a new shortened URL
      url = await createAndSaveUrl(originalUrl);
      res.json(url);
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Server error while processing the request." });
  }
});

router.get("/:shortUrl", async (req, res) => {
  try {
    const url = await Url.findOne({ shortUrl: req.params.shortUrl });

    if (url) {
      // If the URL is found, redirect to the original URL
      res.redirect(url.originalUrl);
    } else {
      // If the URL is not found, return a 404 status
      res.status(404).json({ error: "URL not found." });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Server error while processing the request." });
  }
});

module.exports = router;
