export type Styles = {
  container: string;
  container__propio: string;
  container__ajeno: string;
  container__generico: string;
  content: string;
  content__texto: string;
  content__adjunto: string;
  content__adjunto__icon: string;
  content__adjunto__textoIcon: string;
  content__adjunto__texto: string;
  footer: string;
  footer__hora: string;
  footer__estado: string;
  footer__estado__enviado: string;
  footer__estado__leido: string;
  footer__estado__error: string;
  footer__estado__clock: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
