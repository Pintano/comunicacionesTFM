import type { Meta, StoryObj } from '@storybook/react-vite';
import { TituloCabecera } from './titulo-cabecera';

const meta: Meta<typeof TituloCabecera> = {
  title: 'Componentes/Navegacion/TituloCabecera',
  component: TituloCabecera,
  tags: ['autodocs'],
  decorators: [
    (Story: any) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof TituloCabecera>;

export const Predeterminado: Story = {
  args: {
    children: 'Título de ejemplo',
  },
};
