import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Checkbox } from './checkbox';
import type { CheckBoxProps } from './checkbox';
import { checkboxDocumentation } from './checkbox.docs';
import { generateStorybookDocs } from '../../../../../.storybook/docs-generator/docs.utils';

const meta: Meta<CheckBoxProps> = {
  title: 'Componentes/Inputs & Formularios/Checkbox/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: generateStorybookDocs(checkboxDocumentation),
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    checkboxSize: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Tamaño del checkbox',
      table: {
        defaultValue: { summary: 'small' },
      },
    },
    checked: {
      control: 'boolean',
      description: 'Si el checkbox está marcado',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Si el checkbox está en estado indeterminado',
    },
    disabled: {
      control: 'boolean',
      description: 'Si el checkbox está deshabilitado',
    },
    readOnly: {
      control: 'boolean',
      description: 'Si el checkbox es de solo lectura',
    },
    error: {
      control: 'boolean',
      description: 'Si el checkbox está en estado de error',
    },
    texto: {
      control: 'text',
      description: 'Texto de la etiqueta del checkbox',
    },
    textoAccesibilidad: {
      control: 'text',
      description: 'Etiqueta de accesibilidad para lectores de pantalla',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<CheckBoxProps>;

// Default story
export const Default: Story = {
  args: {
    textoAccesibilidad: 'Default checkbox',
    texto: 'Accept terms and conditions',
  },
};

// Basic states
export const Checked: Story = {
  args: {
    checked: true,
    textoAccesibilidad: 'Checked checkbox',
    texto: 'Already accepted',
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    textoAccesibilidad: 'Indeterminate checkbox',
    texto: 'Partially selected',
  },
};

export const WithoutText: Story = {
  args: {
    textoAccesibilidad: 'Checkbox without visible text',
  },
};

export const WithLongText: Story = {
  args: {
    textoAccesibilidad: 'Checkbox with long visible text',
    texto:
      'This is a checkbox with a very long text to test how it behaves in the layout when the text exceeds the usual length expected for a checkbox label. Box should be aligned at the top of the text.',
  },
};

// Sizes showcase
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <Checkbox
          checkboxSize="small"
          textoAccesibilidad="Small checkbox"
          texto="Small"
        />
        <span style={{ fontSize: '0.75rem', color: '#666' }}>Small</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <Checkbox
          checkboxSize="medium"
          textoAccesibilidad="Medium checkbox"
          texto="Medium"
        />
        <span style={{ fontSize: '0.75rem', color: '#666' }}>Medium</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <Checkbox
          checkboxSize="large"
          textoAccesibilidad="Large checkbox"
          texto="Large"
        />
        <span style={{ fontSize: '0.75rem', color: '#666' }}>Large</span>
      </div>
    </div>
  ),
};

// State variations
export const Disabled: Story = {
  args: {
    disabled: true,
    textoAccesibilidad: 'Disabled checkbox',
    texto: 'Cannot be changed',
    checkboxSize: 'medium',
  },
};

export const CheckedDisabled: Story = {
  args: {
    disabled: true,
    checked: true,
    textoAccesibilidad: 'Checked disabled checkbox',
    texto: 'Cannot be changed',
    checkboxSize: 'medium',
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    checked: true,
    textoAccesibilidad: 'Read-only checkbox',
    texto: 'Read-only state',
    checkboxSize: 'medium',
  },
};

export const Error: Story = {
  args: {
    error: true,
    textoAccesibilidad: 'Error checkbox',
    texto: 'This field is required',
    checkboxSize: 'medium',
  },
};

export const ErrorChecked: Story = {
  args: {
    error: true,
    textoAccesibilidad: 'Error checkbox',
    texto: 'This field is required',
    checkboxSize: 'medium',
    checked: true,
  },
};

export const ErrorDisabled: Story = {
  args: {
    error: true,
    textoAccesibilidad: 'Error disabled checkbox',
    texto: 'This field is required',
    checkboxSize: 'medium',
    disabled: true,
  },
};

export const ErrorCheckedDisabled: Story = {
  args: {
    error: true,
    textoAccesibilidad: 'Error disabled checkbox',
    texto: 'This field is required',
    checkboxSize: 'medium',
    checked: true,
    disabled: true,
  },
};

// Combined states showcase
export const StateShowcase: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
        minWidth: '600px',
      }}
    >
      <div>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem' }}>Normal</h4>
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
          <Checkbox textoAccesibilidad="Unchecked" texto="Unchecked" />
          <Checkbox checked textoAccesibilidad="Checked" texto="Checked" />
          <Checkbox
            indeterminate
            textoAccesibilidad="Indeterminate"
            texto="Indeterminate"
          />
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem' }}>Disabled</h4>
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
          <Checkbox
            disabled
            textoAccesibilidad="Disabled unchecked"
            texto="Disabled"
          />
          <Checkbox
            disabled
            checked
            textoAccesibilidad="Disabled checked"
            texto="Disabled checked"
          />
          <Checkbox
            disabled
            indeterminate
            textoAccesibilidad="Disabled indeterminate"
            texto="Disabled indeterminate"
          />
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem' }}>Error</h4>
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
          <Checkbox
            error
            textoAccesibilidad="Error unchecked"
            texto="Error state"
          />
          <Checkbox
            error
            checked
            textoAccesibilidad="Error checked"
            texto="Error checked"
          />
          <Checkbox
            error
            indeterminate
            textoAccesibilidad="Error indeterminate"
            texto="Error indeterminate"
          />
        </div>
      </div>
    </div>
  ),
};

// Interactive examples
export const InteractiveForm: Story = {
  render: () => {
    const [formState, setFormState] = React.useState({
      terms: false,
      newsletter: true,
      notifications: 'partial' as 'partial' | boolean,
    });

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          minWidth: '300px',
        }}
      >
        <h4 style={{ margin: '0 0 1rem 0' }}>Interactive Form Example</h4>

        <Checkbox
          checked={formState.terms}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, terms: e.target.checked }))
          }
          textoAccesibilidad="Accept terms and conditions"
          texto="I accept the terms and conditions"
          error={!formState.terms}
        />

        <Checkbox
          checked={formState.newsletter}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, newsletter: e.target.checked }))
          }
          textoAccesibilidad="Subscribe to newsletter"
          texto="Subscribe to our newsletter"
        />

        <Checkbox
          indeterminate={formState.notifications === 'partial'}
          checked={formState.notifications === true}
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              notifications:
                prev.notifications === 'partial' ? true : e.target.checked,
            }))
          }
          textoAccesibilidad="Email notifications"
          texto="Email notifications (some enabled)"
        />
      </div>
    );
  },
};
