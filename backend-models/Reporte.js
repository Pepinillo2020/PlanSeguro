const mongoose = require('mongoose');

const reporteSchema = new mongoose.Schema({
  tipo: String,
  descripcion: String,
  latitud: Number,
  longitud: Number,
  fecha: { type: Date, default: Date.now },
  imagen: String // URL o base64 si más adelante agregas imágenes
});

module.exports = mongoose.model('Reporte', reporteSchema);
