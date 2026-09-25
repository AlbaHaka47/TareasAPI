import { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const iniciarSesion = async (e) => {
  e.preventDefault();
  setMensaje('');

  try {
    const respuesta = await axios.post(
      'http://localhost:3000/api/auth/login',
      {
        email,
        password
      },
      { withCredentials: true }
    );

    setMensaje(
      `¡Login correcto! Bienvenido, ${respuesta.data.usuario.nombre}`
    );

  } catch (error) {
    if (error.response) {
      setMensaje(
        error.response.data.mensaje || 'Error al iniciar sesión'
      );
    } else {
      setMensaje('No se puede conectar con el servidor');
    }
  }
};

  return (
    <form onSubmit={iniciarSesion}>
      <h2>Iniciar sesión</h2>
        {mensaje && <p className="mensaje">{mensaje}</p>}
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit">
        Entrar
      </button>
    </form>
  );
}

export default Login;