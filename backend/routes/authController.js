const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../db');

const isProd = process.env.NODE_ENV === 'production';

const cookieOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax'
};

// Hash falso para que el tiempo de respuesta sea parecido
// exista o no el usuario
const DUMMY_HASH = bcrypt.hashSync('contraseña-falsa', 10);

async function register(req, res, next) {
    try {
        const { nombre, email, password } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);

        const [resultado] = await pool.query(
            'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
            [nombre, email, passwordHash]
        );

        res.status(201).json({
            mensaje: 'Usuario registrado correctamente',
            usuarioId: resultado.insertId
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ mensaje: 'El email ya está registrado' });
        }
        next(error);
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        const [filas] = await pool.query(
            'SELECT id, nombre, email, password FROM usuarios WHERE email = ?',
            [email]
        );

        const usuario = filas[0];

        const passwordCorrecta = await bcrypt.compare(
            password,
            usuario ? usuario.password : DUMMY_HASH
        );

        if (!usuario || !passwordCorrecta) {
            return res.status(401).json({ mensaje: 'Email o contraseña incorrectos' });
        }

        const token = jwt.sign(
            { id: usuario.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            ...cookieOptions,
            maxAge: 60 * 60 * 1000
        });

        res.json({
            mensaje: 'Login correcto',
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email
            }
        });
    } catch (error) {
        next(error);
    }
}

function logout(req, res) {
    res.clearCookie('token', cookieOptions);
    res.json({ mensaje: 'Sesión cerrada correctamente' });
}

async function me(req, res, next) {
    try {
        const [filas] = await pool.query(
            'SELECT id, nombre, email FROM usuarios WHERE id = ?',
            [req.usuario.id]
        );

        if (filas.length === 0) {
            return res.status(401).json({ mensaje: 'Usuario no encontrado' });
        }

        res.json({ usuario: filas[0] });
    } catch (error) {
        next(error);
    }
}

module.exports = { register, login, logout, me };