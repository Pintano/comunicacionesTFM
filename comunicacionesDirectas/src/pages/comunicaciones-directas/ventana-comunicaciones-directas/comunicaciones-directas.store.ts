import {
  Conversacion,
  MensajesPorConversacionResponse,
} from '@/shared/repositories/autogenerado/wsMensajeriaClient';
import { create } from 'zustand';

type ModalState = {
  abierto: boolean;
  idComunicacion: string | null;
};

type Vista = 'activas' | 'archivadas';

type State = {
  vistaActual: Vista;
  setVistaActual: (vista: Vista) => void;

  modal: ModalState;
  abrirModal: (idComunicacion: string) => void;
  cerrarModal: () => void;

  conversaciones?: Conversacion[];
  conversacionesFiltradas?: Conversacion[];

  setConversaciones: (conversaciones?: Conversacion[]) => void;

  filtroTexto: string;
  setFiltroTexto: (texto: string) => void;

  hayMensajesNuevos: boolean;
  setHayMensajesNuevos: (hayMensajesNuevos: boolean) => void;

  idConversacionSeleccionada?: string;
  setIdConversacionSeleccionada: (idConversacion: string | undefined) => void;

  conversacionSeleccionada?: MensajesPorConversacionResponse;
  setConversacionSeleccionada: (
    conversacion: MensajesPorConversacionResponse | undefined,
  ) => void;
};

export const useComunicacionesDirectasStore = create<State>((set) => ({
  vistaActual: 'activas',
  setVistaActual: (vista) => set({ vistaActual: vista }),

  modal: {
    abierto: false,
    idComunicacion: null,
  },

  abrirModal: (idComunicacion) =>
    set((state) => ({
      modal: {
        ...state.modal,
        abierto: true,
        idComunicacion,
      },
    })),

  cerrarModal: () =>
    set((state) => ({
      modal: {
        ...state.modal,
        abierto: false,
        idComunicacion: null,
      },
    })),

  conversaciones: undefined,
  conversacionesFiltradas: undefined,

  setConversaciones: (conversaciones) =>
    set((state) => {
      const filtro = state.filtroTexto.toLowerCase();

      const conversacionesFiltradas = filtro
        ? conversaciones?.filter(
            (c) =>
              c.titulo?.toLowerCase().includes(filtro) ||
              c.nombreParticipante?.toLowerCase().includes(filtro) ||
              c.ultimoMensaje?.toLowerCase().includes(filtro),
          )
        : conversaciones;

      return {
        conversaciones,
        conversacionesFiltradas,
      };
    }),

  filtroTexto: '',

  setFiltroTexto: (texto) =>
    set((state) => {
      const filtro = texto.toLowerCase();

      const conversacionesFiltradas = state.conversaciones?.filter(
        (c) =>
          c.titulo?.toLowerCase().includes(filtro) ||
          c.nombreParticipante?.toLowerCase().includes(filtro) ||
          c.ultimoMensaje?.toLowerCase().includes(filtro),
      );

      return {
        filtroTexto: texto,
        conversacionesFiltradas,
      };
    }),

  hayMensajesNuevos: false,
  setHayMensajesNuevos: (hayMensajesNuevos) =>
    set({
      hayMensajesNuevos,
    }),

  conversacionSeleccionada: undefined,
  setConversacionSeleccionada: (conversacion) =>
    set({
      conversacionSeleccionada: conversacion,
    }),

  idConversacionSeleccionada: undefined,
  setIdConversacionSeleccionada: (idConversacion) =>
    set({
      idConversacionSeleccionada: idConversacion,
    }),
}));
