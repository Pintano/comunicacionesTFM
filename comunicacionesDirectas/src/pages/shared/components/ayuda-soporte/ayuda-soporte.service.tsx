import {
  IAyudaSoporteRepository,
  TieneAccesoAyudaSoporteResponse,
  TieneAccesoAyudaSoporteRequest,
} from '@/shared/repositories/ayuda-soporte';
import {
  IConfiguracionDespliegueRepository,
  ObtenerConfiguracionDespliegueRequest,
  ObtenerConfiguracionDespliegueResponse,
} from '@/shared/repositories/configuracion-despliegue';
import { useQuery } from '@tanstack/react-query';

type ComprobarEntornoParaIncidenciasProps = {
  configuracionDespliegueRepository: IConfiguracionDespliegueRepository;
};

export const TieneAccesoAyudaSoporte = (
  ayudaSoporteRepository: IAyudaSoporteRepository,
  tieneAccesoAyudaSoporteRequest: TieneAccesoAyudaSoporteRequest,
) => {
  return useQuery<TieneAccesoAyudaSoporteResponse>({
    queryKey: ['ayuda_soporte_tiene_acceso'],
    queryFn: () =>
      ayudaSoporteRepository.tieneAccesoAyudaSoporte(
        tieneAccesoAyudaSoporteRequest,
      ),
    staleTime: Infinity,
    retry: 3,
    throwOnError: true,
  });
};

export const ComprobarEntornoParaIncidencias = ({
  configuracionDespliegueRepository,
}: ComprobarEntornoParaIncidenciasProps) => {
  return useQuery<ObtenerConfiguracionDespliegueResponse>({
    queryKey: ['ayuda_soporte_tiene_acceso'],
    queryFn: () =>
      configuracionDespliegueRepository.obtenerConfiguracionDespliegue({
        Variable: 'PermitirAbrirIncidencias',
      } as ObtenerConfiguracionDespliegueRequest),
    staleTime: Infinity,
    retry: 3,
    throwOnError: true,
  });
};
