export type Styles = {
  'text-button': string;
  'text-button__content': string;
  'text-button--unstyled': string;
  'text-button--secondary': string;
  'text-button--primary': string;
  'text-button--default': string;
  'text-button--small': string;
  'text-button--disabled': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
