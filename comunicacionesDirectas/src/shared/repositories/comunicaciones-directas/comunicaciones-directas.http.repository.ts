import { IComunicacionesDirectasRepository } from './comunicaciones-directas.repository';
import { configAvantiusProxy } from '@/shared/config';
import { httpClientSinTransform } from '@/shared/http';
import {
  IComunicacionDirectaClient,
  EnviarMensajeCommand,
  ArchivarConversacionesCommand,
  ActualizarConsentimientoComunicacionesCommand,
  ComprobarConsentimientoComunicacionesQuery,
  ConversacionesPorUsuarioResponse,
  MensajesPorConversacionResponse,
  ObtenerArchivadasConMensajesNuevosQuery,
  MarcarMensajesLeidosCommand,
  ComunicacionDirectaClient,
  ObtenerConversacionesConMensajesNuevosQuery,
  AsignarArchivoAMensajeCommand,
} from '../autogenerado/wsMensajeriaClient';

export class ComunicacionesDirectasRepository
  implements IComunicacionesDirectasRepository
{
  clienteAvantius: IComunicacionDirectaClient = new ComunicacionDirectaClient(
    configAvantiusProxy.server.wsMensajeria.replace('/api', ''),
    httpClientSinTransform,
  );

  async enviarMensaje(request: EnviarMensajeCommand): Promise<string> {
    return await this.clienteAvantius.enviarMensaje(undefined, request);
  }
  async archivarComunicacionesDirectas(
    request: ArchivarConversacionesCommand,
  ): Promise<void> {
    await this.clienteAvantius.archivarComunicacionesDirectas(
      undefined,
      request,
    );
  }
  async actualizarConsentimientoComunicaciones(
    request: ActualizarConsentimientoComunicacionesCommand,
  ): Promise<void> {
    await this.clienteAvantius.actualizarConsentimientoComunicaciones(
      undefined,
      request,
    );
  }
  async comprobarConsentimientoComunicaciones(
    request: ComprobarConsentimientoComunicacionesQuery,
  ): Promise<boolean> {
    return await this.clienteAvantius.comprobarConsentimientoComunicaciones(
      request,
      undefined,
    );
  }
  async obtenerConversacionesPorUsuario(
    request: boolean,
  ): Promise<ConversacionesPorUsuarioResponse> {
    return await this.clienteAvantius.obtenerConversacionesPorUsuario(
      request,
      undefined,
    );
  }
  async obtenerMensajesPorConversacion(
    idConversacionEncriptado: string,
  ): Promise<MensajesPorConversacionResponse> {
    return await this.clienteAvantius.obtenerMensajesPorConversacion(
      idConversacionEncriptado,
      undefined,
    );
  }
  async obtenerConversacionesConMensajesNuevos(
    request: ObtenerConversacionesConMensajesNuevosQuery,
  ): Promise<string[]> {
    return await this.clienteAvantius.obtenerConversacionesConMensajesNuevos(
      request,
      undefined,
    );
  }
  async obtenerArchivadasConMensajesNuevos(
    request: ObtenerArchivadasConMensajesNuevosQuery,
  ): Promise<number> {
    return await this.clienteAvantius.obtenerArchivadasConMensajesNuevos(
      request,
      undefined,
    );
  }
  async marcarMensajesLeidos(
    request: MarcarMensajesLeidosCommand,
  ): Promise<void> {
    await this.clienteAvantius.marcarMensajesLeidos(undefined, request);
  }
  async asignarArchivoAMensaje(
    request: AsignarArchivoAMensajeCommand,
  ): Promise<void> {
    const response = await this.clienteAvantius.asignarArchivoAMensaje(
      undefined,
      request,
    );
    return response;
  }
}
