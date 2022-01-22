const { Router } = require("express");
const axiosInstance = require("../../axiosInstance");

const router = Router();

router.get("/:pokemon", (req, res) => {
  const callback = (result) => {
    res.status(200).json(result);
  };

  const error = () => {
    res.status(400);
  };

  getPokemon(req.params.pokemon, callback, error);
});

const getPokemon = (pokemon, cb, err) => {
  axiosInstance
    .get(`/${pokemon}`)
    .then((pokemon) => {
      cb(pokemon.data);
    })
    .catch(() => {
      err();
    });
};

module.exports = router;
