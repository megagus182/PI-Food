const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('diet', {  //receta
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false
    });
};

// [ ] Tipo de dieta con las siguientes propiedades:
// ID
// Nombre