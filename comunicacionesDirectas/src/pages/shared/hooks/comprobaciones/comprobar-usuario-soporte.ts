import { useAppStore } from '@/shared/zustand/store';
import {
  accesoValidacionSoporte,
  accesoValidacionSoporteAsunto,
} from '../acciones/acciones-generales';
import { TiposRegistroEnum } from '@/shared/components/listado-expedientes/tipos-registro-enum';
import { generatePath, useNavigate } from 'react-router-dom';
import { Routes } from '@/shared/config/routing';
import { useBroadcastListener } from '@/shared/hooks/broadcast-listener.hook';
import {
  abrirVentanaHojaRegistro,
  abrirVentanaHojaRegistroFiscalia,
} from '../../utils/ventanas-avantius.utils';
import { ObtenerMaestrosAccionesGenerales } from '@/pages/explorador/expedientes/juzgado/expedientes-explorador.service';
import { useQueryClient } from '@/shared/hooks/use-query-client.hook';
import { useConfiguracionBaseExplorador } from '../use-configuracion-base-explorador';
import { EsFiscalia } from '../../utils/utils';
import { IGestionProcesalRepository } from '@/shared/repositories/gestion-procesal';
import {
  abrirHojaRegistroAsuntoAngular,
  abrirHojaRegistroAsuntoAspx,
} from '../acciones/acciones-asunto';
import { TFunction } from 'i18next';
import { Dispatch, SetStateAction } from 'react';
import { AvisoProps, TiposAsuntoEnum } from 'tracasa-components';

