import { create } from 'zustand';
import type { UsuarioVM } from '@/shared/repositories/autogenerado/wsAvantiusClient';

type AppStoreState = {
  usuario?: UsuarioVM;
  titulo: string;
  cargando: boolean;
  setUsuario: (usuario?: UsuarioVM) => void;
  setTitulo: (titulo: string) => void;
  empezarCarga: (claves: ReadonlyArray<unknown> | string) => void;
  terminarCarga: (claves: ReadonlyArray<unknown> | string) => void;
  resetearCarga: () => void;
};

const normalizarClaveCarga = (claves: ReadonlyArray<unknown> | string) =>
  Array.isArray(claves) ? claves.map(String).join('|') : claves;

export const useAppStore = create<AppStoreState>((set) => ({
  usuario: undefined,
  titulo: '',
  cargando: false,
  setUsuario: (usuario) => set({ usuario }),
  setTitulo: (titulo) => set({ titulo }),
  empezarCarga: (claves) => {
    normalizarClaveCarga(claves);
    set({ cargando: true });
  },
  terminarCarga: (claves) => {
    normalizarClaveCarga(claves);
    set({ cargando: false });
  },
  resetearCarga: () => set({ cargando: false }),
}));