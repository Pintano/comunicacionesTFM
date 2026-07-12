import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButtonShape } from './icon-button-shape';
import { iconButtonShapeDocumentation } from './icon-button-shape.docs';
import { generateStorybookDocs } from '../../../../.storybook/docs-generator/docs.utils';

const meta: Meta<typeof IconButtonShape> = {
  title: 'Componentes/Acciones & Controles/IconButtonShape',
  component: IconButtonShape,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: generateStorybookDocs(iconButtonShapeDocumentation),
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    shape: {
      control: { type: 'select' },
      options: ['circle', 'square'],
    },
    size: {
      control: { type: 'select' },
      options: ['md', 'lg'],
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'quaternary'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButtonShape>;

// Básicas - Por forma y variante
export const CirclePrimary: Story = {
  name: 'Circle - Primary',
  args: {
    icon: 'plus',
    shape: 'circle',
    variant: 'primary',
    'aria-label': 'Añadir',
  },
};

export const DisabledPrimary: Story = {
  name: 'Disabled - Primary',
  args: {
    icon: 'trash',
    shape: 'circle',
    variant: 'primary',
    disabled: true,
    'aria-label': 'Eliminar (deshabilitado)',
  },
};

export const CircleSecondary: Story = {
  name: 'Circle - Secondary',
  args: {
    icon: 'edit',
    shape: 'circle',
    variant: 'secondary',
    'aria-label': 'Editar',
  },
};

export const DisabledSecondary: Story = {
  name: 'Disabled - Secondary',
  args: {
    icon: 'trash',
    shape: 'circle',
    variant: 'secondary',
    disabled: true,
    'aria-label': 'Eliminar (deshabilitado)',
  },
};

export const CircleTertiary: Story = {
  name: 'Circle - Tertiary',
  args: {
    icon: 'album',
    shape: 'circle',
    variant: 'tertiary',
    'aria-label': 'Información',
  },
};

export const DisabledTertiary: Story = {
  name: 'Disabled - Tertiary',
  args: {
    icon: 'trash',
    shape: 'circle',
    variant: 'tertiary',
    disabled: true,
    'aria-label': 'Eliminar (deshabilitado)',
  },
};

export const CircleQuaternary: Story = {
  name: 'Circle - Quaternary',
  args: {
    icon: 'close',
    shape: 'circle',
    variant: 'quaternary',
    'aria-label': 'Cerrar',
  },
};

export const DisabledQuaternary: Story = {
  name: 'Disabled - Quaternary',
  args: {
    icon: 'trash',
    shape: 'circle',
    variant: 'quaternary',
    disabled: true,
    'aria-label': 'Eliminar (deshabilitado)',
  },
};

export const SquarePrimary: Story = {
  name: 'Square - Primary',
  args: {
    icon: 'userCog',
    shape: 'square',
    variant: 'primary',
    'aria-label': 'Configuración',
  },
};

export const SquareSecondary: Story = {
  name: 'Square - Secondary',
  args: {
    icon: 'arrowDown',
    shape: 'square',
    variant: 'secondary',
    'aria-label': 'Descargar',
  },
};

export const SquareTertiary: Story = {
  name: 'Square - Tertiary',
  args: {
    icon: 'calendarSearch',
    shape: 'square',
    variant: 'tertiary',
    'aria-label': 'Buscar',
  },
};

export const SquareQuaternary: Story = {
  name: 'Square - Quaternary',
  args: {
    icon: 'fileCertificate',
    shape: 'square',
    variant: 'quaternary',
    'aria-label': 'Documento',
  },
};

// Tamaños
export const SizeMedium: Story = {
  name: 'Size - Medium (default)',
  args: {
    icon: 'edit',
    shape: 'circle',
    size: 'md',
    'aria-label': 'Editar',
  },
};

export const SizeLarge: Story = {
  name: 'Size - Large',
  args: {
    icon: 'plus',
    shape: 'circle',
    size: 'lg',
    'aria-label': 'Crear',
  },
};

// Casos de uso
export const UseCaseFAB: Story = {
  name: 'Uso - FAB',
  args: {
    icon: 'plus',
    shape: 'circle',
    size: 'lg',
    variant: 'primary',
    'aria-label': 'Crear nuevo',
  },
  parameters: {
    docs: {
      description: {
        story: 'Floating Action Button para la acción principal.',
      },
    },
  },
};

export const UseCaseSettings: Story = {
  name: 'Uso - Configuración',
  args: {
    icon: 'userCog',
    shape: 'square',
    variant: 'tertiary',
    'aria-label': 'Configuración',
  },
  parameters: {
    docs: {
      description: {
        story: 'Botón de configuración con estilo sutil.',
      },
    },
  },
};

export const UseCaseEdit: Story = {
  name: 'Uso - Editar',
  args: {
    icon: 'edit',
    shape: 'circle',
    variant: 'secondary',
    'aria-label': 'Editar',
  },
  parameters: {
    docs: {
      description: {
        story: 'Botón de edición estándar.',
      },
    },
  },
};

export const UseCaseClose: Story = {
  name: 'Uso - Cerrar',
  args: {
    icon: 'close',
    shape: 'circle',
    variant: 'quaternary',
    'aria-label': 'Cerrar',
  },
  parameters: {
    docs: {
      description: {
        story: 'Botón para cerrar overlays o modales.',
      },
    },
  },
};

// Comparación visual
export const AllShapesAndVariants: Story = {
  name: 'Comparación - Todas las variantes',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '16px',
        alignItems: 'center',
      }}
    >
      {/* Headers */}
      <div></div>
      <div style={{ textAlign: 'center', fontWeight: 'bold' }}>Primary</div>
      <div style={{ textAlign: 'center', fontWeight: 'bold' }}>Secondary</div>
      <div style={{ textAlign: 'center', fontWeight: 'bold' }}>Tertiary</div>
      <div style={{ textAlign: 'center', fontWeight: 'bold' }}>Quaternary</div>

      {/* Circle */}
      <div style={{ fontWeight: 'bold' }}>Circle</div>
      <IconButtonShape
        icon="plus"
        shape="circle"
        variant="primary"
        aria-label="Add"
      />
      <IconButtonShape
        icon="plus"
        shape="circle"
        variant="secondary"
        aria-label="Add"
      />
      <IconButtonShape
        icon="plus"
        shape="circle"
        variant="tertiary"
        aria-label="Add"
      />
      <IconButtonShape
        icon="plus"
        shape="circle"
        variant="quaternary"
        aria-label="Add"
      />

      {/* Square */}
      <div style={{ fontWeight: 'bold' }}>Square</div>
      <IconButtonShape
        icon="userCog"
        shape="square"
        variant="primary"
        aria-label="Settings"
      />
      <IconButtonShape
        icon="userCog"
        shape="square"
        variant="secondary"
        aria-label="Settings"
      />
      <IconButtonShape
        icon="userCog"
        shape="square"
        variant="tertiary"
        aria-label="Settings"
      />
      <IconButtonShape
        icon="userCog"
        shape="square"
        variant="quaternary"
        aria-label="Settings"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Comparación visual de todas las combinaciones de formas y variantes disponibles.',
      },
    },
  },
};
