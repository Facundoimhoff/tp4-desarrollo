// routes/partidos.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { Partido, Torneo, Equipo } = require('../models');

const validatePartido = [
  body('fecha').notEmpty().withMessage('La fecha es obligatoria'),
  body('estado').trim().notEmpty().withMessage('El estado es obligatorio'),
  body('idTorneo').isInt({ gt: 0 }).withMessage('ID de Torneo inválido'),
  body('idEquipoLocal').isInt({ gt: 0 }).withMessage('ID de Equipo Local inválido'),
  body('idEquipoVisitante').isInt({ gt: 0 }).withMessage('ID de Equipo Visitante inválido'),
  // Validación extra: un equipo no puede jugar contra sí mismo
  body('idEquipoVisitante').custom((value, { req }) => {
    if (value === req.body.idEquipoLocal) {
      throw new Error('El equipo local y visitante no pueden ser el mismo');
    }
    return true;
  }),
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
      include: [
        { model: Torneo, as: 'torneo', attributes: ['idTorneo', 'nombre'] },
        { model: Equipo, as: 'local', attributes: ['idEquipo', 'nombre'] },
        { model: Equipo, as: 'visitante', attributes: ['idEquipo', 'nombre'] }
      ]
    });
    res.status(200).json(partidos);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// CREAR (POST)
router.post('/', validatePartido, async (req, res) => {
  try {
    const { fecha, estado, idTorneo, idEquipoLocal, idEquipoVisitante } = req.body;
    
    // Verificamos que todo exista
    const torneo = await Torneo.findByPk(idTorneo);
    const local = await Equipo.findByPk(idEquipoLocal);
    const visitante = await Equipo.findByPk(idEquipoVisitante);

    if (!torneo || !local || !visitante) {
      return res.status(400).json({ message: 'Torneo, Equipo Local o Visitante no encontrado' });
    }

    const nuevoPartido = await Partido.create({ fecha, estado, idTorneo, idEquipoLocal, idEquipoVisitante });
    res.status(201).json(nuevoPartido);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// EDITAR (PUT)
router.put('/:id', validatePartido, async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha, estado, idTorneo, idEquipoLocal, idEquipoVisitante } = req.body;

    const partido = await Partido.findByPk(id);
    if (!partido) return res.status(404).json({ message: 'Partido no encontrado' });

    const torneo = await Torneo.findByPk(idTorneo);
    if (!torneo) return res.status(400).json({ message: 'Torneo no encontrado' });

    const local = await Equipo.findByPk(idEquipoLocal);
    const visitante = await Equipo.findByPk(idEquipoVisitante);
    if (!local || !visitante) {
      return res.status(400).json({ message: 'Equipo Local o Visitante no encontrado' });
    }

    await partido.update({ fecha, estado, idTorneo, idEquipoLocal, idEquipoVisitante });
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