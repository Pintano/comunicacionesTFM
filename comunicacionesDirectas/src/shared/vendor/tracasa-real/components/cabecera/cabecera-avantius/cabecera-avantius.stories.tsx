import { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';
import logoAvantius from '../../../assets/images/logoAvantius.svg';
import { CabeceraAvantius } from './cabecera-avantius';
import { CabeceraAvantiusProps } from './cabecera-avantius';
import { cabeceraAvantiusDocumentation } from './cabecera-avantius.docs';
import { generateStorybookDocs } from '../../../../.storybook/docs-generator/docs.utils';
import { menuConfig } from '../cabecera-principal/cabecera-principal.data';

const meta: Meta<CabeceraAvantiusProps> = {
  title:
    'Componentes/Navegacion/Cabecera/CabecerasEspecíficas/CabeceraAvantius',
  component: CabeceraAvantius,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: generateStorybookDocs(cabeceraAvantiusDocumentation),
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    logoUrl: {
      description: 'URL del logo de Avantius',
      control: 'text',
    },
    logoElement: {
      description: 'Elemento personalizado para el logo',
      control: false,
    },
    title: {
      description: 'Título de la aplicación (default: "Avantius")',
      control: 'text',
    },
    subtitle: {
      description: 'Subtítulo opcional',
      control: 'text',
    },
    menuConfig: {
      description: 'Configuración de menús para BuscadorMenus (OBLIGATORIO)',
      control: 'object',
    },
    menuSearchPlaceholder: {
      description: 'Placeholder del buscador de menús',
      control: 'text',
    },
    onBuscarProcedimiento: {
      description: 'Handler para búsqueda de procedimientos',
      action: 'buscar-procedimiento',
    },

    userId: {
      description: 'ID de usuario',
      control: 'text',
    },
    organoId: {
      description: 'ID de órgano',
      control: 'text',
    },
    notificacionesCount: {
      description: 'Número de notificaciones pendientes',
      control: 'number',
    },
    onNotificacionesClick: {
      description: 'Handler para click en notificaciones',
      action: 'notificaciones-click',
    },
    notificacionesTooltip: {
      description: 'Tooltip del indicador de notificaciones',
      control: 'text',
    },
    onMenuPerfilClick: {
      description: 'Handler para click en menú de perfil',
      action: 'menu-perfil-click',
    },
    className: {
      description: 'Clase CSS adicional',
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<CabeceraAvantiusProps>;

/**
 * Configuración típica de Avantius con todas las funcionalidades
 */
export const Default: Story = {
  args: {
    logoUrl: logoAvantius,
    title: 'Avantius',
    subtitle: 'Portal Administrativo',
    menuConfig,
    onBuscarProcedimiento: action('buscar-procedimiento'),
    notificacionesCount: 3,
    onNotificacionesClick: action('notificaciones-click'),
    onMenuPerfilClick: action('menu-perfil-click'),
    userId: 1,
    organoId: 1,
    mostrarAccionesTramitacion: true
  },
};

/**
 * Configuración mínima - Solo menús (sin búsqueda ni notificaciones)
 */
export const Minima: Story = {
  args: {
    menuConfig,
    // Mostrar la configuración mínima; desactivamos búsquedas y notificaciones explícitamente
    onBuscarProcedimiento: undefined,
    notificacionesCount: undefined,
    onNotificacionesClick: undefined,
    onMenuPerfilClick: undefined,
    mostrarAccionesTramitacion: true
  },
};

/**
 * Con logo y título personalizados
 */
export const Personalizada: Story = {
  args: {
    logoUrl: logoAvantius,
    title: 'Avantius Pro',
    subtitle: 'Edición Profesional',
    menuConfig,
    onNotificacionesClick: action('notificaciones-click'),
    onMenuPerfilClick: action('menu-perfil-click'),
    mostrarAccionesTramitacion: true
  },
};

/**
 * Con notificaciones pendientes
 */
export const ConNotificaciones: Story = {
  args: {
    logoUrl: logoAvantius,
    title: 'Avantius',
    menuConfig,
    notificacionesCount: 12,
    onNotificacionesClick: action('notificaciones-click'),
    notificacionesTooltip: 'Tienes 12 notificaciones pendientes',
    onMenuPerfilClick: action('menu-perfil-click'),
    // Sin buscador de procedimientos en esta variante
    onBuscarProcedimiento: undefined,
    mostrarAccionesTramitacion: true
  },
};

/**
 * Con búsqueda de procedimientos completa
 */
export const ConBusquedaProcedimientos: Story = {
  args: {
    logoUrl: logoAvantius,
    title: 'Avantius',
    subtitle: 'Gestión de Expedientes',
    menuConfig,
    onBuscarProcedimiento: action('buscar-procedimiento'),
    userId: 1,
    organoId: 1,
    // Variante centrada en búsqueda: sin notificaciones ni menú de perfil
    onNotificacionesClick: undefined,
    onMenuPerfilClick: undefined,
    mostrarAccionesTramitacion: true
  },
};

/**
 * Sin búsqueda de procedimientos (solo BuscadorMenus)
 */
export const SoloBuscadorMenus: Story = {
  args: {
    logoUrl: logoAvantius,
    title: 'Avantius Light',
    menuConfig,
    menuSearchPlaceholder: 'Buscar funcionalidades...',
    // Sin onBuscarProcedimiento → no se muestra el segundo buscador
    onNotificacionesClick: action('notificaciones-click'),
    onMenuPerfilClick: action('menu-perfil-click'),
    mostrarAccionesTramitacion: true
  },
};

export const MuchasNotificaciones: Story = {
  args: {
    logoUrl: logoAvantius,
    title: 'Avantius',
    menuConfig,
    notificacionesCount: 199,
    onNotificacionesClick: action('notificaciones-click'),
    notificacionesTooltip: '¡Tienes muchas notificaciones!',
    onMenuPerfilClick: action('menu-perfil-click'),
    mostrarAccionesTramitacion: true
  },
};

export const LogoPersonalizado: Story = {
  args: {
    logoElement: (
      <div
        style={{
          width: 180,
          height: 44,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ color: 'white', fontWeight: 700, fontSize: 16 }}>
          AVANTIUS
        </span>
      </div>
    ),
    title: 'Avantius Custom',
    menuConfig,
    onNotificacionesClick: action('notificaciones-click'),
    onMenuPerfilClick: action('menu-perfil-click'),
    mostrarAccionesTramitacion: true
  },
};

export const Completa: Story = {
  args: {
    logoUrl: logoAvantius,
    title: 'Avantius Enterprise',
    subtitle: 'Sistema Integral de Gestión Judicial',
    menuConfig,
    menuSearchPlaceholder: 'Buscar en el sistema...',
    onBuscarProcedimiento: action('buscar-procedimiento'),
    userId: 1,
    organoId: 1,
    notificacionesCount: 7,
    notificacionesTooltip: 'Panel de avisos y notificaciones',
    onNotificacionesClick: action('notificaciones-click'),
    onMenuPerfilClick: action('menu-perfil-click'),
    mostrarAccionesTramitacion: true
  },
};

export const SinPermisosTramitacion: Story = {
  args: {
    logoUrl: logoAvantius,
    title: 'Avantius Enterprise',
    subtitle: 'Sistema Integral de Gestión Judicial',
    menuConfig,
    menuSearchPlaceholder: 'Buscar en el sistema...',
    onBuscarProcedimiento: action('buscar-procedimiento'),
    userId: 1,
    organoId: 1,
    notificacionesCount: 7,
    notificacionesTooltip: 'Panel de avisos y notificaciones',
    onNotificacionesClick: action('notificaciones-click'),
    onMenuPerfilClick: action('menu-perfil-click'),
  },
};
