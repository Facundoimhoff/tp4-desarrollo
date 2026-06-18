const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', 
  logging: false
});

// 1. Importar TODOS los modelos
const Torneo = require('./torneo')(sequelize, DataTypes);
const Equipo = require('./equipo')(sequelize, DataTypes);
const Jugador = require('./jugador')(sequelize, DataTypes);
const Partido = require('./partido')(sequelize, DataTypes);
const GolMinuto = require('./gol-minuto')(sequelize, DataTypes);

// 2. Definir Relaciones (Diagrama UML)

// Torneo - Equipo (1 a Muchos)
Torneo.hasMany(Equipo, { foreignKey: 'idTorneo', as: 'equipos' });
Equipo.belongsTo(Torneo, { foreignKey: 'idTorneo', as: 'torneo' });

// Equipo - Jugador (1 a Muchos)
Equipo.hasMany(Jugador, { foreignKey: 'idEquipo', as: 'jugadores' });
Jugador.belongsTo(Equipo, { foreignKey: 'idEquipo', as: 'equipo' });

// Torneo - Partido (1 a Muchos)
Torneo.hasMany(Partido, { foreignKey: 'idTorneo', as: 'partidos' });
Partido.belongsTo(Torneo, { foreignKey: 'idTorneo', as: 'torneo' });

// Partido - Equipo (Local y Visitante)
Partido.belongsTo(Equipo, { foreignKey: 'idEquipoLocal', as: 'local' });
Partido.belongsTo(Equipo, { foreignKey: 'idEquipoVisitante', as: 'visitante' });

// Relaciones inversas (para que un equipo pueda buscar sus partidos)
Equipo.hasMany(Partido, { foreignKey: 'idEquipoLocal', as: 'partidosLocal' });
Equipo.hasMany(Partido, { foreignKey: 'idEquipoVisitante', as: 'partidosVisitante' });

// Partido - GolMinuto (1 a Muchos)
Partido.hasMany(GolMinuto, { foreignKey: 'idPartido', as: 'goles' });
GolMinuto.belongsTo(Partido, { foreignKey: 'idPartido', as: 'partido' });

// Relaciones implícitas de GolMinuto (quién hizo el gol y de qué equipo)
Jugador.hasMany(GolMinuto, { foreignKey: 'idJugador', as: 'goles' });
GolMinuto.belongsTo(Jugador, { foreignKey: 'idJugador', as: 'jugador' });

Equipo.hasMany(GolMinuto, { foreignKey: 'idEquipo', as: 'golesFavor' });
GolMinuto.belongsTo(Equipo, { foreignKey: 'idEquipo', as: 'equipo' });

// 3. Exportar todo para usarlo en las rutas
module.exports = { sequelize, Torneo, Equipo, Jugador, Partido, GolMinuto};