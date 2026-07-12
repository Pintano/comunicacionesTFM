import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { InputSearch, InputSearchProps } from './input-search';

const meta: Meta<InputSearchProps> = {
  title: 'Componentes/Inputs & Formularios/Input/InputSearch',
  component: InputSearch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    error: {
      control: 'boolean',
      description: 'Si el input está en estado de error',
    },
    disabled: {
      control: 'boolean',
      description: 'Si el input está deshabilitado',
    },
    readOnly: {
      control: 'boolean',
      description: 'Si el input es de solo lectura',
    },
    placeholder: {
      control: 'text',
      description: 'Texto de placeholder',
    },
    autofoco: {
      control: 'boolean',
      description: 'Si el input recibe foco automáticamente',
    },
    textoAccesibilidad: {
      control: 'text',
      description: 'Etiqueta de accesibilidad para lectores de pantalla',
    },
  },
};

export default meta;
type Story = StoryObj<InputSearchProps>;

export const WithValue: Story = {
  args: {
    value: 'Texto introducido',
    readOnly: true,
    textoAccesibilidad: 'Campo con valor',
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Introduce tu nombre completo',
    textoAccesibilidad: 'Campo de nombre',
  },
};

export const Error: Story = {
  args: {
    error: true,
    placeholder: 'Campo con error',
    textoAccesibilidad: 'Campo con error de validación',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Campo deshabilitado',
    textoAccesibilidad: 'Campo deshabilitado',
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    value: 'Campo de solo lectura',
    textoAccesibilidad: 'Campo de solo lectura',
  },
};

export const Ejemplo: Story = {
  render: () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
      <div style={{ minWidth: '300px' }}>
        <h4 style={{ margin: '0 0 1rem 0' }}>Ejemplo de Búsqueda</h4>
        <InputSearch
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar..."
          textoAccesibilidad="Campo de búsqueda"
        />
        {searchTerm && (
          <div style={{ fontSize: '0.875rem', marginTop: '0.75rem' }}>
            Buscando: <strong>{searchTerm}</strong>
          </div>
        )}
      </div>
    );
  },
};

export const Showcase: Story = {
  name: 'Con Botón de Limpiar (Búsqueda)',
  render: () => {
    const [searchValue, setSearchValue] = useState('');
    const [controlledValue, setControlledValue] = useState(
      'Texto con botón de limpiar',
    );

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          maxWidth: '500px',
        }}
      >
        <div>
          <h3
            style={{
              margin: '0 0 1rem 0',
              fontSize: '1.1rem',
              fontWeight: '600',
            }}
          >
            Campo de Búsqueda
          </h3>
          <p
            style={{
              margin: '0 0 0.5rem 0',
              fontSize: '0.875rem',
              color: 'var(--color-gray-600)',
            }}
          >
            El botón de limpiar solo aparece cuando hay texto
          </p>
          <InputSearch
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Buscar..."
          />
        </div>

        <div>
          <h3
            style={{
              margin: '0 0 1rem 0',
              fontSize: '1.1rem',
              fontWeight: '600',
            }}
          >
            Input con Callback Personalizado
          </h3>
          <p
            style={{
              margin: '0 0 0.5rem 0',
              fontSize: '0.875rem',
              color: 'var(--color-gray-600)',
            }}
          >
            Usando la prop <code>onClear</code> para lógica personalizada
          </p>
          <InputSearch
            value={controlledValue}
            onChange={(e) => setControlledValue(e.target.value)}
            placeholder="Escribe algo..."
            onClear={() => {
              setControlledValue('');
              console.log('Campo limpiado con callback personalizado');
            }}
          />
        </div>

        <div>
          <h3
            style={{
              margin: '0 0 1rem 0',
              fontSize: '1.1rem',
              fontWeight: '600',
            }}
          >
            Input de Búsqueda Uncontrolled
          </h3>
          <p
            style={{
              margin: '0 0 0.5rem 0',
              fontSize: '0.875rem',
              color: 'var(--color-gray-600)',
            }}
          >
            También funciona en modo uncontrolled
          </p>
          <InputSearch placeholder="Buscar productos..." />
        </div>

        <div
          style={{
            padding: '1rem',
            background: 'var(--color-gray-50)',
            borderRadius: '4px',
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
        >
          <strong>💡 Casos de Uso:</strong>
          <ul style={{ margin: '0.5rem 0 0 1.25rem', paddingLeft: 0 }}>
            <li>Campos de búsqueda en tablas y listas</li>
            <li>Filtros que necesitan limpiarse rápidamente</li>
            <li>Formularios donde el usuario puede querer empezar de nuevo</li>
            <li>Inputs de autocompletado</li>
          </ul>
        </div>
      </div>
    );
  },
};
