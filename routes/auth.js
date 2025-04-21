// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta para registrar un nuevo usuario
router.post('/registro', authController.registrar);

// Ruta para iniciar sesión
router.post('/login', authController.login);

module.exports = router;
