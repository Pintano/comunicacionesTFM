import React, { useEffect, useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { BotonSelectorFicherosAdjuntos } from './boton-selector-ficheros-adjuntos/boton-selector-ficheros-adjuntos';
import { Mensaje } from '../texto/mensaje/mensaje';
import useTranslation from '../../hooks/use-translation';
import styles from './subida-ficheros.module.scss';
import type {
  ElementoListadoProps,
  ResultadoSubirFichero,
} from '../../../tracasa-components-local';
import { registerLocalFile } from '../../../tracasa-components-local';

export type SubidaFicherosProps<T> =
  React.InputHTMLAttributes<HTMLInputElement> & {
    onFicheroSeleccionado?: (ficheros: File[]) => void;
    maxFicheros: number;
    extensionesPermitidas?: string[];
    tamanoTotalficherosPermitido: number;
    tamanoPagina: number;
    columnas: ColumnDef<ElementoListadoProps<T>, any>[];
    datos: ElementoListadoProps<T>[];
    estructuraDetalle?: (item: ElementoListadoProps<T>) => React.ReactNode;
    disabled?: boolean;
    onFicheroSubido: (
      resultado: ResultadoSubirFichero,
      nombreFichero: string,
    ) => Promise<void>;
    setActualizarListado?: (actualizar: boolean) => void;
    actualizarListado?: boolean;
    esFicheroPrincipalPSP?: boolean;
    showBotonAdjuntar?: boolean;
    esNecesarioFirmarElDocumentoPrincipal?: boolean;
    subirFicheroIncidencia?: (file: File) => void;
    setDatos?: (datos: ElementoListadoProps<T>[]) => void;
    ocultarListado?: boolean;
    sinScroll?: boolean;
    setBtnAceptarDeshabilitado?: (btnAceptarDeshabilitado: boolean) => void;
    permiteReordenar?: boolean;
    error?: boolean;
  };

type FicheroProgreso = {
  nombreFichero: string;
  progreso: number;
  error: boolean;
  mensajeError?: string;
};

export function SubidaFicheros<T>({
  onFicheroSeleccionado,
  maxFicheros,
  extensionesPermitidas,
  tamanoTotalficherosPermitido,
  columnas,
  datos,
  disabled = false,
  onFicheroSubido,
  setActualizarListado,
  actualizarListado,
  showBotonAdjuntar = true,
  subirFicheroIncidencia,
  setDatos,
  ocultarListado = false,
  sinScroll = false,
  setBtnAceptarDeshabilitado,
  error = false,
}: React.PropsWithChildren<SubidaFicherosProps<T>>) {
  const { t } = useTranslation();
  void setDatos;

  const [selectedFicheros, setSelectedFicheros] = useState<File[]>([]);
  const [errorTamanio, setErrorTamanio] = useState<string | null>(null);
  const [errorExtension, setErrorExtension] = useState<string | null>(null);
  const [errorMaxFicheros, setErrorMaxFicheros] = useState<string | null>(null);
  const [ficherosProgreso, setFicherosProgreso] = useState<FicheroProgreso[]>([]);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(
    window.innerWidth < 768,
  );

  useEffect(() => {
    if (setActualizarListado && actualizarListado) {
      const nuevaListaFicheros = selectedFicheros.filter((fichero) => {
        const nombreSinExtension = fichero.name
          .replace(/\.[^/.]+$/, '')
          .slice(0, 100);
        return !datos.some((dato) => dato.titulo === nombreSinExtension);
      });
      setSelectedFicheros(nuevaListaFicheros);
      setActualizarListado(false);
    }
  }, [actualizarListado, datos, selectedFicheros, setActualizarListado]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const actualizarProgreso = (
    nombreFichero: string,
    nuevoProgreso: number,
    nuevoError: boolean,
    mensajeError?: string,
  ) => {
    setFicherosProgreso((prev) =>
      prev.map((fichero) =>
        fichero.nombreFichero === nombreFichero
          ? {
              ...fichero,
              progreso: nuevoProgreso,
              error: nuevoError,
              mensajeError,
            }
          : fichero,
      ),
    );
  };

  const handleFicherosSelected = async (ficheros: File[]) => {
    const selFicheros = ficheros.filter(
      (fichero) => !selectedFicheros.includes(fichero),
    );

    const ficherosGrandes = selFicheros.filter(
      (fichero) => fichero.size > tamanoTotalficherosPermitido,
    );

    const ficherosValidos = selFicheros.filter(
      (fichero) => fichero.size <= tamanoTotalficherosPermitido,
    );

    if (ficherosGrandes.length > 0) {
      setErrorTamanio(
        t('subida-ficheros.errorTamano', [
          (tamanoTotalficherosPermitido / 1024 / 1024 / 1024).toFixed(2),
        ]),
      );
    } else {
      setErrorTamanio(null);
    }

    if (ficherosValidos.length === 0) {
      return;
    }

    setSelectedFicheros((prev) => [...prev, ...ficherosValidos]);
    setFicherosProgreso(
      ficherosValidos.map((fichero) => ({
        nombreFichero: fichero.name,
        progreso: 0,
        error: false,
      })),
    );

    if (setBtnAceptarDeshabilitado) {
      setBtnAceptarDeshabilitado(true);
    }
    if (onFicheroSeleccionado) {
      onFicheroSeleccionado(ficherosValidos);
    }

    await incorporarFicherosAsync(ficherosValidos);

    if (setBtnAceptarDeshabilitado) {
      setBtnAceptarDeshabilitado(false);
    }
  };

  const handleRemoveFichero = (fileToRemove: File) => {
    const newFicheros = selectedFicheros.filter((file) => file !== fileToRemove);
    setSelectedFicheros(newFicheros);
    setErrorTamanio(null);

    if (onFicheroSeleccionado) {
      onFicheroSeleccionado(newFicheros);
    }
  };

  async function incorporarFicherosAsync(ficheros: File[]) {
    for (const fichero of ficheros) {
      try {
        if (subirFicheroIncidencia) {
          subirFicheroIncidencia(fichero);
          actualizarProgreso(fichero.name, 100, false);
          continue;
        }

        const localizador = registerLocalFile(fichero);
        const resultado = {
          localizador,
          calidadPDF: 'Alta',
        } as ResultadoSubirFichero;

        await onFicheroSubido(resultado, fichero.name);
        actualizarProgreso(fichero.name, 100, false);
      } catch (uploadError) {
        console.error('Error al subir el fichero:', uploadError);
        actualizarProgreso(
          fichero.name,
          0,
          true,
          t('subida-ficheros.errorSubida'),
        );
      }
    }
  }

  const datosContainerStyle = useMemo<React.CSSProperties>(
    () => ({
      display: 'grid',
      gap: 12,
      maxHeight: !isSmallScreen || sinScroll ? undefined : 360,
      overflow: !isSmallScreen || sinScroll ? 'visible' : 'auto',
    }),
    [isSmallScreen, sinScroll],
  );

  return (
    <div className={styles.subida_ficheros}>
      {showBotonAdjuntar && (
        <>
          <div className={styles.subida_ficheros__boton}>
            <BotonSelectorFicherosAdjuntos
              ficherosSeleccionados={selectedFicheros}
              extensionesPermitidas={extensionesPermitidas}
              maxFicheros={maxFicheros}
              onFicheroSeleccionado={handleFicherosSelected}
              onMensajeExtensionChange={setErrorExtension}
              onMensajeMaxFicherosChange={setErrorMaxFicheros}
              disabled={disabled}
              showError={error}
            />
          </div>

          <div
            className={styles.subida_ficheros__listado}
            data-testid="subidaFicheros"
          >
            {!ocultarListado && selectedFicheros.length > 0 && (
              <div style={{ display: 'grid', gap: 8 }}>
                {selectedFicheros.map((fichero) => {
                  const progreso = ficherosProgreso.find(
                    (item) => item.nombreFichero === fichero.name,
                  );
                  return (
                    <div
                      key={`${fichero.name}-${fichero.size}`}
                      style={{
                        display: 'grid',
                        gap: 6,
                        border: '1px solid #dbe4ea',
                        borderRadius: 10,
                        padding: '0.75rem',
                        background: '#fff',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          gap: 12,
                          alignItems: 'center',
                        }}
                      >
                        <strong>{fichero.name}</strong>
                        <button
                          type="button"
                          onClick={() => handleRemoveFichero(fichero)}
                          disabled={disabled}
                          style={{
                            border: 'none',
                            background: 'transparent',
                            color: '#125f91',
                            cursor: 'pointer',
                          }}
                        >
                          {t('acciones.documentosArchivos.eliminar')}
                        </button>
                      </div>
                      <span style={{ color: '#667085', fontSize: 14 }}>
                        {`${(fichero.size / 1024 / 1024).toFixed(2)} MB`}
                      </span>
                      {progreso?.mensajeError ? (
                        <Mensaje variant="error" message={progreso.mensajeError} />
                      ) : (
                        <span style={{ color: '#667085', fontSize: 14 }}>
                          {`${progreso?.progreso ?? 0}%`}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            <div className={styles.subida_ficheros__mensaje_error}>
              {errorTamanio ? <Mensaje variant="error" message={errorTamanio} /> : null}
              {errorExtension ? <Mensaje variant="error" message={errorExtension} /> : null}
              {errorMaxFicheros ? <Mensaje variant="error" message={errorMaxFicheros} /> : null}
            </div>
          </div>
        </>
      )}
      <div>
        {datos && datos.length > 0 && (
          <div className={styles.subida_ficheros__elementos} style={datosContainerStyle}>
            {datos.map((item) => (
              <div
                key={item.id}
                className={styles.subida_ficheros__elemento}
              >
                <div className={styles.subida_ficheros__elemento_cabecera}>
                  <div className={styles.subida_ficheros__elemento_titulos}>
                    <p className={styles.subida_ficheros__elemento_nombre}>
                      {String(item.nombreArchivo || item.NombreFichero || item.titulo || '')}
                    </p>
                    {item.NombreFichero ? (
                      <p className={styles.subida_ficheros__elemento_descripcion}>
                        {`${t('subida-ficheros.nombreOriginal')}: ${item.NombreFichero}`}
                      </p>
                    ) : null}
                    {item.localizador ? (
                      <p className={styles.subida_ficheros__elemento_descripcion}>
                        {t('subida-ficheros.archivoPreparado')}
                      </p>
                    ) : null}
                  </div>

                  {item.acciones?.[0] ? (
                    <button
                      type="button"
                      className={styles.subida_ficheros__elemento_accion}
                      onClick={() => item.acciones?.[0].accion(item)}
                    >
                      {item.acciones?.[0].textoDescriptivo ?? t('acciones.documentosArchivos.eliminar')}
                    </button>
                  ) : null}
                </div>

                <div className={styles.subida_ficheros__campos}>
                  {columnas.map((columna) => {
                    const columnaId =
                      typeof columna.id === 'string' || typeof columna.id === 'number'
                        ? String(columna.id)
                        : undefined;
                    const meta = columna as {
                      texto?: string;
                      tipo?: string;
                      handleCellChange?: (id: number, value: string | null) => void;
                    };
                    const valor = columnaId
                      ? item[columnaId as keyof ElementoListadoProps<T>]
                      : undefined;
                    const label = meta.texto ?? columnaId ?? '';

                    if (!columnaId || !label) {
                      return null;
                    }

                    if (meta.tipo === 'fechaYHora') {
                      const value =
                        valor instanceof Date
                          ? valor.toISOString().slice(0, 16)
                          : typeof valor === 'string'
                            ? valor.slice(0, 16)
                            : '';
                      return (
                        <label key={columnaId} className={styles.subida_ficheros__campo}>
                          <span className={styles.subida_ficheros__campo_label}>{label}</span>
                          <input
                            className={styles.subida_ficheros__campo_input}
                            type="datetime-local"
                            value={value}
                            onChange={(event) =>
                              meta.handleCellChange?.(item.id, event.target.value)
                            }
                          />
                        </label>
                      );
                    }

                    return (
                      <label key={columnaId} className={styles.subida_ficheros__campo}>
                        <span className={styles.subida_ficheros__campo_label}>{label}</span>
                        <input
                          className={styles.subida_ficheros__campo_input}
                          value={typeof valor === 'string' ? valor : ''}
                          onChange={(event) =>
                            meta.handleCellChange?.(item.id, event.target.value)
                          }
                        />
                      </label>
                    );
                  })}
                </div>

                {item.acciones && item.acciones.length > 1 ? (
                  <div className={styles.subida_ficheros__acciones}>
                    {item.acciones.slice(1).map((accion, index) => (
                      <button
                        key={`${item.id}-${index + 1}`}
                        type="button"
                        className={styles.subida_ficheros__acciones_boton}
                        onClick={() => accion.accion(item)}
                      >
                        {accion.textoDescriptivo ?? 'Acción'}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
