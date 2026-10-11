function TarjetaTarea({ tarea, onEditar, onEliminar }) {
  return (
    <li className={`task ${tarea.completada ? 'task--done' : ''}`}>
      <button
        type="button"
        className="task__check"
        aria-label={
          tarea.completada
            ? 'Tarea completada'
            : 'Tarea pendiente'
        }
        aria-pressed={Boolean(tarea.completada)}
        disabled
      >
        {tarea.completada ? '✓' : ''}
      </button>

      <div className="task__body">
        <h3 className="task__title">{tarea.titulo}</h3>

        {tarea.descripcion && (
          <p className="task__description">
            {tarea.descripcion}
          </p>
        )}

        <div className="task__meta">
          <span className="task__tag task__tag--personal">
            Personal
          </span>

          <span className="task__date">
            {tarea.completada ? 'Completada' : 'Pendiente'}
          </span>
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