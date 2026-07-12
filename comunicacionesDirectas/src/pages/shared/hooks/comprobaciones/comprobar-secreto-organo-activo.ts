import { ComprobacionesAbrirAccionHttpRepository } from '@/shared/repositories/comprobaciones-abrir-accion';
import { useQuery } from '@tanstack/react-query';

const comprobacionesAbrirAccionRepository =
  ComprobacionesAbrirAccionHttpRepository();

export const ComprobarSiExpedienteEstaSecretoSumarial = ({
  idExpedienteEncriptado,
}: {
  idExpedienteEncriptado: string;
}) => {
  const result = useQuery({
    queryKey: [
      'expediente',
      'detalle',
      'ComprobarSiExpedienteEstaSecretoSumarial',
    ],
    queryFn: async () => {
      const res =
        await comprobacionesAbrirAccionRepository.comprobarAccesoSecretoSumarial(
          {
            idExpediente: idExpedienteEncriptado,
          },
        );
      return res;
    },
    staleTime: 0,
    gcTime: 0,
  });
  return result.data;
};

export const ComprobarSiExpedienteEstaOrganoActivo = ({
  idExpedienteEncriptado,
}: {
  idExpedienteEncriptado: string;
}) => {
  const result = useQuery({
    queryKey: [
      'expediente',
      'detalle',
      'comprobarSiExpedienteEstaOrganoActivo',
      idExpedienteEncriptado,
    ],
    queryFn: async () => {
      const res =
        await comprobacionesAbrirAccionRepository.comprobarTramitadoEnOrganoActivo(
          {
            idExpediente: idExpedienteEncriptado,
          },
        );
      return res;
    },
  });
  return result.data?.tramitadoEnOrganoActivo;
};

export const ComprobarAccesoRemotoEnExpedienteSCPEDesdeSuUPADConValidaciones =
  ({ idExpedienteEncriptado }: { idExpedienteEncriptado: string }) => {
    const result = useQuery({
      queryKey: [
        'expediente',
        'detalle',
        'comprobarAccesoRemotoEnExpedienteSCPEDesdeSuUPADConValidaciones',
        idExpedienteEncriptado,
      ],
      queryFn: async () => {
        const res =
          await comprobacionesAbrirAccionRepository.esAccesoRemotoEnExpedienteSCPEDesdeSuUPAD(
            {
              idExpediente: idExpedienteEncriptado,
            },
          );
        return res;
      },
    });
    return result.data?.esAccesoRemotoEnExpedienteSCPEDesdeSuUPAD;
  };
