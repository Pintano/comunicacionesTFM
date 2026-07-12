import { IMinutaRepository } from '@/shared/repositories/minuta/minuta.repository';
import {
  comprobarAvisoMinutajeRequest,
  comprobarAvisoMinutajeResponse,
} from '@/shared/repositories/minuta/models/comprobar-aviso-minutaje';

type MinutaServiceProps = {
  repository: IMinutaRepository;
};

export const useMinutaService = ({ repository }: MinutaServiceProps) => {
  const comprobarAvisoMinutaje = async (
    request: comprobarAvisoMinutajeRequest,
  ): Promise<comprobarAvisoMinutajeResponse> => {
    try {
      return await repository.comprobarAvisoMinutaje(request);
    } catch (error) {
      console.error('Error al obtener los datos de la consulta:', error);
      throw error;
    }
  };

  return {
    comprobarAvisoMinutaje,
  };
};
