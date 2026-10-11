import { useState } from 'react';

// Guarda el aviso que se enseña al usuario (de éxito o de error)
function useMensaje() {
  const [mensaje, setMensaje] = useState({ tipo: 'error', texto: '' });

  const mostrarExito = (texto) => setMensaje({ tipo: 'exito', texto });
  const mostrarError = (texto) => setMensaje({ tipo: 'error', texto });
  const limpiar = () => setMensaje({ tipo: 'error', texto: '' });

  return { mensaje, mostrarExito, mostrarError, limpiar };
}

export default useMensaje;
