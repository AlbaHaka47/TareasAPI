import { useState } from 'react';

// Formulario para editar una tarea. Guarda sus propios campos
// y solo avisa al padre cuando se pulsa "Guardar" o "Cancelar"
function EditarTareaForm({ tarea, onGuardar, onCancelar }) {
  const [titulo, setTitulo] = useState(tarea.titulo);
  const [descripcion, setDescripcion] = useState(tarea.descripcion || '');
  const [completada, setCompletada] = useState(Boolean(tarea.completada));

  const enviar = (e) => {
    e.preventDefault();
    onGuardar({ titulo, descripcion, completada });
  };

  return (
    <li className="task task--editing">
      <form className="edit-task-form" onSubmit={enviar}>
        <h3>Editar tarea</h3>

        <label>
          Título
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </label>

        <label>
          Descripción
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </label>

        <label className="edit-task-form__check">
          <input
            type="checkbox"
            checked={completada}
            onChange={(e) => setCompletada(e.target.checked)}
          />
          Completada
        </label>

        <div className="edit-task-form__actions">
          <button type="submit">
            Guardar cambios
          </button>

          <button type="button" onClick={onCancelar}>
            Cancelar
          </button>
        </div>
      </form>
    </li>
  );
}

export default EditarTareaForm;
