module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Equipo', {
    idEquipo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    localidad: {
      type: DataTypes.STRING,
      allowNull: false
    }
    
  });
};