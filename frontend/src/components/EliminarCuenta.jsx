import { useState } from 'react';
import axios from 'axios';

function EliminarCuenta() {

  const [mensaje, setMensaje] = useState('');

  const eliminarCuenta = async () => {

    const confirmar = window.confirm(
      '¿Seguro que quieres eliminar tu cuenta? Se borrarán también todas tus tareas. Esta acción no se puede deshacer.'
    );

    if (!confirmar) {
      return;
    }

    try {

      const respuesta = await axios.delete(
        'http://localhost:3000/api/perfil',
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
    <section className="zona-peligro">

      <h2>Eliminar cuenta</h2>

      <p>
        Se eliminarán tu usuario y todas tus tareas.
      </p>

      <button
        className="boton-peligro"
        onClick={eliminarCuenta}
      >
        Eliminar mi cuenta
      </button>

      {mensaje && <p>{mensaje}</p>}

    </section>
  );
}

export default EliminarCuenta;