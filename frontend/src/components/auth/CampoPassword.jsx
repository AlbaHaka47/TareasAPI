import { useState } from 'react';

import Campo from './Campo';

// Campo de contraseña con el ojo para mostrarla u ocultarla
function CampoPassword({ valor, onChange }) {
  const [visible, setVisible] = useState(false);

  return (
    <Campo
      id="password"
      etiqueta="Contraseña"
      icono="pi-lock"
      type={visible ? 'text' : 'password'}
      placeholder="••••••••"
      valor={valor}
      onChange={onChange}
    >
      <button
        type="button"
        className="authInput__toggle"
        onClick={() => setVisible(!visible)}
        aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
      >
        <i className={`pi ${visible ? 'pi-eye-slash' : 'pi-eye'}`}></i>
      </button>
    </Campo>
  );
}

export default CampoPassword;
