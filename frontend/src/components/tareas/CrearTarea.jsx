import { useState, useEffect, useRef } from 'react';

import '../../styles/CrearTarea.scss';

import { PRIORIDADES } from '../../utils/tareas';

const VALORES_INICIALES = { descripcion: '', prioridad: 'media', fecha: '' };

// Barra de creación rápida: escribes el título y pulsas Enter.
// Descripción, prioridad y fecha son opcionales y se despliegan con el botón.
function CrearTarea({ onCrear }) {
  const [titulo, setTitulo] = useState('');
  const [extra, setExtra] = useState(VALORES_INICIALES);
  const [conOpciones, setConOpciones] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  // Cambia un solo campo de "extra" sin tocar los demás
  const cambiar = (campo) => (e) =>
    setExtra((actual) => ({ ...actual, [campo]: e.target.value }));

  // Atajo: pulsar "N" fuera de un campo de texto enfoca el título
  useEffect(() => {
    const atajo = (e) => {
      const escribiendo = /input|textarea|select/i.test(e.target.tagName);

      if (e.key.toLowerCase() === 'n' && !escribiendo && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', atajo);
    return () => window.removeEventListener('keydown', atajo);
  }, []);

  const reiniciar = () => {
    setTitulo('');
    setExtra(VALORES_INICIALES);
    setConOpciones(false);
  };

  const enviar = async (e) => {
    e.preventDefault();

    if (!titulo.trim() || enviando) {
      return;
    }

    setEnviando(true);
    setError('');

    const resultado = await onCrear({
      titulo,
      descripcion: extra.descripcion,
      prioridad: extra.prioridad,
      fecha_limite: extra.fecha || null // un campo de fecha vacío es "" y el backend espera null
    });

    setEnviando(false);

    if (!resultado.ok) {
      setError(resultado.error);
      return;
    }

    reiniciar();
    inputRef.current?.focus();
  };

  const alPulsarTecla = (e) => {
    if (e.key === 'Escape') {
      reiniciar();
      e.target.blur();
    }
  };

  return (
    <form className="quick-add" onSubmit={enviar}>
      <div className="quick-add__row">
        <i className="pi pi-plus quick-add__icon" aria-hidden="true"></i>

        <input
          ref={inputRef}
          className="quick-add__title"
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          onKeyDown={alPulsarTecla}
          placeholder="Añade una tarea y pulsa Enter"
          aria-label="Título de la nueva tarea"
          maxLength={150}
        />

        <button
          type="button"
          className="quick-add__more"
          onClick={() => setConOpciones((v) => !v)}
          aria-expanded={conOpciones}
          title="Más opciones"
        >
          <i className="pi pi-sliders-h"></i>
        </button>

        <button
          type="submit"
          className="quick-add__submit"
          disabled={!titulo.trim() || enviando}
        >
          {enviando ? 'Añadiendo…' : 'Añadir'}
        </button>
      </div>

      {conOpciones && (
        <>
          <input
            className="quick-add__description"
            type="text"
            value={extra.descripcion}
            onChange={cambiar('descripcion')}
            onKeyDown={alPulsarTecla}
            placeholder="Descripción (opcional)"
            aria-label="Descripción de la nueva tarea"
          />

          <div className="task-fields">
            <label>
              Prioridad
              <select value={extra.prioridad} onChange={cambiar('prioridad')}>
                {PRIORIDADES.map(({ valor, texto }) => (
                  <option key={valor} value={valor}>{texto}</option>
                ))}
              </select>
            </label>

          <label>
              Fecha límite
              <input
                type="date"
                value={extra.fecha}
                onChange={cambiar('fecha')}
              />
            </label>
          </div>
        </>
      )}

      {error && <p className="quick-add__error" role="alert">{error}</p>}
    </form>
  );
}

export default CrearTarea;
