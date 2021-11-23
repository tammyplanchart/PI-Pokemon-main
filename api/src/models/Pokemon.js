const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.BIGINT,// defino como quiero que sea la base de datos y le doy dos propiedades
      allowNull: false,       // propiedad Id y name.
      primaryKey: true,
      autoIncrement: true // con esto auto incremento el id a medida se va agregando uno nuevo id 1,2,3,4...
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // allownull indica que n este caso los stats pueden estar vacios
    },
    hp: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    attack: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    defense: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    speed: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    height: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    weight: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  });
};
