import './DetailPokemon.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getPokemon, getTypes } from '../actions';
import NavBar from './NavBar';

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
    <div className="detailPokemon">
      <NavBar />
      <div className="detail">
        <h1 >{pokemon.name}</h1>
        <div className="details">
          <ul className="left">
                <li>ID: #{pokemon.pokemonId}</li>
                <li>Fuerza: {pokemon.attack}</li>
                <li>Defensa: {pokemon.defense}</li>
                <li>Vida: {pokemon.hp}</li>
                <li>Velocidad: {pokemon.speed}</li>
                <li>Altura: {pokemon.height}</li>
                <li>Peso: {pokemon.weight}</li>
          </ul>
          <div className="right">
          <img src={pokemon.image} alt={pokemon.name} width={200} />
          <h3>Tipos</h3>
          <ul className="typePokemon">
            {pokemon.types.map(type => <li key={type}>{type}</li>)}
          </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
