import { create } from 'zustand';

type OrganoJudicialContextoStore = {
  idOrganoJudicialContexto: number | null;
  enabled: boolean;
  debeRecargarOrganoContexto: boolean;
  setDebeRecargarOrganoContexto: (debeRecargar: boolean) => void;
  setOrganoContexto: (id: number | null, isLoading: boolean, esAbstencion?: boolean) => void;
  clearOrganoContexto: () => void;
};

const _idOrganoDesdeStorage = (() => {
  const val = typeof window !== 'undefined'
    ? sessionStorage.getItem('idOrganoJudicialContexto')
    : null;
  const parsed = val ? parseInt(val) : NaN;
  return !isNaN(parsed) && parsed > 0 ? parsed : null;
})();

export const useOrganoJudicialContextoStore =
  create<OrganoJudicialContextoStore>()((set) => ({
    idOrganoJudicialContexto: _idOrganoDesdeStorage,
    enabled: _idOrganoDesdeStorage !== null,
    debeRecargarOrganoContexto: true,
    setDebeRecargarOrganoContexto: (debeRecargar) =>
      set({ debeRecargarOrganoContexto: debeRecargar }),
    setOrganoContexto: (id, isLoading, esAbstencion = false) => {
      if (!isLoading) {
        if (id! > 0) {
          if(esAbstencion) {
            sessionStorage.setItem('idOrganoJudicialContexto', String(id));
          } else {
            sessionStorage.removeItem('idOrganoJudicialContexto');
          }
          set({
            enabled: true,
            idOrganoJudicialContexto: id,
          });
        } else {
          sessionStorage.removeItem('idOrganoJudicialContexto');
          set({
            enabled: false,
            idOrganoJudicialContexto: null,
          });
        }
      }
    },
    clearOrganoContexto: () => {
      sessionStorage.removeItem('idOrganoJudicialContexto');
      set({
        idOrganoJudicialContexto: null,
      });
    },
  }));
