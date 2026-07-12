import styles from '../tarjeta-comunicacion.module.scss';
import { IconWrapper } from '../../../icono/icon-wrapper/icon-wrapper';
import { IconName } from '../../../icono/icon-wrapper/icon-definitions';
import { Badge } from '../../../badge/badge';

interface TarjetaComunicacionBotonProps {
  titulo: string;
  icono?: IconName;
  contador?: number;
}

export function TarjetaComunicacionBoton({
  titulo,
  icono = 'archive',
  contador = 0,
}: TarjetaComunicacionBotonProps) {
  return (
    <div className={styles.fila__superior}>
      <IconWrapper icono={icono} size="md" />

      <span className={styles.texto__titulo} title={titulo}>
        {titulo}
      </span>

      {contador! > 0 && (
        <span className={styles.badge}>
          <Badge count={contador} />
        </span>
      )}
    </div>
  );
}
