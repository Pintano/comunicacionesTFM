import {
  DatosElementosAConsolidar,
  ElementoListadoProps,
  OrigenesFicherosEnum,
  ResultadoSubirFichero,
  TiposExpediente,
  useFileHandler,
} from 'tracasa-components';
import { getColumnasSubida } from '../componentes/columnas-subida';
import { ParametrosParaAdjuntarArchivos } from '../envoltorio-chat.types';
import { useEffect, useRef, useState } from 'react';
import { t } from 'i18next';

export function useAdjuntos(
  handleEnviarAdjuntos: (
    datosAdjuntos: ElementoListadoProps<DatosElementosAConsolidar>[],
  ) => void,
) {
  const [archivosPendientes, setArchivosPendientes] = useState<
    ElementoListadoProps<DatosElementosAConsolidar>[]
  >([]);
  const [actualizarListado, setActualizarListado] = useState(false);
  const [isOpenIncorporarArchivos, setIsOpenIncorporarArchivos] =
    useState(false);

  const { obtenerTamanoMaximoFicheroASubir, obtenerExtensionesPermitidas } =
    useFileHandler();
  const tamanoTotalFicherosPermitido = useRef(0);
  const extensionesPermitidas = useRef<string[]>([]);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const [tamanoMax, extensiones] = await Promise.all([
          obtenerTamanoMaximoFicheroASubir(),
          obtenerExtensionesPermitidas(),
        ]);
        tamanoTotalFicherosPermitido.current =
          tamanoMax[OrigenesFicherosEnum.Avantius];
        extensionesPermitidas.current = extensiones.map((e) => e.extension);
      } catch (error) {
        console.error('Error al obtener configuración de ficheros:', error);
      }
    };
    fetchConfig();
  }, [obtenerTamanoMaximoFicheroASubir, obtenerExtensionesPermitidas]);

  const handleCellChange = (
    id: number,
    value: string | null,
    campo: keyof DatosElementosAConsolidar,
  ) => {
    setArchivosPendientes((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [campo]: value } : item)),
    );
  };

  const parametrosAdjuntadoArchivos: ParametrosParaAdjuntarArchivos = {
    columnas: getColumnasSubida(t, handleCellChange),
    datos: archivosPendientes,
    setDatos: setArchivosPendientes,
    onConsolidarArchivos: handleEnviarAdjuntos,
    extensionesPermitidas: extensionesPermitidas.current,
    maxFichero: -1,
    tamanoPagina: 5,
    tamanoTotalficherosPermitido: tamanoTotalFicherosPermitido.current,
    sinScroll: true,
    actualizarListado,
    setActualizarListado,
  };

  const eliminarFichero = (id: number) => {
    parametrosAdjuntadoArchivos?.setDatos?.((prev) =>
      (prev || []).filter((item) => item.id !== id),
    );
  };

  const onFicheroSubidoConversacion = async (
    resultado: ResultadoSubirFichero,
    nombreFichero: string,
  ) => {
    if (!parametrosAdjuntadoArchivos?.setDatos) return;

    const datosElementosAConsolidar: ElementoListadoProps<DatosElementosAConsolidar> =
      {
        id: Date.now() + Math.random() * 100000,
        titulo: nombreFichero.substring(0, nombreFichero.lastIndexOf('.')),
        NombreFichero: nombreFichero,
        nombreArchivo: nombreFichero.substring(
          0,
          nombreFichero.lastIndexOf('.'),
        ),
        localizador: resultado.localizador!,
        FechaDocumento: new Date(),
        IdCategoria: 1,
        Calidad: resultado.calidadPDF,
        EsDiligencia: false,
        EsPrincipal: true,
        tipoExpediente: TiposExpediente.Expediente,
        acciones: [
          {
            iconoIzquierda: 'arrowRightToArc',
            textoDescriptivo: t('acciones.documentosArchivos.eliminar'),
            accion: (elemento) => eliminarFichero(elemento.id),
          },
        ],
      };

    parametrosAdjuntadoArchivos.setActualizarListado(true);
    parametrosAdjuntadoArchivos.setDatos((prev) => [
      ...(prev || []),
      datosElementosAConsolidar,
    ]);
  };

  return {
    isOpenIncorporarArchivos,
    setIsOpenIncorporarArchivos,
    parametrosAdjuntadoArchivos,
    onFicheroSubidoConversacion,
  };
}
