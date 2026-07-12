import { useState } from 'react';

import { Button } from '../../../base/button/button';
import { IconWrapper } from '../../../icono/icon-wrapper/icon-wrapper';
import { Mensaje } from '../../../texto/mensaje/mensaje';
import { IconButtonShape } from '../../../base/icon-button-shape/icon-button-shape';

import useComponentsTranslation from '../../../../hooks/use-translation';
import styles from '../chat-layout.module.scss';
import { TextArea } from '../../../base/inputs-and-formularios/text-area/text-area';
import { useScreenSize } from '../../../../hooks/use-screen-size';

interface BarraInferiorProps {
  onEnviar?: (textoInput: string) => void;
  onAdjuntar?: () => void;
  maxLength?: number;
  readonly?: boolean;
  textReadonly?: string;
}

export function BarraInferior({
  onEnviar,
  onAdjuntar,
  maxLength = -1,
  readonly = false,
  textReadonly,
}: BarraInferiorProps) {
  const { t } = useComponentsTranslation();
  const { isMobile } = useScreenSize();

  const [textoInput, setTextoInput] = useState('');
  const [inputKey, setInputKey] = useState(0);
  const handleEnviar = () => {
    if (!textoInput.trim() || !onEnviar) return;

    onEnviar(textoInput);
    setTextoInput('');
    setInputKey((prev) => prev + 1);
  };

  return readonly ? (
    <div className={styles.container__barra__aviso}>
      {textReadonly && (
        <Mensaje variant="info" message={textReadonly}></Mensaje>
      )}
    </div>
  ) : (
    <div className={styles.container__barra}>
      {onAdjuntar && (
        <IconButtonShape
          icon="adjunto"
          className={styles.content__barra__adjunto}
          variant="tertiary"
          size="lg"
          onClick={onAdjuntar}
          aria-label={t('chat.chatLayout.adjuntarArchivos')}
          shape="square"
        />
      )}

      <TextArea
        key={inputKey}
        className={styles.content__barra__input}
        placeholder={t('chat.chatLayout.placeholder')}
        autoHeight
        value={textoInput}
        maxLength={maxLength}
        onChange={(e) => setTextoInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleEnviar();
          }
        }}
        autoFocus
      />

      {!isMobile ? (
        <Button
          className={styles.content__barra__boton}
          variant="principal"
          type="button"
          onClick={handleEnviar}
          disabled={!textoInput}
          data-testid="enviar"
          size="large"
        >
          <IconWrapper
            icono="enviarMensaje"
            title={t('chat.chatLayout.enviar')}
            size="xl"
          />
          {t('chat.chatLayout.enviar')}
        </Button>
      ) : (
        <IconButtonShape
          icon="enviarMensaje"
          className={styles.content__barra__adjunto}
          variant="secondary"
          size="lg"
          onClick={handleEnviar}
          disabled={!textoInput}
          aria-label={t('chat.chatLayout.enviar')}
          shape="square"
        />
      )}
    </div>
  );
}
