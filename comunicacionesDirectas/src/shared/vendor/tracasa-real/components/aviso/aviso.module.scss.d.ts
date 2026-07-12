export type Styles = {
  aviso: string;
  aviso__button: string;
  aviso__container: string;
  aviso__content: string;
  aviso__icon: string;
  aviso_error: string;
  aviso_errorButton: string;
  aviso_info: string;
  aviso_infoButton: string;
  aviso_success: string;
  aviso_successButton: string;
  aviso_warning: string;
  aviso_warningButton: string;
  fadeIn: string;
  fadeOut: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
