import { Meta, StoryObj } from '@storybook/react-vite';
import { TarjetaComunicacion } from './tarjeta-comunicacion';

const meta: Meta<typeof TarjetaComunicacion> = {
  title: 'Componentes/Chat/TarjetaComunicacion',
  component: TarjetaComunicacion,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'number',
      description: 'Id de la tarjeta',
    },
    titulo: {
      control: 'text',
      description: 'Título superior de la tarjeta',
    },
    subtitulo: {
      control: 'text',
      description: 'Subtítulo de la tarjeta',
    },
    notaSuperior: {
      control: 'text',
      description: 'Fecha o nota superior de la tarjeta',
    },
    icono: {
      control: 'select',
      description: 'Icono de la tarjeta',
    },
    colorIcono: {
      control: 'select',
      description: 'Color del icono de la tarjeta',
    },
    texto: {
      control: 'text',
      description: 'Texto inferior de la tarjeta',
    },
    onClick: {
      action: 'Acción onClick',
      description: 'Acción al hacer click en la tarjeta',
    },
    seleccionada: {
      control: 'boolean',
      description: 'Si la tarjeta está seleccionada',
    },
    archivada: {
      control: 'boolean',
      description: 'Si la tarjeta está archivada',
    },
    disabled: {
      control: 'boolean',
      description: 'Si la tarjeta está deshabilitada',
    },
    esBoton: {
      control: 'boolean',
      description: 'Si la tarjeta se va a usar como botón',
    },
    contador: {
      control: 'number',
      description: 'Número de notificaciones',
    },
  },
  args: {
    id: 1,
    titulo: 'Nueva comunicación entre PSP y el Magistrado',
    subtitulo: 'Suboficial',
    notaSuperior: '04/13',
    icono: 'checks',
    colorIcono: 'primario',
    texto: 'Último mensaje enviado preview',
    onClick: () => console.log('Click'),
    seleccionada: false,
    archivada: false,
    disabled: false,
    esBoton: false,
    contador: 0,
  },
};

export default meta;

type Story = StoryObj<typeof TarjetaComunicacion>;

export const Predeterminado: Story = {};

export const ConversacionLeida: Story = {
  args: {
    icono: 'checks',
    colorIcono: 'primario',
  },
};

export const ConversacionEnviada: Story = {
  args: {
    icono: 'checks',
    colorIcono: 'secundario',
  },
};

export const ConversacionSeleccionada: Story = {
  args: {
    seleccionada: true,
  },
};

export const ConversacionArchivada: Story = {
  args: {
    archivada: true,
  },
};

export const ConversacionDeshabilitada: Story = {
  args: {
    disabled: true,
  },
};

export const ConversacionConNotificaciones: Story = {
  args: {
    contador: 413,
  },
};

export const ConversacionBoton: Story = {
  args: {
    id: 1,
    titulo: 'Ver Archivadas',
    esBoton: true,
    subtitulo: '',
    notaSuperior: '',
    icono: 'archive',
    texto: '',
  },
};

export const ConversacionBotonDeshabilitada: Story = {
  args: {
    id: 1,
    titulo: 'Ver Archivadas',
    esBoton: true,
    subtitulo: '',
    notaSuperior: '',
    icono: 'archive',
    texto: '',
    disabled: true,
  },
};
