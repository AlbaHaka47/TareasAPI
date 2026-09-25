import { useState } from 'react';
import axios from 'axios';

function Perfil() {
  const [mensaje, setMensaje] = useState('');
  const [usuario, setUsuario] = useState(null);

  const obtenerPerfil = async () => {
    setMensaje('');

    try {
      const respuesta = await axios.get(
        'http://localhost:3000/api/perfil',
        { withCredentials: true }
      );

      setUsuario(respuesta.data.usuario);
      setMensaje(
        respuesta.data.mensaje || 'Perfil obtenido correctamente'
      );

    } catch (error) {
      setUsuario(null);

      if (error.response) {
        setMensaje(
          error.response.data.mensaje || 'Error al obtener el perfil'
        );
      } else {
        setMensaje('No se puede conectar con el servidor');
      }
    }
  };

  const cerrarSesion = async () => {
    setMensaje('');

    try {
      const respuesta = await axios.post(
        'http://localhost:3000/api/auth/logout',
        {},
        { withCredentials: true }
      );

      setUsuario(null);
      setMensaje(respuesta.data.mensaje || 'Sesión cerrada correctamente');

    } catch (error) {
      if (error.response) {
        setMensaje(
          error.response.data.mensaje || 'Error al cerrar sesión'
        );
      } else {
        setMensaje('No se puede conectar con el servidor');
      }
    }
  };

  return (
    <section>
      <h2>Mi perfil</h2>

      <button onClick={obtenerPerfil}>
        Obtener perfil
      </button>

      <button onClick={cerrarSesion}>
        Cerrar sesión
      </button>

      {usuario && (
        <div>
          <h3>Datos del usuario</h3>
          <p><strong>Nombre:</strong> {usuario.nombre}</p>
          <p><strong>Email:</strong> {usuario.email}</p>
        </div>
      )}

      {mensaje && (
        <p className="mensaje">{mensaje}</p>
      )}
    </section>
  );
}

export default Perfil;