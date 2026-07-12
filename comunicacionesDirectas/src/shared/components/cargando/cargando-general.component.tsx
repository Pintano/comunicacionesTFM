import { useEffect, useState } from 'react';
import { IconoCarga } from 'C:/Users/ataberna/tracasa-components/src/index.ts';
import { useTranslation } from 'react-i18next';

import { useAppStore } from '@/shared/zustand/store';
import { matchPath, useLocation } from 'react-router-dom';
import { useIsFetching } from '@tanstack/react-query';
import { Routes } from '@/shared/config/routing';
import { default as generalStyles } from '@/shared/styles/general/general.module.css';

const paginasExcluidas = [
  Routes.expedienteResumenExpedienteCategorias.absolutePath,
  Routes.comunicacionesDirectas.relativePath,
];

export default function CargandoGeneralComponent() {
  const resetearCarga = useAppStore((state) => state.resetearCarga);

  const location = useLocation();
  useEffect(() => resetearCarga(), [location.pathname, resetearCarga]);

  if (paginasExcluidas.some((x) => matchPath(x, location.pathname)))
    return <></>;

  return <MostrarCarga />;
}

const MostrarCarga = () => {
  const isFetching = useIsFetching();
  const [mostrarCarga, setMostrarCarga] = useState(false);

  const cargando = useAppStore((state) => state.cargando);

  const { t } = useTranslation();

  useEffect(() => {
    let timeout: string | number | NodeJS.Timeout | undefined;

    if (isFetching) {
      timeout = setTimeout(() => {
        setMostrarCarga(true);
      }, 200);
    } else {
      setMostrarCarga(false);
      clearTimeout(timeout);
    }

    return () => clearTimeout(timeout);
  }, [isFetching]);

  if (mostrarCarga || cargando)
    return (
      <div className={generalStyles['overlay-cargando']}>
        <IconoCarga texto={t('palabras.cargando')} />
      </div>
    );

  return <></>;
};
