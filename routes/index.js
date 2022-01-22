const list = require("./list");
const pokemon = require("./pokemon");

const useRoutes = (app) => {
  app.use("", list);
  app.use("/pokemon", pokemon);
};

module.exports = useRoutes;
