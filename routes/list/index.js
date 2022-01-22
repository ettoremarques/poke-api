const { Router } = require("express");

const axiosInstance = require("../../axiosInstance");

const router = Router();

router.get("/list", (req, res) => {
  const callback = (result) => {
    res.status(200).json(result);
  };

  const error = () => {
    res.status(400);
  };

  getPokemons(req, callback, error);
});

module.exports = router;

function getPokemons(req, cb, err) {
  const params = {
    offset: parseInt(req.query.offset),
    limit: 20,
  };

  return axiosInstance
    .get("/", { params })
    .then((pokemons) => {
      handlePokemonData(pokemons, params, cb);
    })
    .catch(() => {
      err();
    });
}

const handlePokemonData = (pokemons, params, cb) => {
  const pokemonsPromisesArray = [];

  pokemons.data.results.forEach((pokemon) => {
    pokemonsPromisesArray.push(axios.get(pokemon.url));
  });

  Promise.all(pokemonsPromisesArray).then((pokemonsData) => {
    const pokemonsArray = pokemonsData.map((pokemon) => {
      const { name, sprites, id, types } = pokemon.data;

      const remodeledTypes = types.map((type) => type.type.name);
      const defaultSprite = sprites.front_default;

      return { id, name, sprite: defaultSprite, types: remodeledTypes };
    });

    const result = {
      pokemons: pokemonsArray,
      nextOffset: params.offset + params.limit,
    };

    cb(result);
  });
};
