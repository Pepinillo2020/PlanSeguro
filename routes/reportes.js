const express = require('express');
const router = express.Router();
const Reporte = require('../models/Reporte');

// GET - obtener todos los reportes
router.get('/', async (req, res) => {
  const reportes = await Reporte.find();
  res.json(reportes);
});

// POST - crear un nuevo reporte
router.post('/', async (req, res) => {
  const nuevoReporte = new Reporte(req.body);
  await nuevoReporte.save();
  res.json({ mensaje: 'Reporte guardado con éxito' });
});

module.exports = router;
