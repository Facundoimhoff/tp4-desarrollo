module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Partido', {
    idPartido: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fecha: {
      type: DataTypes.DATE, // Puede guardar fecha y hora
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING, // Ej: 'Reprogramado', 'En juego', 'Finalizado'
      allowNull: false
    }
    // idTorneo se genera con las relaciones
  });
};