const rateLimit = require('express-rate-limit');

// Limita cuántas peticiones puede hacer una misma IP en un periodo de tiempo.
// Frena los ataques de fuerza bruta (probar miles de contraseñas).
const limitarAuth = rateLimit({
    windowMs: 15 * 60 * 1000,   // ventana de 15 minutos
    limit: 20,                  // máximo 20 intentos por IP en esa ventana
    standardHeaders: 'draft-8', // avisa al cliente de cuántos intentos le quedan
    legacyHeaders: false,
    message: { mensaje: 'Demasiados intentos. Inténtalo de nuevo en unos minutos.' }
});

module.exports = { limitarAuth };
