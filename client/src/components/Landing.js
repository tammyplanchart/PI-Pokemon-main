import './Landing.css';
import { useHistory } from 'react-router-dom';

function Landing() {
  const history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    history.push("/principal");

  }

  return (
    <div className="Landing">
        <h1 className="Title">Bienvenido a mi proyecto individual</h1>
        <h2>Pokemon</h2>
        <button onClick={handleClick}>Ingresar</button>
    </div>
  );
}

export default Landing;
