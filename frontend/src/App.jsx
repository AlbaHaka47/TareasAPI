import { useState, useEffect } from 'react';

import "./assets/scss/body.scss"

import axios from 'axios';
import Header from './components/Header';
import Auth from './components/Auth'
import Perfil from './components/Perfil';
import CrearTarea from './components/CrearTarea';
import Tareas from './components/Tareas';
import EditarPerfil from './components/EditarPerfil';
import EliminarCuenta from './components/EliminarCuenta';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [vista, setVista] = useState('login');
  const [seccionPerfil, setSeccionPerfil] = useState('datos');

  const cerrarSesion = async () => {
      try {
        await axios.post(
          'http://localhost:3000/api/auth/logout',
          {},
          { withCredentials: true }

        );

        setUsuario(null);
        setVista('login');
      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
  const comprobarSesion = async () => {
    try {
      const respuesta = await axios.get(
        'http://localhost:3000/api/perfil',
        { withCredentials: true }
      );

      setUsuario(respuesta.data.usuario);
      setVista('tareas');
    } catch (error) {
      if (error.response?.status !== 401) {
        console.error('Error al comprobar la sesión:', error);
      }

      setUsuario(null);
    }
  };

  comprobarSesion();
}, []);
  

  return (
    <div>
      <Header
        usuario={usuario}
        cerrarSesion={cerrarSesion}
        cambiarVista={setVista}
      />


      {!usuario && (
        <Auth
          onLogin={(usuarioLogueado) => {
            setUsuario(usuarioLogueado);
            setVista('tareas');
          }}
        />       
      )}

      {usuario && vista === 'tareas' && (
        <main className="dashboard">
          <section className="dashboard-cabecera">
            <div>
              <h1>Mis tareas</h1>
              <p>Organiza tu día, una tarea a la vez.</p>
            </div>
          </section>

          <section className="dashboard-crear">
            <CrearTarea />
          </section>

          <section className="dashboard-lista">
            <Tareas />
          </section>
        </main>
      )}

      {usuario && vista === 'perfil' && (
        <main>
          <h1>Mi perfil</h1>

          <nav>
            <button onClick={() => setSeccionPerfil('datos')}>
              Mis datos
            </button>

            <button onClick={() => setSeccionPerfil('editar')}>
              Editar perfil
            </button>

            <button onClick={() => setSeccionPerfil('eliminar')}>
              Eliminar cuenta
            </button>
          </nav>

          {seccionPerfil === 'datos' && <Perfil />}

          {seccionPerfil === 'editar' && (
            <EditarPerfil onPerfilActualizado={setUsuario} />
          )}

          {seccionPerfil === 'eliminar' && <EliminarCuenta />}
        </main>
      )}
    </div>
    );
  }

export default App;