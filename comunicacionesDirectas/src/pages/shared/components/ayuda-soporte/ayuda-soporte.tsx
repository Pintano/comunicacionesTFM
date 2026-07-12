import { openNewWindow } from '@/shared/helpers/helpers';
import { IconButton } from 'C:/Users/ataberna/tracasa-components/src/index.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  guardarEnLocalObjetoCompartido,
  verificarAcceso,
} from './ayuda-soporte.utils';

const RUTA_CATALOGO_SERVICIOS = 'app/index.html#/catalogoServicios/';

type AyudaSoporteProps = {
  sinIcono?: boolean;
};

export function AyudaSoporte({ sinIcono = false }: AyudaSoporteProps) {
  const [esVisible, setEsVisible] = useState<boolean>(true);
  const { t } = useTranslation();

  const handleAyudaSoporteClick = () => {
    guardarEnLocalObjetoCompartido();
    openNewWindow(RUTA_CATALOGO_SERVICIOS, 'small');
  };

  useEffect(() => {
    const comprobarAcceso = async () => {
      const tieneAcceso = await verificarAcceso();
      setEsVisible(tieneAcceso);
    };

    comprobarAcceso();
  }, []);

  return (
    esVisible &&
    (!sinIcono ? (
      <IconButton
        aria-label={t('navbar.ayudaYSoporte')}
        icon="help"
        color="white"
        onClick={handleAyudaSoporteClick}
      />
    ) : (
      <button onClick={handleAyudaSoporteClick} className="profile__menu">
        {t('navbar.ayudaYSoporte')}
      </button>
    ))
  );
}
