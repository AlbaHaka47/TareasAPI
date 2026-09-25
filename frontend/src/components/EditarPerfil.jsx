import { useState } from 'react';
import axios from 'axios';

function EditarPerfil() {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const obtenerPerfil = async () => {

    try {

      const respuesta = await axios.get(
        'http://localhost:3000/api/perfil',
        {
          withCredentials: true
        }
      );

      setNombre(respuesta.data.usuario.nombre);
      setEmail(respuesta.data.usuario.email);

    } catch (error) {

      console.error(error);

    }
  };

  const actualizarPerfil = async (e) => {

    e.preventDefault();

    try {

      const respuesta = await axios.put(
        'http://localhost:3000/api/perfil',
        {
          nombre: nombre,
          email: email
        },
        {
          withCredentials: true
        }
      );

      setMensaje(respuesta.data.mensaje);

    } catch (error) {

      if (error.response) {
        setMensaje(error.response.data.mensaje);
      } else {
        setMensaje('Error al conectar con el servidor');
      }

    }
  };

  return (
    <div>

      <h2>Editar perfil</h2>

      <button onClick={obtenerPerfil}>
        Cargar mis datos
      </button>

      <form onSubmit={actualizarPerfil}>

        <div>
          <label>Nombre:</label>

          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div>
          <label>Email:</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit">
          Guardar cambios
        </button>

      </form>

      {mensaje && (
        <p>{mensaje}</p>
      )}

    </div>
  );
}

export default EditarPerfil;