export type Styles = {
  button: string;
  button__opciones: string;
  button__opciones__container: string;
  button__opciones__option: string;
  'button--busqueda': string;
  'button--busqueda--disabled': string;
  'button--disabled': string;
  'button--principal': string;
  'button--principal--disabled': string;
  'button--secundario--disabled': string;
  'button--size--default': string;
  'button--size--large': string;
  'button--size--small': string;
  'button--wordSize--small': string;
  'button--wordSize--large': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
