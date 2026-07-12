import { ComunicacionesDirectasInMemory } from '@/shared/repositories/comunicaciones-directas';
import ErrorYSuspensePagina from '@/pages/shared/components/error/error-pagina';
import ComunicacionesDirectasPage from './comunicaciones-directas.page';
import { useMemo } from 'react';

export default function ComunicacionesDirectas() {
  const comunicacionesDirectasRepository = useMemo(
    () => new ComunicacionesDirectasInMemory(),
    [],
  );

  return (
    <ErrorYSuspensePagina>
      <ComunicacionesDirectasPage
        comunicacionesDirectasRepository={comunicacionesDirectasRepository}
        estadoComunicacion="activas"
      />
    </ErrorYSuspensePagina>
  );
}
