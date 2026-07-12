import React from 'react';
import styles from './titulo-comunicaciones.module.scss';

interface TituloComunicacionProps {
  titulo?: string;
  rol?: string;
}

export const TituloComunicacion: React.FC<TituloComunicacionProps> = ({
  titulo,
  rol,
}) => (
  <div className={styles.titulo_comunicaciones}>
    {titulo && (
      <span className={styles.titulo_comunicaciones__titulo}>{titulo}</span>
    )}
    {rol && (
      <span className={styles.titulo_comunicaciones__detalle}>{rol}</span>
    )}
  </div>
);
