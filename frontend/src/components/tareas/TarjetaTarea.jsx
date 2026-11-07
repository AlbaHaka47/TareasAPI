import { textoPrioridad, estadoFecha, formatearFechaLimite } from '../../utils/tareas';

// Texto del chip de fecha según su estado
function textoFecha(fecha, estado) {
  const corta = formatearFechaLimite(fecha);

  if (estado === 'hoy') return 'Vence hoy';
  if (estado === 'vencida') return `Vencida · ${corta}`;
  return `Vence el ${corta}`;
}

function TarjetaTarea({ tarea, onAlternar, onEditar, onEliminar }) {
  const completada = Boolean(tarea.completada);
  const prioridad = tarea.prioridad || 'media';
  const estado = estadoFecha(tarea.fecha_limite, completada);

  return (
    <li className={`task ${tarea.completada ? 'task--done' : ''}`}>
      <button
        type="button"
        className="task__check"
        onClick={() => onAlternar(tarea.id)}
        aria-label= {
          completada
          ? `Marcar "${tarea.titulo}" como pendiente`
          : `Marcar "${tarea.titulo}" como completada`
        }
        aria-pressed={completada}
      >
        {completada ? '✓' : ''}
      </button>

      <div className="task__body">
        <h3 className="task__title">{tarea.titulo}</h3>

        {tarea.descripcion && (
          <p className="task__description">{tarea.descripcion}</p>
        )}

        <div className="task__meta">
          <span className={`task__chip task__chip--${prioridad}`}>
            {textoPrioridad(prioridad)}
          </span>

          {tarea.fecha_limite && (
            <span className={`task__chip task__chip--fecha ${estado ? `task__chip--${estado}` : ''}`}>
              <i className="pi pi-calendar" aria-hidden="true"></i>
              {textoFecha(tarea.fecha_limite, estado)}
            </span>
          )}
        </div>
      </div>

      <div className="task__actions">
        <button
          type="button"
          className="task__action"
          onClick={() => onEditar(tarea)}
          aria-label={`Editar ${tarea.titulo}`}
          title="Editar"
        >
          <i className="pi pi-pencil" />
        </button>

        <button
          type="button"
          className="task__action task__action--danger"
          onClick={() => onEliminar(tarea.id)}
          aria-label={`Eliminar ${tarea.titulo}`}
          title="Eliminar"
        >
          <i className="pi pi-trash" />
        </button>
      </div>
    </li>
  );
}

export default TarjetaTarea;