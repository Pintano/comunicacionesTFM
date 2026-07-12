import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState } from './empty-state';
import { fn } from 'storybook/test';
import { emptyStateDocumentation } from './empty-state.docs';
import { generateStorybookDocs } from '../../../.storybook/docs-generator/docs.utils';

const meta: Meta<typeof EmptyState> = {
  title: 'Componentes/Feedback/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: generateStorybookDocs(emptyStateDocumentation),
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Texto principal obligatorio que describe el estado vacío',
      control: 'text',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    inline: {
      description:
        'Muestra el contenido en una línea horizontal en lugar de columna',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    compacto: {
      description: 'Reduce el padding vertical de $space-5 a $space-2',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    titulo: {
      description: 'Título opcional que se muestra encima del texto principal',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    icono: {
      description:
        'Icono opcional (IconName) que se muestra con el estado vacío',
      control: 'text',
      table: {
        type: { summary: 'IconName' },
      },
    },
    background: {
      description:
        'Añade fondo con color color/trans/blue-gray-50/8 y borde color/trans/black/8',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    link: {
      description: 'Link opcional con texto y acción (TextButton)',
      control: 'object',
      table: {
        type: { summary: '{ texto: string; onClick: () => void }' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

// Decorador para limitar el ancho y mostrar borde dash en variantes transparentes
const StoryContainer = ({
  children,
  showDashedBorder = false,
}: {
  children: React.ReactNode;
  showDashedBorder?: boolean;
}) => (
  <div
    style={{
      maxWidth: '600px',
      width: '100%',
      border: showDashedBorder ? '2px dashed #d0d0d0' : 'none',
      borderRadius: '8px',
    }}
  >
    {children}
  </div>
);

// Estados básicos
export const Default: Story = {
  args: {
    children: 'No se han encontrado resultados',
  },
  render: (args) => (
    <StoryContainer showDashedBorder>
      <EmptyState {...args} />
    </StoryContainer>
  ),
};

export const ConTitulo: Story = {
  args: {
    titulo: 'Sin resultados',
    children: 'No se encontraron elementos que coincidan con tu búsqueda',
  },
  render: (args) => (
    <StoryContainer showDashedBorder>
      <EmptyState {...args} />
    </StoryContainer>
  ),
};

export const ConIcono: Story = {
  args: {
    icono: 'fileSad',
    children: 'No hay archivos disponibles en este momento',
  },
  render: (args) => (
    <StoryContainer showDashedBorder>
      <EmptyState {...args} />
    </StoryContainer>
  ),
};

export const Completo: Story = {
  args: {
    titulo: 'Lista vacía',
    icono: 'file',
    children:
      'Aún no hay elementos en esta lista. Añade tu primer elemento para comenzar.',
  },
  render: (args) => (
    <StoryContainer showDashedBorder>
      <EmptyState {...args} />
    </StoryContainer>
  ),
};

export const ConLink: Story = {
  args: {
    titulo: 'No hay documentos',
    icono: 'file',
    children: 'Tu biblioteca de documentos está vacía.',
    link: {
      texto: 'Subir primer documento',
      onClick: fn(),
    },
  },
  render: (args) => (
    <StoryContainer showDashedBorder>
      <EmptyState {...args} />
    </StoryContainer>
  ),
};

// Variantes de layout
export const Inline: Story = {
  args: {
    icono: 'search',
    children: 'No se encontraron coincidencias',
    inline: true,
  },
  render: (args) => (
    <StoryContainer showDashedBorder>
      <EmptyState {...args} />
    </StoryContainer>
  ),
};

export const Compacto: Story = {
  args: {
    icono: 'alertTriangle',
    children: 'No hay notificaciones pendientes',
    compacto: true,
  },
  render: (args) => (
    <StoryContainer showDashedBorder>
      <EmptyState {...args} />
    </StoryContainer>
  ),
};

// Con background (sin borde dash)
export const ConBackground: Story = {
  args: {
    titulo: 'Carpeta vacía',
    icono: 'folder',
    children: 'Esta carpeta no contiene ningún archivo',
    background: true,
  },
  render: (args) => (
    <StoryContainer>
      <EmptyState {...args} />
    </StoryContainer>
  ),
};

export const InlineConBackground: Story = {
  args: {
    icono: 'search',
    children: 'Sin resultados para esta búsqueda',
    inline: true,
    background: true,
  },
  render: (args) => (
    <StoryContainer>
      <EmptyState {...args} />
    </StoryContainer>
  ),
};

export const CompactoConBackground: Story = {
  args: {
    icono: 'infoCircle',
    children: 'No hay datos disponibles',
    compacto: true,
    background: true,
  },
  render: (args) => (
    <StoryContainer>
      <EmptyState {...args} />
    </StoryContainer>
  ),
};

export const TodoCompleto: Story = {
  args: {
    titulo: 'No hay tareas pendientes',
    icono: 'check',
    children: '¡Genial! Has completado todas tus tareas.',
    link: {
      texto: 'Crear nueva tarea',
      onClick: fn(),
    },
    background: true,
  },
  render: (args) => (
    <StoryContainer>
      <EmptyState {...args} />
    </StoryContainer>
  ),
};

// Showcase de variantes
export const VariantShowcase: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '2rem',
        maxWidth: '1200px',
      }}
    >
      <div>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem' }}>
          Normal (sin background)
        </h4>
        <div
          style={{
            border: '2px dashed #d0d0d0',
            borderRadius: '8px',
          }}
        >
          <EmptyState icono="file">Sin documentos</EmptyState>
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem' }}>
          Con background
        </h4>
        <EmptyState icono="folder" background>
          Sin documentos
        </EmptyState>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem' }}>Compacto</h4>
        <div
          style={{
            border: '2px dashed #d0d0d0',
            borderRadius: '8px',
          }}
        >
          <EmptyState icono="folder" compacto>
            Sin documentos
          </EmptyState>
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem' }}>
          Compacto con background
        </h4>
        <EmptyState icono="folder" compacto background>
          Sin documentos
        </EmptyState>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem' }}>Inline</h4>
        <div
          style={{
            border: '2px dashed #d0d0d0',
            borderRadius: '8px',
          }}
        >
          <EmptyState icono="file" inline>
            Sin documentos
          </EmptyState>
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem' }}>
          Inline con background
        </h4>
        <EmptyState icono="file" inline background>
          Sin documentos
        </EmptyState>
      </div>
    </div>
  ),
};

// Uso real en tabla
export const EnTabla: Story = {
  render: () => (
    <div style={{ maxWidth: '800px', width: '100%' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          border: '1px solid #e0e0e0',
        }}
      >
        <thead>
          <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
            <th
              style={{
                padding: '12px',
                textAlign: 'left',
                backgroundColor: '#f5f5f5',
              }}
            >
              Nombre
            </th>
            <th
              style={{
                padding: '12px',
                textAlign: 'left',
                backgroundColor: '#f5f5f5',
              }}
            >
              Estado
            </th>
            <th
              style={{
                padding: '12px',
                textAlign: 'left',
                backgroundColor: '#f5f5f5',
              }}
            >
              Fecha
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={3} style={{ padding: 0 }}>
              <EmptyState
                titulo="No hay registros"
                icono="search"
                link={{
                  texto: 'Limpiar filtros',
                  onClick: fn(),
                }}
              >
                No se encontraron resultados que coincidan con los filtros
                aplicados
              </EmptyState>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};
