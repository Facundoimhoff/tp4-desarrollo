const express = require('express');
const cors = require('cors');
const { sequelize, Torneo } = require('./models');

const torneosRouter = require('./routes/torneos');
const equiposRouter = require('./routes/equipos');
const jugadoresRouter = require('./routes/jugadores');
const partidosRouter = require('./routes/partidos');
const golesRouter = require('./routes/goles-minutos');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/torneos', torneosRouter);
app.use('/api/equipos', equiposRouter);
app.use('/api/jugadores', jugadoresRouter);
app.use('/api/partidos', partidosRouter);
app.use('/api/goles', golesRouter);

const PORT = 3000;

const startServer = async () => {
  try {
    await sequelize.sync();

    const torneoExistente = await Torneo.findByPk(1);

    if (!torneoExistente) {
      await Torneo.create({
        idTorneo: 1,
        nombre: 'Copa Sudamericana',
        edicion: 2025
      });

      console.log('Torneo inicial creado');
    }

    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Error iniciando el servidor:', error);
  }
};

startServer();

module.exports = app;