import { useState } from 'react';
import axios from 'axios';

function Tareas() {

  const [tareas, setTareas] = useState([]);

  const [tareaEditando, setTareaEditando] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [completada, setCompletada] = useState(false);

  const obtenerTareas = async () => {

    try {

      const respuesta = await axios.get(
        'http://localhost:3000/api/tasks',
        {
          withCredentials: true
        }
      );

      setTareas(respuesta.data);

    } catch (error) {

      console.error(error);

    }
  };

  const eliminarTarea = async (id) => {

    try {

      const respuesta = await axios.delete(
        `http://localhost:3000/api/tasks/${id}`,
        {
          withCredentials: true
        }
      );

      console.log(respuesta.data);

      setTareas(
        tareas.filter((tarea) => tarea.id !== id)
      );

    } catch (error) {

      console.error(error);

    }
  };

  const empezarEditar = (tarea) => {

    setTareaEditando(tarea.id);
    setTitulo(tarea.titulo);
    setDescripcion(tarea.descripcion || '');
    setCompletada(Boolean(tarea.completada));

  };

  const cancelarEdicion = () => {

    setTareaEditando(null);
    setTitulo('');
    setDescripcion('');
    setCompletada(false);

  };

  const actualizarTarea = async (e) => {

    e.preventDefault();

    try {

      const respuesta = await axios.put(
        `http://localhost:3000/api/tasks/${tareaEditando}`,
        {
          titulo: titulo,
          descripcion: descripcion,
          completada: completada
        },
        {
          withCredentials: true
        }
      );

      console.log(respuesta.data);

      setTareas(
        tareas.map((tarea) =>
          tarea.id === tareaEditando
            ? {
                ...tarea,
                titulo: titulo,
                descripcion: descripcion,
                completada: completada
              }
            : tarea
        )
      );

      cancelarEdicion();

    } catch (error) {

      console.error(error);

    }
  };

  return (
    <div>

      <h2>Mis tareas</h2>

      <button onClick={obtenerTareas}>
        Cargar tareas
      </button>

      {tareas.map((tarea) => (

        <div key={tarea.id}>

          {tareaEditando === tarea.id ? (

            <form onSubmit={actualizarTarea}>

              <h3>Editar tarea</h3>

              <div>
                <label>Título:</label>

                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
              </div>

              <div>
                <label>Descripción:</label>

                <input
                  type="text"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>

              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={completada}
                    onChange={(e) => setCompletada(e.target.checked)}
                  />

                  Completada
                </label>
              </div>

              <button type="submit">
                Guardar cambios
              </button>

              <button
                type="button"
                onClick={cancelarEdicion}
              >
                Cancelar
              </button>

            </form>

          ) : (

            <div>

              <h3>{tarea.titulo}</h3>

              <p>{tarea.descripcion}</p>

              <p>
                Completada: {tarea.completada ? 'Sí' : 'No'}
              </p>

              <button
                className="boton-tarea"
                onClick={() => empezarEditar(tarea)}
              >
                Editar
              </button>

              <button
                className="boton-tarea boton-peligro"
                onClick={() => eliminarTarea(tarea.id)}
              >
                Eliminar
              </button>

            </div>

          )}

        </div>

      ))}

    </div>
  );
}

export default Tareas;