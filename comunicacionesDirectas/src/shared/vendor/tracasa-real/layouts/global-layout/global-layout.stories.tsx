import type { Meta, StoryObj } from '@storybook/react/*';
import { GlobalLayout } from './global-layout';
import type { GlobalLayoutProps } from './global-layout';
import { Cabecera } from '../../components/cabecera/cabecera';

const meta: Meta<GlobalLayoutProps> = {
  title: 'Layouts/GlobalLayout',
  component: GlobalLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

export const Predeterminado: StoryObj<typeof GlobalLayout> = {
  render: () => (
    <GlobalLayout>
      <Cabecera>
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          Cabecera
        </div>
      </Cabecera>
      <div
        style={{
          height: '130px',
          width: '100%',
          backgroundColor: 'lightblue',
          position: 'relative',
          alignItems: 'center',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        Reborn
      </div>
      <div
        style={{
          flex: '1',
          width: '100%',
          backgroundColor: '#ebeaea',
          position: 'relative',
          alignItems: 'center',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        Contenido página
      </div>
    </GlobalLayout>
  ),
};
