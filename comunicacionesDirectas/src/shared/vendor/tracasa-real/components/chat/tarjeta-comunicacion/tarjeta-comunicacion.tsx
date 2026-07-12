import classNames from 'classnames';
import styles from './tarjeta-comunicacion.module.scss';

import { IconWrapper } from '../../icono/icon-wrapper/icon-wrapper';
import { Badge } from '../../badge/badge';
import { IconName } from '../../icono/icon-wrapper/icon-definitions';

import { TarjetaComunicacionHeader } from './componentes/tarjeta-comunicacion-header';
import { TarjetaComunicacionBoton } from './componentes/tarjeta-comunicacion-boton';

export interface TarjetaComunicacionProps {
  id: number;
  titulo: string;
  subtitulo?: string;
  notaSuperior?: string;
  icono?: IconName;
  colorIcono?: 'primario' | 'secundario';
  texto?: string;
  onClick?: () => void;
  seleccionada?: boolean;
  archivada?: boolean;
  disabled?: boolean;
  esBoton?: boolean;
  contador?: number;
}

export function TarjetaComunicacion({
  id,
  titulo,
  subtitulo,
  notaSuperior,
  icono,
  colorIcono,
  texto,
  onClick,
  seleccionada = false,
  archivada = false,
  disabled = false,
  esBoton = false,
  contador = 0,
}: TarjetaComunicacionProps) {
  return (
    <div
      id={`tarjeta-${id}`}
      role="link"
      tabIndex={0}
      onClick={disabled ? undefined : onClick}
      aria-label={`${titulo}${subtitulo ? `, ${subtitulo}` : ''}`}
      data-testid="tarjetaComunicacion"
      className={classNames(styles.tarjeta, {
        [styles.tarjeta__archivada]: archivada,
        [styles.tarjeta__boton]: esBoton,
        [styles.tarjeta__seleccionada]: seleccionada,
        [styles.tarjeta__disabled]: disabled,
      })}
    >
      {esBoton ? (
        <TarjetaComunicacionBoton
          titulo={titulo}
          icono={icono}
          contador={contador}
        />
      ) : (
        <TarjetaComunicacionHeader titulo={titulo} fecha={notaSuperior ?? ''} />
      )}

      {subtitulo && (
        <span className={styles.texto__subtitulo}>{subtitulo}</span>
      )}

      <div className={styles.fila__inferior}>
        {!esBoton && icono && (
          <IconWrapper
            data-testid="icono"
            icono={icono}
            size="sm"
            className={classNames(styles.icono, {
              [styles.icono__primario]: colorIcono === 'primario',
              [styles.icono__secundario]: colorIcono === 'secundario',
            })}
          />
        )}

        <span className={styles.texto__inferior}>{texto}</span>

        {!esBoton && contador! > 0 && (
          <span className={styles.badge}>
            <Badge count={contador} />
          </span>
        )}
      </div>
    </div>
  );
}
