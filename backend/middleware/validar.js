const { validationResult } = require('express-validator');

function validar(req, res, next) {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({
            mensaje: 'Datos no válidos',
            errores: errores.array()
        });
    }

    next();
}

module.exports = validar;