import { useState } from 'react';

import { obtenerPerfil, actualizarPerfil } from '../../services/perfilService';
import { textoDeError } from '../../utils/errores';
import useMensaje from '../../hooks/useMensaje';
import Mensaje from '../ui/Mensaje';

function EditarPerfil({ usuario, onPerfilActualizado }) {
  // Los campos empiezan con los datos que ya tenemos del usuario
  const [nombre, setNombre] = useState(usuario.nombre);
  const [email, setEmail] = useState(usuario.email);
  const [guardando, setGuardando] = useState(false);
  const { mensaje, mostrarExito, mostrarError, limpiar } = useMensaje();

  const enviar = async (e) => {
    e.preventDefault();
    limpiar();

    try {
      setGuardando(true);

      const respuesta = await actualizarPerfil({ nombre, email });

      mostrarExito(respuesta.data.mensaje);

      // Pedimos los datos ya guardados y avisamos a la app
      const perfil = await obtenerPerfil();

      onPerfilActualizado(perfil.data.usuario);
    } catch (error) {
      mostrarError(textoDeError(error, 'Error al actualizar el perfil'));
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div>
      <h2>Editar perfil</h2>

      <form onSubmit={enviar}>
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

      <Mensaje {...mensaje} />
    </div>
  );
}

export default EditarPerfil;
