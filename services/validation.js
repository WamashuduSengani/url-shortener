const validUrl = require("valid-url");

const isValidUrl = (url) => {
  // If the URL is valid, isUri returns the URL
  // If the URL is not valid, isUri returns undefined
  return validUrl.isUri(url);
};

module.exports = isValidUrl;
