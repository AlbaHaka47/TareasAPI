import { useState } from 'react';

import "../assets/scss/header.scss";

import avatar from '../assets/gato.jpg';

function Header({ usuario, cerrarSesion, cambiarVista }) {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const toogleClass = () => {
      setIsActive((prev) => !prev); 
    }

  return (
    <header>
      <nav>
        <h2>Tareas API</h2>
        <div className="menu">
          {!usuario ? (
            <>
              <button onClick={() => cambiarVista('login')}>
                Iniciar sesión
              </button>

              <button onClick={() => cambiarVista('registro')}>
                Crear cuenta
              </button>
            </>
          ) : (
            <>
              <div className="contenedor">
                <button 
                  onClick={() => setMenuAbierto(!menuAbierto)}       
                >
                  <img src={avatar} alt="Avatar" className="avatar" />
                  {usuario.nombre} ▾
                </button>

                {menuAbierto && (
                  <div className="menu-desplegable">
                    <button
                      onClick={() => {
                        cambiarVista('perfil');
                        setMenuAbierto(false);
                      }}
                    >
                      Mi perfil
                    </button>
                    <button
                      onClick={() => {
                        cambiarVista('tareas');
                        setMenuAbierto(false);
                      }}
                    >
                      Mis tareas
                    </button>
                    <hr />
                    <button
                      onClick={() => {
                        console.log('Botón de cerrar sesión pulsado');
                        console.log('cerrarSesion:', cerrarSesion);
                        cerrarSesion();
                      }}
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>       
      </nav>
    </header>
  );
}

export default Header;