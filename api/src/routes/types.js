const axios = require('axios')
const { Router } = require('express');/// creo mi archivo router
const router = Router(); // este router maneja pokemons
const {Type} = require("../db.js")


///types
//Obtener todos los tipos de pokemons posibles
//En una primera instancia deberán traerlos desde pokeapi y guardarlos en su propia base de datos y luego ya utilizarlos desde allí/*

router.get('/', function(req, res) {
    Type.findAll().then(
        types => res.send(types)
    )
})  

module.exports = router;