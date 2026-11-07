// Crea (o restaura) la cuenta de demostración con tareas de ejemplo.
// Uso, desde la carpeta backend:   node scripts/seedDemo.js
// Se puede ejecutar las veces que quieras: siempre deja la cuenta como nueva.
require('dotenv').config();

const bcrypt = require('bcrypt');
const { pool } = require('../db');

const EMAIL = process.env.DEMO_EMAIL;
const PASSWORD = process.env.DEMO_PASSWORD;

// Fecha AAAA-MM-DD relativa a hoy: -2 = hace dos días, 3 = dentro de tres días
function fechaRelativa(dias) {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + dias);
    return fecha.toLocaleDateString('sv-SE');
}

// Mezcla de prioridades, fechas y estados para que la demo enseñe todas las funciones
const TAREAS = [
    { titulo: 'Preparar la presentación del proyecto', descripcion: 'Resumen de 5 minutos para la reunión', prioridad: 'alta', dias: -2, completada: 0 },
    { titulo: 'Enviar el informe semanal', descripcion: null, prioridad: 'alta', dias: 0, completada: 0 },
    { titulo: 'Revisar los comentarios del código', descripcion: 'Pull request #12', prioridad: 'media', dias: 3, completada: 0 },
    { titulo: 'Reservar la sala para el taller', descripcion: null, prioridad: 'baja', dias: 7, completada: 0 },
    { titulo: 'Ordenar la documentación', descripcion: 'Dejar el README al día', prioridad: 'media', dias: null, completada: 0 },
    { titulo: 'Configurar el entorno de desarrollo', descripcion: null, prioridad: 'media', dias: -5, completada: 1 },
    { titulo: 'Diseñar la pantalla de inicio', descripcion: 'Versión móvil y escritorio', prioridad: 'baja', dias: null, completada: 1 }
];

async function main() {
    if (!EMAIL || !PASSWORD) {
        console.error('Define DEMO_EMAIL y DEMO_PASSWORD en el .env del backend');
        process.exit(1);
    }

    const hash = await bcrypt.hash(PASSWORD, 10);

    const [filas] = await pool.query('SELECT id FROM usuarios WHERE email = ?', [EMAIL]);

    let usuarioId;

    if (filas.length > 0) {
        usuarioId = filas[0].id;

        await pool.query(
            'UPDATE usuarios SET nombre = ?, password = ? WHERE id = ?',
            ['Usuario Demo', hash, usuarioId]
        );
    } else {
        const [resultado] = await pool.query(
            'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
            ['Usuario Demo', EMAIL, hash]
        );

        usuarioId = resultado.insertId;
    }

    // Borramos las tareas anteriores para volver siempre al mismo estado
    await pool.query('DELETE FROM tareas WHERE usuario_id = ?', [usuarioId]);

    for (const t of TAREAS) {
        await pool.query(
            `INSERT INTO tareas (titulo, descripcion, prioridad, fecha_limite, completada, usuario_id)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
                t.titulo,
                t.descripcion,
                t.prioridad,
                t.dias === null ? null : fechaRelativa(t.dias),
                t.completada,
                usuarioId
            ]
        );
    }

    console.log(`Cuenta demo lista (${EMAIL}) con ${TAREAS.length} tareas de ejemplo`);
}

main()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(() => pool.end());