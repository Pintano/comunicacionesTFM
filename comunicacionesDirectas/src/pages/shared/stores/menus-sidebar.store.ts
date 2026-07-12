import { create } from 'zustand';

type State = {
  mostrarComunicacionesDirectas: boolean;
  setMostrarComunicacionesDirectas: (valor: boolean) => void;
};

export const useMenusSidebarStore = create<State>((set) => ({

  mostrarComunicacionesDirectas: false, 

  setMostrarComunicacionesDirectas: (valor) =>
    set({ mostrarComunicacionesDirectas: valor }),
}));