// para correr postgres
// pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start

const axios = require('axios');
require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pokemon`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Pokemon, Type } = sequelize.models;

const llenarTypes = () =>
  // llenar la tabla de types
  axios
    .get("https://pokeapi.co/api/v2/type")
    .then(typesResponse => { //ya no coloco el pokemon respnse pq estoy buscando es el types no el pokemon
      console.log("ya pedi los types de los pokemons", typesResponse.data.results) 

      const types = typesResponse.data.results.map(result => ({ name: result.name }));

      return Type.bulkCreate(types)
    })

// Aca vendrian las relaciones
Pokemon.belongsToMany(Type, { through: "pokemon_types" })
Type.belongsToMany(Pokemon, { through: "pokemon_types" })
// Product.hasMany(Reviews);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');,
  llenarTypes
};
