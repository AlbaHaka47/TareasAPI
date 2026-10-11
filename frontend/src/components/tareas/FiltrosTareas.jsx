const OPCIONES = [
  { valor: 'todas', texto: 'Todas' },
  { valor: 'pendientes', texto: 'Pendientes' },
  { valor: 'completadas', texto: 'Completadas' }
];

function FiltrosTareas({ filtro, onCambiar, total }) {
  return (
    <div className="filters">
      {OPCIONES.map(({ valor, texto }) => (
        <button
          key={valor}
          type="button"
          className={`filters__tab ${filtro === valor ? 'is-active' : ''}`}
          onClick={() => onCambiar(valor)}
        >
          {texto}
        </button>
      ))}

      <span className="filters__count">
        {total} {total === 1 ? 'tarea' : 'tareas'}
      </span>
    </div>
  );
}

export default FiltrosTareas;
