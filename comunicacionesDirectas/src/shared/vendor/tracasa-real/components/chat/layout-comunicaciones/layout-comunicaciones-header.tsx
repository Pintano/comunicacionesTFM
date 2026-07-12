import { PropsWithChildren } from 'react';

import { IconButtonShape } from '../../base/icon-button-shape/icon-button-shape';
import { IconName } from '../../icono/icon-wrapper/icon-definitions';

import styles from './layout-comunicaciones.module.scss';

interface LayoutComunicacionesHeaderSectionProps {
  buttonLeft?: IconName;
  onClickButtonLeft?: () => void;
  buttonRight?: IconName;
  onClickButtonRight?: () => void;
  textLeft?: string;
  textRight?: string;
}

export function LayoutComunicacionesHeaderSection({
  buttonLeft,
  onClickButtonLeft,
  buttonRight,
  onClickButtonRight,
  textLeft,
  textRight,
}: PropsWithChildren<LayoutComunicacionesHeaderSectionProps>) {
  return (
    <div className={styles.header}>
      {buttonLeft && (
        <span className={styles.header__button__left}>
          <IconButtonShape
            icon={buttonLeft}
            variant="tertiary"
            shape="square"
            size="lg"
            aria-label="buttonLeft"
            onClick={onClickButtonLeft}
          />
        </span>
      )}

      <span className={styles.header__text}>
        {textLeft && (
          <span className={styles.header__text__left} title={textLeft}>
            {textLeft}
          </span>
        )}

        {textRight && (
          <span className={styles.header__text__right} title={textRight}>
            {textRight}
          </span>
        )}
      </span>

      {buttonRight && (
        <span className={styles.header__button__right}>
          <IconButtonShape
            icon={buttonRight}
            variant="tertiary"
            shape="square"
            size="lg"
            aria-label="buttonRight"
            onClick={onClickButtonRight}
          />
        </span>
      )}
    </div>
  );
}
