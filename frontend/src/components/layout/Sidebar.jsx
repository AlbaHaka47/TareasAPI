import { NavLink } from 'react-router-dom';

import '../../styles/Sidebar.scss';

// NavLink pasa "isActive" cuando su ruta coincide con la URL actual
const claseLink = ({ isActive }) =>
  `sidebar__link ${isActive ? 'is-active' : ''}`;

function Sidebar({ usuario, cerrarSesion }) {
  const inicial = usuario.nombre?.charAt(0).toUpperCase() || '?';

  return (
    <aside className="sidebar">

      <div className="sidebar__logo">
        <span className="sidebar__logo-icon">
          <i className="pi pi-check"></i>
        </span>
        <span className="sidebar__logo-text">TareasAPI</span>
      </div>

      <nav className="sidebar__nav">
        <NavLink to="/dashboard/tareas" className={claseLink}>
          <i className="pi pi-check-square"></i>
          Mis tareas
        </NavLink>

        <NavLink to="/dashboard/cuenta" className={claseLink}>
          <i className="pi pi-user"></i>
          Mi cuenta
        </NavLink>
      </nav>

      <div className="sidebar__user">
        <div className="sidebar__avatar">{inicial}</div>

        <div className="sidebar__user-info">
          <strong>{usuario.nombre}</strong>
          <span>Cuenta personal</span>
        </div>

        <button
          className="sidebar__logout"
          onClick={cerrarSesion}
          aria-label="Cerrar sesión"
          title="Cerrar sesión"
        >
          <i className="pi pi-sign-out"></i>
        </button>
      </div>

    </aside>
  );
}

export default Sidebar;
