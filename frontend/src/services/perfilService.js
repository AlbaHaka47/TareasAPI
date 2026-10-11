import api from '../api';

export const obtenerPerfil = () => api.get('/users/perfil');
export const actualizarPerfil = (datos) => api.put('/users/perfil', datos);
export const eliminarCuenta = () => api.delete('/users/perfil');
