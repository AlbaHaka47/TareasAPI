// Convierte un error de axios en un texto para enseñar al usuario
export function textoDeError(error, porDefecto) {
  if (!error.response) {
    return 'No se puede conectar con el servidor';
  }

  const datos = error.response.data;

  // El backend responde con "mensaje", o con una lista "errores" si falla la validación
  return datos.mensaje || datos.errores?.[0]?.msg || porDefecto;
}
