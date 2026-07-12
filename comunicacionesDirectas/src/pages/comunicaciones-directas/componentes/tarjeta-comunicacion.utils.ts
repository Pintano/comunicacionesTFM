import { t } from 'i18next';

export function formatearFecha(fechaInput: string) {
  const fecha = new Date(fechaInput);

  if (isNaN(fecha.getTime())) {
    console.warn('Fecha inválida:', fechaInput);
    return fechaInput;
  }

  const ahora = new Date();

  const hoy = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
  const fechaSinHora = new Date(
    fecha.getFullYear(),
    fecha.getMonth(),
    fecha.getDate(),
  );

  const diffMs = hoy.getTime() - fechaSinHora.getTime();
  const diffDias = diffMs / (1000 * 60 * 60 * 24);

  if (diffDias === 0) {
    return fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  if (diffDias === 1) {
    return t('palabras.ayer');
  }

  return fecha.toLocaleDateString('es-ES');
}
