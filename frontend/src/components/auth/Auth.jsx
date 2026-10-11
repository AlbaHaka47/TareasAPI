import { useState } from 'react';

import '../../styles/Auth.scss';

import useMensaje from '../../hooks/useMensaje';
import Mensaje from '../ui/Mensaje';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

// Título y subtítulo de cada modo
const TEXTOS = {
  login: {
    titulo: 'Te damos la bienvenida',
    subtitulo: 'Accede para continuar organizando tus tareas.'
  },
  register: {
    titulo: 'Crea tu cuenta',
    subtitulo: 'Regístrate para empezar a organizar tus tareas.'
  }
};

function Auth({ onLogin }) {
  const [modo, setModo] = useState('login');
  const { mensaje, mostrarExito, mostrarError, limpiar } = useMensaje();

  const cambiarModo = (nuevoModo) => {
    setModo(nuevoModo);
    limpiar();
  };

  return (
    <main className="auth">

      <div className="auth-brand">
        <span className="auth-brand__icon">
          <i className="pi pi-check"></i>
        </span>
        <span className="auth-brand__name">TareasAPI</span>
      </div>

      <div className="auth-card">

        <div className={`auth-toggle ${modo}`}>
          <div className="box"></div>

          <button
            type="button"
            className={modo === 'login' ? 'active' : ''}
            onClick={() => cambiarModo('login')}
          >
            Iniciar Sesión
          </button>

          <button
            type="button"
            className={modo === 'register' ? 'active' : ''}
            onClick={() => cambiarModo('register')}
          >
            Crear Cuenta
          </button>
        </div>

        <div className="auth-heading">
          <h2>{TEXTOS[modo].titulo}</h2>
          <p>{TEXTOS[modo].subtitulo}</p>
        </div>

        <Mensaje {...mensaje} />

        {modo === 'login' ? (
          <LoginForm
            onLogin={onLogin}
            mostrarError={mostrarError}
            limpiar={limpiar}
          />
        ) : (
          <RegisterForm
            mostrarExito={mostrarExito}
            mostrarError={mostrarError}
            limpiar={limpiar}
          />
        )}

        <p className="divider">O continúa con</p>

        <div className="social">
          <button type="button">
            <i className="pi pi-google"></i>
            Google
          </button>
          <button type="button">
            <i className="pi pi-github"></i>
            GitHub
          </button>
        </div>

      </div>

      <p className="auth-footer">Organiza mejor. Avanza cada día.</p>

    </main>
  );
}

export default Auth;
