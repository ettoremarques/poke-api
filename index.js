const express = require("express");
const app = express();
const port = 3000;

const startRoutes = require("./routes");

startRoutes(app);

const server = app.listen(port, () =>
  console.log("Listening at http://localhost:3000")
);

server.keepAliveTimeout = 0;

module.exports = app;
