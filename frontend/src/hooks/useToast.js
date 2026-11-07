import { useContext } from 'react';

import { ToastContext } from '../context/ToastContext';

// Devuelve { mostrarExito, mostrarError } para lanzar avisos desde cualquier componente
function useToast() {
  const contexto = useContext(ToastContext);

  if (!contexto) {
    throw new Error('useToast debe usarse dentro de <ToastProvider>');
  }

  return contexto;
}

export default useToast;
