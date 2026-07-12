import styles from './bocadillo.module.scss';
import { EstadosBocadillo, IconoEstado } from './bocadillo.types';

export interface EstadoBocadillo {
  clase: string;
  icono: IconoEstado | 'clock';
}

export function obtenerEstado(
  estado: EstadosBocadillo | undefined,
): EstadoBocadillo {
  if (estado === undefined) {
    return {
      clase: `${styles.footer__estado} ${styles.footer__estado__clock}`,
      icono: 'clock',
    };
  }

  let clase = '';
  let icono: IconoEstado;

  switch (estado) {
    case EstadosBocadillo.Enviado:
      clase = styles.footer__estado__enviado;
      icono = 'checks';
      break;

    case EstadosBocadillo.Leido:
      clase = styles.footer__estado__leido;
      icono = 'checks';
      break;

    case EstadosBocadillo.Error:
      clase = styles.footer__estado__error;
      icono = 'error';
      break;

    default:
      clase = styles.footer__estado__clock;
      icono = 'clock';
      break;
  }

  return {
    clase: `${styles.footer__estado} ${clase}`,
    icono,
  };
}
