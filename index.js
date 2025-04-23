const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error conectando a MongoDB', err));

// Ruta para la raíz
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de PlanSeguro');
});

// Rutas
const reportesRoutes = require('./routes/reportes');
app.use('/api/reportes', reportesRoutes);
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);


app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
