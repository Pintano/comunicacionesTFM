export type Styles = {
  container: string;
  container__chat: string;
  container__barra: string;
  container__barra__aviso: string;
  content__fecha__texto: string;
  content__fecha__separador: string;
  content__mensaje: string;
  content__mensaje__propio: string;
  content__mensaje__ajeno: string;
  content__mensaje__generico: string;
  content__barra__adjunto: string;
  content__barra__input: string;
  content__barra__boton: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
