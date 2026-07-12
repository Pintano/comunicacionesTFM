import { BarraHerramientas } from 'C:/Users/ataberna/tracasa-components/src/index.ts';
import { IComunicacionesDirectasRepository } from '@/shared/repositories/comunicaciones-directas';

import { BotonArchivar } from './boton-archivar-component';
import { ComunicacionInfo } from '@/shared/repositories/comunicaciones-directas/models/comunicaciones-directas';
import ArchivarComunicacionModal from './modal-archivar-conversacion/modal-archivadas';

interface Props {
  conversacion?: ComunicacionInfo;
  estadoComunicacion: 'activas' | 'archivadas';
  comunicacionesDirectasRepository: IComunicacionesDirectasRepository;
}

export const BarraHerramientasComunicacion = ({
  conversacion,
  estadoComunicacion,
  comunicacionesDirectasRepository,
}: Props) => {
  if (!conversacion) return null;

  return (
    <>
      <BarraHerramientas>
        {estadoComunicacion === 'activas' && (
          <BotonArchivar idComunicacion={conversacion.idComunicacion} />
        )}
      </BarraHerramientas>
      <ArchivarComunicacionModal
        comunicacionesDirectasRepository={comunicacionesDirectasRepository}
      />
    </>
  );
};
