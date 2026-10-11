import { Outlet } from 'react-router-dom';

import '../styles/Dashboard.scss';

import Sidebar from '../components/layout/Sidebar';

// Estructura fija del dashboard: barra lateral + zona donde cambia la página
function Dashboard({ usuario, setUsuario, cerrarSesion }) {
  return (
    <div className="dashboard">
      <Sidebar usuario={usuario} cerrarSesion={cerrarSesion} />

      <main className="content">
        <Outlet context={{ usuario, setUsuario }} />
      </main>
    </div>
  );
}

export default Dashboard;
