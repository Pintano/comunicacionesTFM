export interface ObtenerDatosMenuRequest {}

export type Pestana = {
  nombre: string;
  idMenu: number;
  categorias: Categoria[];
};

export type Categoria = {
  nombre: string;
  posicion: number;
  idCategoria: number;
  menus: Menu[];
};

export type Menu = {
  nombre: string;
  tipo: number;
  icono?: string | undefined;
  nombreAccion: string;
  activo: boolean;
  tipoDesactivacion?: number;
  submenus: Menu[];
  destacar?: boolean;
};
