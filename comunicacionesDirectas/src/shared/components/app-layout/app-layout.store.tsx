import { create } from 'zustand';

type AppLayoutStore = {
  modal: MostrarModal;
  abrirModal: () => void;
  cerrarModal: () => void;
};

type MostrarModal = {
  abierto: boolean;
};

export const useAppLayoutStore = create<AppLayoutStore>()((set) => ({
  modal: { abierto: false },
  abrirModal: () =>
    set(() => ({
      modal: { abierto: true },
    })),

  cerrarModal: () => set(() => ({ modal: { abierto: false } })),
}));
