import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../base/button/button';
import { IconWrapper } from '../../icono/icon-wrapper/icon-wrapper';
import { ChatLayout } from '../chat/chat-layout';
import {
  LayoutComunicaciones,
  LayoutComunicacionesProps,
} from './layout-comunicaciones';
import { EstadosBocadillo } from '../bocadillo/bocadillo.types';
import { BocadilloProps } from '../bocadillo/bocadillo';
import { TextButton } from '../../base/text-button/text-button';
import { InputSearch } from '../../base/inputs-and-formularios/input-search/input-search';
import { TarjetaComunicacion } from '../tarjeta-comunicacion/tarjeta-comunicacion';

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
    fecha: new Date('2025-11-13T10:02:00'),
    estado: EstadosBocadillo.Enviado,
    esPropio: true,
    esAdjunto: false,
    onClickEnAdjuntos: () => alert('Adjunto clicado'),
  },
  {
    texto:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean.',
    fecha: new Date('2025-11-13T10:03:00'),
    estado: EstadosBocadillo.Enviado,
    esPropio: true,
    esAdjunto: false,
    onClickEnAdjuntos: () => alert('Adjunto clicado'),
  },
  {
    texto:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean.',
    fecha: new Date('2025-11-13T10:04:00'),
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
    esAdjunto: false,
    onClickEnAdjuntos: () => alert('Adjunto clicado'),
  },
];

const meta: Meta<LayoutComunicacionesProps> = {
  title: 'Componentes/Chat/LayoutComunicaciones',
  component: LayoutComunicaciones,
  tags: ['autodocs'],
  argTypes: {
    sidebar: {
      description: 'Elementos que irán en la sección de sidebar',
    },
    header: {
      description: 'Elementos que irán a la derecha de la barra superior',
    },
    contenido: {
      description: 'Elementos que irán en la sección de resultados',
    },
    id: {
      control: 'text',
      description: 'Id para identificar el layout',
    },
    titulo: {
      control: 'text',
      description: 'Título que aparece en la barra superior',
    },
    colapsableSidebar: {
      control: 'boolean',
      description: 'Indica si los sidebar pueden colapsarse',
    },
    mostrarHeader: {
      control: 'boolean',
      description: 'Muestra u oculta la barra superior del layout',
    },
  },
  args: {
    sidebar: (
      <>
        <TarjetaComunicacion
          id={0}
          titulo="Boton"
          icono="archive"
          onClick={() => console.log('click en botón archivadas')}
          esBoton={true}
        ></TarjetaComunicacion>
        <InputSearch></InputSearch>
        <TarjetaComunicacion
          id={0}
          titulo={'Título'}
          subtitulo="Subtítulo"
          notaSuperior="Fecha"
          icono="checks"
          colorIcono="primario"
          texto="Texto"
        ></TarjetaComunicacion>
        <TarjetaComunicacion
          id={0}
          titulo={'Título'}
          subtitulo="Subtítulo"
          notaSuperior="Fecha"
          icono="checks"
          colorIcono="primario"
          texto="Texto"
        ></TarjetaComunicacion>
        <TarjetaComunicacion
          id={0}
          titulo={'Título'}
          subtitulo="Subtítulo"
          notaSuperior="Fecha"
          icono="checks"
          colorIcono="primario"
          texto="Texto"
        ></TarjetaComunicacion>
        <TarjetaComunicacion
          id={0}
          titulo={'Título'}
          subtitulo="Subtítulo"
          notaSuperior="Fecha"
          icono="checks"
          colorIcono="primario"
          texto="Texto"
        ></TarjetaComunicacion>
        <TarjetaComunicacion
          id={0}
          titulo={'Título'}
          subtitulo="Subtítulo"
          notaSuperior="Fecha"
          icono="checks"
          colorIcono="primario"
          texto="Texto"
        ></TarjetaComunicacion>
        <TextButton
          variant="secondary"
          icono="messageOff"
          onClick={() => console.log('click en botón dar de baja')}
        >
          Archivadas
        </TextButton>
      </>
    ),
    header: {
      buttonLeft: 'arrowNarrowLeft',
      textLeft: 'Título de la comunicación',
      textRight: 'Subtítulo de la comunicación',
      buttonRight: 'archive',
    },
    contenido: <ChatLayout mensajes={mensajesMock} />,
    id: 'id',
    titulo: 'TITULO DE UNA COMUNICACIÓN',
    colapsableSidebar: true,
    mostrarHeader: true,
    esVistaDetalle: true,
  },
  decorators: [
    (Story) => (
      <div style={{ overflowY: 'auto' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Predeterminado: Story = {};

export const SinHeader: Story = {
  args: {
    mostrarHeader: false,
  },
};

export const SinSidebar: Story = {
  args: {
    sidebar: null,
    colapsableSidebar: false,
  },
};

export const SinContenido: Story = {
  args: {
    contenido: null,
  },
};

export const SinAcciones: Story = {
  args: {
    childrenBarraHerramientas: <></>,
  },
};

export const ConVariasAcciones: Story = {
  args: {
    childrenBarraHerramientas: (
      <>
        <Button variant="secundario">Exportar</Button>
        <Button variant="principal">Nuevo</Button>
      </>
    ),
  },
};

export const ConVistaMovilSidebar: Story = {
  args: {
    esVistaDetalle: false,
  },
};

export const ConVistaMovilDetalle: Story = {
  args: {
    esVistaDetalle: true,
  },
};
