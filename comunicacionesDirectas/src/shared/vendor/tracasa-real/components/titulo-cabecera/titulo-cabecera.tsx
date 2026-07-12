import { PropsWithChildren } from 'react';
import styles from './titulo-cabecera.module.scss';
import { capitalize } from '../../helpers/helpers';

export function TituloCabecera({ children }: PropsWithChildren) {
  return (
    <h1 className={styles.titulo_cabecera}>
      {children && capitalize(children.toString())}
    </h1>
  );
}
