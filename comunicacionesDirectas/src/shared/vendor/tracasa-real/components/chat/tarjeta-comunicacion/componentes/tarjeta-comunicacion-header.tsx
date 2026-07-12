import styles from '../tarjeta-comunicacion.module.scss';

interface TarjetaComunicacionHeaderProps {
  titulo: string;
  fecha: string;
}

export function TarjetaComunicacionHeader({
  titulo,
  fecha,
}: TarjetaComunicacionHeaderProps) {
  return (
    <div className={styles.fila__superior}>
      <span className={styles.texto__titulo} title={titulo}>
        {titulo}
      </span>
      <time className={styles.texto__fecha}>{fecha}</time>
    </div>
  );
}
