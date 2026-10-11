import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import Perfil from '../components/perfil/Perfil';
import EditarPerfil from '../components/perfil/EditarPerfil';
import EliminarCuenta from '../components/perfil/EliminarCuenta';

function CuentaPage() {
  // Datos que el Dashboard pasa a sus páginas hijas con <Outlet context={...} />
  const { usuario, setUsuario } = useOutletContext();

  const [seccion, setSeccion] = useState('datos');

  return (
    <>
      <header className="page-header">
        <div>
          <p className="page-header__eyebrow">Mi espacio</p>
          <h1>Mi cuenta</h1>
        </div>
      </header>

      <nav>
        <button onClick={() => setSeccion('datos')}>
          Mis datos
        </button>

        <button onClick={() => setSeccion('editar')}>
          Editar perfil
        </button>

        <button onClick={() => setSeccion('eliminar')}>
          Eliminar cuenta
        </button>
      </nav>

      {seccion === 'datos' && <Perfil usuario={usuario} />}

      {seccion === 'editar' && (
        <EditarPerfil usuario={usuario} onPerfilActualizado={setUsuario} />
      )}

      {seccion === 'eliminar' && (
        <EliminarCuenta onCuentaEliminada={() => setUsuario(null)} />
      )}
    </>
  );
}

export default CuentaPage;
