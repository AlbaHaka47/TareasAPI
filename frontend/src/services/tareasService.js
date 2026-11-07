import api from '../api';

export const obtenerTareas = () => api.get('/tasks');
export const crearTarea = (datos) => api.post('/tasks', datos);
export const actualizarTarea = (id, datos) => api.put(`/tasks/${id}`, datos);
export const marcarCompletada = (id, completada) =>
  api.patch(`/tasks/${id}/completada`, { completada });
export const eliminarTarea = (id) => api.delete(`/tasks/${id}`);