const axios = require('axios')
const { Router } = require('express');/// creo mi archivo router
const router = Router(); // este router maneja pokemons
const {Pokemon} = require("../db.js")



/* GET pokemons listing. */
router.get('/', function(req, res) {// router maneja como definimos en el archivo index.js los barra pokemons, aqui se sobre entiende que como hay un router maneja pokemons
    if(req.query.name){ // hago este if por si el postman me pasa un nombre voy a buscar el pokemon por ese nombre q me pasaron
        axios
        .get("https://pokeapi.co/api/v2/pokemon/" + req.query.name)
        .then(pokemonResponse=>{// uso el then para la promise qu eme indica que cuando se termine de correr lo anterior recien ahi, core esto
            console.log("ya pedi el detalle del pokemon", pokemonResponse.data.stats);;;
             console.log("no existe ese pokemon")
            const pokemon = {// aqui pongo todo en un solo objeto la info de un solo pokemon
                image: pokemonResponse.data.sprites.front_default, // la imagen
                types: pokemonResponse.data.types.map(type=>type.type.name), // con el map recorro cada uno de los types y entro a los datos que son type y name
                name: pokemonResponse.data.name
            }   
            res.send(pokemon);
        })
    } else {

    axios
    .get("https://pokeapi.co/api/v2/pokemon")
    .then(pokemonsReponse=>{// uso el then para la promise qu eme indica que cuando se termine de correr lo anterior recien ahi, core esto
        console.log("ya pedi la lista de pokemons", pokemonsReponse)

        const pokemonRequests = pokemonsReponse.data.results.map(result => //para cada resultado tengo que pedir la info del pokemon entero nueva a la url para poder obtener la imagen y los tipos, por eso uso el result.url
            axios
            .get(result.url)
            .then(pokemonResponse => ({
                    image: pokemonResponse.data.sprites.front_default, // la imagen
                    types: pokemonResponse.data.types.map(type=>type.type.name), // con el map recorro cada uno de los types y entro a los datos que son type y name
                    name: pokemonResponse.data.name
                })
            )
        )

        Promise.all(pokemonRequests).then(pokemons=>{
            console.log("ya pedi cada uno de los pokemons")
            console.log(pokemons)
            res.send(pokemons);// con el res send hago que la api me devuelva la info de los pokemons
        })
    })}
    
});

/* GET pokemon detail. es para pedir un solo un solo pokemon
 Los campos mostrados en la ruta principal para cada pokemon (imagen, nombre y tipos)
 Número de Pokemon (id)
 Estadísticas (vida, fuerza, defensa, velocidad)
 Altura y peso
  */
router.get('/:idPokemon', function(req, res) {// router maneja como definimos en el archivo index.js los barra pokemons, aqui se sobre entiende que como hay un router maneja pokemons
    axios
    .get("https://pokeapi.co/api/v2/pokemon/" + req.params.idPokemon)
    .then(pokemonResponse=>{// uso el then para la promise qu eme indica que cuando se termine de correr lo anterior recien ahi, core esto
        console.log("ya pedi el detalle del pokemon", pokemonResponse.data.stats);;;

        const pokemon = {// aqui pongo todo en un solo objeto la info de un solo pokemon
            image: pokemonResponse.data.sprites.front_default, // la imagen
            types: pokemonResponse.data.types.map(type=>type.type.name), // con el map recorro cada uno de los types y entro a los datos que son type y name
            name: pokemonResponse.data.name,
            pokemonId: pokemonResponse.data.id,
            hp: pokemonResponse.data.stats.find(stat=>stat.stat.name === "hp").base_stat,// con el find busco un stat que es un array con la info que necesito y le coloco una arrow f, que me busca el nombre del stat que necesito
            attack: pokemonResponse.data.stats.find(stat=>stat.stat.name === "attack").base_stat,                                         // con el base stat es el valor que busco lo coloco una vez lo pido
            defense: pokemonResponse.data.stats.find(stat=>stat.stat.name === "defense").base_stat,
            speed: pokemonResponse.data.stats.find(stat=>stat.stat.name === "speed").base_stat,
            height: pokemonResponse.data.height,
            weight: pokemonResponse.data.weight
        }   
        res.send(pokemon);
    })
    
});

router.post('/', function(req, res) {
    if(req.body){ 
        
        console.log("me mandaron el body con los datos para crear un pokemon", req.body);
        Pokemon.create(req.body).then(pokemonCreado=> //creo el pokemon uso el then pq pokemon.create es asincronico por lo que devuelve una promesapokemonCreado
            res.send(pokemonCreado)
        )
    }
})

// trato de crear un nuevo pkemon
// necesito la informacion del body
// creo el pokmon


module.exports = router;