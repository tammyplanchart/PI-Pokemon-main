import axios from "axios";

export const actions = {
    GET_POKEMONS_LOADING: "GET_POKEMONS_LOADING",
    GET_POKEMONS: "GET_POKEMONS",
}

export function getPokemons(name) {
    return function(dispatch) {
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
