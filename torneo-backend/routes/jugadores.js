// routes/jugadores.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const { Op } = require('sequelize'); // Importamos Op para el filtrado 
const router = express.Router();
const { Jugador, Equipo } = require('../models');

// Middleware de validación
const validateJugador = [
  body('nombre').trim().notEmpty().withMessage('El nombre es obligatorio'),
  body('apellido').trim().notEmpty().withMessage('El apellido es obligatorio'),
  body('dni').isInt({ gt: 0 }).withMessage('El DNI debe ser numérico y positivo'),
  body('idEquipo').optional({ nullable: true }).isInt({ gt: 0 }).withMessage('ID de Equipo inválido'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// 1. LISTAR TODOS CON FILTRO Opcional (GET) - Power-Up 
router.get('/', async (req, res) => {
  try {
    const { apellido } = req.query; // Atrapamos el parámetro de la URL 
    const jugadorWhere = {};

    // Si mandaron un apellido, armamos el filtro para buscar coincidencias 
    if (apellido) {
      jugadorWhere.apellido = {
        [Op.like]: `%${apellido}%` // Busca cualquier apellido que contenga ese texto 
      };
    }

    const jugadores = await Jugador.findAll({
      where: jugadorWhere, // Aplicamos el filtro al query [cite: 209]
      include: {
        model: Equipo,
        as: 'equipo',
        attributes: ['idEquipo', 'nombre']
      }
    });
    
    res.status(200).json(jugadores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. CREAR (POST)
router.post('/', validateJugador, async (req, res) => {
  try {
    const { nombre, apellido, dni, dorsal, localidad, idEquipo } = req.body;
    
    // Si mandan un idEquipo, verificamos que el equipo exista
    if (idEquipo) {
      const equipo = await Equipo.findByPk(idEquipo);
      if (!equipo) return res.status(400).json({ message: 'Equipo no encontrado' });
    }

    const nuevoJugador = await Jugador.create({
      nombre, apellido, dni, dorsal, localidad, idEquipo: idEquipo || null
    });
    res.status(201).json(nuevoJugador);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. EDITAR (PUT)
router.put('/:id', validateJugador, async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, dni, dorsal, localidad, idEquipo } = req.body;
    
    const jugador = await Jugador.findByPk(id);
    if (!jugador) return res.status(404).json({ message: 'Jugador no encontrado' });

    if (idEquipo) {
      const equipo = await Equipo.findByPk(idEquipo);
      if (!equipo) return res.status(400).json({ message: 'Equipo no encontrado' });
    }

    await jugador.update({ nombre, apellido, dni, dorsal, localidad, idEquipo: idEquipo || null });
    res.status(200).json(jugador);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. ELIMINAR (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCount = await Jugador.destroy({ where: { idJugador: id } });
    
    if (!deletedCount) return res.status(404).json({ message: 'Jugador no encontrado' });
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;