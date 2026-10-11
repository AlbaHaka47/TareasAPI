import { useState } from 'react';

import { login } from '../../services/authService';
import { textoDeError } from '../../utils/errores';
import Campo from './Campo';
import CampoPassword from './CampoPassword';

function LoginForm({ onLogin, mostrarError, limpiar }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const enviar = async (e) => {
    e.preventDefault();
    limpiar();

    try {
      const respuesta = await login({ email, password });

      onLogin(respuesta.data.usuario);
    } catch (error) {
      mostrarError(textoDeError(error, 'Error al iniciar sesión'));
    }
  };

  return (
    <form onSubmit={enviar}>
      <Campo
        id="email"
        etiqueta="Correo Electrónico"
        icono="pi-envelope"
        type="email"
        placeholder="ejemplo@correo.com"
        valor={email}
        onChange={setEmail}
      />

      <CampoPassword valor={password} onChange={setPassword} />

      <div className="agreerecovery">
        <label className="agree" htmlFor="recordarme">
          <input
            id="recordarme"
            type="checkbox"
            name="recordarme"
          />
          Recordarme
        </label>

        <button type="button" className="link">
          ¿Olvidaste tu clave?
        </button>
      </div>

      <button className="submit" type="submit">
        Iniciar Sesión
        <i className="pi pi-arrow-right"></i>
      </button>
    </form>
  );
}

export default LoginForm;
