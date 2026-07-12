import { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';
import type { ComponentProps } from 'react';
import logoAvantius from '../../../assets/images/logoAvantius.svg';
import { CabeceraPrincipal } from './cabecera-principal';
import { CabeceraPrincipalProps } from './cabecera-principal';
import { cabeceraPrincipalDocumentation } from './cabecera-principal.docs';
import { InputSearch } from '../../base/inputs-and-formularios/input-search/input-search';
import { IconButtonShape } from '../../base/icon-button-shape/icon-button-shape';
import { ProcedimientoField } from '../../base/inputs-and-formularios/procedimiento-field/procedimiento-field';
import { CampoMixto } from '../../base/inputs-and-formularios/campo-mixto/campo-mixto';
import { Button } from '../../base/button/button';
import { IconWrapper } from '../../icono/icon-wrapper/icon-wrapper';
import { IndicadorNotificaciones } from '../../indicador-notificaciones/indicador-notificaciones';
import { generateStorybookDocs } from '../../../../.storybook/docs-generator/docs.utils';
import { TextButton } from '../../base/text-button/text-button';
import { BuscadorMenus, BuscadorProcedimientos } from '../../..';
import { menuConfig } from './cabecera-principal.data';

const meta: Meta<CabeceraPrincipalProps> = {
  title: 'Componentes/Navegacion/Cabecera/CabeceraPrincipal',
  component: CabeceraPrincipal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: generateStorybookDocs(cabeceraPrincipalDocumentation),
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    logoProps: {
      description: 'Props para renderizar el logo (url o children)',
      control: 'object',
    },
    title: {
      description: 'Título de la cabecera (aparece después del logo)',
      control: 'text',
    },
    subtitle: {
      description: 'Subtítulo opcional (aparece debajo del título)',
      control: 'text',
    },
    children: {
      description:
        'Contenido flexible del centro (InputSearch, BuscadorMenus, etc.)',
      control: false,
    },
    accionesSlot: {
      description:
        'Slot para acciones/botones en el extremo derecho (notificaciones, perfil, etc.)',
      control: false,
    },
    className: {
      description: 'Clase CSS adicional para personalización',
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<CabeceraPrincipalProps>;

/**
 * Ejemplo básico con logo y título
 */
export const Default: Story = {
  args: {
    logoProps: { url: logoAvantius },
    title: 'Sistema de Justicia',
  },
};

/**
 * Cabecera con título y subtítulo
 */
export const ConTituloYSubtitulo: Story = {
  args: {
    logoProps: { url: logoAvantius },
    title: 'Sistema de Justicia',
    subtitle: 'Departamento de Registro Civil',
  },
};

/**
 * Cabecera minimalista (solo logo, sin contenido)
 */
export const Minimalista: Story = {
  args: {
    logoProps: { url: logoAvantius },
  },
};

/**
 * Logo personalizado con children en lugar de URL
 */
export const LogoConChildren: Story = {
  args: {
    logoProps: {
      children: (
        <img
          src={logoAvantius}
          alt="Logo"
          style={{ maxWidth: '148px', height: 'auto' }}
        />
      ),
    },
    title: 'Mi Aplicación',
  },
};

/**
 * Con input de búsqueda simple
 */
export const ConInputBusqueda: Story = {
  args: {
    logoProps: { url: logoAvantius },
    title: 'Sistema de Justicia',
    children: (
      <InputSearch
        placeholder="Buscar documentos..."
        onChange={action('input-change')}
      />
    ),
    accionesSlot: (
      <>
        <IconButtonShape
          icon="bell"
          size="lg"
          shape="circle"
          onClick={action('bell-click')}
          aria-label="Notificaciones"
        />
        <IconButtonShape
          icon="user"
          size="lg"
          shape="circle"
          onClick={action('user-click')}
          aria-label="Perfil de usuario"
        />
      </>
    ),
  },
};

/**
 * Con búsqueda de procedimiento
 */
export const ConBusquedaProcedimiento: Story = {
  render: () => {
    const handleBuscar = action('onBuscar');
    const handleProfile = action('profile-clicked');
    const handleNotifications = action('notifications-clicked');
    return (
      <CabeceraPrincipal
        logoProps={{ url: logoAvantius }}
        title="Sistema de Tramitación"
        subtitle="Gestión de Expedientes"
        accionesSlot={
          <>
            <IconButtonShape
              icon="bell"
              variant="secondary"
              shape="circle"
              size="lg"
              onClick={handleNotifications}
              aria-label="Notificaciones"
            />
            <IconButtonShape
              icon="menuCabecera"
              variant="secondary"
              shape="circle"
              size="lg"
              onClick={handleProfile}
              aria-label="Perfil de usuario"
            />
          </>
        }
      >
        <BuscadorProcedimientos
          onBuscar={handleBuscar}
          userId={1}
          organoId={1}
          variant="outline"
        />
      </CabeceraPrincipal>
    );
  },
};

/**
 * NOTA: Las configuraciones específicas de Avantius y PSP ahora tienen
 * sus propios componentes con fachadas simplificadas:
 * - Ver "CabeceraAvantius" en Componentes/Navegacion/Cabecera/CabeceraAvantius
 * - Ver "CabeceraPSP" en Componentes/Navegacion/Cabecera/CabeceraPSP
 * - Ver "CabeceraEstandar" para casos comunes cross-app
 *
 * Los ejemplos a continuación demuestran la flexibilidad del componente base
 * y cómo crear configuraciones personalizadas cuando sea necesario.
 */

/**
 * Con botón "Atrás" en lugar de logo (patrón común en navegación interna)
 */
export const ConBotonAtras: Story = {
  args: {
    logoProps: {
      children: (
        <button
          onClick={action('back-click')}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            display: 'flex',
            alignItems: 'center',
            color: 'white',
          }}
          aria-label="Volver"
        >
          <IconWrapper icono="chevronLeft" size="xl" stroke={1} />
        </button>
      ),
    },
    title: 'Detalle del Expediente',
    subtitle: 'Expediente #0012345 / 2024',
    accionesSlot: (
      <IconButtonShape
        icon="menuCabecera"
        size="lg"
        shape="circle"
        onClick={action('menu-click')}
        aria-label="Menú"
      />
    ),
  },
};

/**
 * Contenido complejo con múltiples elementos
 */
export const ContenidoComplejo: Story = {
  args: {
    logoProps: { url: logoAvantius },
    title: 'Portal Administrativo',
    subtitle: 'Gestión Centralizada',
    children: (
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <InputSearch placeholder="Buscar..." style={{ minWidth: 180 }} />
        <Button variant="secundario" onClick={action('filtros')}>
          Filtros
        </Button>
        <TextButton onClick={action('exportar')}>Exportar</TextButton>
      </div>
    ),
    accionesSlot: (
      <>
        <IconButtonShape
          icon="bell"
          size="lg"
          shape="circle"
          onClick={action('bell')}
          aria-label="Notificaciones"
        />
        <IconButtonShape
          icon="scriptPlus"
          size="lg"
          shape="circle"
          onClick={action('settings')}
          aria-label="Configuración"
        />
        <IconButtonShape
          icon="user"
          size="lg"
          shape="circle"
          onClick={action('user')}
          aria-label="Perfil"
        />
      </>
    ),
  },
};
