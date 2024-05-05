const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
  // The original URL, a string that is required
  originalUrl: {
    type: String,
    required: true
  },
  // The shortened URL, a string that is required and must be unique
  shortUrl: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  // The date and time when the URL was created, defaults to the current date and time
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Url', UrlSchema);