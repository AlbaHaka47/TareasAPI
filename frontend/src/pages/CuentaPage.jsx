import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import '../styles/Cuenta.scss';

import Perfil from '../components/perfil/Perfil';
import EditarPerfil from '../components/perfil/EditarPerfil';
import EliminarCuenta from '../components/perfil/EliminarCuenta';

// Las pestañas viven en una lista: para añadir una sección solo hay que añadir una línea
const SECCIONES = [
  { id: 'datos', texto: 'Mis datos', icono: 'pi-user' },
  { id: 'editar', texto: 'Editar perfil', icono: 'pi-pencil' },
  { id: 'eliminar', texto: 'Eliminar cuenta', icono: 'pi-trash' }
];

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
          <p className="page-header__subtitle">
            Consulta y gestiona tus datos personales.
          </p>
        </div>
      </header>

      <div className="cuenta-tabs" role="tablist" aria-label="Secciones de la cuenta">
        {SECCIONES.map(({ id, texto, icono }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={seccion === id}
            className={`cuenta-tabs__tab ${seccion === id ? 'is-active' : ''} ${id === 'eliminar' ? 'is-danger' : ''}`}
            onClick={() => setSeccion(id)}
          >
            <i className={`pi ${icono}`}></i>
            {texto}
          </button>
        ))}
      </div>

      <div className="cuenta-panel" role="tabpanel">
        {seccion === 'datos' && <Perfil usuario={usuario} />}

        {seccion === 'editar' && (
          <EditarPerfil usuario={usuario} onPerfilActualizado={setUsuario} />
        )}

        {seccion === 'eliminar' && (
          <EliminarCuenta onCuentaEliminada={() => setUsuario(null)} />
        )}
      </div>
    </>
  );
}

export default CuentaPage;
