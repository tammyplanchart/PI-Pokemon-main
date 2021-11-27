import {actions } from '../actions';

const initialState = {
    pokemons: [],
    pokemonsLoading: false,
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
    return state;
}

export default rootReducer;