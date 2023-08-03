const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
    sequelize.define('Activity', {
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2,15],
            },
        },
        difficulty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        duration: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        season: {   
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: true,
                notEmpty: true,
            },
        }
},
{ timestamps: false });
};

// ID. *
// Nombre. *
// Dificultad (número del 1 al 5). *
// Duración (en horas).
// Temporada (Verano, Otoño, Invierno o Primavera). *
