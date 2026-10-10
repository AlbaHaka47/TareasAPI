const express = require('express');
const verificarToken = require('../middleware/authMiddleware');

const { pool: db } = require('../db');

const router = express.Router();

// Todas las rutas de este archivo exigen estar autenticado
router.use(verificarToken);


// ---------- Funciones auxiliares ----------

function errorServidor(res, error, mensaje) {
    console.error(error);
    return res.status(500).json({ mensaje });
}

// Comprueba que el :id de la URL sea un número entero positivo
function validarId(req, res, next) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            mensaje: 'El ID de la tarea no es válido'
        });
    }

    req.tareaId = id;
    next();
}

// Comprueba el título y la descripción
function validarTarea(req, res, next) {
    const { titulo, descripcion } = req.body;

    if (typeof titulo !== 'string' || titulo.trim() === '') {
        return res.status(400).json({
            mensaje: 'El título es obligatorio y debe ser un texto'
        });
    }

    if (descripcion !== undefined && typeof descripcion !== 'string') {
        return res.status(400).json({
            mensaje: 'La descripción debe ser un texto'
        });
    }

    next();
}

// Comprueba que "completada" sea true o false
function validarCompletada(req, res, next) {
    if (typeof req.body.completada !== 'boolean') {
        return res.status(400).json({
            mensaje: 'Completada debe ser true o false'
        });
    }

    next();
}


// ---------- Rutas ----------

// Crear una nueva tarea
router.post('/', validarTarea, async (req, res) => {
    try {
        const { titulo, descripcion } = req.body;
        const usuarioId = req.usuario.id;

        const sql = `
            INSERT INTO tareas (titulo, descripcion, usuario_id)
            VALUES (?, ?, ?)
        `;

        const [resultado] = await db.query(sql, [titulo.trim(), descripcion || null, usuarioId]);

        res.status(201).json({
            mensaje: 'Tarea creada correctamente',
            tareaId: resultado.insertId
        });
    } catch (error) {
        errorServidor(res, error, 'Error al crear la tarea');
    }
});

// Obtener todas las tareas del usuario autenticado
router.get('/', async (req, res) => {
    try {
        const usuarioId = req.usuario.id;

        const sql = `
            SELECT id, titulo, descripcion, completada, created_at
            FROM tareas
            WHERE usuario_id = ?
            ORDER BY created_at DESC
        `;

        const [tareas] = await db.query(sql, [usuarioId]);

        res.json(tareas);
    } catch (error) {
        errorServidor(res, error, 'Error al obtener las tareas');
    }
});

// Actualizar una tarea entera (título, descripción y completada)
router.put('/:id', validarId, validarTarea, validarCompletada, async (req, res) => {
    try {
        const { titulo, descripcion, completada } = req.body;
        const usuarioId = req.usuario.id;

        const sql = `
            UPDATE tareas
            SET titulo = ?, descripcion = ?, completada = ?
            WHERE id = ? AND usuario_id = ?
        `;

        const datos = [titulo.trim(), descripcion || null, completada ? 1 : 0, req.tareaId, usuarioId];

        const [resultado] = await db.query(sql, datos);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Tarea no encontrada' });
        }

        res.json({ mensaje: 'Tarea actualizada correctamente' });
    } catch (error) {
        errorServidor(res, error, 'Error al actualizar la tarea');
    }
});

// Marcar una tarea como completada o pendiente (solo cambia ese campo)
router.patch('/:id/completada', validarId, validarCompletada, async (req, res) => {
    try {
        const { completada } = req.body;
        const usuarioId = req.usuario.id;

        const sql = `
            UPDATE tareas
            SET completada = ?
            WHERE id = ? AND usuario_id = ?
        `;

        const [resultado] = await db.query(sql, [completada ? 1 : 0, req.tareaId, usuarioId]);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Tarea no encontrada' });
        }

        res.json({
            mensaje: completada ? 'Tarea marcada como completada' : 'Tarea marcada como pendiente'
        });
    } catch (error) {
        errorServidor(res, error, 'Error al actualizar la tarea');
    }
});

// Eliminar una tarea existente
router.delete('/:id', validarId, async (req, res) => {
    try {
        const usuarioId = req.usuario.id;

        const sql = `
            DELETE FROM tareas
            WHERE id = ? AND usuario_id = ?
        `;

        const [resultado] = await db.query(sql, [req.tareaId, usuarioId]);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Tarea no encontrada' });
        }

        res.json({ mensaje: 'Tarea eliminada correctamente' });
    } catch (error) {
        errorServidor(res, error, 'Error al eliminar la tarea');
    }
});

module.exports = router;