const { Router } = require("express");
const axios = require('axios')

const router = Router();

const httpsOptions = {
  hostname: "pokeapi.co",
  method: "GET",
  path: "/api/v2/pokemon",
};

const axiosInstance = axios.create({
  baseUrl: 'https://pokeapi.co/api/v2/pokemon'
})

router.get("/", (req, res) => {
  const options = {
    ...httpsOptions,
    path: httpsOptions.path + "?offset=0&limit=5000",
  };

  let body = "";

  const request = axiosInstance.get('')

  const request = https.request(options, (response) => {
    response.on("data", (chunk) => {
      body += chunk;
    });

    response.on("end", function () {
      const response = JSON.parse(body);
      console.log("Got a response: ", response.results);
      res.json(response.results);
    });
  });

  request.on("error", (error) => {
    console.error(error);
  });

  request.end();
});

module.exports = router;
