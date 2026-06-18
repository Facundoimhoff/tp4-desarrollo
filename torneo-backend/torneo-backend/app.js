// app.js
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

// Importar los routers de cada entidad
const torneosRouter = require('./routes/torneos');
const equiposRouter = require('./routes/equipos');
const jugadoresRouter = require('./routes/jugadores');
const partidosRouter = require('./routes/partidos');
const golesRouter = require('./routes/goles-minutos');

const app = express();
app.use(cors()); // Permite peticiones desde el frontend en React 
app.use(express.json()); // Permite leer el body de las peticiones en formato JSON 

// Mapeo de rutas 
app.use('/api/torneos', torneosRouter);
app.use('/api/equipos', equiposRouter);
app.use('/api/jugadores', jugadoresRouter);
app.use('/api/partidos', partidosRouter);
app.use('/api/goles', golesRouter);

const PORT = 3000; 

const startServer = async () => {
  try {
    // Sincroniza los modelos con SQLite. Si las tablas no existen, las crea. 
    await sequelize.sync(); 
    app.listen(PORT, () => { 
      console.log(`Servidor escuchando en http://localhost:${PORT}`); 
    });
  } catch (error) { 
    console.error('Error iniciando el servidor:', error); 
  }
};

startServer(); 
module.exports = app; 