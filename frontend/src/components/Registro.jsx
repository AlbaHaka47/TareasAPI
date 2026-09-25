import { useState } from 'react';
import axios from 'axios';

function Registro() {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [mensaje, setMensaje] = useState('');

  const registrarUsuario = async (e) => {

    e.preventDefault();

    setMensaje('');

    try {

      const respuesta = await axios.post(
        'http://localhost:3000/api/auth/register',
        {
          nombre: nombre,
          email: email,
          password: password
        }
      );

      setMensaje(respuesta.data.mensaje);

      setNombre('');
      setEmail('');
      setPassword('');

    } catch (error) {
        if (error.response) {
          setMensaje(
            error.response.data.mensaje || 'Error al registrarse'
          );
        } else {
          setMensaje('No se puede conectar con el servidor');
        }
      }

    };

  return (
    <form onSubmit={registrarUsuario}>

      <h2>Crear cuenta</h2>

      <div>
        <label>Nombre:</label>

        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

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
        Registrarse
      </button>

      {mensaje && (
        <p>{mensaje}</p>
      )}

    </form>
  );
}

export default Registro;