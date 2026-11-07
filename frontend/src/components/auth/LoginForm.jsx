import { useState } from 'react';

import { login } from '../../services/authService';
import { textoDeError } from '../../utils/errores';
import Campo from './Campo';
import CampoPassword from './CampoPassword';

// Cuenta de prueba para que quien visite el portfolio entre con un clic.
// Se define en el .env del frontend: VITE_DEMO_EMAIL y VITE_DEMO_PASSWORD
const DEMO_EMAIL = import.meta.env.VITE_DEMO_EMAIL;
const DEMO_PASSWORD = import.meta.env.VITE_DEMO_PASSWORD;

function LoginForm({ onLogin, mostrarError, limpiar }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enviando, setEnviando] = useState(false);

  const iniciarSesion = async (datos) => {
    limpiar();
    setEnviando(true);

    try {
      const respuesta = await login(datos);
      onLogin(respuesta.data.usuario);
    } catch (error) {
      mostrarError(textoDeError(error, 'No se pudo iniciar sesión'));
      setEnviando(false);
    }
  };

  const enviar = (e) => {
    e.preventDefault();
    iniciarSesion({ email, password });
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
        autoComplete="email"
        required
      />

      <CampoPassword valor={password} onChange={setPassword} />

      {/* <div className="agreerecovery">
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
      </div> */}

      <button className="submit" type="submit" disabled={enviando}>
        {enviando ? 'Entrando…' : 'Iniciar Sesión'}
        {!enviando && <i className="pi pi-arrow-right"></i>}
      </button>

      {DEMO_EMAIL && DEMO_PASSWORD && (
        <button
          type="button"
          className="link"
          disabled={enviando}
          onClick={() => iniciarSesion({ email: DEMO_EMAIL, password: DEMO_PASSWORD })}
        >
          Probar con una cuenta de demostración
        </button>
      )}
    </form>
  );
}

export default LoginForm;
