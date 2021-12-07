import axios from "axios";

export const actions = {
    GET_POKEMONS_LOADING: "GET_POKEMONS_LOADING",
    GET_POKEMONS: "GET_POKEMONS",
    GET_POKEMON_LOADING: "GET_POKEMON_LOADING",
    GET_POKEMON: "GET_POKEMON",
    GET_TYPES_LOADING: "GET_TYPES_LOADING",
    GET_TYPES: "GET_TYPES",
    CREATE_POKEMON: "CREATE_POKEMON",
    CREATE_POKEMON_LOADING: "CREATE_POKEMON_LOADING"
}

export function getPokemons(name) {
    return function (dispatch) {
        dispatch({ type: "GET_POKEMONS_LOADING", payload: true })

        axios.get('http://localhost:3001/pokemons', { params: { name: name || undefined } }) // si la request salio bien le pido que me setee los pokemons en el state pokemons
            .then(// cuando coloco el undifined  evita que me de error porque no me trae nada
                pokemonsResponse => dispatch({ type: "GET_POKEMONS", payload: pokemonsResponse.data })
            )
            .finally(() =>
                dispatch({ type: "GET_POKEMONS_LOADING", payload: false })
            )// cuando termina de hacer la request le pido que me setee el loading en false se detiene el proceso
    };
}


export function getPokemon(id) {
    return function (dispatch) {
        dispatch({ type: "GET_POKEMON_LOADING", payload: true })

        axios.get('http://localhost:3001/pokemons/' + id)
            .then(
                pokemonsResponse => dispatch({ type: "GET_POKEMON", payload: pokemonsResponse.data })
            )
            .finally(() =>
                dispatch({ type: "GET_POKEMON_LOADING", payload: false })
            )
    };
}

export function getTypes() {
    return function (dispatch) {
        dispatch({ type: "GET_TYPES_LOADING", payload: true })

        axios.get('http://localhost:3001/types')
            .then(
                typesResponse => dispatch({ type: "GET_TYPES", payload: typesResponse.data })
            )
            .finally(() =>
                dispatch({ type: "GET_TYPES_LOADING", payload: false })
            )
    };
}

export function createPokemon(pokemon, history) {
    return function (dispatch) {
        dispatch({ type: "CREATE_POKEMON_LOADING", payload: true })

        axios.post('http://localhost:3001/pokemons', pokemon)
            .then(
                pokemonsResponse => {
                    dispatch({ type: "CREATE_POKEMON", payload: pokemonsResponse.data })
                    history.push('/pokemon/' + pokemonsResponse.data.id)
                }
            )
            .finally(() =>
                dispatch({ type: "CREATE_POKEMON_LOADING", payload: false })
            )
    };
}
