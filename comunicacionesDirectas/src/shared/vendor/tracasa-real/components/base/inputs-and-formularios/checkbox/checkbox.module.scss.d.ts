export type Styles = {
  checkbox: string;
  checkbox__input: string;
  'checkbox__input--error': string;
  checkbox__label: string;
  'checkbox__label--small': string;
  'checkbox__label--medium': string;
  'checkbox__label--large': string;
  checkbox__icon: string;
  checkbox__text: string;
  'checkbox__text--small': string;
  'checkbox__text--medium': string;
  'checkbox__text--large': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
