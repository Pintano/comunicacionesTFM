import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '../base/inputs-and-formularios/input/input';
import { Button } from '../base/button/button';
import { BarraHerramientas } from './barra-herramientas';
import { ProcedimientoField } from '../base/inputs-and-formularios/procedimiento-field/procedimiento-field';

const meta: Meta = {
  title: 'Componentes/Navegacion/Barra de herramientas',
  component: BarraHerramientas,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof BarraHerramientas>;

export const Predeterminado: Story = {
  args: {
    left: <Input placeholder="Escribe aquí..." style={{ width: '200px' }} />,
    children: (
      <>
        <ProcedimientoField
          soloLectura={false}
          onChange={() => console.log('')}
        />
        <Button size="small">Buscar</Button>
      </>
    ),
  },
};
