export type Styles = {
  modal__overlay: string;
  modal__content: string;
  modal__header: string;
  'modal__header--compact': string;
  modal__title: string;
  'modal__title-wrapper': string;
  'modal__title--compact': string;
  modal__subtitle: string;
  modal__body: string;
  'modal__body--has-overflow': string;
  'modal__body--compact': string;
  modal__footer: string;
  'modal__footer--compact': string;
  'modal--size-medium': string;
  'modal--size-large': string;
  'modal--size-full': string;
  'modal--size-very-tall': string;
  'modal--size-wide': string;
  'modal--size-fit': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
