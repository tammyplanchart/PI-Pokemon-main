import './Home.css';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)

  const [pokemons, setPokemons] = useState([])

  const searchPokemon =  ()=>{
    setLoading(true)
    axios.get('http://localhost:3001/pokemons', {params: {name: search || undefined }}) // si la request salio bien le pido que me setee los pokemons en el state pokemons
    .then(
      pokemonsResponse => setPokemons(pokemonsResponse.data)
    )
    .catch(    // si la request falla le pido que me setee un array vacio en el state
      ()=>setPokemons([])
    )
    .finally(()=>setLoading(false))
  }

  useEffect(searchPokemon, [])

  const pokemonsPorPagina = pokemons.slice(page * 12, page * 12 + 12)

  return (
    <div >
        <h1>Principal</h1>
        <input
          placeholder="Busca un pokemon"
          value={search}
          onChange={e=>setSearch(e.target.value)}
          disabled={loading}
        />
        <button
          onClick={searchPokemon}
          disabled={loading}
        >
          Buscar
        </button>
        {loading && <p><img src="https://c.tenor.com/tEBoZu1ISJ8AAAAC/spinning-loading.gif" height="40"/></p>}
        {!loading && pokemons.length === 0 && <p>No hay pokemons con ese nombre!</p>}
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
              {pokemonsPorPagina.map(pokemon=>
              <tr key={pokemon.id}>
                <td>{pokemon.id}</td>
                <td>{pokemon.name}</td>
                <td><img src={pokemon.image} /></td>
                <td>
                  <ul>
                  {pokemon.types.map(type=><li key={type}>{type}</li>)}
                  </ul>
                </td>
              </tr>
              )}
            </tbody>
          </table>
          <button onClick={()=>setPage(page-1)} disabled={page===0}>{"<"}</button>
          <button onClick={()=>setPage(page+1)} disabled={page===3}>{">"}</button>
        </div>
        }
    </div>
  );
}

export default Home;
