import React, { useRef, useState } from 'react';
import useComponentsTranslation from '../../../hooks/use-translation';
import styles from './boton-selector-ficheros-adjuntos.module.scss';

export type BotonSelectorFicherosAdjuntosProps =
  React.InputHTMLAttributes<HTMLInputElement> & {
    onFicheroSeleccionado: (files: File[]) => void;
    maxFicheros: number;
    ficherosSeleccionados: File[];
    extensionesPermitidas?: string[];
    onMensajeExtensionChange?: (value: string) => void;
    onMensajeMaxFicherosChange?: (value: string) => void;
    disabled?: boolean;
    showError?: boolean;
  };

export function BotonSelectorFicherosAdjuntos({
  onFicheroSeleccionado,
  maxFicheros,
  ficherosSeleccionados,
  extensionesPermitidas,
  onMensajeExtensionChange,
  onMensajeMaxFicherosChange,
  disabled = false,
  showError = false,
}: BotonSelectorFicherosAdjuntosProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { t } = useComponentsTranslation();
  const esSubidaMultiple = !(maxFicheros == 1);

  const handleFileChange = (files: FileList | null) => {
    let fileArray = Array.from(files || []);

    if (
      maxFicheros > 0 &&
      fileArray.length + ficherosSeleccionados.length > maxFicheros
    ) {
      onMensajeMaxFicherosChange?.(
        t('subida-ficheros.mensajeMaxFicheros', [maxFicheros.toString()]),
      );
      return;
    } else {
      onMensajeMaxFicherosChange?.('');
    }

    const extensionesNormalizadas = (extensionesPermitidas ?? []).map((item) =>
      item.startsWith('.') ? item.toLowerCase() : `.${item.toLowerCase()}`,
    );

    if (extensionesNormalizadas.length > 0) {
      fileArray = fileArray.filter((file) => {
        const extension = `.${file.name.split('.').pop()?.toLowerCase() ?? ''}`;
        if (!extensionesNormalizadas.includes(extension)) {
          onMensajeExtensionChange?.(t('subida-ficheros.extensionNoValida'));
          return false;
        }
        onMensajeExtensionChange?.('');
        return true;
      });
    }

    onFicheroSeleccionado([...ficherosSeleccionados, ...fileArray]);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    if (event.dataTransfer.files.length > 0) {
      handleFileChange(event.dataTransfer.files);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      data-testid="botonSelectorFicherosAdjuntos"
      className={`${styles.boton_selector_ficheros_adjuntos} ${
        showError ? styles.boton_selector_ficheros_adjuntos__error : ''
      } ${
        isDragging ? styles['boton_selector_ficheros_adjuntos--arrastrar'] : ''
      } ${
        disabled
          ? styles['boton_selector_ficheros_adjuntos--deshabilitado']
          : ''
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleButtonClick}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleButtonClick();
        }
      }}
    >
      <p className={styles.boton_selector_ficheros_adjuntos__texto}>
        {t('subida-ficheros.mensajeDrop')}
      </p>
      <label
        htmlFor="file-upload"
        className={styles.boton_selector_ficheros_adjuntos__fichero}
      >
        {t('subida-ficheros.seleccionarArchivos')}
      </label>
      <input
        id="file-upload"
        type="file"
        accept={extensionesPermitidas?.toString()}
        className={
          disabled
            ? styles['boton_selector_ficheros_adjuntos__fichero--disabled']
            : styles.boton_selector_ficheros_adjuntos__fichero
        }
        multiple={esSubidaMultiple}
        onChange={(e) => handleFileChange(e.target.files)}
        ref={fileInputRef}
        disabled={disabled}
      />
    </div>
  );
}