export const ComprobarUsuarioSoporte = () => {
  const navigate = useNavigate();
  const usuario = useAppStore((x) => x.usuario);
  const queryClient = useQueryClient();

  const terminarCarga = useAppStore((x) => x.terminarCarga);
  const empezarCarga = useAppStore((x) => x.empezarCarga);

  const {
    configuracion: {
      tipoOrganoExplorador: { segundaInstancia: esSegundaInstancia },
    },
  } = useConfiguracionBaseExplorador();

  useBroadcastListener(
    (idExpediente: string) =>
      navigate(
        generatePath(Routes.expedienteResumenExpediente.absolutePath, {
          idExpediente,
        }),
      ),
    'redireccion-detalle-explorador',
  );

  const { data: maestrosMenusAccionesGenerales } =
    ObtenerMaestrosAccionesGenerales({ usuario });

  const abrirDetalleExpediente = (idExpediente: string) => {
    queryClient.resetQueries({
      queryKey: ['resumenExpediente', 'expediente', idExpediente],
    });
    maestrosMenusAccionesGenerales?.esUsuarioSoporte
      ? accesoValidacionSoporte({ idExpediente })
      : navigate(
          generatePath(Routes.expedienteResumenExpediente.absolutePath, {
            idExpediente,
          }),
        );
  };

  const abrirHojaRegistro = ({
    idExpediente,
    esModoAccesoAlta = false,
    esExpedientePropioFiscalia = false,
    esExpedientePropioSegundaInstancia = false,
    mostrarOperacionesCatalogo = false,
  }: {
    idExpediente: string;
    esExpedientePropioFiscalia?: boolean;
    esExpedientePropioSegundaInstancia?: boolean;
    esModoAccesoAlta?: boolean;
    mostrarOperacionesCatalogo?: boolean;
  }) => {
    const esAccesoRegistroExpediente = true;
    const esAccesoLegajo = false;
    const idTipoRegistro = esExpedientePropioFiscalia
      ? TiposRegistroEnum.RegistroExpedienteFiscalia
      : TiposRegistroEnum.RegistroExpedientes;

    maestrosMenusAccionesGenerales?.esUsuarioSoporte
      ? accesoValidacionSoporte({
          esAccesoRegistroExpediente,
          esAccesoLegajo,
          idExpediente,
          idTipoRegistro,
        })
      : esExpedientePropioFiscalia
        ? abrirVentanaHojaRegistroFiscalia(idExpediente)
        : abrirVentanaHojaRegistroJuzgado({
            idExpediente,
            esModoAccesoAlta,
            mostrarOperacionesCatalogo,
            esExpedientePropioSegundaInstancia,
          });
  };

  const abrirVentanaHojaRegistroJuzgado = ({
    idExpediente,
    esModoAccesoAlta,
    mostrarOperacionesCatalogo,
    esExpedientePropioSegundaInstancia,
  }: {
    idExpediente: string;
    esModoAccesoAlta: boolean;
    mostrarOperacionesCatalogo: boolean;
    esExpedientePropioSegundaInstancia: boolean;
  }) => {
    const esFiscalia = EsFiscalia(usuario?.idoit);
    const nuevoThread =
      (esSegundaInstancia && !esExpedientePropioSegundaInstancia) || esFiscalia;

    abrirVentanaHojaRegistro({
      idExpediente,
      esModoAccesoAlta,
      nuevoThread,
      mostrarOperacionesCatalogo: mostrarOperacionesCatalogo && !esFiscalia,
      esFiscalia,
    });
  };

  const abrirHojaRegistroAsunto = async ({
    idAsunto,
    idTipoAsunto,
    cambioOit,
    esSecretoSumarial,
    esUsuarioSecretoSumarial,
    gestionProcesalRepository,
    setAviso,
    t,
  }: {
    idAsunto: string;
    idTipoAsunto: number;
    cambioOit: boolean;
    esSecretoSumarial: boolean;
    esUsuarioSecretoSumarial: boolean;
    gestionProcesalRepository: IGestionProcesalRepository;
    setAviso: Dispatch<SetStateAction<AvisoProps | undefined>>;
    t: TFunction<'translation', undefined>;
  }) => {
    empezarCarga(['abrirHojaRegistroAsunto']);

    const data =
      await gestionProcesalRepository.obtenerParametrosHojaRegistroPorIdAsunto(
        idAsunto,
      );

    terminarCarga(['abrirHojaRegistroAsunto']);

    maestrosMenusAccionesGenerales?.esUsuarioSoporte
      ? accesoValidacionSoporteAsunto({
          idAsunto,
          idTipoAsunto,
          esOrigenEscritoAvantius: data.d.EsOrigenEscritoAvantius,
        })
      : comprobarSiHaySecretoSumarialParaAbrirHojaRegistroAsunto({
          esSecretoSumarial,
          esUsuarioSecretoSumarial,
          idAsunto,
          idTipoAsunto,
          esOrigenEscritoAvantius: data.d.EsOrigenEscritoAvantius,
          abrirHojaRegistroAngular: data.d.AbrirHojaRegistroEnAngular,
          cambioOit,
          setAviso,
          t,
        });
  };

  const comprobarSiHaySecretoSumarialParaAbrirHojaRegistroAsunto = ({
    esSecretoSumarial,
    esUsuarioSecretoSumarial,
    idAsunto,
    idTipoAsunto,
    cambioOit,
    esOrigenEscritoAvantius,
    abrirHojaRegistroAngular,
    setAviso,
    t,
  }: {
    esSecretoSumarial: boolean;
    esUsuarioSecretoSumarial: boolean;
    idAsunto: string;
    idTipoAsunto: number;
    cambioOit: boolean;
    esOrigenEscritoAvantius: boolean;
    abrirHojaRegistroAngular: boolean;
    setAviso: Dispatch<SetStateAction<AvisoProps | undefined>>;
    t: TFunction<'translation', undefined>;
  }) => {
    esSecretoSumarial && !esUsuarioSecretoSumarial
      ? setAviso({
          variant: 'error',
          message: t(
            'paginas.ribbon.erroresPermisosAcciones.avisoErrorAccesoSecretoSumarial',
          ),
          duration: 3000,
        })
      : abrirVentanaHojaRegistroAsunto({
          idAsunto,
          idTipoAsunto,
          esOrigenEscritoAvantius,
          cambioOit,
          abrirHojaRegistroAngular,
        });
  };

  const abrirVentanaHojaRegistroAsunto = async ({
    idAsunto,
    idTipoAsunto,
    cambioOit,
    esOrigenEscritoAvantius = false,
    abrirHojaRegistroAngular,
  }: {
    idAsunto: string;
    idTipoAsunto: number;
    cambioOit: boolean;
    esOrigenEscritoAvantius?: boolean;
    abrirHojaRegistroAngular: boolean;
  }) => {
    abrirHojaRegistroAngular
      ? abrirHojaRegistroAsuntoAngular({
          idAsunto,
          idTipoAsunto:
            idTipoAsunto == TiposAsuntoEnum.Recursos
              ? TiposAsuntoEnum.Asuntos
              : idTipoAsunto,
          esOrigenEscritoAvantius,
        })
      : abrirHojaRegistroAsuntoAspx({
          idAsunto,
          idTipoAsunto,
          esOrigenEscritoAvantius,
          cambioOit,
        });
  };

  return {
    abrirDetalleExpediente,
    abrirHojaRegistro,
    abrirHojaRegistroAsunto,
  };
};
