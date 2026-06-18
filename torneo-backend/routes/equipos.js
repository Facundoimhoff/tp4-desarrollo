// routes/equipos.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { Equipo, Torneo } = require('../models');

// Middleware de validación para crear y editar equipos
const validateEquipo = [
  body('nombre').trim().notEmpty().withMessage('El nombre es obligatorio'),
  body('localidad').trim().notEmpty().withMessage('La localidad es obligatoria'),
  body('idTorneo').isInt({ gt: 0 }).withMessage('ID de Torneo debe ser un número entero positivo'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); 
    }
    next();
  }
];

// 1. LISTAR TODOS (GET)
router.get('/', async (req, res) => {
  try {
    const equipos = await Equipo.findAll({
      // Esto "trae" la información del torneo asociado para que sea más completo 
      include: {
        model: Torneo,
        as: 'torneo',
        attributes: ['idTorneo', 'nombre'] // Solo traemos los campos que nos interesan
      }
    });
    res.status(200).json(equipos); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. CREAR (POST)
router.post('/', validateEquipo, async (req, res) => {
  try {
    const { nombre, localidad, idTorneo } = req.body;
    
    // Validar que el torneo exista antes de asignarlo 
    const torneo = await Torneo.findByPk(idTorneo); 
    if (!torneo) return res.status(400).json({ message: 'Torneo no encontrado' }); 

    const nuevoEquipo = await Equipo.create({ nombre, localidad, idTorneo }); 
    res.status(201).json(nuevoEquipo); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. EDITAR (PUT)
router.put('/:id', validateEquipo, async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, localidad, idTorneo } = req.body;
    
    const equipo = await Equipo.findByPk(id); 
    if (!equipo) return res.status(404).json({ message: 'Equipo no encontrado' }); 

    // Validar nuevamente que el nuevo torneo exista
    const torneo = await Torneo.findByPk(idTorneo); 
    if (!torneo) return res.status(400).json({ message: 'Torneo no encontrado' }); 

    await equipo.update({ nombre, localidad, idTorneo }); 
    res.status(200).json(equipo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. ELIMINAR (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCount = await Equipo.destroy({ where: { idEquipo: id } }); 
    
    if (!deletedCount) return res.status(404).json({ message: 'Equipo no encontrado' }); 
    
    res.status(204).send(); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; // Exportamos el router para usarlo en app.js