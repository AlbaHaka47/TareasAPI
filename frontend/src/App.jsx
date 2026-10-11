import { Routes, Route, Navigate } from 'react-router-dom';

import './styles/body.scss';

import useSesion from './hooks/useSesion';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import TareasPage from './pages/TareasPage';
import CuentaPage from './pages/CuentaPage';

function App() {
  const { usuario, setUsuario, cargando, cerrarSesion } = useSesion();

  // Hasta saber si hay sesión, no decidimos a qué página redirigir
  if (cargando) {
    return <p>Cargando...</p>;
  }

  return (
    <Routes>
      {/* Home: si ya hay sesión, va directo al dashboard */}
      <Route
        path="/"
        element={
          usuario
            ? <Navigate to="/dashboard" replace />
            : <Home onLogin={setUsuario} />
        }
      />

      {/* Dashboard: si no hay sesión, vuelve a la home */}
      <Route
        path="/dashboard"
        element={
          usuario
            ? (
              <Dashboard
                usuario={usuario}
                setUsuario={setUsuario}
                cerrarSesion={cerrarSesion}
              />
            )
            : <Navigate to="/" replace />
        }
      >
        {/* Rutas hijas: se pintan dentro del <Outlet /> del Dashboard */}
        <Route index element={<Navigate to="tareas" replace />} />
        <Route path="tareas" element={<TareasPage />} />
        <Route path="cuenta" element={<CuentaPage />} />
      </Route>

      {/* Cualquier otra URL vuelve a la home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
