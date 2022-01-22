const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon",
});

module.exports = axiosInstance;
