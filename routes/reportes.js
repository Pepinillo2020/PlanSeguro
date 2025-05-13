const express = require('express');
const router = express.Router();
const multer = require('multer');
const Reporte = require('../backend-models/Reporte');

// Configuración de multer para guardar archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

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
router.post('/', upload.single('imagen'), async (req, res) => {
  try {
    const { tipo, descripcion, ubicacion } = req.body;

    // Procesar la imagen (si se envió)
    let imagen = null;
    if (req.file) {
      imagen = req.file.buffer.toString('base64');
    }

    const nuevoReporte = new Reporte({
      tipo,
      descripcion,
      ubicacion,
      imagen
    });

    await nuevoReporte.save();
    res.status(201).json({ mensaje: 'Reporte creado con éxito', reporte: nuevoReporte });
  } catch (error) {
    console.error('Error al guardar el reporte:', error);
    res.status(500).json({ error: 'Error al guardar el reporte', details: error.message });
  }
});

module.exports = router;
