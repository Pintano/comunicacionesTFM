import React, { useMemo } from 'react';
import classNames from 'classnames';

import { IconWrapper } from '../../icono/icon-wrapper/icon-wrapper';
import { TextButton } from '../../base/text-button/text-button';

import useComponentsTranslation from '../../../hooks/use-translation';

import { EstadosBocadillo } from './bocadillo.types';
import { obtenerEstado } from './bocadillo.utils';

import styles from './bocadillo.module.scss';

export interface BocadilloProps {
  texto: string;
  fecha: Date;
  estado?: EstadosBocadillo;
  esPropio: boolean;
  esGenerico?: boolean;
  esAdjunto: boolean;
  onClickEnAdjuntos: () => void;
  idEnMemoria?: string;
}

export const Bocadillo = React.memo(
  ({
    texto,
    fecha,
    estado,
    esPropio,
    esGenerico = false,
    esAdjunto,
    onClickEnAdjuntos,
    idEnMemoria,
  }: BocadilloProps) => {
    const { t } = useComponentsTranslation();

    const { clase, icono } = obtenerEstado(estado);

    const fechaFormateada = useMemo(
      () =>
        fecha.toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      [fecha],
    );

    return (
      <div
        id={idEnMemoria}
        className={classNames(styles.container, {
          [styles.container__generico]: esGenerico,
          [styles.container__propio]: !esGenerico && esPropio,
          [styles.container__ajeno]: !esGenerico && !esPropio,
        })}
        data-testid="bocadillo"
      >
        <div className={styles.content}>
          {!esAdjunto ? (
            <div className={styles.content__texto}>{texto}</div>
          ) : (
            <div className={styles.content__adjunto}>
              <div className={styles.content__adjunto}>
                <IconWrapper
                  className={styles.content__adjunto__icon}
                  icono="file"
                  size="md"
                />
                <span className={styles.content__adjunto__textoIcon}>
                  {t('chat.bocadillo.ficheroAdjunto')}
                </span>
              </div>

              <span className={styles.content__adjunto__texto} title={texto}>
                {texto}
              </span>
              <TextButton
                onClick={() => {
                  onClickEnAdjuntos?.();
                }}
              >
                {t('chat.bocadillo.descargar')}
              </TextButton>
            </div>
          )}

          <div className={styles.footer}>
            <span className={styles.footer__hora}>{fechaFormateada}</span>

            {esPropio && !esGenerico && (
              <span className={classNames(styles.footer__estado, clase)}>
                <IconWrapper icono={icono} size="sm" />
              </span>
            )}
          </div>
        </div>
      </div>
    );
  },
);
