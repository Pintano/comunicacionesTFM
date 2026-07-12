export type Styles = {
  'empty-state': string;
  'empty-state--inline': string;
  'empty-state--compacto': string;
  'empty-state--background': string;
  'empty-state__icono': string;
  'empty-state__titulo': string;
  'empty-state__texto': string;
  'empty-state__contenido': string;
  'empty-state__link': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
