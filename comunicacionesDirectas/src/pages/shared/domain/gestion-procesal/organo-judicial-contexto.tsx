export type ObtenerOrganoJudicialContextoRequest = {
  id: string;
  contexto: number;
};

export type ObtenerOrganoJudicialContextoResponse = {
  idOrganoJudicial: number;
  descripcion: string;
  descripcionCorta: string;
};
