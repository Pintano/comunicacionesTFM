import { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps, PropsWithChildren, ReactNode } from 'react';
import logoAvantius from '../../../assets/images/logoAvantius.svg';
import { CabeceraLogo } from './cabecera-logo';

type CabeceraLogoProps = ComponentProps<typeof CabeceraLogo>;

const meta: Meta<CabeceraLogoProps> = {
  title: 'Componentes/Navegacion/Cabecera/CabeceraLogo',
  component: CabeceraLogo,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<CabeceraLogoProps>;

const LogoWrapper = ({ children }: PropsWithChildren) => (
  <div
    style={{
      width: '300px',
      height: '100px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.2)',
      padding: '4px',
      boxSizing: 'border-box',
    }}
  >
    {children}
  </div>
);

const LogoExample = () => (
  <img
    src={logoAvantius}
    alt="Logo"
    style={{ maxWidth: '100%', height: 'auto' }}
  />
);

export const ConLogo: Story = {
  args: {
    children: <LogoExample />,
  },
  render: (args: CabeceraLogoProps) => (
    <LogoWrapper>
      <CabeceraLogo {...args} />
    </LogoWrapper>
  ),
};

export const ConUrl: Story = {
  args: {
    url: logoAvantius,
  },
  render: (args: CabeceraLogoProps) => (
    <LogoWrapper>
      <CabeceraLogo {...args} />
    </LogoWrapper>
  ),
};

export const ConUrlYCustomSize: Story = {
  args: {
    url: logoAvantius,
    height: '60px',
    width: '220px',
  },
  render: (args: CabeceraLogoProps) => (
    <LogoWrapper>
      <CabeceraLogo {...args} />
    </LogoWrapper>
  ),
};
