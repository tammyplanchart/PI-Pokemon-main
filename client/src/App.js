import './App.css';
import { Route, BrowserRouter } from 'react-router-dom';
import Landing  from './components/Landing';
import Home  from './components/Home';
import DetailPokemon from './components/DetailPokemon';
import Formularios from './components/Formularios';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Landing} />
        <Route exact path="/principal" component={Home} />
        <Route exact path="/pokemon/:id" component={DetailPokemon} />
        <Route exact path="/formularios" component={Formularios} />
      </BrowserRouter>
    </div>
  );
}

export default App;
