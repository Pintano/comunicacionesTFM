import { BocadilloProps } from '../bocadillo/bocadillo';

export function agruparMensajesPorFecha(mensajes: BocadilloProps[]) {
  return mensajes.reduce<Record<string, BocadilloProps[]>>((acc, msg) => {
    const fechaKey = msg.fecha.toISOString().split('T')[0];
    if (!acc[fechaKey]) acc[fechaKey] = [];
    acc[fechaKey].push(msg);
    return acc;
  }, {});
}

function mismoDia(a: Date, b: Date): boolean {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

export function formatearFechaGrupo(
  fechaISO: string,
  t: (clave: string) => string,
): string {
  const fecha = new Date(fechaISO);
  const hoy = new Date();
  const ayer = new Date();
  ayer.setDate(hoy.getDate() - 1);

  if (mismoDia(fecha, hoy)) return t('chat.chatLayout.hoy');
  if (mismoDia(fecha, ayer)) return t('chat.chatLayout.ayer');

  return fecha.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}
