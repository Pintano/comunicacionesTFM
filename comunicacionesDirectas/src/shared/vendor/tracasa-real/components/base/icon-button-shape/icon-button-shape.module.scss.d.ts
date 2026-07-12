export type Styles = {
  'icon-button-shape': string;
  'icon-button-shape--circle': string;
  'icon-button-shape--square': string;
  'icon-button-shape--size--md': string;
  'icon-button-shape--size--lg': string;
  'icon-button-shape--primary': string;
  'icon-button-shape--primary--disabled': string;
  'icon-button-shape--secondary': string;
  'icon-button-shape--secondary--disabled': string;
  'icon-button-shape--tertiary': string;
  'icon-button-shape--tertiary--disabled': string;
  'icon-button-shape--quaternary': string;
  'icon-button-shape--quaternary--disabled': string;
  'icon-button-shape--disabled': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
