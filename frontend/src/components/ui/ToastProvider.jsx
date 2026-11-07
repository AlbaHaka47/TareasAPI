import { useState, useRef, useCallback, useMemo } from 'react';

import '../../styles/Toast.scss';

import { ToastContext } from '../../context/ToastContext';

const DURACION = 4000; // milisegundos que se ve cada aviso
const MAXIMO = 4;      // avisos a la vez en pantalla

const ICONOS = {
  exito: 'pi-check-circle',
  error: 'pi-exclamation-circle'
};

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const siguienteId = useRef(1);

  const cerrar = useCallback((id) => {
    setToasts((actuales) => actuales.filter((t) => t.id !== id));
  }, []);

  const mostrar = useCallback((tipo, texto) => {
    const id = siguienteId.current++;

    // Conservamos solo los últimos MAXIMO - 1 y añadimos el nuevo
    setToasts((actuales) => [...actuales.slice(-(MAXIMO - 1)), { id, tipo, texto }]);

    setTimeout(() => cerrar(id), DURACION);
  }, [cerrar]);

  // useMemo mantiene el MISMO objeto entre renders. Si cambiara cada vez,
  // todos los hooks que lo usan en un useEffect se volverían a ejecutar.
  const valor = useMemo(
    () => ({
      mostrarExito: (texto) => mostrar('exito', texto),
      mostrarError: (texto) => mostrar('error', texto)
    }),
    [mostrar]
  );

  return (
    <ToastContext.Provider value={valor}>
      {children}

      <div className="toasts">
        {toasts.map(({ id, tipo, texto }) => (
          <div
            key={id}
            className={`toast toast--${tipo}`}
            role={tipo === 'error' ? 'alert' : 'status'}
          >
            <i className={`pi ${ICONOS[tipo]}`} aria-hidden="true"></i>
            <span className="toast__texto">{texto}</span>

            <button
              type="button"
              className="toast__close"
              onClick={() => cerrar(id)}
              aria-label="Cerrar aviso"
            >
              <i className="pi pi-times"></i>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export default ToastProvider;
