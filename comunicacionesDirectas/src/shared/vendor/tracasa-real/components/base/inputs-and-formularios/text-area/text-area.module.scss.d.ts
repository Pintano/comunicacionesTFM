export type Styles = {
  textarea: string;
  'textarea--disabled': string;
  'textarea--error': string;
  'textarea--read-only': string;
  'textarea--auto-height': string;
  'rich-editor__placeholder': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
