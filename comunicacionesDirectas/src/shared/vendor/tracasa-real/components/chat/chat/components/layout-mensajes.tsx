import React, { useEffect, useMemo, useRef } from 'react';

import { Bocadillo, BocadilloProps } from '../../bocadillo/bocadillo';

import useComponentsTranslation from '../../../../hooks/use-translation';

import {
  agruparMensajesPorFecha,
  formatearFechaGrupo,
} from '../chat-layout.utils';

import styles from '../chat-layout.module.scss';

export interface LayoutMensajesProps {
  mensajes: BocadilloProps[];
}

export const LayoutMensajes = React.memo(
  ({ mensajes }: LayoutMensajesProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const { t } = useComponentsTranslation();

    useEffect(() => {
      const div = scrollRef.current;
      if (div) div.scrollTop = div.scrollHeight;
    }, [mensajes]);

    const mensajesAgrupados = useMemo(
      () => agruparMensajesPorFecha(mensajes),
      [mensajes],
    );

    return (
      <div ref={scrollRef} tabIndex={0} className={styles.container__chat}>
        {Object.entries(mensajesAgrupados).map(
          ([fechaMensajes, mensajesPorFecha]) => (
            <div key={fechaMensajes}>
              <div className={styles.content__fecha__separador}>
                <span className={styles.content__fecha__texto}>
                  {formatearFechaGrupo(fechaMensajes, t)}
                </span>
              </div>
              {mensajesPorFecha.map((mensaje, index) => (
                <div
                  key={index}
                  className={
                    mensaje.esGenerico
                      ? styles.content__mensaje__generico
                      : mensaje.esPropio
                        ? styles.content__mensaje__propio
                        : styles.content__mensaje__ajeno
                  }
                >
                  <Bocadillo
                    texto={mensaje.texto}
                    fecha={mensaje.fecha}
                    estado={mensaje.estado}
                    esPropio={mensaje.esPropio}
                    esGenerico={mensaje.esGenerico}
                    esAdjunto={mensaje.esAdjunto}
                    onClickEnAdjuntos={mensaje.onClickEnAdjuntos}
                    idEnMemoria={mensaje.idEnMemoria}
                  />
                </div>
              ))}
            </div>
          ),
        )}
      </div>
    );
  },
);
