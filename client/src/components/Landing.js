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
      <h2>Tammy Planchart</h2>
      <img
        src="http://teatro-badarkablar.esmiweb.es/files/2414/5917/1774/entrar-boton.png"
        onClick={handleClick}>
      </img>
    </div >
  );
}

export default Landing;