import {
  CabeceraDocumentoPartido,
  DatosElementoADescargar,
  DatosElementosAConsolidar,
  DatosElementosASubir,
  MimeTypesSoportadosConCabecerasResponse,
} from '../components/visor/visor-utils';
import {
  CalidadPDF,
  ResultadoSubirFichero,
} from '../components/subida-ficheros/subida-ficheros.utils';
import {
  ComprobarCalidadPdfRequest,
  DatosMultimediaVideoBajoDemanda,
  GuardarDocumentoCompletoResponse,
  NuevoTicketSubidasResponse,
  SubirParte,
  ValidarCertificadoRequest,
} from '../models/http/descarga-archivos';
import { useCallback, useContext } from 'react';

import { DescargaDocumentosContext } from '../providers/descarga-documentos-context.provider';
import { EstadosDisponibilidadRecurso } from '../models/enums/estados-disponibilidad-recurso-enum';
import { ModoValidacionFirma } from '../models/enums/modo-validacion-firma';
import { ProcedenciasArchivo } from '../models/enums/procedencia-archivos-enum';
import { TiposDescarga } from '../models/enums/tipos-descarga';
import { TiposElementoTextualizacion } from '../models/enums/tipos-elemento-textualizacion';
import { TiposIDElemento } from '../models/enums/tipos-id-elemento';
import { TiposLocalizadorFichero } from '../models/enums/tipos-localizador-fichero-enum';
import useFetch from './useFetch.hook';
import { ModoGuardadoFirma } from '../models/enums/modo-guardado-firma';

