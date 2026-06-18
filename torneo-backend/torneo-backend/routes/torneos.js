// routes/torneos.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router(); 
const { Torneo } = require('../models');

// Middleware de validación para POST y PUT 
const validateTorneo = [
  body('nombre').trim().notEmpty().withMessage('El nombre es obligatorio'), 
  body('edicion').trim().notEmpty().withMessage('La edición es obligatoria'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { 
      return res.status(400).json({ errors: errors.array() }); // Corta el proceso si hay error 
    }
    next(); // Si está todo OK, sigue a la ruta 
  }
];

// 1. LISTAR TODOS (GET) 
router.get('/', async (req, res) => {
  try {
    const torneos = await Torneo.findAll(); 
    res.status(200).json(torneos); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. CREAR (POST) 
router.post('/', validateTorneo, async (req, res) => { 
  try {
    const { nombre, edicion } = req.body; 
    const nuevoTorneo = await Torneo.create({ nombre, edicion }); 
    res.status(201).json(nuevoTorneo); // 201 Created -> creación exitosa 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. EDITAR (PUT) 
router.put('/:id', validateTorneo, async (req, res) => {
  try {
    const { id } = req.params; 
    const { nombre, edicion } = req.body;
    
    const torneo = await Torneo.findByPk(id); 
    if (!torneo) return res.status(404).json({ message: 'Torneo no encontrado' });

    await torneo.update({ nombre, edicion }); 
    res.status(200).json(torneo); // Devuelve copia del objeto editado 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. ELIMINAR (DELETE) 
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Hacemos el destroy y contamos si borró algo 
    const deleted = await Torneo.destroy({ where: { idTorneo: id } }); 
    
    if (!deleted) return res.status(404).json({ message: 'Torneo no encontrado' }); 
    
    res.status(204).send(); // 204 No Content -> borrado exitoso y respuesta vacía 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 