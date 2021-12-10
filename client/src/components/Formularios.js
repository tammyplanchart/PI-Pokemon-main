import './Formularios.css';
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createPokemon, getTypes } from '../actions';
import NavBar from './NavBar';

function Formularios() {
    const history = useHistory();
    const dispatch = useDispatch();
    const types = useSelector(state => state.types);
    const typesLoading = useSelector(state => state.typesLoading);

    useEffect(() => {
        if (types.length === 0) {
            dispatch(getTypes());
        }
    }, [])

    const [input, setInput] = useState({
        name: '',
        attack: 0,
        defense: 0,
        hp: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: [],
        image: 'https://i.imgur.com/bUgN88M.png'
    });

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleChangeType = (e) => {
        debugger
        const id = parseInt(e.target.name); // es el nombre del id  siempre me responde con un string por ser html por eso lo transformo a int
        let types = [];

        if (e.target.checked) {// si esta chequeado lo agrego al array de types y le doy un id       
            types = [...input.types, id] //es un array que tiene todos los elementos de input.types y le agrego el id
        } else {
            types = input.types.filter(type => type !== id);// sino esta chequeado lo saco del array de types
        }

        setInput({ ...input, types: types });
    };

    console.log(input.types);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(input.types.length === 0){
            alert("Debes seleccionar al menos un tipo");
            return
        }
        if(input.name.length < 4 || /\d/.test(input.name)){
            alert("Nombre incorrecto");
            return
        }
        dispatch(createPokemon(input, history))  // dispatch(createPokemon(input))
    };

    if (typesLoading) {
        return "Cargando..."
    }

    return (
        <>
            <NavBar />
            <form onSubmit={handleSubmit} className="formularioscontainer">
                <div className="partes">
                    <div className="stats">
                        <h3>General</h3>
                        <div className="stat">
                            <label htmlFor="name">
                                Nombre
                            </label>
                            <input
                                className="Formularios"
                                name="name"
                                type="text"
                                value={input.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="stat">
                            <label htmlFor="attack">
                                Fuerza
                            </label>
                            <input
                                className="Formularios"
                                name="attack"
                                type="number"
                                value={input.attack}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="stat">
                            <label htmlFor="defense">
                                Defensa
                            </label>
                            <input
                                className="Formularios"
                                name="defense"
                                type="number"
                                value={input.defense}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="stat">
                            <label htmlFor="hp">
                                Vidas
                            </label>
                            <input
                                className="Formularios"
                                name="hp"
                                type="number"
                                value={input.hp}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="stat">
                            <label htmlFor="speed">
                                Velocidad
                            </label>
                            <input
                                className="Formularios"
                                name="speed"
                                type="number"
                                value={input.speed}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="stat">
                            <label htmlFor="height">
                                Altura
                            </label>
                            <input
                                className="Formularios"
                                name="height"
                                type="number"
                                value={input.height}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="stat">
                            <label htmlFor="weight">
                                Peso
                            </label>
                            <input
                                className="Formularios"
                                name="weight"
                                type="number"
                                value={input.weight}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="image">
                        <h3>Imagen</h3>
                        <input
                            className="Formularios url"
                            name="image"
                            type="url"
                            value={input.image}
                            onChange={handleChange}
                            placeholder="URL de la imagen"
                            maxLength={255}
                        />
                        <img src={input.image} width={130} />
                    </div>
                    <div className="types">
                        <h3>Tipos</h3>
                        {types.map(type =>
                            <div key={type.id}>
                                <input
                                    className="Formularios"
                                    type="checkbox"
                                    name={type.id} //para cada input de check se le agrega un id
                                    onChange={handleChangeType}
                                    checked={input.types.includes(type.id)} // va a estar checkeado si el id del input esta en el array de types
                                />
                                <label  htmlFor={type.id}>
                                    {type.name}
                                </label>
                            </div>
                        )}
                    </div>
                </div>
                <input type="submit" value="Crear pokemon" className="crearpokemon" />
            </form>
        </>
    )
}

export default Formularios;
