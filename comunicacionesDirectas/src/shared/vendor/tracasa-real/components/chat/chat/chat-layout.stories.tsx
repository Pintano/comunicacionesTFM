import { Meta, StoryObj } from '@storybook/react-vite';
import { ChatLayout } from './chat-layout';
import { EstadosBocadillo } from '../bocadillo/bocadillo.types';
import { BocadilloProps } from '../bocadillo/bocadillo';

const mensajesMock: BocadilloProps[] = [
  {
    texto: '¡Hola!',
    fecha: new Date('2025-11-03T10:00:00'),
    estado: EstadosBocadillo.Leido,
    esPropio: false,
    esAdjunto: false,
    onClickEnAdjuntos: () => alert('Adjunto clicado'),
  },
  {
    texto: 'archivo_adjunto_en_formato_pdf.pdf',
    fecha: new Date('2025-11-03T10:01:00'),
    estado: EstadosBocadillo.Leido,
    esPropio: false,
    esAdjunto: true,
    onClickEnAdjuntos: () => alert('Abrir adjunto'),
  },
  {
    texto: '¡Hola! Este es mi mensaje enviado.',
    fecha: new Date('2025-11-21T10:02:00'),
    estado: EstadosBocadillo.Enviado,
    esPropio: true,
    esAdjunto: false,
    onClickEnAdjuntos: () => alert('Adjunto clicado'),
  },
  {
    texto:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean.',
    fecha: new Date('2025-11-21T10:03:00'),
    estado: EstadosBocadillo.Enviado,
    esPropio: true,
    esAdjunto: false,
    onClickEnAdjuntos: () => alert('Adjunto clicado'),
  },
  {
    texto:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean.',
    fecha: new Date('2025-11-21T10:04:00'),
    estado: EstadosBocadillo.Enviado,
    esPropio: true,
    esAdjunto: false,
    onClickEnAdjuntos: () => alert('Adjunto clicado'),
  },
  {
    texto:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean.',
    fecha: new Date('2025-11-17T10:05:00'),
    estado: EstadosBocadillo.Enviado,
    esPropio: false,
    esAdjunto: false,
    onClickEnAdjuntos: () => alert('Adjunto clicado'),
  },
  {
    texto:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean.',
    fecha: new Date('2025-11-18T10:05:00'),
    estado: EstadosBocadillo.Enviado,
    esPropio: true,
    esGenerico: true,
    esAdjunto: false,
    onClickEnAdjuntos: () => alert('Adjunto clicado'),
  },
  {
    texto:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean.',
    fecha: new Date('2025-11-18T10:05:00'),
    estado: EstadosBocadillo.Enviado,
    esPropio: true,
    esAdjunto: false,
    onClickEnAdjuntos: () => alert('Adjunto clicado'),
  },
];

const meta: Meta<typeof ChatLayout> = {
  title: 'Componentes/Chat/ChatLayout',
  component: ChatLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    mensajes: {
      control: 'object',
      description: 'Mensajes del chat',
    },
    onEnviar: { action: 'enviar mensaje' },
    onAdjuntar: { action: 'adjuntar archivo' },
    readonly: {
      control: 'boolean',
      description: 'Activa el modo lectura',
    },
    textReadonly: {
      control: 'text',
      description: 'Texto que mostrar como aviso cuando está en modo lectura',
    },
  },
  args: {
    mensajes: mensajesMock,
    onEnviar: (texto) => console.log('Enviar mensaje:', texto),
    onAdjuntar: () => console.log('Adjuntar archivo'),
    readonly: false,
    textReadonly:
      'Esta comunicación ha sido archivada. No se pueden enviar ni recibir más mensajes.',
  },
};

export default meta;

type Story = StoryObj<typeof ChatLayout>;

export const Predeterminado: Story = {
  args: {},
};

export const ConversacionVacia: Story = {
  args: {
    mensajes: [],
  },
};

export const ConversacionCorta: Story = {
  args: {
    mensajes: mensajesMock.slice(0, 3),
  },
};

export const ConversacionLarga: Story = {
  args: {
    mensajes: [
      ...mensajesMock,
      ...mensajesMock.map((m) => ({
        ...m,
        fecha: new Date('2025-11-14T12:00:00'),
      })),
    ],
  },
};

export const ConversacionAchivada: Story = {
  args: {
    readonly: true,
    textReadonly:
      'Esta comunicación ha sido archivada. No se pueden enviar ni recibir más mensajes.',
  },
};
