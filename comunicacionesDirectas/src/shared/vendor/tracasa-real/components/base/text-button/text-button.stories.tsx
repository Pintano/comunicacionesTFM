import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconDownload, IconExternalLink } from '@tabler/icons-react';
import { TextButton } from './text-button';
import { fn } from 'storybook/test';
import { textButtonDocumentation } from './text-button.docs';
import { generateStorybookDocs } from '../../../../.storybook/docs-generator/docs.utils';

const meta: Meta<typeof TextButton> = {
  title: 'Componentes/Acciones & Controles/TextButton',
  component: TextButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: generateStorybookDocs(textButtonDocumentation),
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'unstyled'],
      description:
        'Variante visual: primary (terciario), secondary (cuaternario), unstyled (sin estilos)',
    },
    size: {
      control: 'select',
      options: ['default', 'small'],
      description: 'Tamaño del botón (no aplica a unstyled)',
    },
    disabled: {
      control: 'boolean',
      description: 'Estado deshabilitado',
    },
    icono: {
      control: 'text',
      description: 'Icono opcional',
    },
  },
  args: {
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof TextButton>;

export const Primary: Story = {
  args: {
    children: 'Ver más detalles',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Ver más detalles',
    variant: 'secondary',
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Ir a la página',
    variant: 'primary',
    icono: 'arrowRight',
  },
};

export const WithIconSecondary: Story = {
  args: {
    children: 'Descargar archivo',
    variant: 'secondary',
    icono: 'download',
  },
};

export const Small: Story = {
  args: {
    children: 'Texto pequeño',
    variant: 'primary',
    size: 'small',
  },
};

export const SmallWithIcon: Story = {
  args: {
    children: 'Ver detalles',
    variant: 'primary',
    size: 'small',
    icono: 'eyeCheck',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Acción no disponible',
    variant: 'primary',
    disabled: true,
  },
};

export const DisabledWithIcon: Story = {
  args: {
    children: 'Acción no disponible',
    variant: 'primary',
    disabled: true,
    icono: 'close',
  },
};

export const DisabledSecondary: Story = {
  args: {
    children: 'Acción no disponible',
    variant: 'secondary',
    disabled: true,
  },
};

// ===== Unstyled Variant Stories =====

export const Unstyled: Story = {
  args: {
    children: 'Click me',
    variant: 'unstyled',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Variante sin estilos que hereda color y fuente del contexto padre. Ideal para elementos inline.',
      },
    },
  },
};

export const UnstyledWithIcon: Story = {
  render: () => (
    <TextButton
      variant="unstyled"
      onClick={() => alert('Downloaded')}
      aria-label="Descargar archivo"
    >
      <IconDownload size={16} />
    </TextButton>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Botón unstyled con solo icono. Requiere aria-label explícito.',
      },
    },
  },
};

export const UnstyledInText: Story = {
  render: () => (
    <p style={{ fontSize: '16px', color: '#333' }}>
      Este es un párrafo con un{' '}
      <TextButton variant="unstyled" onClick={() => alert('Clicked!')}>
        botón inline
      </TextButton>{' '}
      que hereda los estilos del texto.
    </p>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'TextButton unstyled se integra perfectamente en texto corrido, heredando tamaño y color.',
      },
    },
  },
};

export const UnstyledInList: Story = {
  render: () => (
    <div style={{ fontFamily: 'system-ui', fontSize: '14px' }}>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
          <TextButton variant="unstyled" onClick={() => alert('Item 1')}>
            <IconExternalLink size={14} style={{ marginRight: '4px' }} />
            Archivo 1.pdf
          </TextButton>
        </li>
        <li style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
          <TextButton variant="unstyled" onClick={() => alert('Item 2')}>
            <IconExternalLink size={14} style={{ marginRight: '4px' }} />
            Archivo 2.pdf
          </TextButton>
        </li>
        <li style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
          <TextButton variant="unstyled" onClick={() => alert('Item 3')}>
            <IconExternalLink size={14} style={{ marginRight: '4px' }} />
            Archivo 3.pdf
          </TextButton>
        </li>
      </ul>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Ejemplo de uso en listas donde necesitamos elementos clickeables sin apariencia de botón.',
      },
    },
  },
};

export const UnstyledWithCustomStyling: Story = {
  render: () => (
    <>
      <style>{`
        .custom-text-button {
          color: #e74c3c;
          text-decoration: underline;
          font-weight: 600;
        }
        .custom-text-button:hover {
          color: #c0392b;
        }
      `}</style>
      <TextButton
        variant="unstyled"
        className="custom-text-button"
        onClick={() => alert('Custom styled')}
      >
        Styled button
      </TextButton>
    </>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'TextButton unstyled puede recibir estilos personalizados a través de className.',
      },
    },
  },
};

export const TruncatedContent: Story = {
  render: () => (
    <div
      style={{
        width: '240px',
        border: '1px solid #eee',
        borderRadius: '4px',
        padding: '8px',
      }}
    >
      <TextButton
        onClick={() => alert('Clicked')}
        title="Este es un texto extremadamente largo que debería truncarse con puntos suspensivos cuando no hay suficiente espacio para mostrarlo completo y debe mostrar '...' al final para indicar que está truncado"
      >
        Este es un texto extremadamente largo que debería truncarse con puntos
        suspensivos cuando no hay suficiente espacio para mostrarlo completo y
        debe mostrar '...' al final para indicar que está truncado
      </TextButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Demuestra el comportamiento de truncado (text-overflow: ellipsis) cuando el contenido del TextButton es demasiado largo para el contenedor.',
      },
    },
  },
};

// ===== Comparison Stories =====

export const AllVariants: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <TextButton
            variant="primary"
            onClick={() => alert('Primary clicked')}
          >
            Primary
          </TextButton>
          <TextButton
            variant="secondary"
            onClick={() => alert('Secondary clicked')}
          >
            Secondary
          </TextButton>
          <TextButton
            variant="unstyled"
            onClick={() => alert('Unstyled clicked')}
          >
            Unstyled
          </TextButton>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <TextButton
            variant="primary"
            icono="arrowRight"
            onClick={() => alert('With icon clicked')}
          >
            Con icono
          </TextButton>
          <TextButton
            variant="secondary"
            icono="download"
            onClick={() => alert('With icon clicked')}
          >
            Con icono
          </TextButton>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <TextButton
            variant="primary"
            size="small"
            onClick={() => alert('Small clicked')}
          >
            Small
          </TextButton>
          <TextButton
            variant="secondary"
            size="small"
            onClick={() => alert('Small clicked')}
          >
            Small
          </TextButton>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <TextButton variant="primary" disabled onClick={() => {}}>
            Disabled
          </TextButton>
          <TextButton variant="secondary" disabled onClick={() => {}}>
            Disabled
          </TextButton>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            width: '200px',
          }}
        >
          <TextButton
            variant="primary"
            disabled
            onClick={() => {}}
            title="This is a very long text button content that should be truncated with ellipsis"
          >
            This is a very long text button content that should be truncated
            with ellipsis
          </TextButton>
          <TextButton
            variant="secondary"
            disabled
            onClick={() => {}}
            title="This is a very long text button content that should be truncated with ellipsis"
          >
            This is a very long text button content that should be truncated
            with ellipsis
          </TextButton>
          <TextButton
            variant="unstyled"
            onClick={() => {}}
            title="This is a very long text button content that should be truncated with ellipsis"
          >
            This is a very long text button content that should be truncated
            with ellipsis
          </TextButton>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Comparación de todas las variantes disponibles.',
      },
    },
  },
};
