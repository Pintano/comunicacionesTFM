export type Styles = {
  badge: string;
  'badge--alert': string;
  'badge--info': string;
  'badge--counter': string;
  'badge--numeric': string;
  'badge--overflow': string;
  'badge--fixed': string;
  badge__count: string;
  'badge__count--counter': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
