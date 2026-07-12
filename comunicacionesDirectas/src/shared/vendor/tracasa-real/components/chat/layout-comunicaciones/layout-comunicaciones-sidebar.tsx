import type { PropsWithChildren } from 'react';
import styles from './layout-comunicaciones.module.scss';
import { StackLayout } from '../../../layouts/stack-layout/stack-layout';

interface LayoutComunicacionesFilterSectionProps {
  title: string;
}

export function LayoutComunicacionesFilterSection({
  title,
  children,
}: PropsWithChildren<LayoutComunicacionesFilterSectionProps>) {
  return (
    <StackLayout>
      <h3 className={styles.sidebar__contenido}>{title}</h3>
      {children}
    </StackLayout>
  );
}
