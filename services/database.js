const Url = require("../models/url");
const shortid = require("shortid");

const findUrl = async (originalUrl) => {
  return await Url.findOne({ originalUrl });
};

const createAndSaveUrl = async (originalUrl) => {
  const shortUrl = shortid.generate();

  //Creating a new Url document with the originalUrl and shortUrl
  const url = new Url({
    originalUrl,
    shortUrl,
  });
  await url.save();
  return url;
};

module.exports = { findUrl, createAndSaveUrl };
