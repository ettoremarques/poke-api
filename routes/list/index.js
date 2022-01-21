const { Router } = require("express");
const https = require("https");

const router = Router();

const httpsOptions = {
  hostname: "pokeapi.co",
  method: "GET",
  path: "/api/v2/pokemon",
};

router.get("/", (req, res) => {
  const options = {
    ...httpsOptions,
    path: httpsOptions.path + "?offset=0&limit=5000",
  };

  let body = "";

  const request = https.request(options, (res) => {
    res.on("data", (chunk) => {
      body += chunk;
    });

    res.on("end", function () {
      const response = JSON.parse(body);
      console.log("Got a response: ", response.picture);
      res.json(response.picture);
    });
  });

  request.on("error", (error) => {
    console.error(error);
  });

  request.end();
});

module.exports = router;
