require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Url = require("./models/url");

const app = express();

(async () => {
  try {
    //ensuring that indexes are created for the Url model in MongoDB.
    await Url.ensureIndexes();
  } catch (err) {
    console.error(err);
  }
})();

// Body parser middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Routes
app.use("/", require("./routes/urlRoutes"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Internal server error:", err);
  res.status(500).send("Internal server error");
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
