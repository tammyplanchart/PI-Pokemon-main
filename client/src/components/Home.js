import './Home.css';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getPokemons, getTypes } from '../actions';

function Home() {
  const history = useHistory();
  const dispatch = useDispatch();

  const pokemons = useSelector(state => state.pokemons);
  const types = useSelector(state => state.types);
  const pokemonsLoading = useSelector(state => state.pokemonsLoading);
  const typesLoading = useSelector(state => state.typesLoading);

  const [page, setPage] = useState(0)
  const [search, setSearch] = useState("")
  const [order, setOrder] = useState("Nombre")
  const [asc_desc, setAsc] = useState("Ascendente")

  const searchPokemon = () => {
    dispatch(getPokemons(search));
  }

  useEffect(
    () => {
      searchPokemon()
      dispatch(getTypes())
    }, [] // faltaba el array vacio para que no se ejecute el useEffect cada vez que se cargue la pagina 
  )

  // esto es para que cuando cambie el state de search me ejecute la funcion searchPokemon  

  const sortedPokemons = pokemons.sort((pokemon1, pokemon2) => {
    if (order === "Nombre") {
      if (pokemon1.name < pokemon2.name) {
        return -1;
      } else {
        return 1;
      }
    }

    if (order === "Fuerza") {
      if (pokemon1.attack < pokemon2.attack) {
        return -1;
      } else {
        return 1;
      }
    }
  });

  if(asc_desc === "Descendente"){
    sortedPokemons.reverse()
  }

  const pokemonsPorPagina = sortedPokemons.slice(page * 12, page * 12 + 12)

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
      <div>
        <select value={order} onChange={e => setOrder(e.target.value)}>
          <option value="Nombre">Nombre</option>
          <option value="Fuerza">Fuerza</option>
        </select>
        <select value={asc_desc} onChange={e => setAsc(e.target.value)}>
          <option value="Ascendente">Ascendente</option>
          <option value="Descendente">Descendente</option>
        </select>
      </div>
      {pokemonsLoading && <p><img src="https://c.tenor.com/tEBoZu1ISJ8AAAAC/spinning-loading.gif" alt="Cargando" height="40" /></p>}
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
                <td>Fuerza</td>
              </tr>
            </thead>
            <tbody>
              {pokemonsPorPagina.map(pokemon =>
                <tr key={pokemon.id} onClick={()=>history.push("/pokemon/"+pokemon.id)}>
                  <td>{pokemon.id}</td>
                  <td>{pokemon.name}</td>
                  <td><img src={pokemon.image} alt="pokeimagen" /></td>
                  <td>
                    <ul>
                      {pokemon.types.map(type => <li key={type}>{type}</li>)}
                    </ul>
                  </td>
                  <td>{pokemon.attack}</td>
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
