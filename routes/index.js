const app = require("../index");

const list = require("./list");

const useRoutes = (app) => {
  app.use("", list);
};

module.exports = useRoutes;
