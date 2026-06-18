module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Jugador', {
    idJugador: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dni: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    dorsal: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    localidad: {
      type: DataTypes.STRING,
      allowNull: true
    }
    // idEquipo no va acá, se maneja automáticamente con las relaciones en index.js
  });
};