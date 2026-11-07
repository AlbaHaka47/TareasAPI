import { useState } from 'react';

import '../../styles/Tareas.scss';
import '../../styles/Prioridad.scss';
import '../../styles/TarjetaTarea.scss';

import { estadoFecha } from '../../utils/tareas';
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

  return 'Escribe arriba tu primera tarea y pulsa Enter.';
}

function Tareas() {
  const { tareas, crear, alternar, editar, eliminar } = useTareas();

  const {
    filtro,
    setFiltro,
    busqueda,
    setBusqueda,
    tareasFiltradas,
    pendientes
  } = useFiltroTareas(tareas);

  const [tareaEditando, setTareaEditando] = useState(null);

  const guardarEdicion = async (datos) => {
    const guardada = await editar(tareaEditando, datos);

    if (guardada) {
      setTareaEditando(null);
    }
  };

  const vencidas = tareas.filter(
    (t) => estadoFecha(t.fecha_limite, t.completada) === 'vencida'
  ).length;

  const completadas = tareas.length - pendientes;
  const porcentaje = tareas.length ? Math.round((completadas / tareas.length) * 100) : 0;

  return (
    <section className="tasks-section">
      <CrearTarea onCrear={crear} />

      <div className="tasks-toolbar">
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

      {tareas.length > 0 && (
        <div className="tasks-progress">
          <div className="tasks-progress__text">
            <span>
              {pendientes === 0
                ? 'Todo al día'
                : `${pendientes} ${pendientes === 1 ? 'pendiente' : 'pendientes'}`}
              {vencidas > 0 && (
                <span className="tasks-progress__overdue">
                  {' · '}{vencidas} {vencidas === 1 ? 'vencida' : 'vencidas'}
                </span>
              )}
            </span>
            <span>{completadas} de {tareas.length} completadas</span>
          </div>

          <div
            className="tasks-progress__bar"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={porcentaje}
          >
            <div className="tasks-progress__fill" style={{ width: `${porcentaje}%` }} />
          </div>
        </div>
      )}

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
                onAlternar={alternar}
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
