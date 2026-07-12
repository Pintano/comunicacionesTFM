import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './badge';

const meta = {
  title: 'Componentes/Feedback/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    count: {
      control: 'number',
      description: 'Número de notificaciones a mostrar',
      defaultValue: 10,
    },
    type: {
      control: 'radio',
      description: 'Estilo del badge',
      options: ['default', 'fixed'],
      defaultValue: 'default',
    },
    variant: {
      control: 'radio',
      description: 'Variante del badge',
      options: ['alert', 'info', 'counter'],
      defaultValue: 'alert',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Predeterminado: Story = {
  args: {},
};

export const ConCero: Story = {
  args: {
    count: 0,
  },
};

export const ConValor: Story = {
  args: {
    count: 25,
  },
};

export const ConNoventaYNueve: Story = {
  args: {
    count: 99,
  },
};

export const ConCien: Story = {
  args: {
    count: 100,
  },
};

export const ConMayorDeCien: Story = {
  args: {
    count: 999,
  },
};

export const Fixed: Story = {
  args: {
    type: 'fixed',
  },
};

export const Info: Story = {
  args: {
    count: 3,
    variant: 'info',
  },
};

export const Counter: Story = {
  args: {
    count: 710,
    variant: 'counter',
  },
};
