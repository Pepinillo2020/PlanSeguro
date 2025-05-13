const express = require('express');
const router = express.Router();
const Reporte = require('../backend-models/Reporte');

// GET - obtener todos los reportes
router.get('/', async (req, res) => {
  try {
    const reportes = await Reporte.find();
    res.status(200).json(reportes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los reportes', details: error.message });
  }
});

// POST - crear un nuevo reporte
router.post('/', async (req, res) => {
  try {
    const { tipo, descripcion, ubicacion, imagen } = req.body;

    const nuevoReporte = new Reporte({
      tipo,
      descripcion,
      ubicacion,
      imagen
    });

    await nuevoReporte.save();
    res.status(201).json({ mensaje: 'Reporte creado con éxito', reporte: nuevoReporte });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el reporte', details: error.message });
  }
});

module.exports = router;
