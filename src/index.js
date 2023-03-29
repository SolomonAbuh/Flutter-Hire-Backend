const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("../src/utils/logger");
const authRoutes = require("../src/routes/authRoute");
const { username, password } = require("./keys");

const app = express();
const PORT = process.env.PORT || 3000;

// connect to MongoDB database
mongoose
  .connect(
    `mongodb+srv://${username}:${password}@cluster0.fulrwmv.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error(`Error connecting to MongoDB: ${error.message}`);
  });

// middleware for parsing request body
app.use(bodyParser.json());

// middleware for logging all requests
app.use((req, res, next) => {
  logger.info(`[${req.method}] ${req.path}`);
  next();
});

// authentication routes
app.use(authRoutes);

// error handling middleware
app.use((err, req, res, next) => {
  logger.error(`Error handling request: ${err.message}`);
  res.status(500).send("Something went wrong!");
});

// start the server
app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
});
