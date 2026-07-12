import styles from './chat-layout.module.scss';
import { LayoutMensajes } from './components/layout-mensajes';
import { BarraInferior } from './components/barra-inferior';

import { BocadilloProps } from '../bocadillo/bocadillo';

export interface ChatLayoutProps {
  mensajes: BocadilloProps[];
  onEnviar?: (textoInput: string) => void;
  onAdjuntar?: () => void;
  maxLength?: number;
  readonly?: boolean;
  textReadonly?: string;
}

export function ChatLayout({
  mensajes,
  onEnviar,
  onAdjuntar,
  maxLength = -1,
  readonly = false,
  textReadonly = '',
}: ChatLayoutProps) {
  return (
    <div className={styles.container} data-testid="chatLayout">
      <LayoutMensajes mensajes={mensajes}></LayoutMensajes>
      <BarraInferior
        onEnviar={onEnviar}
        onAdjuntar={onAdjuntar}
        maxLength={maxLength}
        readonly={readonly}
        textReadonly={textReadonly}
      ></BarraInferior>
    </div>
  );
}
