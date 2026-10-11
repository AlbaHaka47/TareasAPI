import { useState } from 'react';

import { crearTarea } from '../../services/tareasService';
import { textoDeError } from '../../utils/errores';
import useMensaje from '../../hooks/useMensaje';
import Mensaje from '../ui/Mensaje';

function CrearTarea({ onTareaCreada }) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const { mensaje, mostrarExito, mostrarError, limpiar } = useMensaje();

  const enviar = async (e) => {
    e.preventDefault();
    limpiar();

    try {
      const respuesta = await crearTarea({ titulo, descripcion });

      mostrarExito(respuesta.data.mensaje || 'Tarea creada correctamente');

      setTitulo('');
      setDescripcion('');

      // Avisa para que la lista de tareas se vuelva a cargar
      onTareaCreada();
    } catch (error) {
      mostrarError(textoDeError(error, 'Error al crear la tarea'));
    }
  };

  return (
    <form onSubmit={enviar}>
      <section className="create-task">
        <h2>Crear Tarea</h2>

        <div className="taskInput">
          <label>Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        <div className="taskInput">
          <label>Descripción</label>
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

        <button type="submit">
          Crear tarea
        </button>

        <Mensaje {...mensaje} />
      </section>
    </form>
  );
}

export default CrearTarea;
