import './Home.css';
//import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getPokemons } from '../actions';

function Home() {
  const dispatch = useDispatch();

  const pokemons = useSelector(state => state.pokemons);
  const pokemonsLoading = useSelector(state => state.pokemonsLoading);

  const [page, setPage] = useState(0)
  const [search, setSearch] = useState("")

  const searchPokemon = () => {
    dispatch(getPokemons(search));
  }

  useEffect (
    () => {
      searchPokemon()
    }, [] // faltaba el array vacio para que no se ejecute el useEffect cada vez que se cargue la pagina 
  ) 
  
   // esto es para que cuando cambie el state de search me ejecute la funcion searchPokemon  

  //const sortedPokemons = pokemons.sort()

  const pokemonsPorPagina = pokemons.slice(page * 12, page * 12 + 12)

  return (
    <div >
      <h1 className="Title" >Home</h1>
      <input
        placeholder="Busca un pokemon"
        value={search}
        onChange={e => setSearch(e.target.value)} //setea el imput de la busqueda, cuando  ingreso  un valor en el input
      />
      <button
        onClick={searchPokemon}
      >
        Buscar
      </button>
      {pokemonsLoading && <p><img src="https://c.tenor.com/tEBoZu1ISJ8AAAAC/spinning-loading.gif" alt = "Cargando" height="40" /></p>}
      {!pokemonsLoading && pokemons.length === 0 && <p>No hay pokemons con ese nombre!</p>}
      {pokemons.length > 0 &&
        <div>
          <table>
            <thead>
              <tr>
                <td>ID</td>
                <td>Nombre</td>
                <td>Imagen</td>
                <td>Tipos</td>
              </tr>
            </thead>
            <tbody>
              {pokemonsPorPagina.map(pokemon =>
                <tr key={pokemon.id}>
                  <td>{pokemon.id}</td>
                  <td>{pokemon.name}</td>
                  <td><img src={pokemon.image} alt = "pokeimagen" /></td>
                  <td>
                    <ul>
                      {pokemon.types.map(type => <li key={type}>{type}</li>)}
                    </ul>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <button onClick={() => setPage(page - 1)} disabled={page === 0}>{"<"}</button>     {/* si la pagina es 0 no le puedo dar click hacia atras */}
          <button onClick={() => setPage(page + 1)} disabled={page === 3}>{">"}</button>
        </div>
      }
    </div>
  );
}

export default Home;
