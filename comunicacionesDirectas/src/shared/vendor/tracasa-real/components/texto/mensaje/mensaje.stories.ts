import type { Meta, StoryObj } from '@storybook/react-vite';
import type { MensajeProps } from './mensaje';
import { Mensaje } from './mensaje';

const meta: Meta<MensajeProps> = {
  title: 'Componentes/Mensaje/MensajeAviso',
  component: Mensaje,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message:
      'Esto es un mensaje informativo muyyyyyy largoooooo pero se ve bien',
  },
};

export const ErrorMessage: Story = {
  args: {
    message: 'Esto es un mensaje de error',
    variant: 'error',
  },
};

export const ClickableMessage: Story = {
  args: {
    message: 'Esto es un mensaje clickable',
    clickable: true,
    onClick: () => {
      alert('¡Se ha hecho clic en el mensaje!');
    },
  },
};

export const WarningMessage: Story = {
  args: {
    message: 'Esto es un mensaje de advertencia',
    variant: 'warning',
  },
};
