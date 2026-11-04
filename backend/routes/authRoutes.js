const express = require('express');

const { register, login, logout, me } = require('../controllers/authController');
const verificarToken = require('../middleware/authMiddleware');
const validar = require('../middleware/validar');
const { limitarAuth } = require('../middleware/rateLimiters');
const { validarRegistro, validarLogin } = require('../validators/authValidators');

const router = express.Router();

// Este archivo solo dice "qué ruta ejecuta qué". La lógica vive en el controller.
// Los middlewares se ejecutan de izquierda a derecha y cualquiera puede cortar la cadena.
router.post('/register', limitarAuth, validarRegistro, validar, register);
router.post('/login', limitarAuth, validarLogin, validar, login);
router.post('/logout', logout);
router.get('/me', verificarToken, me);

module.exports = router;
