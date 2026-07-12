import type { Meta, StoryObj } from '@storybook/react-vite';
import type { TextAreaProps } from './text-area';
import { TextArea } from './text-area';

const meta: Meta<TextAreaProps> = {
  title: 'Componentes/Inputs & Formularios/Textarea/Textrea',
  component: TextArea,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Predeterminado: Story = {
  args: {
    placeholder: 'Por favor, introduce tu comentario aquí...',
    disabled: false,
  },
};

export const ConError: Story = {
  args: {
    invalid: true,
  },
};

export const Deshabilitado: Story = {
  args: {
    disabled: true,
    children: 'Texto prueba',
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    children: 'Texto prueba',
  },
};

export const AutoHeight: Story = {
  args: {
    autoHeight: true,
    children: 'Texto prueba',
  },
};

export const Overflow: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <TextArea autoHeight>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.,
      </TextArea>
    </div>
  ),
};
