export type Styles = {
  'hide-left-on-mobile': string;
  toolbar: string;
  toolbar__left: string;
  toolbar__right: string;
  toolbar__section: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
