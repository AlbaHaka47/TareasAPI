import { useState } from 'react';

// Filtra la lista por pestaña (todas / pendientes / completadas) y por texto
function useFiltroTareas(tareas) {
  const [filtro, setFiltro] = useState('todas');
  const [busqueda, setBusqueda] = useState('');

  const texto = busqueda.trim().toLowerCase();

  const tareasFiltradas = tareas.filter((tarea) => {
    const coincideBusqueda =
      (tarea.titulo || '').toLowerCase().includes(texto) ||
      (tarea.descripcion || '').toLowerCase().includes(texto);

    const coincideFiltro =
      filtro === 'todas' ||
      (filtro === 'pendientes' && !tarea.completada) ||
      (filtro === 'completadas' && tarea.completada);

    return coincideBusqueda && coincideFiltro;
  });

  const pendientes = tareas.filter((tarea) => !tarea.completada).length;

  return {
    filtro,
    setFiltro,
    busqueda,
    setBusqueda,
    tareasFiltradas,
    pendientes
  };
}

export default useFiltroTareas;
