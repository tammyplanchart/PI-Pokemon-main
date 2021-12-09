const axios = require('axios')
const { Router } = require('express');/// creo mi archivo router
const router = Router(); // este router maneja pokemons
const { Pokemon } = require("../db.js")



/* GET pokemons listing. */
router.get('/', function (req, res) {
    const getFromPokeapiPromise = axios
        .get("https://pokeapi.co/api/v2/pokemon/" + (req.query.name || ""), { params: { limit: 40 } })
        .then(pokemonsResponse => {// uso el then para la promise qu eme indica que cuando se termine de correr lo anterior recien ahi, corre esto
            console.log("ya pedi la lista de pokemons")

            let results = []
            if (req.query.name) {
                results = [pokemonsResponse.data]
            } else {
                results = pokemonsResponse.data.results
            }

            const pokemonRequests = results.map(result => {//para cada resultado tengo que pedir la info del pokemon entero nueva a la url para poder obtener la imagen y los tipos, por eso uso el result.url
                if (result.url) {
                    console.log("pidiendo el pokemon ", result.url)
                    return axios
                        .get(result.url)
                        .then(pokemonResponse => ({
                            image: pokemonResponse.data.sprites.front_default, // la imagen
                            types: pokemonResponse.data.types.map(type => type.type.name), // con el map recorro cada uno de los types y entro a los datos que son type y name
                            name: pokemonResponse.data.name,
                            id: pokemonResponse.data.id,
                            attack: pokemonResponse.data.stats.find(stat => stat.stat.name === "attack").base_stat
                        })
                        )

                } else {
                    return {
                        image: result.sprites.front_default, // la imagen
                        types: result.types.map(type => type.type.name), // con el map recorro cada uno de los types y entro a los datos que son type y name
                        name: result.name,
                        id: result.id,
                        attack: result.attack
                    }
                }
            })
            return Promise.all(pokemonRequests);
        }).catch(() => []);
    // si no se puede obtener la lista de pokemons, se devuelve un arreglo vacio
    // porque si esta promise es rejected, el promise.all del final va a ser rejected y podria haber habido pokemons en la base de datos

    // a partir de aca busco en la base de datos
    let where = {}
    if (req.query.name) {
        where = { name: req.query.name }
    }
    const getFromDBPromise = Pokemon.findAll({
        where: where,
        include: {
            association: 'types'
        }
    }).then(pokemons => pokemons.map(pokemon => ({ // quiero que me traiga los nombres de los tipos de cada pokemon
        id: pokemon.id,
        name: pokemon.name,
        attack: pokemon.attack,
        types: pokemon.types.map(type => type.name),
        image: pokemon.image || "https://media2.giphy.com/media/A6yteqf4isDwA/giphy.gif"
    })));

    // a partir de aca junto los pokemons de pokeapi y la de la base de datos

    return Promise.all([getFromPokeapiPromise, getFromDBPromise]).then(([pokeapiPokemons, dbPokemons]) => {
        console.log("ya pedi todos los pokemons")
        res.send([...pokeapiPokemons, ...dbPokemons]);// con el res send hago que la api me devuelva la info de los pokemons
    }).catch((err) => {
        console.error(err)
        res.send([])
    })
});

/* GET pokemon detail. es para pedir un solo un solo pokemon
 Los campos mostrados en la ruta principal para cada pokemon (imagen, nombre y tipos)
 Número de Pokemon (id)
 Estadísticas (vida, fuerza, defensa, velocidad)
 Altura y peso
  */
router.get('/:idPokemon', function (req, res) {// router maneja como definimos en el archivo index.js los barra pokemons, aqui se sobre entiende que como hay un router maneja pokemons
    if (req.params.idPokemon.includes("-")) {
        Pokemon.findOne({
            where: { id: req.params.idPokemon },
            include: {
                association: 'types'
            }
        })
            .then(pokemon => {
                res.send({// aqui pongo todo en un solo objeto la info de un solo pokemon
                    ...pokemon.dataValues,
                    image: pokemon.dataValues.image || "https://media2.giphy.com/media/A6yteqf4isDwA/giphy.gif",
                    types: pokemon.dataValues.types.map(type => type.dataValues.name) // formatear los tipos para que me devuelva solo el nombre de los tipos
                });
            })
    } else {
        axios
            .get("https://pokeapi.co/api/v2/pokemon/" + req.params.idPokemon)
            .then(pokemonResponse => {// uso el then para la promise qu eme indica que cuando se termine de correr lo anterior recien ahi, core esto
                console.log("ya pedi el detalle del pokemon", pokemonResponse.data.stats);;;

                const pokemon = {// aqui pongo todo en un solo objeto la info de un solo pokemon
                    image: pokemonResponse.data.sprites.front_default, // la imagen
                    types: pokemonResponse.data.types.map(type => type.type.name), // con el map recorro cada uno de los types y entro a los datos que son type y name
                    name: pokemonResponse.data.name,
                    pokemonId: pokemonResponse.data.id,
                    hp: pokemonResponse.data.stats.find(stat => stat.stat.name === "hp").base_stat,// con el find busco un stat que es un array con la info que necesito y le coloco una arrow f, que me busca el nombre del stat que necesito
                    attack: pokemonResponse.data.stats.find(stat => stat.stat.name === "attack").base_stat,                                         // con el base stat es el valor que busco lo coloco una vez lo pido
                    defense: pokemonResponse.data.stats.find(stat => stat.stat.name === "defense").base_stat,
                    speed: pokemonResponse.data.stats.find(stat => stat.stat.name === "speed").base_stat,
                    height: pokemonResponse.data.height,
                    weight: pokemonResponse.data.weight
                }
                res.send(pokemon);
            })
    }

});

router.post('/', function (req, res) {
    console.log("me mandaron el body con los datos para crear un pokemon", req.body);

    const { types, ...rest } = req.body

    Pokemon.create(rest).then(pokemonCreado => { //creo el pokemon uso el then pq pokemon.create es asincronico por lo que devuelve una promesapokemonCreado
        pokemonCreado.addTypes(types).then(() => {
            res.send(pokemonCreado)
        })
    })
})

// trato de crear un nuevo pkemon                  
// necesito la informacion del body
// creo el pokmon

//mis pokemons me guardo en la base de datos solo los que creo yo o los tipos el resto los saco desde la poke api
module.exports = router;