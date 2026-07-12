export type Styles = {
  'icon-button': string;
  'icon-button--disabled': string;
  'icon-button--transparent': string;
  'icon-button--white': string;
  'icon-button--xs': string;
  'icon-button--sm': string;
  'icon-button--md': string;
  'icon-button--lg': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
