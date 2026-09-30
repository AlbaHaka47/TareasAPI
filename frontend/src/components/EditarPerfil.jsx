import { useState, useEffect } from 'react';
import axios from 'axios';

function EditarPerfil({ onPerfilActualizado }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [guardando, setGuardando] = useState(false);

  // Obtener los datos del perfil
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

  obtenerPerfil();

  // Cargar el perfil al mostrar el componente
 useEffect(() => {
  let activo = true;

  const cargarPerfil = async () => {
    try {
      const respuesta = await axios.get(
        'http://localhost:3000/api/perfil',
        { withCredentials: true }
      );

      // Solo actualizamos el estado si el componente sigue activo
      if (activo) {
        setNombre(respuesta.data.usuario.nombre);
        setEmail(respuesta.data.usuario.email);
      }
    } catch (error) {
      console.error(error); // así usas la variable y te sirve para depurar
      if (activo) {
        setMensaje('No se ha podido cargar el perfil');
      }
    }
  };

  cargarPerfil();

  return () => {
    activo = false;
  };
}, []);
  // Actualizar los datos del perfil
  const actualizarPerfil = async (e) => {
    e.preventDefault();

    try {
      setGuardando(true);

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

      // Obtener los datos actualizados
      const perfilActualizado = await axios.get(
        'http://localhost:3000/api/perfil',
        {
          withCredentials: true
        }
      );

      // Comunicar los cambios a App.jsx
      onPerfilActualizado(perfilActualizado.data.usuario);

    } catch (error) {
      if (error.response) {
        setMensaje(error.response.data.mensaje);
      } else {
        setMensaje('Error al conectar con el servidor');
      }
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div>
      <h2>Editar perfil</h2>

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

        <button type="submit" disabled={guardando}>
          {guardando ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </form>

      {mensaje && (
        <p>{mensaje}</p>
      )}
    </div>
  );
}

export default EditarPerfil;