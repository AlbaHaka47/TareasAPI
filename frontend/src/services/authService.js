import api from '../api';

export const login = (datos) => api.post('/auth/login', datos);
export const registro = (datos) => api.post('/auth/register', datos);
export const logout = () => api.post('/auth/logout');
