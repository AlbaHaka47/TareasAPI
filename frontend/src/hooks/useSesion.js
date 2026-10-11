import { useState, useEffect } from 'react';

import { obtenerPerfil } from '../services/perfilService';
import { logout } from '../services/authService';

// Guarda la sesión: quién es el usuario, si se está comprobando y cómo cerrarla
function useSesion() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Al abrir la app, comprobamos si ya hay una sesión iniciada
  useEffect(() => {
    const comprobarSesion = async () => {
      try {
        const respuesta = await obtenerPerfil();

        setUsuario(respuesta.data.usuario);
      } catch (error) {
        if (error.response?.status !== 401) {
          console.error('Error al comprobar la sesión:', error);
        }

        setUsuario(null);
      } finally {
        setCargando(false);
      }
    };

    comprobarSesion();
  }, []);

  const cerrarSesion = async () => {
    try {
      await logout();

      // Al quedar sin usuario, las rutas redirigen solas a "/"
      setUsuario(null);
    } catch (error) {
      console.error(error);
    }
  };

  return { usuario, setUsuario, cargando, cerrarSesion };
}

export default useSesion;