export const useFileHandler = () => {
  const {
    repositorio,
    baseUrl,
    baseUrlPortal,
    redirectHandler,
    tokenJWTName,
    conCredentialsPortalDocumentacion,
    sourceApplication,
    baseUrlFirmaElectronica,
    baseUrLWsServiciosWeb,
  } = useContext(DescargaDocumentosContext);
  const { fetch: fetchHook } = useFetch();

  const esGuid = (str: string): boolean => {
    const guidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return guidRegex.test(str);
  };

  //#region Privadas
  const obtenerURLDescargaConTicket = async (
    elemento: DatosElementoADescargar,
  ): Promise<string> => {
    const respuesta = await fetchHook(
      repositorio.ObtenerDescarga(
        {
          IdTipoDescarga: elemento.IDTipoDescarga,
          IDElementoADescargar:
            elemento.LocalizadorElemento ?? elemento.IDElemento,
          NombreArchivoEncriptado: elemento.NombreArchivoEncriptado,
        },
        elemento.LocalizadorElemento !== undefined &&
          esGuid(elemento.LocalizadorElemento),
        baseUrl,
        redirectHandler,
        tokenJWTName,
        sourceApplication,
      ),
    );

    await ValidarEstadoDisponibilidadRecurso(
      respuesta.idEstadoDisponibilidadRecurso,
    );

    if (!respuesta.url || !respuesta.ticket) throw 'Sin ticket';

    if (
      elemento.IDTipoDescarga == TiposDescarga.ArchivoVBD ||
      elemento.IDTipoDescarga == TiposDescarga.VideoSesionJudicialVBD ||
      elemento.IDTipoDescarga == TiposDescarga.GrabacionesSesionJudicialVBD
    )
      elemento.UrlBlob = `${respuesta.url}${respuesta.ticket}/playlist.m3u8`;
    else {
      elemento.UrlBlob = `${respuesta.url}${respuesta.ticket}?EsDescarga=${elemento.EsDescarga}`;
    }
    elemento.Titulo = '';

    return elemento.UrlBlob;
  };
  const obtenerUrlDescargaSinTicket = async (
    elemento: DatosElementoADescargar,
  ): Promise<string> => {
    const respuesta = await fetchHook(
      repositorio.ObtenerDescargaDirecta(
        {
          IDArchivoEncriptado:
            elemento.TipoIDElemento == TiposIDElemento.Archivo
              ? elemento.IDElemento
              : undefined,
          IDDocumentoEncriptado:
            elemento.TipoIDElemento == TiposIDElemento.Documento
              ? elemento.IDElemento
              : undefined,
          TituloEncriptado: elemento.NombreFichero,
          EsDescarga: elemento.EsDescarga ?? true,
          IdTipoArchivo: elemento.IdTipoArchivo,
          ConFirmas:
            elemento.modoGuardadoPDFFirma == ModoGuardadoFirma.FirmasPersonales,
          IdTipoLocalizadorFichero: elemento.IdTipoLocalizadorFichero,
        },
        baseUrl,
        redirectHandler,
        tokenJWTName,
        sourceApplication,
      ),
    );

    if (!respuesta) throw 'Error al obtener Descarga Directa';

    elemento.UrlBlob = URL.createObjectURL(respuesta);

    return elemento.UrlBlob;
  };

  const obtenerDeBBDD = async (
    elemento: DatosElementoADescargar,
  ): Promise<string> => {
    const respuesta = await fetchHook(
      repositorio.ObtenerDeBBDD(
        {
          idDocumentoEncriptado: elemento.IDElemento,
        },
        baseUrl,
        redirectHandler,
        tokenJWTName,
        sourceApplication,
      ),
    );

    if (!respuesta.d) return '';

    const byteArray = new Uint8Array(respuesta.d);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    elemento.UrlBlob = URL.createObjectURL(blob);

    return elemento.UrlBlob;
  };

  const generarPDF = async (
    elemento: DatosElementoADescargar,
  ): Promise<string> => {
    const respuesta = await fetchHook(
      repositorio.GenerarPDF(
        {
          idDocumentoEncriptado: elemento.IDElemento,
          idExpedienteEncriptado: elemento.IDExpedienteEncriptado,
          idDiligenciaEncriptada: elemento.IDDiligenciaEncriptado,
          modoGuardadoPDFFirma: elemento.modoGuardadoPDFFirma,
        },
        baseUrLWsServiciosWeb!,
        redirectHandler,
        tokenJWTName,
        sourceApplication,
      ),
    );

    if (!respuesta) throw 'Error al obtener Descarga Directa';

    return respuesta.idArchivoEncriptado;
  };

  const obtenerUrlDescargaINSIDE = async (
    elemento: DatosElementoADescargar,
  ): Promise<string> => {
    const respuesta = await fetchHook(
      repositorio.ObtenerDescargaDirecta(
        {
          IDArchivoEncriptado:
            elemento.TipoIDElemento == TiposIDElemento.Archivo
              ? elemento.IDElemento
              : undefined,
          EsDescarga: true,
        },
        baseUrl,
        redirectHandler,
        tokenJWTName,
        sourceApplication,
      ),
    );

    if (!respuesta) throw 'Error al obtener Descarga Directa';

    elemento.UrlBlob = URL.createObjectURL(respuesta);

    return elemento.UrlBlob;
  };
  const obtenerURLSubidaConTicket = async (
    elemento: DatosElementosASubir,
  ): Promise<NuevoTicketSubidasResponse> => {
    const respuesta = await fetchHook(
      repositorio.ObtenerTicketSubida(
        {
          IdOrigen: elemento.IDOrigen,
          NombreFichero: elemento.NombreFichero,
        },
        baseUrl,
        redirectHandler,
        tokenJWTName,
        sourceApplication,
      ),
    );

    await ValidarEstadoDisponibilidadRecurso(
      respuesta.idEstadoDisponibilidadRecurso,
    );

    if (!respuesta.url || !respuesta.ticket) throw 'Sin ticket';

    return respuesta;
  };

  const guardarArchivoConLocalizador = async (
    elemento: DatosElementosAConsolidar,
  ): Promise<string> => {
    const respuesta = await fetchHook(
      repositorio.GuardarArchivoConLocalizador(
        {
          NombreFichero: elemento.NombreFichero,
          NombreArchivo: elemento.nombreArchivo,
          Localizador: elemento.localizador,
          PresentadoPor: elemento.PresentadoPor,
          FechaDocumento: elemento.FechaDocumento,
          IdCategoria: elemento.IdCategoria,
          Calidad: elemento.Calidad,
          EsDiligencia: elemento.EsDiligencia,
          EsPrincipal: elemento.EsPrincipal,
          OrdenSubida: elemento.Orden,
        },
        baseUrl,
        redirectHandler,
        tokenJWTName,
        sourceApplication,
      ),
    );

    return respuesta;
  };

  const guardarArchivoConLocalizadorEnExpediente = async (
    elemento: DatosElementosAConsolidar,
  ): Promise<string> => {
    if (!elemento.IDExpediente) return '';

    const respuesta = await fetchHook(
      repositorio.GuardarArchivoConLocalizadorEnExpediente(
        {
          NombreFichero: elemento.NombreFichero,
          NombreArchivo: elemento.nombreArchivo,
          Localizador: elemento.localizador,
          PresentadoPor: elemento.PresentadoPor,
          FechaDocumento: elemento.FechaDocumento,
          IdCategoria: elemento.IdCategoria,
          Calidad: elemento.Calidad,
          EsDiligencia: elemento.EsDiligencia,
          EsPrincipal: elemento.EsPrincipal,
          IdExpedienteEncriptado: elemento.IDExpediente,
          TipoExpediente: elemento.tipoExpediente,
          OrdenSubida: elemento.Orden,
        },
        baseUrl,
        redirectHandler,
        tokenJWTName,
        sourceApplication,
      ),
    );

    return respuesta;
  };

  const consolidarFichero = async (
    Localizador: string,
    NombreArchivo: string,
  ) => {
    await fetchHook(
      repositorio.ConsolidarFichero(
        {
          NombreDefinitivo: NombreArchivo,
          LocalizadorFichero: Localizador,
        },
        baseUrlPortal,
        redirectHandler,
        sourceApplication,
        conCredentialsPortalDocumentacion,
      ),
    );
  };
  const regenerarIndice = async (IdExpedienteEncriptado: string) => {
    await fetchHook(
      repositorio.RegenerarIndice(
        {
          idExpedienteEncriptado: IdExpedienteEncriptado,
        },
        baseUrLWsServiciosWeb!,
        redirectHandler,
        tokenJWTName,
        sourceApplication,
      ),
    );
  };

  const subirFicheroATemporales = (
    url: string,
    ticket: string,
    origen: number,
    esSubidaSenalamiento: boolean,
    fichero: File,
    onFicheroSubido: (
      resultado: ResultadoSubirFichero,
      nombreFichero: string,
    ) => Promise<void>,
    actualizarProgreso?: (
      nombre: string,
      progreso: number,
      error: boolean,
    ) => void,
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        var fd = new FormData();
        fd.append('uploadedFile', fichero);
        var request = new XMLHttpRequest();

        request.upload.addEventListener('progress', function (e) {
          const progreso = Math.round((e.loaded / e.total) * 100);
          actualizarProgreso!(fichero.name, progreso, false);
        });

        request.addEventListener('load', async function (e) {
          const xhr = e.target as XMLHttpRequest;
          if (xhr.response) {
            var respuesta = JSON.parse(xhr.response);
            onFicheroSubido(respuesta, fichero.name).then(() => {
              resolve();
            });
          } else {
            actualizarProgreso!(fichero.name, 0, true);
            reject(new Error('Error en la subida del archivo'));
            onFicheroSubido(respuesta, fichero.name).then(() => {
              resolve();
            });
          }
        });

        request.addEventListener('error', () => {
          actualizarProgreso!(fichero.name, 0, true);
          resolve();
        });
        request.open('POST', url);
        request.setRequestHeader('ticket', ticket);
        request.setRequestHeader('idOrigen', origen.toString());
        if (conCredentialsPortalDocumentacion) {
          request.withCredentials = true;
        }

        request.setRequestHeader(
          'esSubidaSenalamiento',
          esSubidaSenalamiento.toString(),
        );
        request.send(fd);
      } catch (error) {
        actualizarProgreso!(fichero.name, 0, true);
        resolve();
      }
    });
  };

  //#endregion Privadas

  const obtenerUrlDescargaElemento = async (
    elemento: DatosElementoADescargar,
  ): Promise<string> => {
    if (
      elemento.TipoIDElemento == TiposIDElemento.GrabacionEfidelius ||
      elemento.TipoIDElemento == TiposIDElemento.GrabacionArconte
    ) {
      return await obtenerURLDescargaConTicket(elemento);
    }

    switch (elemento.ProcedenciaArchivo) {
      case ProcedenciasArchivo.Avantius:
        if (elemento.EsArchivoPortafirmas) {
          var response = await obtenerDeBBDD(elemento);
          if (response) {
            return response;
          }
          await generarPDF(elemento);
          var response = await obtenerDeBBDD(elemento);
          return response;
        } else if (
          elemento.IdTipoLocalizadorFichero ==
            TiposLocalizadorFichero.LocalizadorFicheroContenidoDocumento.toString() ||
          elemento.IdTipoLocalizadorFichero ==
            TiposLocalizadorFichero.LocalizadorFicheroContenidoDocumentoConFirmas.toString()
        ) {
          return (response = await obtenerUrlDescargaSinTicket(elemento));
        } else {
          return await obtenerUrlDescargaSinTicket(elemento);
        }
      case ProcedenciasArchivo.INSIDE:
        return await obtenerUrlDescargaINSIDE(elemento);
      case ProcedenciasArchivo.eFidelius:
        return '';
      case ProcedenciasArchivo.PortalDocumentacion:
        return await obtenerURLDescargaConTicket(elemento);
      case ProcedenciasArchivo.SinProcedencia:
        if (elemento.UrlBlob) {
          return elemento.UrlBlob;
        }
        throw new Error('ProcedenciaArchivo no valida...');
      default:
        // Dim peDocumentacionFisica As New peGestionExpedientes.peDocumentacionFisica()
        // arrayBites = peDocumentacionFisica.ObtenerArchivoContenidoConFirmasPersonales(Session("Id"))
        // 'Si no hay documento conf firmas(por ejemplo porque es un anexo), recuperamos el documento sin firmas
        // If (arrayBites Is Nothing) Then
        //     Dim peDocumento As New peGestionExpedientes.peDocumento()
        //     arrayBites = peDocumento.RecuperarDocumentoporIDArchivo(idArchivo, datosLogs, sesion.IDIdioma)
        // End If
        throw new Error('ProcedenciaArchivo no valida...');
    }
  };

  const obtenerBlobDeElemento = async (
    elemento: DatosElementoADescargar,
  ): Promise<Blob> => {
    elemento.EsDescarga = false;
    if (!elemento.UrlBlob) await obtenerDatosBlob(elemento);
    if (!elemento.UrlBlob) {
      alert('No se ha podido obtener el documento.');
      throw new Error('No se ha podido obtener el documento.');
    }
    return await fetchHook(repositorio.DescargarDeUrlBlob(elemento.UrlBlob!));
  };

  const descargarElemento = useCallback(
    async (elemento: DatosElementoADescargar) => {
      await obtenerDatosBlob(elemento);

      if (!elemento.UrlBlob) {
        alert('No se ha podido obtener el documento.');
        throw new Error('No se ha podido obtener el documento.');
      }

      const downloadLink = document.createElement('a');
      downloadLink.href = elemento.UrlBlob!;
      downloadLink.download = elemento.NombreFichero ?? 'archivo_sin_nombre';
      downloadLink.target = '_self';

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(elemento.UrlBlob!);
    },
    [],
  );

  const incorporarArchivoTemporal = useCallback(
    async (
      elemento: DatosElementosASubir,
      onFicheroSubido: (
        resultado: ResultadoSubirFichero,
        nombreFichero: string,
      ) => Promise<void>,
      actualizarProgreso?: (
        nombre: string,
        progreso: number,
        error: boolean,
      ) => void,
    ) => {
      var ticketSubida = await obtenerURLSubidaConTicket(elemento);
      await subirFicheroATemporales(
        ticketSubida.url,
        ticketSubida.ticket!,
        elemento.IDOrigen,
        false,
        elemento.fichero,
        onFicheroSubido,
        actualizarProgreso,
      );
    },
    [],
  );
  const incorporarArchivoTemporalInternet = useCallback(
    async (
      elemento: DatosElementosASubir,
      onFicheroSubido: (
        resultado: ResultadoSubirFichero,
        nombreFichero: string,
      ) => Promise<void>,
      actualizarProgreso?: (
        nombre: string,
        progreso: number,
        error: boolean,
      ) => void,
    ) => {
      var ticketSubida = await obtenerURLSubidaConTicket(elemento);
      await subirFicheroATemporales(
        ticketSubida.url,
        ticketSubida.ticket!,
        elemento.IDOrigen,
        false,
        elemento.fichero,
        onFicheroSubido,
        actualizarProgreso,
      );
    },
    [],
  );
  const obtenerArrayBytes = (fichero: File): Promise<Uint8Array> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const bytes = new Uint8Array(arrayBuffer);
        resolve(bytes);
      };

      reader.onerror = () => {
        reject(new Error('No se pudo leer el archivo.'));
      };

      reader.readAsArrayBuffer(fichero);
    });
  };
  const incorporarArchivoPrincipalPSP = useCallback(
    async (
      elemento: DatosElementosASubir,
      onFicheroSubido: (
        resultado: ResultadoSubirFichero,
        nombreFichero: string,
      ) => Promise<void>,
      actualizarProgreso?: (
        nombre: string,
        progreso: number,
        error: boolean,
        mensajeError?: string,
      ) => void,
      EsNecesarioFirmarElDocumentoPrincipal: boolean = true,
      literalFirmaInvalida: string = '',
    ) => {
      comprobarCalidadPDF(elemento.fichero)
        .then((calidad) => {
          if (
            calidad.firmas.length === 0 &&
            EsNecesarioFirmarElDocumentoPrincipal
          ) {
            actualizarProgreso!(
              elemento.NombreFichero,
              0,
              true,
              'Documento sin firmar',
            );
          } else if (
            calidad.firmas.length === 0 &&
            !EsNecesarioFirmarElDocumentoPrincipal
          ) {
            guardarDocumentoPorPartes(
              elemento.fichero,
              elemento.NombreFichero,
              actualizarProgreso,
            ).then((idArchivoEncriptado) => {
              const resultado: ResultadoSubirFichero = {
                calidadPDF: calidad,
                idArchivoEncriptado: idArchivoEncriptado,
              };
              onFicheroSubido(resultado, elemento.NombreFichero).then(() => {
                actualizarProgreso!(elemento.NombreFichero, 100, false);
              });
            });
          } else {
            validarFirmas(calidad, 'PSP', 50).then(async (calidadFirmas) => {
              if (
                calidadFirmas.firmas.some(
                  (firma) => !firma.error && !firma.esInvalido,
                )
              ) {
                guardarDocumentoPorPartes(
                  elemento.fichero,
                  elemento.NombreFichero,
                  actualizarProgreso,
                ).then((idArchivoEncriptado) => {
                  const resultado: ResultadoSubirFichero = {
                    calidadPDF: calidadFirmas,
                    idArchivoEncriptado: idArchivoEncriptado,
                  };
                  onFicheroSubido(resultado, elemento.NombreFichero).then(
                    () => {
                      actualizarProgreso!(elemento.NombreFichero, 100, false);
                    },
                  );
                });
              } else {
                var mensajeError = '';
                calidadFirmas.firmas.forEach((firma) => {
                  if (firma.esInvalido || firma.error) {
                    mensajeError += `${literalFirmaInvalida}: ${firma.nombrePropietario} (${firma.entidadEmisora})\n`;
                  }
                });
                actualizarProgreso!(
                  elemento.NombreFichero,
                  0,
                  true,
                  mensajeError,
                );
              }
            });
          }
        })
        .catch(() => {
          actualizarProgreso!(elemento.NombreFichero, 0, true);
        });
    },
    [],
  );
 const Sha1Hash = async (bytes: Uint8Array): Promise<string> => {
    const ab = bytes.slice().buffer as ArrayBuffer;
    const hashBuffer = await crypto.subtle.digest('SHA-1', ab);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  };
  const cutInPieces = (
    binary: Uint8Array,
    numberOfPieces: number,
  ): Uint8Array[] => {
    const output: Uint8Array[] = [];
    const chunkSize = Math.floor(binary.length / numberOfPieces);
    let currentPosition = 0;

    for (let i = 0; i < numberOfPieces; i++) {
      const size =
        i + 1 === numberOfPieces ? binary.length - currentPosition : chunkSize;

      const newArray = binary.slice(currentPosition, currentPosition + size);
      output.push(newArray);
      currentPosition += chunkSize;
    }

    return output;
  };
  const guardarDocumentoPorPartes = async (
    file: File,
    nombreFichero: string,
    actualizarProgreso?: (
      nombre: string,
      progreso: number,
      error: boolean,
      mensajeError?: string,
    ) => void,
  ): Promise<string | undefined> => {
    const bytes = await obtenerArrayBytes(file);
    const hash = await Sha1Hash(bytes);
    const partes = Math.round(bytes.length / (3 * 1024 * 1024) + 0.499);
    const idTipoArchivo = 2;
    if (partes <= 1) {
      const cabecera: CabeceraDocumentoPartido = {
        hash: hash,
        hashMethod: hash,
        numeroPartes: 1,
        codigoMediaType: idTipoArchivo,
        nombre: nombreFichero,
        principal: true,
        usuario: 50,
        idOrganoJudicialTramita: 55642,
      };

      const idArchivoEncriptado = (
        await GuardarDocumentoCompleto(cabecera, bytes)
      ).d;
      await AnadirCalidadPdfPorIDArchivo(idArchivoEncriptado);
      return idArchivoEncriptado;
    } else {
      try {
        const cabecera: CabeceraDocumentoPartido = {
          hash: hash,
          hashMethod: 'sha1',
          numeroPartes: partes,
          codigoMediaType: idTipoArchivo,
          nombre: nombreFichero,
          principal: true,
          usuario: 50,
          idOrganoJudicialTramita: 55642,
        };
        await IniciarSubidaDocumentoPorPartes(cabecera);
        const partesFichero = cutInPieces(bytes, partes);
        for (let index = 0; index < partesFichero.length; index++) {
          const parte = partesFichero[index];
          await SubirParteDocumento(parte, hash, index);
          actualizarProgreso!(
            nombreFichero,
            (index + 1) * (100 / partes),
            false,
          );
        }

        const idArchivoEncriptado = (
          await FinalizarSubidaDocumentoPorPartes(hash, 55642)
        ).d;
        await AnadirCalidadPdfPorIDArchivo(idArchivoEncriptado);
        return idArchivoEncriptado;
      } catch (error) {
        await CancelarDocumentoPorPartes(hash);
        actualizarProgreso!(nombreFichero, 0, true);
      }
    }
  };

  const AnadirCalidadPdfPorIDArchivo = async (
    idArchivoEncriptado: string,
  ): Promise<void> => {
    try {
      await repositorio.AnadirCalidadPdfPorIDArchivo(
        {
          idArchivoEncriptado: idArchivoEncriptado,
        },
        baseUrl,
        redirectHandler,
        tokenJWTName,
        sourceApplication,
      );
    } catch (_error) {}
  };

  const CancelarDocumentoPorPartes = async (hash: string): Promise<void> => {
    await fetchHook(
      repositorio.CancelarDocumentoPorPartes(
        {
          hash: hash,
        },
        baseUrl,
        redirectHandler,
        tokenJWTName,
        sourceApplication,
      ),
    );
  };
  const GuardarDocumentoCompleto = async (
    cabecera: CabeceraDocumentoPartido,
    bytes: Uint8Array,
  ): Promise<GuardarDocumentoCompletoResponse> => {
    return await fetchHook(
      repositorio.GuardarDocumentoCompleto(
        {
          cabecera: cabecera,
          binario: Array.from(bytes),
        },
        baseUrl,
        redirectHandler,
        tokenJWTName,
        sourceApplication,
      ),
    );
  };

  const FinalizarSubidaDocumentoPorPartes = async (
    hash: string,
    idOrganoJudicialTramita: number,
  ): Promise<GuardarDocumentoCompletoResponse> => {
    return await fetchHook(
      repositorio.FinalizarSubidaDocumentoPorPartes(
        {
          hash: hash,
          IdOrganoJudicialTramita: idOrganoJudicialTramita,
        },
        baseUrl,
        redirectHandler,
        tokenJWTName,
        sourceApplication,
      ),
    );
  };

  const SubirParteDocumento = async (
    bytes: Uint8Array,
    hash: string,
    posicion: number,
  ): Promise<void> => {
    const parte: SubirParte = {
      id: 0,
      binario: Array.from(bytes),
      posicion: posicion,
      hash: hash,
    };
    return await fetchHook(
      repositorio.SubirParteDocumento(
        { parte: parte },
        baseUrl,
        redirectHandler,
        tokenJWTName,
        sourceApplication,
      ),
    );
  };
  const IniciarSubidaDocumentoPorPartes = async (
    cabecera: CabeceraDocumentoPartido,
  ): Promise<void> => {
    return await fetchHook(
      repositorio.IniciarSubidaDocumentoPorPartes(
        {
          cabecera: cabecera,
        },
        baseUrl,
        redirectHandler,
        tokenJWTName,
        sourceApplication,
      ),
    );
  };

  const validarFirmas = async (
    calidad: CalidadPDF,
    nombreAplicacion: string,
    idUsuario: number,
  ): Promise<CalidadPDF> => {
    for (let i = 0; i < calidad.firmas.length; i++) {
      try {
        const resultadoFirma = await comprobarValidezCertificado(
          calidad.firmas[i].certificadoEnBase64,
          calidad.firmas[i].nombrePropietario,
          '',
          ModoValidacionFirma.Auto,
          nombreAplicacion,
          idUsuario,
        );
        if (resultadoFirma === null) {
          calidad.firmas[i].error = true;
          calidad.firmas[i].esInvalido = true;
          calidad.firmas[i].certificadoEnBase64 = '';
        } else {
          calidad.firmas[i].error = !resultadoFirma.comprobado;
          calidad.firmas[i].esInvalido =
            !resultadoFirma.comprobado || !resultadoFirma.valido;
          calidad.firmas[i].certificadoEnBase64 = '';
        }
      } catch {
        calidad.firmas[i].error = true;
        calidad.firmas[i].esInvalido = true;
        calidad.firmas[i].certificadoEnBase64 = '';
      }
    }
    return calidad;
  };

  const comprobarValidezCertificado = async (
    certificadoBase64: string,
    sujeto: string,
    alternativo: string,
    modo: number,
    nombreAplicacion: string,
    idUsuario: number,
  ) => {
    const request: ValidarCertificadoRequest = {
      CertBase64: certificadoBase64,
      Sujeto: sujeto,
      Alternativo: alternativo,
      Modo: modo,
      nombreAplicacion: nombreAplicacion,
      idUsuario: idUsuario,
    };
    try {
      const resultado = await repositorio.ValidarCertificado(
        request,
        baseUrlFirmaElectronica!,
        redirectHandler,
        tokenJWTName,
        sourceApplication,
      );
      return resultado;
    } catch (error) {
      return null;
    }
  };
  const comprobarCalidadPDF = async (fichero: File): Promise<CalidadPDF> => {
    const arrayBytes = await convertirArchivoABase64(fichero);
    const request: ComprobarCalidadPdfRequest = {
      ContenidoPDF: arrayBytes,
    };
    return await fetchHook(
      repositorio.ComprobarCalidadPdf(
        request,
        baseUrl,
        redirectHandler,
        tokenJWTName,
        sourceApplication,
      ),
    );
  };
  const convertirArchivoABase64 = (fichero: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(fichero);
    });
  };

  const consolidarArchivo = useCallback(
    async (elemento: DatosElementosAConsolidar): Promise<string> => {
      var idArchivoEncriptado: string;
      if (elemento.IDExpediente) {
        idArchivoEncriptado =
          await guardarArchivoConLocalizadorEnExpediente(elemento);
      } else {
        idArchivoEncriptado = await guardarArchivoConLocalizador(elemento);
      }
      await consolidarFichero(elemento.localizador, elemento.nombreArchivo);
      return idArchivoEncriptado;
    },
    [],
  );

  const obtenerTamanoMaximoFicheroASubir = useCallback(async (): Promise<
    Record<number, number>
  > => {
    const respuesta = await fetchHook(
      repositorio.ObtenerTamanoMaximoFicheroASubir(
        baseUrl,
        redirectHandler,
        tokenJWTName,
        sourceApplication,
      ),
    );
    return respuesta;
  }, []);

  const obtenerExtensionesPermitidas = useCallback(async (): Promise<
    MimeTypesSoportadosConCabecerasResponse[]
  > => {
    const respuesta = await fetchHook(
      repositorio.ObtenerExtensionesPermitidas(
        baseUrl,
        redirectHandler,
        tokenJWTName,
        sourceApplication,
      ),
    );
    return respuesta;
  }, []);

  const obtenerDatosBlob = async (
    elemento: DatosElementoADescargar,
  ): Promise<void> => {
    let urlBlob = '';
    if (!elemento.funcionFetch) {
      urlBlob = await obtenerUrlDescargaElemento(elemento);

      if (!debeDescargarBlob(urlBlob)) {
        elemento.UrlBlob = urlBlob;
        return;
      }
    }

    const response = elemento.funcionFetch
      ? await elemento.funcionFetch()
      : await fetch(urlBlob, {
          method: 'GET',
          credentials: conCredentialsPortalDocumentacion
            ? 'include'
            : undefined,
          headers: {
            tokenJWTName: tokenJWTName,
          },
        });

    const contentType = response.headers.get('Content-Type');
    const contentDisposition = response.headers.get('Content-Disposition');

    if (!contentType || !contentType.startsWith('application')) {
      const text = await response.text();
      alert(`${text}`);
      throw new Error(`Received non-Blob content: ${text}`);
    }

    const blob = await response.blob();

    elemento.UrlBlob = URL.createObjectURL(blob);

    if (contentDisposition) {
      const filename = getFilenameFromContentDisposition(contentDisposition);
      elemento.NombreFichero = filename ? filename : elemento.NombreFichero;
    }
  };

  const debeDescargarBlob = (urlBlob: string) => {
    return urlBlob && urlBlob.startsWith('http') && !urlBlob.includes('blob:');
  };

  const getFilenameFromContentDisposition = (
    contentDisposition: string | null,
  ): string | undefined => {
    if (!contentDisposition) return undefined;

    const matchesUtf8 = /filename\*\s*=\s*UTF-8''([^;]+)/i.exec(
      contentDisposition,
    );
    if (matchesUtf8) {
      return decodeURIComponent(matchesUtf8[1].trim());
    }

    const matchesQuoted = /filename="([^"]+)"/i.exec(contentDisposition);
    if (matchesQuoted) {
      return matchesQuoted[1].trim();
    }

    const matchesSimple = /filename=([^;]+)/i.exec(contentDisposition);
    if (matchesSimple) {
      return matchesSimple[1].trim().replace(/['"]/g, '');
    }

    return undefined;
  };

  const ValidarEstadoDisponibilidadRecurso = async (
    idEstadoDisponibilidadRecurso: number,
  ) => {
    await fetchHook(async () => {
      if (
        idEstadoDisponibilidadRecurso ===
        EstadosDisponibilidadRecurso.RecursoConError
      ) {
        throw new Error('EstadosDisponibilidadRecurso.RecursoConError');
      } else if (
        idEstadoDisponibilidadRecurso ===
        EstadosDisponibilidadRecurso.RecursoPendiente
      ) {
        throw new Error('EstadosDisponibilidadRecurso.RecursoPendiente');
      }
    });
    return (
      idEstadoDisponibilidadRecurso === EstadosDisponibilidadRecurso.Disponible
    );
  };

  const obtenerDatosMultimediaVideoBajoDemandaElementoIndice = async (
    elemento: DatosElementoADescargar,
  ): Promise<DatosMultimediaVideoBajoDemanda> => {
    const respuesta = await fetchHook(
      repositorio.ObtenerDatosMultimediaVideoBajoDemandaElementoIndice(
        elemento.IDElemento,
        elemento.TipoIDElemento == TiposIDElemento.GrabacionEfidelius
          ? TiposElementoTextualizacion.GrabacionEfidelius
          : elemento.TipoIDElemento == TiposIDElemento.GrabacionArconte
            ? TiposElementoTextualizacion.GrabacionArconte
            : TiposElementoTextualizacion.Archivo,
        baseUrlPortal,
        redirectHandler,
        conCredentialsPortalDocumentacion || false,
        sourceApplication,
      ),
    );

    return respuesta;
  };

  return {
    descargarElemento,
    incorporarArchivoTemporal,
    incorporarArchivoTemporalInternet,
    incorporarArchivoPrincipalPSP,
    consolidarArchivo,
    obtenerBlobDeElemento,
    obtenerTamanoMaximoFicheroASubir,
    obtenerExtensionesPermitidas,
    consolidarFichero,
    regenerarIndice,
    obtenerUrlDescargaElemento,
    obtenerDatosMultimediaVideoBajoDemandaElementoIndice,
    obtenerURLSubidaConTicket,
  };
};

export default useFileHandler;
