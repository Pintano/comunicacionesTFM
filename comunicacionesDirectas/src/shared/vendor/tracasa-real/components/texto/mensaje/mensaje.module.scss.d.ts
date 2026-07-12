export type Styles = {
  mensaje: string;
  'mensaje--compact': string;
  'mensaje--compact-link': string;
  'mensaje--error': string;
  'mensaje--info': string;
  'mensaje--inline': string;
  'mensaje--success': string;
  'mensaje--warning': string;
  'mensaje--collapsed': string;
  mensaje__body: string;
  mensaje__close: string;
  mensaje__content: string;
  mensaje__header: string;
  mensaje__icon: string;
  mensaje__text: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
