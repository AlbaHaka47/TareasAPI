const jwt = require('jsonwebtoken');

function obtenerToken(req) {
    if (req.cookies.token) return req.cookies.token;

    const [tipo, valor] = (req.headers.authorization || '').split(' ');
    return tipo === 'Bearer' && valor ? valor : null;
}

function verificarToken(req, res, next) {
    const token = obtenerToken(req);

    if (!token) {
        return res.status(401).json({ mensaje: 'No autenticado' });
    }

    try {
        req.usuario = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ['HS256']
        });
        next();
    } catch (error) {
        return res.status(401).json({ mensaje: 'Token inválido o expirado' });
    }
}

module.exports = verificarToken;