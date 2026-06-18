module.exports = (sequelize, DataTypes) => {
  return sequelize.define('GolMinuto', {
    idGol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    minuto: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
    // idJugador, idPartido e idEquipo se manejan desde index.js
  }, {
    tableName: 'goles_minutos' // Le forzamos este nombre para que Sequelize no lo pluralice raro en inglés
  });
};