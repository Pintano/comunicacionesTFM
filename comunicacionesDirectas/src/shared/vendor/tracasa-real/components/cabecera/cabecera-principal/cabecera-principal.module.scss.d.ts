export type Styles = {
  'cabecera-principal': string;
  'cabecera-principal__left': string;
  'cabecera-principal__logo': string;
  'cabecera-principal__separador': string;
  'cabecera-principal__title-section': string;
  'cabecera-principal__title': string;
  'cabecera-principal__subtitle': string;
  'cabecera-principal__contenido': string;
  'cabecera-principal__acciones': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
