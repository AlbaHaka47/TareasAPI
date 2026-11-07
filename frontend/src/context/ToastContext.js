import { createContext } from 'react';

// Solo guarda el "canal" por el que se comparten los avisos.
// Va en un archivo aparte para que el componente ToastProvider exporte solo componentes.
export const ToastContext = createContext(null);
