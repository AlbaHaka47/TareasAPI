import { useState } from 'react';

import { registro } from '../../services/authService';
import { textoDeError } from '../../utils/errores';
import Campo from './Campo';
import CampoPassword from './CampoPassword';

function RegisterForm({ mostrarExito, mostrarError, limpiar }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const enviar = async (e) => {
    e.preventDefault();
    limpiar();

    try {
      const respuesta = await registro({ nombre, email, password });

      mostrarExito(respuesta.data.mensaje);

      setNombre('');
      setEmail('');
      setPassword('');
    } catch (error) {
      mostrarError(textoDeError(error, 'Error al registrarse'));
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
      />

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

      <label className="agree" htmlFor="agree">
        <input type="checkbox" name="agree" id="agree" />
        Acepto los términos y condiciones
      </label>

      <button className="submit" type="submit">
        Crear Cuenta
        <i className="pi pi-arrow-right"></i>
      </button>
    </form>
  );
}

export default RegisterForm;
