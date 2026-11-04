import { useState } from 'react';

import { eliminarCuenta } from '../../services/perfilService';
import { textoDeError } from '../../utils/errores';
import useMensaje from '../../hooks/useMensaje';
import Mensaje from '../ui/Mensaje';

const PALABRA = 'ELIMINAR';

function EliminarCuenta({ onCuentaEliminada }) {
  const [confirmando, setConfirmando] = useState(false);
  const [texto, setTexto] = useState('');
  const [eliminando, setEliminando] = useState(false);
  const { mensaje, mostrarError, limpiar } = useMensaje();

  const cancelar = () => {
    setConfirmando(false);
    setTexto('');
    limpiar();
  };

  const eliminar = async () => {
    limpiar();
    setEliminando(true);

    try {
      await eliminarCuenta();
      onCuentaEliminada();
    } catch (error) {
      mostrarError(textoDeError(error, 'Error al eliminar la cuenta'));
      setEliminando(false);
    }
  };

  return (
    <section className="zona-peligro">
      <h2>Eliminar cuenta</h2>

      <p>
        Se borrarán tu usuario y todas tus tareas. Esta acción no se puede deshacer.
      </p>

      {!confirmando ? (
        <button
          type="button"
          className="btn btn--danger"
          onClick={() => setConfirmando(true)}
        >
          Eliminar mi cuenta
        </button>
      ) : (
        <div className="zona-peligro__confirmar">
          <label htmlFor="confirmar-borrado">
            Para confirmar, escribe <strong>{PALABRA}</strong>
          </label>

          <input
            id="confirmar-borrado"
            type="text"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            autoComplete="off"
            autoFocus
          />

          <div className="zona-peligro__acciones">
            <button
              type="button"
              className="btn btn--danger"
              onClick={eliminar}
              disabled={texto !== PALABRA || eliminando}
            >
              {eliminando ? 'Eliminando…' : 'Eliminar definitivamente'}
            </button>

            <button type="button" className="btn btn--ghost" onClick={cancelar}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      <Mensaje {...mensaje} />
    </section>
  );
}

export default EliminarCuenta;
