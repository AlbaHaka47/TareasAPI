import { useState } from 'react';

import { actualizarPerfil } from '../../services/perfilService';
import { textoDeError } from '../../utils/errores';
import useMensaje from '../../hooks/useMensaje';
import Mensaje from '../ui/Mensaje';

function EditarPerfil({ usuario, onPerfilActualizado }) {
  // Los campos empiezan con los datos que ya tenemos del usuario
  const [nombre, setNombre] = useState(usuario.nombre);
  const [email, setEmail] = useState(usuario.email);
  const [guardando, setGuardando] = useState(false);
  const { mensaje, mostrarExito, mostrarError, limpiar } = useMensaje();

  // Si no ha cambiado nada, no tiene sentido dejar pulsar "Guardar"
  const hayCambios =
    nombre.trim() !== usuario.nombre || email.trim() !== usuario.email;

  const enviar = async (e) => {
    e.preventDefault();
    limpiar();
    setGuardando(true);

    try {
      const respuesta = await actualizarPerfil({ nombre, email });

      // El servidor ya confirmó el cambio: actualizamos la app sin pedir nada más
      onPerfilActualizado({
        ...usuario,
        nombre: nombre.trim(),
        email: email.trim()
      });

      mostrarExito(respuesta.data.mensaje);
    } catch (error) {
      mostrarError(textoDeError(error, 'Error al actualizar el perfil'));
    } finally {
      setGuardando(false);
    }
  };

  return (
    <form className="cuenta-form" onSubmit={enviar}>
      <div className="field">
        <label htmlFor="perfil-nombre">Nombre</label>
        <input
          id="perfil-nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          autoComplete="name"
          required
        />
      </div>

      <div className="field">
        <label htmlFor="perfil-email">Correo electrónico</label>
        <input
          id="perfil-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
      </div>

      <Mensaje {...mensaje} />

      <button
        className="btn btn--primary"
        type="submit"
        disabled={guardando || !hayCambios}
      >
        {guardando ? 'Guardando…' : 'Guardar cambios'}
      </button>
    </form>
  );
}

export default EditarPerfil;
