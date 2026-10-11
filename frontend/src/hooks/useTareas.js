import { useState, useEffect, useCallback } from 'react';

import {
  obtenerTareas,
  actualizarTarea,
  eliminarTarea
} from '../services/tareasService';

// Guarda la lista de tareas y las operaciones para cambiarla
function useTareas() {
  const [tareas, setTareas] = useState([]);

  const cargar = useCallback(async () => {
    try {
      const respuesta = await obtenerTareas();

      setTareas(respuesta.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  // Al abrir la pantalla, cargamos la lista
  useEffect(() => {
    cargar();
  }, [cargar]);

  // Devuelven true si ha ido bien, para que quien las llame sepa si seguir
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

  return { tareas, recargar: cargar, editar, eliminar };
}

export default useTareas;
