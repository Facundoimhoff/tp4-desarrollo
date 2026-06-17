module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Torneo', {
    idTorneo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    edicion: {
      type: DataTypes.INTEGER, // o INTEGER si es solo el año
      allowNull: false
    }
  });
};