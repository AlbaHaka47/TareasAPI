export const PRIORIDADES = [
  { valor: 'baja', texto: 'Baja' },
  { valor: 'media', texto: 'Media' },
  { valor: 'alta', texto: 'Alta' }
];

export const textoPrioridad = (valor) =>
  PRIORIDADES.find((p) => p.valor === valor)?.texto || 'Media';

// Fecha de HOY en la zona horaria del usuario, con formato AAAA-MM-DD.
// (toISOString() daría la fecha en UTC y de noche podría salir el día siguiente)
export const hoyISO = () => new Date().toLocaleDateString('sv-SE');

// 'vencida' | 'hoy' | 'proxima' | null (sin fecha o ya completada).
// Las fechas AAAA-MM-DD se pueden comparar directamente como texto.
export function estadoFecha(fecha, completada) {
  if (!fecha || completada) {
    return null;
  }

  const hoy = hoyISO();

  if (fecha < hoy) return 'vencida';
  if (fecha === hoy) return 'hoy';
  return 'proxima';
}

// "2026-11-20" -> "20 nov"
export function formatearFechaLimite(fecha) {
  const [anio, mes, dia] = fecha.split('-').map(Number);

  // new Date(año, mes, día) usa la hora local; new Date("2026-11-20") usaría UTC
  return new Date(anio, mes - 1, dia).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short'
  });
}
