import type { Meta, StoryObj } from '@storybook/react-vite';
import { RichTextArea, RichTextAreaProps } from './rich-text-area';
import { useState } from 'react';

const meta: Meta<RichTextAreaProps> = {
  title: 'Componentes/Inputs & Formularios/Textarea/RichTextarea',
  component: RichTextArea,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ControladoPorEstado: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <div>
        <RichTextArea
          value={value}
          onChange={(html) => setValue(html as string)}
          placeholder="Escribe algo con formato..."
        />
        <hr />
        <p>
          <strong>Contenido HTML actual:</strong>
        </p>
        <pre>{value}</pre>
      </div>
    );
  },
};

export const Predeterminado: Story = {
  args: {
    placeholder: 'Por favor, introduce tu comentario aquí...',
    value: 'Texto prueba',
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
