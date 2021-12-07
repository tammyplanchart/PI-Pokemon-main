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
        image: ''
    });

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleChangeType = (e) => {
        const id = parseInt(e.target.name); // es el nombre del id  siempre me responde con un string por ser html por eso lo transformo a int
        let types = [];

        if (e.target.checked) {// si esta chequeado lo agrego al array de types y le doy un id       
            types = [...input.types, id] //es un array que tiene todos los elementos de input.types y le agrego el id
        } else {
            types = types.filter(type => type !== id);// sino esta chequeado lo saco del array de types
        }

        setInput({ ...input, types: types });
    };

    console.log(input.types);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPokemon(input, history))  // dispatch(createPokemon(input))
    };

    if (typesLoading) {
        return "Cargando..."
    }

    return (
        <>
            <NavBar />
            <form onSubmit={handleSubmit}>
                <input
                    className="Formularios"
                    name="name"
                    type="text"
                    value={input.name}
                    onChange={handleChange}
                    placeholder="Nombre"
                />
                <input
                    className="Formularios"
                    name="attack"
                    type="number"
                    value={input.attack}
                    onChange={handleChange}
                    placeholder="Fuerza"
                />
                <input
                    className="Formularios"
                    name="defense"
                    type="number"
                    value={input.defense}
                    onChange={handleChange}
                    placeholder="Defensa"
                />
                <input
                    className="Formularios"
                    name="hp"
                    type="number"
                    value={input.hp}
                    onChange={handleChange}
                    placeholder="Vidas"
                />
                <input
                    className="Formularios"
                    name="speed"
                    type="number"
                    value={input.speed}
                    onChange={handleChange}
                    placeholder="Velocidad"
                />
                <input
                    className="Formularios"
                    name="height"
                    type="number"
                    value={input.height}
                    onChange={handleChange}
                    placeholder="Altura"
                />
                <input
                    className="Formularios"
                    name="weight"
                    type="number"
                    value={input.weight}
                    onChange={handleChange}
                    placeholder="Peso"
                />
                <br/>
                {types.map(type =>
                    <label key={type.id}>
                        <input
                            className="Formularios"
                            type="checkbox"
                            name={type.id} //para cada input de check se le agrega un id
                            onChange={handleChangeType}
                            checked={input.types.includes(type.id)} // va a estar checkeado si el id del input esta en el array de types
                        />
                        {type.name}
                    </label>
                )}
                <br/>
                <input
                    className="Formularios"
                    name="image"
                    type="url"
                    value={input.image}
                    onChange={handleChange}
                    placeholder="URL de la imagen"
                    maxLength={255}
                />
                <br/>
                <input type="submit" value="Submit" />
            </form>
        </>
    )
}

export default Formularios;
