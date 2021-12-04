const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
		id: {
			type: DataTypes.UUID, // tipo de dato es mezcla de string y number
			defaultValue: DataTypes.UUIDV4, // para que genere un valor para cada nuevo pokemon
			primaryKey: true,
			allowNull: false,
		},
    name: {
      type: DataTypes.STRING,
      allowNull: false, // allownull indica que n este caso los stats pueden estar vacios
    },
    hp: {
      type: DataTypes.BIGINT, // un numero
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
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
