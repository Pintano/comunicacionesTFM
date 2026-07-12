import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from './icon-button';
import { iconButtonDocumentation } from './icon-button.docs';
import { generateStorybookDocs } from '../../../../.storybook/docs-generator/docs.utils';

const meta: Meta<typeof IconButton> = {
  title: 'Componentes/Acciones & Controles/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: generateStorybookDocs(iconButtonDocumentation),
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
    },
    color: {
      control: { type: 'select' },
      options: ['default', 'white', 'transparent'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    icon: 'close',
    'aria-label': 'Cerrar',
  },
};

export const ExtraSmall: Story = {
  args: {
    icon: 'close',
    size: 'xs',
    'aria-label': 'Cerrar',
  },
};

export const Small: Story = {
  args: {
    icon: 'close',
    size: 'sm',
    'aria-label': 'Cerrar',
  },
};

export const Large: Story = {
  args: {
    icon: 'close',
    size: 'lg',
    'aria-label': 'Cerrar',
  },
};

export const ColorDefault: Story = {
  args: {
    icon: 'folder',
    color: 'default',
    'aria-label': 'Abrir carpeta',
  },
};

export const ColorWhite: Story = {
  args: {
    icon: 'help',
    color: 'white',
    'aria-label': 'Ayuda',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const ColorTransparent: Story = {
  args: {
    icon: 'search',
    color: 'transparent',
    'aria-label': 'Buscar',
  },
};

export const Disabled: Story = {
  args: {
    icon: 'close',
    disabled: true,
    'aria-label': 'Cerrar (deshabilitado)',
  },
};

export const CloseModal: Story = {
  name: 'Cerrar Modal',
  args: {
    icon: 'close',
    color: 'transparent',
    size: 'sm',
    'aria-label': 'Cerrar modal',
  },
};

export const PlayButton: Story = {
  name: 'Reproducir',
  args: {
    icon: 'playerFilled',
    size: 'lg',
    'aria-label': 'Reproducir video',
  },
};

export const HelpButton: Story = {
  name: 'Ayuda',
  args: {
    icon: 'help',
    color: 'white',
    'aria-label': 'Mostrar ayuda',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
