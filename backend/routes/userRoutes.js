const express = require('express');
const verificarToken = require('../middleware/authMiddleware');

const { pool: db } = require('../db');

const router = express.Router();

// Todas las rutas de este archivo exigen estar autenticado
router.use(verificarToken);


function errorServidor(res, error, mensaje) {
    console.error(error);
    return res.status(500).json({ mensaje });
}


// Obtener el perfil del usuario autenticado
router.get('/perfil', async (req, res) => {
    try {
        const usuarioId = req.usuario.id;

        const sql = `
            SELECT id, nombre, email
            FROM usuarios
            WHERE id = ?
        `;

        const [usuarios] = await db.query(sql, [usuarioId]);

        if (usuarios.length === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.json({
            mensaje: 'Perfil obtenido correctamente',
            usuario: usuarios[0]
        });
    } catch (error) {
        errorServidor(res, error, 'Error al obtener el perfil');
    }
});


// Actualizar nombre y email del usuario autenticado
router.put('/perfil', async (req, res) => {
    try {
        const { nombre, email } = req.body;
        const usuarioId = req.usuario.id;

        if (typeof nombre !== 'string' || nombre.trim() === '') {
            return res.status(400).json({
                mensaje: 'El nombre es obligatorio y debe ser un texto'
            });
        }

        if (typeof email !== 'string' || email.trim() === '') {
            return res.status(400).json({
                mensaje: 'El email es obligatorio y debe ser un texto'
            });
        }

        const sql = `
            UPDATE usuarios
            SET nombre = ?, email = ?
            WHERE id = ?
        `;

        const [resultado] = await db.query(sql, [nombre.trim(), email.trim(), usuarioId]);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.json({ mensaje: 'Usuario actualizado correctamente' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ mensaje: 'El email ya está registrado' });
        }

        errorServidor(res, error, 'Error al actualizar el usuario');
    }
});


// Eliminar la cuenta del usuario autenticado
router.delete('/perfil', async (req, res) => {
    const usuarioId = req.usuario.id;
    let connection;

    try {
        // Reservamos UNA conexión del pool para toda la transacción
        connection = await db.getConnection();
        await connection.beginTransaction();

        // Primero eliminamos las tareas del usuario
        await connection.query('DELETE FROM tareas WHERE usuario_id = ?', [usuarioId]);

        // Después eliminamos al usuario
        const [resultado] = await connection.query('DELETE FROM usuarios WHERE id = ?', [usuarioId]);

        if (resultado.affectedRows === 0) {
            await connection.rollback();
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        await connection.commit();

        res.clearCookie('token');
        res.json({ mensaje: 'Cuenta eliminada correctamente' });
    } catch (error) {
        if (connection) {
            await connection.rollback();
        }

        errorServidor(res, error, 'Error al eliminar la cuenta');
    } finally {
        if (connection) {
            connection.release();
        }
    }
});

module.exports = router;