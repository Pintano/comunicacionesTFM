import { ObtenerPermisoYExpedienteAsignadoPorUsuario } from '@/pages/grupos-trabajo/shared/grupos-trabajo.service';
import { GruposTrabajoHttpRepository } from '@/shared/repositories/grupos-trabajo/grupos-trabajo.http.repository';

const gruposTrabajoRepository = GruposTrabajoHttpRepository();

export const ComprobarPermisoUsuarioEnExpediente = ({
  idExpediente,
}: {
  idExpediente: string;
}) => {
  const { data: tienePermisoYExpedienteAsignado } =
    ObtenerPermisoYExpedienteAsignadoPorUsuario({
      gruposTrabajoRepository,
      idExpediente,
    });

  return tienePermisoYExpedienteAsignado;
};
