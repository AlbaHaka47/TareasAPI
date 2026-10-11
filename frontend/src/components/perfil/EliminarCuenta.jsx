import { eliminarCuenta } from '../../services/perfilService';
import { textoDeError } from '../../utils/errores';
import useMensaje from '../../hooks/useMensaje';
import Mensaje from '../ui/Mensaje';

function EliminarCuenta({ onCuentaEliminada }) {
  const { mensaje, mostrarError } = useMensaje();

  const eliminar = async () => {
    const confirmar = window.confirm(
      '¿Seguro que quieres eliminar tu cuenta? Se borrarán también todas tus tareas. Esta acción no se puede deshacer.'
    );

    if (!confirmar) {
      return;
    }

    try {
      await eliminarCuenta();

      onCuentaEliminada();
    } catch (error) {
      mostrarError(textoDeError(error, 'Error al eliminar la cuenta'));
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
        onClick={eliminar}
      >
        Eliminar mi cuenta
      </button>

      <Mensaje {...mensaje} />
    </section>
  );
}

export default EliminarCuenta;
