const express = require("express");
const app = express();
const port = 3000;

const startRoutes = require("./routes");

startRoutes(app);

app.listen(port, () => console.log("Listening at http://localhost:3000"));

module.exports = app;
