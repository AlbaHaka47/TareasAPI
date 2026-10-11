import { useState } from 'react';

import '../../styles/Tareas.scss';

import useTareas from '../../hooks/useTareas';
import useFiltroTareas from '../../hooks/useFiltroTareas';
import CrearTarea from './CrearTarea';
import FiltrosTareas from './FiltrosTareas';
import EditarTareaForm from './EditarTareaForm';
import TarjetaTarea from './TarjetaTarea';

// Texto que se enseña cuando no hay tareas que mostrar
function mensajeVacio(busqueda, filtro) {
  if (busqueda.trim()) {
    return 'No se encontraron tareas con esa búsqueda.';
  }

  if (filtro === 'pendientes') {
    return 'No tienes tareas pendientes.';
  }

  if (filtro === 'completadas') {
    return 'Todavía no has completado ninguna tarea.';
  }

  return 'Todavía no tienes tareas. ¡Crea la primera!';
}

function Tareas() {
  const { tareas, recargar, editar, eliminar } = useTareas();

  const {
    filtro,
    setFiltro,
    busqueda,
    setBusqueda,
    tareasFiltradas,
    pendientes
  } = useFiltroTareas(tareas);

  const [tareaEditando, setTareaEditando] = useState(null);
  const [mostrarCrear, setMostrarCrear] = useState(false);

  const guardarEdicion = async (datos) => {
    const guardada = await editar(tareaEditando, datos);

    if (guardada) {
      setTareaEditando(null);
    }
  };

  const tareaCreada = () => {
    recargar();
    setMostrarCrear(false);
  };

  return (
    <section className="tasks-section">
      <div className="tasks-toolbar">
        <button
          type="button"
          className="create-task-bubble"
          onClick={() => setMostrarCrear((actual) => !actual)}
          aria-expanded={mostrarCrear}
        >
          <i className={`pi ${mostrarCrear ? 'pi-times' : 'pi-plus'}`}></i>
          {mostrarCrear ? 'Cerrar' : 'Crear tarea'}
        </button>

        <label className="search">
          <i className="pi pi-search" />
          <input
            type="search"
            placeholder="Buscar tarea..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            aria-label="Buscar tareas por título o descripción"
          />
        </label>
      </div>

      {mostrarCrear && <CrearTarea onTareaCreada={tareaCreada} />}

      <div className="tasks-summary">
        <span>Tienes {pendientes} tareas pendientes</span>
      </div>

      <FiltrosTareas
        filtro={filtro}
        onCambiar={setFiltro}
        total={tareasFiltradas.length}
      />

      {tareasFiltradas.length === 0 ? (
        <div className="tasks-empty">
          <i className="pi pi-inbox" />
          <p>{mensajeVacio(busqueda, filtro)}</p>
        </div>
      ) : (
        <ul className="task-list">
          {tareasFiltradas.map((tarea) =>
            tareaEditando === tarea.id ? (
              <EditarTareaForm
                key={tarea.id}
                tarea={tarea}
                onGuardar={guardarEdicion}
                onCancelar={() => setTareaEditando(null)}
              />
            ) : (
              <TarjetaTarea
                key={tarea.id}
                tarea={tarea}
                onEditar={(t) => setTareaEditando(t.id)}
                onEliminar={eliminar}
              />
            )
          )}
        </ul>
      )}
    </section>
  );
}

export default Tareas;
