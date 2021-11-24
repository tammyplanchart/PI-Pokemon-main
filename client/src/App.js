import './App.css';
import { Route, BrowserRouter } from 'react-router-dom';
import Landing  from './components/Landing';
import Home  from './components/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Landing} />
        <Route exact path="/principal" component={Home} />
      </BrowserRouter>
    </div>
  );
}

export default App;
