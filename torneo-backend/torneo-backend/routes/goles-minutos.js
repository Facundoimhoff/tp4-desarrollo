// routes/goles-minutos.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { GolMinuto, Partido, Jugador, Equipo } = require('../models');

const validateGol = [
  body('minuto').isInt({ min: 0 }).withMessage('El minuto debe ser un número positivo'),
  body('idPartido').isInt({ gt: 0 }).withMessage('ID de Partido inválido'),
  body('idJugador').isInt({ gt: 0 }).withMessage('ID de Jugador inválido'),
  body('idEquipo').isInt({ gt: 0 }).withMessage('ID de Equipo inválido'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

// LISTAR (GET)
router.get('/', async (req, res) => {
  try {
    const goles = await GolMinuto.findAll({
      include: [
        { model: Partido, as: 'partido', attributes: ['idPartido', 'fecha'] },
        { model: Jugador, as: 'jugador', attributes: ['idJugador', 'apellido'] },
        { model: Equipo, as: 'equipo', attributes: ['idEquipo', 'nombre'] }
      ]
    });
    res.status(200).json(goles);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// CREAR (POST)
router.post('/', validateGol, async (req, res) => {
  try {
    const { minuto, idPartido, idJugador, idEquipo } = req.body;
    
    // Validar que existan las 3 cosas antes de registrar el gol
    const partido = await Partido.findByPk(idPartido);
    const jugador = await Jugador.findByPk(idJugador);
    const equipo = await Equipo.findByPk(idEquipo);

    if (!partido || !jugador || !equipo) {
      return res.status(400).json({ message: 'Partido, Jugador o Equipo no encontrado en la BD' });
    }

    const nuevoGol = await GolMinuto.create({ minuto, idPartido, idJugador, idEquipo });
    res.status(201).json(nuevoGol);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// EDITAR (PUT)
router.put('/:id', validateGol, async (req, res) => {
  try {
    const { id } = req.params;
    const { minuto, idPartido, idJugador, idEquipo } = req.body;
    
    const gol = await GolMinuto.findByPk(id);
    if (!gol) return res.status(404).json({ message: 'Gol no encontrado' });

    await gol.update({ minuto, idPartido, idJugador, idEquipo });
    res.status(200).json(gol);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// ELIMINAR (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await GolMinuto.destroy({ where: { idGol: id } });
    if (!deleted) return res.status(404).json({ message: 'Gol no encontrado' });
    res.status(204).send();
  } catch (error) { res.status(500).json({ error: error.message }); }
});

module.exports = router;