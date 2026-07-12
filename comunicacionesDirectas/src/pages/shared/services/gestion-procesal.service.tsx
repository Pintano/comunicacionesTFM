import { MagistradosYLetrados } from '@/pages/bandejas/bandeja-entrada/models/usuario-fimante.model';
import { queryKeys } from '@/shared/config/queries';
import {
  mapUsuarioFirmanteRepositoryToUsuarioFirmante,
  ObtenerMagistradosYLetradosRequest,
} from '@/shared/repositories/gestion-procesal';
import { GestionProcesalHttpRepository } from '@/shared/repositories/gestion-procesal';
import { ObtenerOrganoJudicialContextoResponse } from '@/shared/repositories/gestion-procesal/models/obtener-organo-judicial-contexto';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSuspenseQueryCargando } from '../hooks/use-suspense-cargando';

const gestionProcesalRepository = GestionProcesalHttpRepository();

type ObtenerOrganoJudicialContextoProps = {
  id: string;
  contexto: number;
};

export const ObtenerOrganoJudicialContexto = ({
  id,
  contexto,
}: ObtenerOrganoJudicialContextoProps) => {
  const {
    data,
    isLoading: isLoadingObtenerOrganoJudicialContexto,
    error,
    refetch,
  } = useQuery({
    queryKey: queryKeys.expediente.resumen.obtenerOrganoJudicialContexto(
      id,
      contexto,
    ),
    queryFn: () =>
      gestionProcesalRepository.obtenerOrganoJudicialContexto({ id, contexto }),
  });

  return {
    respuesta: data?.idOrganoJudicial ?? null,
    isLoadingObtenerOrganoJudicialContexto,
    error,
    refetchObtenerOrganoJudicialContexto: refetch,
  };
};

export const ObtenerOrganoJudicialContextoSuspense = ({
  id,
  contexto,
}: ObtenerOrganoJudicialContextoProps) => {
  const {
    data,
    isLoading: isLoadingObtenerOrganoJudicialContexto,
    error,
    refetch,
  } = useSuspenseQueryCargando({
    queryKey: ['obtener-organo-contexto-suspense', id, contexto],
    queryFn: () =>
      gestionProcesalRepository.obtenerOrganoJudicialContexto({ id, contexto }),
  });

  return {
    respuesta: data?.idOrganoJudicial ?? null,
    isLoadingObtenerOrganoJudicialContexto,
    error,
    refetchObtenerOrganoJudicialContexto: refetch,
  };
};

export const ObtenerOrganoJudicialContextoMutate = ({
  id,
  contexto,
}: ObtenerOrganoJudicialContextoProps) => {
  const { mutateAsync, data, error } = useMutation({
    mutationKey: ['obtener-organo-contexto', id, contexto],
    mutationFn: () =>
      gestionProcesalRepository.obtenerOrganoJudicialContexto({ id, contexto }),
  });

  return {
    obtenerOrganoJudicialContexto: mutateAsync,
    respuesta: data?.idOrganoJudicial ?? null,
    error,
  };
};

export const ObtenerOrganoJudicialContextoAsync = async ({
  id,
  contexto,
}: ObtenerOrganoJudicialContextoProps): Promise<ObtenerOrganoJudicialContextoResponse> => {
  return await gestionProcesalRepository.obtenerOrganoJudicialContexto({
    id,
    contexto,
  });
};

export type ObtenerMagistradosYLetradosProps = {
  request: ObtenerMagistradosYLetradosRequest;
  guardarEnCache?: boolean;
};

export const ObtenerMagistradosYLetrados = ({
  request,
  guardarEnCache = true,
}: ObtenerMagistradosYLetradosProps) => {
  const {
    data,
    isLoading: isLoadingObtenerMagistradosYLetrados,
    error,
  } = useSuspenseQueryCargando({
    queryKey: ['magistrados-y-letrados'],
    queryFn: async (): Promise<MagistradosYLetrados> => {
      const respuesta =
        await gestionProcesalRepository.obtenerMagistradosYLetrados(request);

      return {
        magistrados: mapUsuarioFirmanteRepositoryToUsuarioFirmante(
          respuesta.magistrados,
        ),
        letrados: mapUsuarioFirmanteRepositoryToUsuarioFirmante(
          respuesta.letrados,
        ),
      };
    },
    gcTime: guardarEnCache ? undefined : 0,
    staleTime: guardarEnCache ? Infinity : 0,
  });

  return {
    respuesta: data,
    isLoadingObtenerMagistradosYLetrados,
    error,
  };
};
