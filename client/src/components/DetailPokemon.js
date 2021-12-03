import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getPokemon, getTypes } from '../actions';

function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams()

  const pokemon = useSelector(state => state.pokemon);
  const pokemonLoading = useSelector(state => state.pokemonLoading);

  useEffect(() => {
    dispatch(getPokemon(id))
  }, [])

  if (pokemonLoading || !pokemon) {
    return <div>Cargando...</div>
  }

  return (
    <div>
      <h1 >{pokemon.name}</h1>
      <h2 >{pokemon.pokemonId}</h2>
      <img src={pokemon.image} alt={pokemon.name} />
      <table>
        <thead>
          <tr>
            <td>Fuerza</td>
            <td>Defensa</td>
            <td>Vida</td>
            <td>Velocidad</td>
            <td>Altura</td>
            <td>Peso</td>
          </tr>
        </thead>
        <tbody>
          <tr >
            <td>{pokemon.attack}</td>
            <td>{pokemon.defense}</td>
            <td>{pokemon.hp}</td>
            <td>{pokemon.speed}</td>
            <td>{pokemon.height}</td>
            <td>{pokemon.weight}</td>
          </tr>
        </tbody>
      </table>
      <h3>Tipos</h3>
      <ul>
        {pokemon.types.map(type => <li key={type}>{type}</li>)}
      </ul>
    </div>
  );
}

export default Detail;
