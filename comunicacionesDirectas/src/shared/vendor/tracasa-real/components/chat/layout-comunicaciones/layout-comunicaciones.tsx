import React, { ReactNode, useState } from 'react';

import { IconWrapper } from '../../icono/icon-wrapper/icon-wrapper';
import { IconName } from '../../icono/icon-wrapper/icon-definitions';
import { useScreenSize } from '../../../hooks/use-screen-size';

import { LayoutComunicacionesHeaderSection } from './layout-comunicaciones-header';

import styles from './layout-comunicaciones.module.scss';

export type HeaderComunicaciones = {
  buttonLeft?: IconName;
  onClickButtonLeft?: () => void;
  buttonRight?: IconName;
  onClickButtonRight?: () => void;
  textLeft?: string;
  textRight?: string;
};

export type LayoutComunicacionesProps = React.HTMLAttributes<HTMLElement> & {
  sidebar: ReactNode;
  header?: HeaderComunicaciones;
  contenido: ReactNode;
  id?: string | number;
  titulo?: ReactNode;
  colapsableSidebar?: boolean;
  mostrarHeader?: boolean;
  esVistaDetalle?: boolean;
};

export function LayoutComunicaciones({
  sidebar,
  header,
  contenido,
  id,
  colapsableSidebar = true,
  mostrarHeader = false,
  esVistaDetalle = false,
}: React.PropsWithChildren<LayoutComunicacionesProps>) {
  const { isMobile } = useScreenSize();

  const [isSidebarAbierto, setIsSidebarAbierto] = useState(true);
  const toggleSidebar = () => setIsSidebarAbierto((prev) => !prev);

  const debeMostrarSidebar = !isMobile || (isMobile && !esVistaDetalle);
  const debeMostrarContenido = !isMobile || (isMobile && esVistaDetalle);

  return (
    <section
      id={id}
      className={styles.estructura}
      data-testid="layout-comunicaciones-seccion"
    >
      <div className={styles.contenedor}>
        {colapsableSidebar && !isMobile && (
          <button
            onClick={toggleSidebar}
            aria-expanded={isSidebarAbierto}
            aria-label="Alternar sidebar"
            className={`
              ${styles.colapsable__toggle_button}
              ${!isSidebarAbierto ? styles.colapsable__toggle_button__reabrir : ''}
            `}
          >
            <IconWrapper
              icono="chevronLeft"
              size="md"
              className={`
                ${styles.colapsable__chevron}
                ${!isSidebarAbierto ? styles.colapsable__chevron__rotar : ''}
              `}
            />
          </button>
        )}

        {debeMostrarSidebar && (
          <div
            className={`
              ${styles.sidebar__contenedor}
              ${!isSidebarAbierto ? styles.sidebar__contenedor__cerrado : ''}
            `}
          >
            <aside
              className={styles.sidebar__aside}
              data-testid="layout-comunicaciones-sidebar"
            >
              {sidebar}
            </aside>
          </div>
        )}

        {debeMostrarContenido && (
          <main
            className={styles.main__contenedor}
            data-testid="layout-comunicaciones-elementos"
          >
            {mostrarHeader && header && (
              <header data-testid="layout-comunicaciones-header">
                <LayoutComunicacionesHeaderSection {...header} />
              </header>
            )}

            <article
              className={styles.main__contenido}
              data-testid="layout-comunicaciones-contenido"
            >
              {contenido}
            </article>
          </main>
        )}
      </div>
    </section>
  );
}

export default LayoutComunicaciones;
