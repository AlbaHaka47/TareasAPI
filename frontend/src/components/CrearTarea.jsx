import { useState } from 'react';
import axios from 'axios';

function CrearTarea() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [mensaje, setMensaje] = useState('');

  const crearTarea = async (e) => {
    e.preventDefault();
    setMensaje('');

    try {
      const respuesta = await axios.post(
        'http://localhost:3000/api/tasks',
        {
          titulo: titulo,
          descripcion: descripcion
        },
        {
          withCredentials: true
        }
      );

      setMensaje(
        respuesta.data.mensaje || 'Tarea creada correctamente'
      );

      setTitulo('');
      setDescripcion('');

    } catch (error) {
      if (error.response) {
        setMensaje(
          error.response.data.mensaje || 'Error al crear la tarea'
        );
      } else {
        setMensaje('No se puede conectar con el servidor');
      }
    }
  };

  return (
    <form onSubmit={crearTarea}>
      <h2>Crear tarea</h2>

      <div>
        <label>Título:</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
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

      <button type="submit">
        Crear tarea
      </button>

      {mensaje && (
        <p className="mensaje">{mensaje}</p>
      )}
    </form>
  );
}

export default CrearTarea;