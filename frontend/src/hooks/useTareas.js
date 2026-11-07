import { useState, useEffect } from 'react';

import {
  obtenerTareas,
  crearTarea,
  actualizarTarea,
  marcarCompletada,
  eliminarTarea
} from '../services/tareasService';
import { textoDeError } from '../utils/errores';

// Guarda la lista de tareas y las operaciones para cambiarla
function useTareas() {
  const [tareas, setTareas] = useState([]);

  // Al abrir la pantalla, cargamos la lista.
  // "cancelado" evita guardar la respuesta si el componente ya se ha desmontado
  // (en desarrollo React monta dos veces y así solo cuenta la última petición)
  useEffect(() => {
    let cancelado = false;

    const cargarTareas = async () => {
      try {
        const respuesta = await obtenerTareas();

        if (!cancelado) {
          setTareas(respuesta.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    cargarTareas();

    return () => {
      cancelado = true;
    };
  }, []);

  // Crea la tarea y la añade arriba de la lista sin volver a pedirlas todas.
  // Devuelve { ok: true } o { ok: false, error: 'texto' }
  const crear = async ({ titulo, descripcion, prioridad, fecha_limite }) => {
    try {
      const respuesta = await crearTarea({ titulo, descripcion, prioridad, fecha_limite });

      const nueva = {
        id: respuesta.data.tareaId,
        titulo: titulo.trim(),
        descripcion: descripcion.trim() || null,
        prioridad,
        fecha_limite,
        completada: 0,
        created_at: new Date().toISOString()
      };

      setTareas((actuales) => [nueva, ...actuales]);

      return { ok: true };
    } catch (error) {
      return { ok: false, error: textoDeError(error, 'Error al crear la tarea') };
    }
  };

  // Marca o desmarca al instante y deshace el cambio si el servidor falla
  const alternar = async (id) => {
    const tarea = tareas.find((t) => t.id === id);

    if (!tarea) {
      return false;
    }

    const anterior = tarea.completada;
    const nueva = anterior ? 0 : 1;

    setTareas((actuales) =>
      actuales.map((t) => (t.id === id ? { ...t, completada: nueva } : t))
    );

    try {
      await marcarCompletada(id, Boolean(nueva));
      return true;
    } catch (error) {
      console.error(error);

      setTareas((actuales) =>
        actuales.map((t) => (t.id === id ? { ...t, completada: anterior } : t))
      );

      return false;
    }
  };

  const editar = async (id, datos) => {
    try {
      await actualizarTarea(id, datos);

      setTareas((actuales) =>
        actuales.map((tarea) =>
          tarea.id === id ? { ...tarea, ...datos } : tarea
        )
      );

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const eliminar = async (id) => {
    try {
      await eliminarTarea(id);
      setTareas((actuales) => actuales.filter((tarea) => tarea.id !== id));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return { tareas, crear, alternar, editar, eliminar };
}

export default useTareas;
