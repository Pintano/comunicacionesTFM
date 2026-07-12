import {
  Conversacion,
  ConversacionesPorUsuarioResponse,
} from '@/shared/repositories/autogenerado/wsMensajeriaClient';
import { useEffect, useMemo, useState } from 'react';
import { useComunicacionesDirectasStore } from '../ventana-comunicaciones-directas/comunicaciones-directas.store';

export const useComunicaciones = (data?: ConversacionesPorUsuarioResponse) => {
  const [overrides, setOverrides] = useState<
    Record<string, Partial<Conversacion>>
  >({});
  const comunicacionesBase = useMemo(() => {
    if (!data) return [];

    return data.conversaciones!;
  }, [data]);

  const { setConversaciones } = useComunicacionesDirectasStore();

  const comunicaciones: Conversacion[] = useMemo(() => {
    if (!comunicacionesBase || comunicacionesBase.length === 0) return [];

    return comunicacionesBase.map(
      (c): Conversacion => ({
        ...c,
        ...overrides[c.idConversacionEncriptado!],
      }),
    );
  }, [comunicacionesBase, overrides]);

  useEffect(() => {
    setConversaciones(comunicaciones);
  }, [comunicaciones, setConversaciones]);

  const actualizarNuevosMensajes = (idConversacion: string) => {
    setOverrides((prev) => ({
      ...prev,
      [idConversacion]: {
        ...prev[idConversacion],
        nuevosMensajesConversacion: 0,
      },
    }));
  };

  return { comunicaciones, actualizarNuevosMensajes };
};
