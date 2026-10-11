import '../../styles/Mensaje.scss';

// Aviso de éxito o de error. Si no hay texto, no pinta nada
function Mensaje({ tipo = 'error', texto }) {
  if (!texto) {
    return null;
  }

  return (
    <p
      className={`mensaje mensaje--${tipo}`}
      role={tipo === 'error' ? 'alert' : 'status'}
    >
      {texto}
    </p>
  );
}

export default Mensaje;
