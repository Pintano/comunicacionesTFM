import { EstadosComunicacion } from '@/pages/comunicaciones-directas/models/comunicaciones.enum';
import { IComunicacionesDirectasRepository } from './comunicaciones-directas.repository';
import {
  ActualizarConsentimientoComunicacionesCommand,
  ArchivarConversacionesCommand,
  AsignarArchivoAMensajeCommand,
  ComprobarConsentimientoComunicacionesQuery,
  Conversacion,
  ConversacionesPorUsuarioResponse,
  EnviarMensajeCommand,
  IComunicacionDirectaClient,
  MarcarMensajesLeidosCommand,
  Mensaje,
  MensajesPorConversacionResponse,
  ObtenerArchivadasConMensajesNuevosQuery,
  ObtenerConversacionesConMensajesNuevosQuery,
} from '../autogenerado/wsMensajeriaClient';
import {
  EstadosMensajeConversacion,
  TipoMensajeConversacion,
} from './models/comunicaciones-directas';

export class ComunicacionesDirectasInMemory
  implements IComunicacionesDirectasRepository
{
  clienteAvantius: IComunicacionDirectaClient = {} as IComunicacionDirectaClient;

  private contadorMensajes = 2000;

  private conversacionesActivas: Conversacion[] = [
    {
      idConversacionEncriptado: '8',
      titulo: 'Titulo de conversaciones activas con 50 caracteres',
      ultimoMensaje: 'Ultimo mensaje de ejemplo',
      fechaUltimoMensaje: new Date('2026-07-10T10:30:00.000Z'),
      estadoUltimoMensaje: EstadosComunicacion.Activa,
      tipoUltimoMensaje: TipoMensajeConversacion.Texto,
      nombreParticipante: 'Ertzaintza',
      mensajesSinLeer: 3,
      esPropioMensaje: true,
    },
    {
      idConversacionEncriptado: '9',
      titulo: 'Titulo de conversaciones',
      ultimoMensaje: 'Segundo mensaje de ejemplo',
      fechaUltimoMensaje: new Date('2026-07-09T15:45:00.000Z'),
      estadoUltimoMensaje: EstadosComunicacion.Activa,
      tipoUltimoMensaje: TipoMensajeConversacion.Texto,
      nombreParticipante: 'Ertzaintza',
      mensajesSinLeer: 0,
      esPropioMensaje: true,
    },
  ];

  private conversacionesArchivadas: Conversacion[] = [
    {
      idConversacionEncriptado: '10',
      titulo: 'Comunicacion archivada de ejemplo',
      ultimoMensaje: 'Mensaje en conversacion archivada',
      fechaUltimoMensaje: new Date('2026-07-08T12:15:00.000Z'),
      estadoUltimoMensaje: EstadosComunicacion.Archivada,
      tipoUltimoMensaje: TipoMensajeConversacion.Texto,
      nombreParticipante: 'Policia Foral',
      mensajesSinLeer: 1,
      esPropioMensaje: false,
    },
  ];

  private mensajesPorConversacion: Record<string, Mensaje[]> = {
    '8': [
      {
        tipoMensaje: TipoMensajeConversacion.Texto,
        texto: 'Hola, como estas?',
        fechaEnvio: new Date('2026-07-10T10:10:00.000Z'),
        esPropioMensaje: true,
        idMensajeEncriptado: 'msg-001',
        estadoMensaje: EstadosMensajeConversacion.Enviado,
      },
      {
        tipoMensaje: TipoMensajeConversacion.Texto,
        texto: 'Bien y tu?',
        fechaEnvio: new Date('2026-07-10T10:12:00.000Z'),
        esPropioMensaje: false,
        idMensajeEncriptado: 'msg-002',
        estadoMensaje: EstadosMensajeConversacion.Leido,
      },
    ],
    '9': [
      {
        tipoMensaje: TipoMensajeConversacion.Texto,
        texto: 'Quedo pendiente de tu respuesta',
        fechaEnvio: new Date('2026-07-09T15:45:00.000Z'),
        esPropioMensaje: true,
        idMensajeEncriptado: 'msg-009',
        estadoMensaje: EstadosMensajeConversacion.Leido,
      },
    ],
    '10': [
      {
        tipoMensaje: TipoMensajeConversacion.Texto,
        texto: 'Mensaje en conversacion archivada',
        fechaEnvio: new Date('2026-07-08T12:15:00.000Z'),
        esPropioMensaje: false,
        idMensajeEncriptado: 'msg-010',
        estadoMensaje: EstadosMensajeConversacion.Enviado,
      },
    ],
  };

  async enviarMensaje(request: EnviarMensajeCommand): Promise<string> {
    const idConversacion = request.idComunicacionEncriptado;
    const contenidoMensaje = request.contenidoMensaje?.trim();

    if (!idConversacion || !contenidoMensaje) {
      return Promise.resolve(`msg-${++this.contadorMensajes}`);
    }

    const mensajeCreado: Mensaje = {
      tipoMensaje: TipoMensajeConversacion.Texto,
      texto: contenidoMensaje,
      fechaEnvio: new Date(),
      esPropioMensaje: true,
      idMensajeEncriptado: `msg-${++this.contadorMensajes}`,
      estadoMensaje: EstadosMensajeConversacion.Enviado,
    };

    if (!this.mensajesPorConversacion[idConversacion]) {
      this.mensajesPorConversacion[idConversacion] = [];
    }

    this.mensajesPorConversacion[idConversacion].push(mensajeCreado);
    this.actualizarResumenConversacion(idConversacion, mensajeCreado);

    return Promise.resolve(mensajeCreado.idMensajeEncriptado!);
  }

  async archivarComunicacionesDirectas(
    request: ArchivarConversacionesCommand,
  ): Promise<void> {
    const ids = request.idsComunicacionesEncriptados ?? [];

    const conversacionesAArchivar = this.conversacionesActivas.filter((c) =>
      ids.includes(c.idConversacionEncriptado ?? ''),
    );

    if (!conversacionesAArchivar.length) return;

    this.conversacionesActivas = this.conversacionesActivas.filter(
      (c) => !ids.includes(c.idConversacionEncriptado ?? ''),
    );

    const conversacionesArchivadasNormalizadas = conversacionesAArchivar.map(
      (c) => ({
        ...c,
        estadoUltimoMensaje: EstadosComunicacion.Archivada,
      }),
    );

    this.conversacionesArchivadas = [
      ...conversacionesArchivadasNormalizadas,
      ...this.conversacionesArchivadas,
    ];
  }

  async actualizarConsentimientoComunicaciones(
    request: ActualizarConsentimientoComunicacionesCommand,
  ): Promise<void> {
    request;
  }

  async comprobarConsentimientoComunicaciones(
    request: ComprobarConsentimientoComunicacionesQuery,
  ): Promise<boolean> {
    request;
    return true;
  }

  async obtenerConversacionesPorUsuario(
    request: boolean,
  ): Promise<ConversacionesPorUsuarioResponse> {
    const conversaciones = request
      ? [...this.conversacionesActivas]
      : [...this.conversacionesArchivadas];

    return { conversaciones };
  }

  async obtenerMensajesPorConversacion(
    idConversacionEncriptado: string,
  ): Promise<MensajesPorConversacionResponse> {
    const esArchivada = this.conversacionesArchivadas.some(
      (c) => c.idConversacionEncriptado === idConversacionEncriptado,
    );

    const mensajes = this.mensajesPorConversacion[idConversacionEncriptado] ?? [];

    return {
      idConversacionEncriptado: idConversacionEncriptado,
      idEstadoConversacion: esArchivada
        ? EstadosComunicacion.Archivada
        : EstadosComunicacion.Activa,
      usuarioRemitente: 'UsuarioRemitente',
      mensajes: [...mensajes],
    };
  }

  async obtenerConversacionesConMensajesNuevos(
    request: ObtenerConversacionesConMensajesNuevosQuery,
  ): Promise<string[]> {
    request;

    return this.conversacionesActivas
      .filter((c) => (c.mensajesSinLeer ?? 0) > 0)
      .map((c) => c.idConversacionEncriptado ?? '')
      .filter((id) => !!id);
  }

  async obtenerArchivadasConMensajesNuevos(
    request: ObtenerArchivadasConMensajesNuevosQuery,
  ): Promise<number> {
    request;

    return this.conversacionesArchivadas.filter(
      (c) => (c.mensajesSinLeer ?? 0) > 0,
    ).length;
  }

  async marcarMensajesLeidos(
    request: MarcarMensajesLeidosCommand,
  ): Promise<void> {
    const idsMensajes = request?.idsMensajesLeidosEncriptados ?? [];

    if (!idsMensajes.length) return;

    Object.keys(this.mensajesPorConversacion).forEach((idConversacion) => {
      const mensajesActualizados = this.mensajesPorConversacion[idConversacion].map(
        (m) =>
          (m.idMensajeEncriptado != null &&
            idsMensajes.includes(m.idMensajeEncriptado))
            ? { ...m, estadoMensaje: EstadosMensajeConversacion.Leido }
            : m,
      );

      this.mensajesPorConversacion[idConversacion] = mensajesActualizados;
      this.actualizarMensajesSinLeer(idConversacion);
    });
  }

  async asignarArchivoAMensaje(
    request: AsignarArchivoAMensajeCommand,
  ): Promise<void> {
    request;
  }

  private actualizarResumenConversacion(
    idConversacion: string,
    ultimoMensaje: Mensaje,
  ) {
    const actualizarEnLista = (lista: Conversacion[]) =>
      lista.map((c) =>
        c.idConversacionEncriptado === idConversacion
          ? {
              ...c,
              ultimoMensaje: ultimoMensaje.texto,
              fechaUltimoMensaje: ultimoMensaje.fechaEnvio,
              estadoUltimoMensaje: ultimoMensaje.estadoMensaje,
              tipoUltimoMensaje: ultimoMensaje.tipoMensaje,
              esPropioMensaje: ultimoMensaje.esPropioMensaje,
            }
          : c,
      );

    this.conversacionesActivas = actualizarEnLista(this.conversacionesActivas);
    this.conversacionesArchivadas = actualizarEnLista(
      this.conversacionesArchivadas,
    );
  }

  private actualizarMensajesSinLeer(idConversacion: string) {
    const mensajes = this.mensajesPorConversacion[idConversacion] ?? [];
    const sinLeer = mensajes.filter(
      (m) =>
        !m.esPropioMensaje &&
        m.estadoMensaje === EstadosMensajeConversacion.Enviado,
    ).length;

    const actualizarEnLista = (lista: Conversacion[]) =>
      lista.map((c) =>
        c.idConversacionEncriptado === idConversacion
          ? { ...c, mensajesSinLeer: sinLeer }
          : c,
      );

    this.conversacionesActivas = actualizarEnLista(this.conversacionesActivas);
    this.conversacionesArchivadas = actualizarEnLista(
      this.conversacionesArchivadas,
    );
  }
}
