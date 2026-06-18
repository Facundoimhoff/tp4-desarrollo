// routes/partidos.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { Partido, Torneo } = require('../models');

const validatePartido = [
  body('fecha').notEmpty().withMessage('La fecha es obligatoria'),
  body('estado').trim().notEmpty().withMessage('El estado es obligatorio (ej: Programado, Jugado)'),
  body('idTorneo').isInt({ gt: 0 }).withMessage('ID de Torneo inválido'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

// LISTAR (GET)
router.get('/', async (req, res) => {
  try {
    const partidos = await Partido.findAll({
      include: { model: Torneo, as: 'torneo', attributes: ['idTorneo', 'nombre'] }
    });
    res.status(200).json(partidos);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// CREAR (POST)
router.post('/', validatePartido, async (req, res) => {
  try {
    const { fecha, estado, idTorneo } = req.body;
    const torneo = await Torneo.findByPk(idTorneo);
    if (!torneo) return res.status(400).json({ message: 'Torneo no encontrado' });

    const nuevoPartido = await Partido.create({ fecha, estado, idTorneo });
    res.status(201).json(nuevoPartido);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// EDITAR (PUT)
router.put('/:id', validatePartido, async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha, estado, idTorneo } = req.body;
    
    const partido = await Partido.findByPk(id);
    if (!partido) return res.status(404).json({ message: 'Partido no encontrado' });

    const torneo = await Torneo.findByPk(idTorneo);
    if (!torneo) return res.status(400).json({ message: 'Torneo no encontrado' });

    await partido.update({ fecha, estado, idTorneo });
    res.status(200).json(partido);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// ELIMINAR (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Partido.destroy({ where: { idPartido: id } });
    if (!deleted) return res.status(404).json({ message: 'Partido no encontrado' });
    res.status(204).send();
  } catch (error) { res.status(500).json({ error: error.message }); }
});

module.exports = router;