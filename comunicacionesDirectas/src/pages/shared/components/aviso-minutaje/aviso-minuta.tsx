import { openNewWindow } from '@/shared/helpers/helpers';
import { IconButton } from 'tracasa-components';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMinutaService } from './aviso-minuta.service';
import { IMinutaRepository } from '@/shared/repositories/minuta/minuta.repository';

type AvisoMinutaProps = {
  minutaRepository: IMinutaRepository;
  iconosMinutaActivados: boolean;
};

const AvisoMinuta = ({
  minutaRepository: MinutaRepository,
  iconosMinutaActivados: iconoMinutaActivados,
}: AvisoMinutaProps) => {
  const { t } = useTranslation();
  const minutaService = useMinutaService({ repository: MinutaRepository });

  const [visibilidadMinuta, setVisibilidadMinuta] = useState<boolean>(true);
  const [visibilidadMinutaPrioritarios, setVisibilidadMinutaPrioritarios] =
    useState<boolean>(true);
  const [accesoMinuta, setAccesoMinuta] = useState<boolean>(true);
  const [tieneMensajes, setTieneMensajes] = useState<boolean>(true);
  const [tieneMensajesPrioritarios, setTieneMensajesPrioritarios] =
    useState<boolean>(true);

  const clickAvisoMinuta = async () => {
    if (visibilidadMinuta) {
      const url = 'app/index.html#/hilosMensajes/bandejaDeEntrada';
      openNewWindow(url, 'fullscreen');
    }
  };

  const clickAvisoMinutaPrioritarios = async () => {
    if (visibilidadMinuta) {
      const url = 'app/index.html#/hilosMensajes/bandejaDeEntrada/prioritarios';
      openNewWindow(url, 'fullscreen');
    }
  };

  useEffect(() => {
    if (!iconoMinutaActivados) {
      return;
    }
    const comprobarMinutaje = async () => {
      try {
        const resultado = await minutaService.comprobarAvisoMinutaje({});
        setAccesoMinuta(resultado.TieneAccesoAvisoMinutaje);
        setTieneMensajes(resultado.TieneMensajesPendientes);
        setTieneMensajesPrioritarios(
          resultado.TieneMensajesPrioritariosPendientes,
        );

        if (accesoMinuta && tieneMensajes) {
          setVisibilidadMinuta(true);
        }
        if (tieneMensajesPrioritarios) {
          setVisibilidadMinutaPrioritarios(true);
        }
      } catch {
        console.log('Error al cargar minuta');
      }
    };

    comprobarMinutaje();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {visibilidadMinutaPrioritarios && (
        <IconButton
          color="white"
          aria-label={t('navbar.mensajesPrioritarios')}
          icon="exclamationCircle"
          onClick={clickAvisoMinutaPrioritarios}
        />
      )}
      {visibilidadMinuta && (
        <IconButton
          color="white"
          aria-label={t('navbar.mensajesPendientes')}
          icon="messages"
          onClick={clickAvisoMinuta}
        />
      )}
    </>
  );
};

export default AvisoMinuta;
