import { useState } from 'react';

import { registro } from '../../services/authService';
import { textoDeError } from '../../utils/errores';
import Campo from './Campo';
import CampoPassword from './CampoPassword';

function RegisterForm({ onRegistrado, mostrarError, limpiar }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enviando, setEnviando] = useState(false);

  const enviar = async (e) => {
    e.preventDefault();
    limpiar();
    setEnviando(true);

    try {
      await registro({ nombre, email, password });
      
      // El padre cambia a "Iniciar sesión" y muestra el aviso de éxito
      onRegistrado('Cuenta creada. Ya puedes iniciar sesión.');
    } catch (error) {
      mostrarError(textoDeError(error, 'No se pudo crear la cuenta'));
      setEnviando(false);
    }
  };

  return (
    <form onSubmit={enviar}>
      <Campo
        id="name"
        etiqueta="Nombre Completo"
        icono="pi-user"
        placeholder="Tu nombre"
        valor={nombre}
        onChange={setNombre}
        autoComplete="name"
        required
      />

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

      <CampoPassword
        valor={password}
        onChange={setPassword}
        autoComplete="new-password"
        minLength={6}
      />

      {/* <label className="agree" htmlFor="agree">
        <input type="checkbox" name="agree" id="agree" />
        Acepto los términos y condiciones
      </label> */}

      <button className="submit" type="submit" disabled={enviando}>
        {enviando ? 'Creando cuenta…' : 'Crear Cuenta'}
        {!enviando && <i className="pi pi-arrow-right"></i>}
      </button>
    </form>
  );
}

export default RegisterForm;
