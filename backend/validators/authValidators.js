const { body } = require('express-validator');

// Cada validador es una LISTA de reglas. No comprueban nada por sí solas:
// solo anotan los errores en la petición. Quien los lee es middleware/validar.js
const validarRegistro = [
    body('nombre')
        .trim()
        .notEmpty().withMessage('El nombre es obligatorio'),

    body('email')
        .trim()
        .isEmail().withMessage('El email no es válido'),

    body('password')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

const validarLogin = [
    body('email')
        .trim()
        .isEmail().withMessage('El email no es válido'),

    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
];

module.exports = { validarRegistro, validarLogin };
