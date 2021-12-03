import {actions } from '../actions';

const initialState = {
    pokemons: [],
    pokemonsLoading: false,
    pokemon: null,
    pokemonLoading: false,
    types: [],
    typesLoading: false,
  };

function rootReducer(state = initialState, action) {
    if (action.type === actions.GET_POKEMONS) {
        return {
            ...state,
            pokemons: action.payload
        }
    }
    if (action.type === actions.GET_POKEMONS_LOADING) {
        return {
            ...state,
            pokemonsLoading: action.payload
        }
    }

    if (action.type === actions.GET_POKEMON) {
        return {
            ...state,
            pokemon: action.payload
        }
    }
    if (action.type === actions.GET_POKEMON_LOADING) {
        return {
            ...state,
            pokemonLoading: action.payload
        }
    }

    if (action.type === actions.GET_TYPES) {
        return {
            ...state,
            types: action.payload
        }
    }
    if (action.type === actions.GET_TYPES_LOADING) {
        return {
            ...state,
            typesLoading: action.payload
        }
    }
    if (action.type === actions.CREATE_POKEMON) {
        return {
            ...state,
            createPokemon: action.payload
        }
    }
    if (action.type === actions.CREATE_POKEMON_LOADING) {
        return {
            ...state,
            createPokemonLoading: action.payload
        }
    }

    return state;
}

export default rootReducer;