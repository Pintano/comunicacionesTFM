import { Meta, StoryObj } from '@storybook/react-vite';
import { Bocadillo } from './bocadillo';
import { EstadosBocadillo } from './bocadillo.types';

const meta: Meta<typeof Bocadillo> = {
  title: 'Componentes/Chat/Bocadillo',
  component: Bocadillo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    idEnMemoria: {
      control: 'text',
      description: 'Id en memoria del mensaje',
    },
    texto: {
      control: 'text',
      description: 'Texto del mensaje',
    },
    fecha: {
      control: 'date',
      description: 'Fecha y hora del mensaje',
    },
    estado: {
      control: 'select',
      options: [
        EstadosBocadillo.Enviado,
        EstadosBocadillo.Leido,
        EstadosBocadillo.Error,
      ],
      labels: {
        [EstadosBocadillo.Enviado]: 'No leído',
        [EstadosBocadillo.Leido]: 'Leído',
        [EstadosBocadillo.Error]: 'Error',
      },
      description: 'Estado del mensaje',
    },
    esPropio: {
      control: 'boolean',
      description: 'Indica si el mensaje fue enviado por el usuario actual',
    },
    esGenerico: {
      control: 'boolean',
      description: 'Indica si el mensaje es un mensaje genérico o del sistema',
    },
    esAdjunto: {
      control: 'boolean',
      description: 'Indica si el mensaje contiene un adjunto',
    },
    onClickEnAdjuntos: {
      action: 'click en adjunto',
      description: 'Evento al hacer clic en un adjunto',
    },
  },
  args: {
    texto: 'Hola, este es un mensaje de prueba.',
    fecha: new Date('2009-06-12T04:13:00Z'),
    estado: EstadosBocadillo.Leido,
    esPropio: true,
    esGenerico: false,
    esAdjunto: false,
    onClickEnAdjuntos: () => {},
    idEnMemoria: undefined,
  },
};

export default meta;

type Story = StoryObj<typeof Bocadillo>;

export const Predeterminado: Story = {};

export const MensajeRecibido: Story = {
  args: {
    texto: 'Esto es un mensaje recibido.',
    fecha: new Date('2009-06-12T04:13:00Z'),
    estado: EstadosBocadillo.Leido,
    esPropio: false,
  },
};

export const MensajeRecibidoLargo: Story = {
  args: {
    texto:
      'Esto es un mensaje recibido. Además de ser un mensaje recibido, también es un mensaje lo suficientemente largo como para ocupar varias líneas.',
    fecha: new Date('2009-06-12T04:13:00Z'),
    estado: EstadosBocadillo.Leido,
    esPropio: false,
  },
};

export const MensajeRecibidoLargoSinEspacios: Story = {
  args: {
    texto:
      'Loremipsumdolorsitametconsecteturadipiscingelit.Consecteturadipiscingelitquisquefaucibusexsapienvitae.Exsapienvitaepellentesquesemplaceratinid.Placeratinidcursusmipretiumtellusduis.Pretiumtellusduisconvallistempusleoeuaenean.',
    fecha: new Date('2009-06-12T04:13:00Z'),
    estado: EstadosBocadillo.Leido,
    esPropio: false,
  },
};

export const MensajeEnviado: Story = {
  args: {
    texto: 'Esto es un mensaje enviado correctamente.',
    fecha: new Date('2009-06-12T04:13:00Z'),
    estado: EstadosBocadillo.Enviado,
    esPropio: true,
  },
};

export const MensajeEnviadoLargo: Story = {
  args: {
    texto:
      'Esto es un mensaje enviado. Además de ser un mensaje recibido, también es un mensaje lo suficientemente largo como para ocupar varias líneas.',
    fecha: new Date('2009-06-12T04:13:00Z'),
    estado: EstadosBocadillo.Leido,
    esPropio: true,
  },
};

export const MensajeLeido: Story = {
  args: {
    texto: 'Esto es un mensaje enviado y leído.',
    fecha: new Date('2009-06-12T04:13:00Z'),
    estado: EstadosBocadillo.Leido,
    esPropio: true,
  },
};

export const MensajeConError: Story = {
  args: {
    texto: 'Esto es un mensaje con error.',
    fecha: new Date('2009-06-12T04:13:00Z'),
    estado: EstadosBocadillo.Error,
    esPropio: true,
  },
};

export const MensajeSinEnviar: Story = {
  args: {
    texto: 'Esto es un mensaje con error.',
    fecha: new Date('2009-06-12T04:13:00Z'),
    estado: undefined,
    esPropio: true,
  },
};

export const MensajeEnviadoConAdjunto: Story = {
  args: {
    texto: 'documento_adjunto_firmado_version_definitiva_final_2.pdf',
    fecha: new Date('2009-06-12T04:13:00Z'),
    estado: EstadosBocadillo.Leido,
    esPropio: true,
    esAdjunto: true,
    onClickEnAdjuntos: () => console.log('Click'),
  },
};

export const MensajeRecibidoConAdjunto: Story = {
  args: {
    texto: 'Documento firmado.pdf',
    fecha: new Date('2009-06-12T04:13:00Z'),
    estado: EstadosBocadillo.Leido,
    esPropio: false,
    esAdjunto: true,
    onClickEnAdjuntos: () => console.log('Click'),
  },
};

export const MensajeGenerico: Story = {
  args: {
    texto: 'Mensaje Genérico',
    fecha: new Date('2009-06-12T04:13:00Z'),
    estado: EstadosBocadillo.Leido,
    esGenerico: true,
  },
};
