export type Styles = {
  estructura: string;
  contenedor: string;
  colapsable__chevron: string;
  colapsable__toggle_button: string;
  sidebar__contenedor: string;
  sidebar__contenedor__cerrado: string;
  sidebar__aside: string;
  sidebar__contenido: string;
  main__contenedor: string;
  main__contenido: string;
  colapsable__toggle_button__reabrir: string;
  colapsable__chevron__rotar: string;
  header: string;
  header__button__left: string;
  header__button__right: string;
  header__text: string;
  header__text__left: string;
  header__text__right: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
