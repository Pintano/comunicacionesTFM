export type Styles = {
  input: string;
  input__container: string;
  input__field: string;
  'input__field--populated': string;
  'input__field--error': string;
  'input__field--align-right': string;
  'input__field--with-left-icon': string;
  'input__field--with-right-icon': string;
  input__icon: string;
  'input__icon-wrapper': string;
  'input__icon-wrapper--disabled': string;
  'input__icon--left': string;
  'input__icon--right': string;
  input__message: string;
  'input__message--truncated': string;
  'input__clear-button': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
