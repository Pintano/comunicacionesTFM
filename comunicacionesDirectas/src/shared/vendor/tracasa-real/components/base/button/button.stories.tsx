import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within } from '@storybook/testing-library';

import { Button } from './button';
import type { ButtonProps } from './button';
import { expect } from 'storybook/test';
import { buttonDocumentation } from './button.docs';
import { generateStorybookDocs } from '../../../../.storybook/docs-generator/docs.utils';

const meta: Meta<ButtonProps> = {
  title: 'Componentes/Acciones & Controles/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: generateStorybookDocs(buttonDocumentation),
      },
    },
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Principal: Story = {
  args: {
    variant: 'principal',
    children: 'Botón principal',
    disabled: false,
  },
};
export const PrincipalDisabled: Story = {
  args: {
    variant: 'principal',
    children: 'Botón disabled',
    disabled: true,
  },
};
export const PrincipalLarge: Story = {
  args: {
    variant: 'principal',
    children: 'Botón large',
    disabled: false,
    size: 'large',
  },
};
export const PrincipalSmall: Story = {
  args: {
    variant: 'principal',
    children: 'Botón small',
    disabled: false,
    size: 'small',
  },
};

export const Secundario: Story = {
  args: {
    variant: 'secundario',
    children: 'Botón secundario',
    disabled: false,
  },
};
export const SecundarioDisabled: Story = {
  args: {
    variant: 'secundario',
    children: 'Botón secundario disabled',
    disabled: true,
  },
};
export const SecundarioLarge: Story = {
  args: {
    variant: 'secundario',
    children: 'Botón secundario large',
    disabled: false,
    size: 'large',
  },
};
export const SecundarioSmall: Story = {
  args: {
    variant: 'secundario',
    children: 'Botón secundario small',
    disabled: false,
    size: 'small',
  },
};

export const Opciones: Story = {
  args: {
    variant: 'principal',
    conOpciones: true,
    children: 'Botón con opciones',
    disabled: false,
    opciones: [
      { text: 'Opción corta', onClick() {} },
      { text: 'Opción de botón bastante larga ', onClick() {} },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const mainButton = await canvas.getByRole('button', {
      name: 'Botón con opciones',
    });

    // Click para desplegar las opciones
    await userEvent.click(mainButton);

    // Validamos que aparece la primera opción
    const opcion1 = await canvas.findByRole('button', { name: 'Opción corta' });
    expect(opcion1).toBeVisible();

    // Simulamos clic en la opción
    await userEvent.click(opcion1);
  },
};

export const OpcionesSecundario: Story = {
  args: {
    variant: 'secundario',
    conOpciones: true,
    children: 'Botón secundario con opciones',
    disabled: false,
    opciones: [
      { text: 'Opción corta', onClick() {} },
      { text: 'Opción de botón bastante larga ', onClick() {} },
    ],
  },
};

export const OpcionesDisabled: Story = {
  args: {
    variant: 'principal',
    conOpciones: true,
    children: 'Botón con opciones disabled',
    disabled: true,
    opciones: [
      { text: 'Opción corta', onClick() {} },
      { text: 'Opción de botón bastante larga ', onClick() {} },
    ],
  },
};

export const OpcionesLarge: Story = {
  args: {
    variant: 'principal',
    conOpciones: true,
    children: 'Botón con opciones large',
    disabled: false,
    size: 'large',
    opciones: [
      { text: 'Opción corta', onClick() {} },
      { text: 'Opción de botón bastante larga ', onClick() {} },
    ],
  },
};

export const OpcionesSmall: Story = {
  args: {
    variant: 'principal',
    conOpciones: true,
    children: 'Botón con opciones small',
    disabled: false,
    size: 'small',
    opciones: [
      { text: 'Opción corta', onClick() {} },
      { text: 'Opción de botón bastante larga ', onClick() {} },
    ],
  },
};
