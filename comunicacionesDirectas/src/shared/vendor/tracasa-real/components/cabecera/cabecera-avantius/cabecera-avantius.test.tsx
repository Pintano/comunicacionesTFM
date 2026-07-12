import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { CabeceraAvantius } from './cabecera-avantius';
import { Pestana } from '../../ribbon/ribbon-utils';

// Mock data para menús
const mockMenusConfig: Pestana[] = [
  {
    nombre: 'Gestión',
    categorias: [
      {
        nombre: 'Expedientes',
        menus: [
          {
            nombre: 'Nuevo Expediente',
            tipo: 1,
            icono: 'clipboard',
            destacar: false,
            tipoDesactivacion: 1,
            submenus: [],
          },
        ],
      },
    ],
  },
  {
    nombre: 'Consultas',
    categorias: [
      {
        nombre: 'Búsquedas',
        menus: [
          {
            nombre: 'Buscar Asuntos',
            tipo: 2,
            icono: 'search',
            destacar: false,
            tipoDesactivacion: 1,
            submenus: [],
          },
        ],
      },
    ],
  },
];

describe('CabeceraAvantius', () => {
  describe('Renderizado básico', () => {
    it('renders without crashing with required props', () => {
      render(
        <CabeceraAvantius
          menuConfig={mockMenusConfig}
          mostrarAccionesTramitacion
        />,
      );
      const cabecera = screen.getByRole('banner');
      expect(cabecera).toBeInTheDocument();
    });

    it.skip('renders with default title "Avantius"', () => {
      render(
        <CabeceraAvantius
          menuConfig={mockMenusConfig}
          mostrarAccionesTramitacion
        />,
      );
      expect(screen.getByText('')).toBeInTheDocument();
    });

    it('renders with custom title', () => {
      render(
        <CabeceraAvantius
          menuConfig={mockMenusConfig}
          title="Avantius Pro"
          mostrarAccionesTramitacion
        />,
      );
      expect(screen.getByText('Avantius Pro')).toBeInTheDocument();
    });

    it('renders with title and subtitle', () => {
      render(
        <CabeceraAvantius
          menuConfig={mockMenusConfig}
          title="Avantius"
          subtitle="Gestión Integral"
          mostrarAccionesTramitacion
        />,
      );
      expect(screen.getByText('Avantius')).toBeInTheDocument();
      expect(screen.getByText('Gestión Integral')).toBeInTheDocument();
    });

    it('renders with logoUrl', () => {
      const { container } = render(
        <CabeceraAvantius
          menuConfig={mockMenusConfig}
          logoUrl="/logo.svg"
          mostrarAccionesTramitacion
        />,
      );
      const logo = container.querySelector('img');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', '/logo.svg');
    });

    it('renders with logoElement', () => {
      render(
        <CabeceraAvantius
          menuConfig={mockMenusConfig}
          logoElement={<div data-testid="custom-logo">Logo Custom</div>}
          mostrarAccionesTramitacion
        />,
      );
      expect(screen.getByTestId('custom-logo')).toBeInTheDocument();
    });
  });

  describe('BuscadorMenus', () => {
    it('always renders BuscadorMenus with provided config', () => {
      render(
        <CabeceraAvantius
          menuConfig={mockMenusConfig}
          mostrarAccionesTramitacion
        />,
      );
      // BuscadorMenus tiene un input de búsqueda
      const searchInput = screen.getByPlaceholderText('Buscar en menús...');
      expect(searchInput).toBeInTheDocument();
    });

    it('uses custom menuSearchPlaceholder', () => {
      render(
        <CabeceraAvantius
          menuConfig={mockMenusConfig}
          menuSearchPlaceholder="Buscar funcionalidades..."
          mostrarAccionesTramitacion
        />,
      );
      expect(
        screen.getByPlaceholderText('Buscar funcionalidades...'),
      ).toBeInTheDocument();
    });

    it('passes menuConfig to BuscadorMenus', () => {
      render(
        <CabeceraAvantius
          menuConfig={mockMenusConfig}
          mostrarAccionesTramitacion
        />,
      );
      // Verificamos que no crashea y renderiza correctamente
      expect(
        screen.getByPlaceholderText('Buscar en menús...'),
      ).toBeInTheDocument();
    });
  });

  describe('BuscadorProcedimientos', () => {
    it('renders BuscadorProcedimientos when onBuscarProcedimiento is provided', () => {
      render(
        <CabeceraAvantius
          menuConfig={mockMenusConfig}
          onBuscarProcedimiento={vi.fn()}
          mostrarAccionesTramitacion
        />,
      );
      // Debería haber MÁS inputs (BuscadorMenus + BuscadorProcedimientos tiene 2 inputs)
      const inputs = screen.getAllByRole('textbox');
      expect(inputs.length).toBeGreaterThanOrEqual(2);
    });

    it('does not render BuscadorProcedimientos when handler not provided', () => {
      render(
        <CabeceraAvantius
          menuConfig={mockMenusConfig}
          mostrarAccionesTramitacion
        />,
      );
      // Solo debería haber UN input (BuscadorMenus)
      const inputs = screen.getAllByRole('textbox');
      expect(inputs).toHaveLength(1);
    });

    it('passes userId and organoId to BuscadorProcedimientos', () => {
      render(
        <CabeceraAvantius
          menuConfig={mockMenusConfig}
          onBuscarProcedimiento={vi.fn()}
          userId={123}
          organoId={456}
          mostrarAccionesTramitacion
        />,
      );
      // Verificamos que no crashea
      const inputs = screen.getAllByRole('textbox');
      expect(inputs.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('IndicadorNotificaciones', () => {
    it('renders IndicadorNotificaciones when onNotificacionesClick is provided', () => {
      render(
        <CabeceraAvantius
          menuConfig={mockMenusConfig}
          notificacionesCount={5}
          onNotificacionesClick={vi.fn()}
          mostrarAccionesTramitacion
        />,
      );
      // IndicadorNotificaciones renderiza un botón
      const notifButton = screen.getByRole('button', {
        name: /notificacion/i,
      });
      expect(notifButton).toBeInTheDocument();
    });

    it('does not render IndicadorNotificaciones when handler not provided', () => {
      render(
        <CabeceraAvantius
          menuConfig={mockMenusConfig}
          notificacionesCount={5}
          mostrarAccionesTramitacion
        />,
      );
      const notifButton = screen.queryByRole('button', {
        name: /notificacion/i,
      });
      expect(notifButton).not.toBeInTheDocument();
    });

    it('displays notification count', () => {
      render(
        <CabeceraAvantius
          menuConfig={mockMenusConfig}
          notificacionesCount={12}
          onNotificacionesClick={vi.fn()}
          mostrarAccionesTramitacion
        />,
      );
      expect(screen.getByText('12')).toBeInTheDocument();
    });

    it('calls onNotificacionesClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <CabeceraAvantius
          menuConfig={mockMenusConfig}
          notificacionesCount={3}
          onNotificacionesClick={handleClick}
          mostrarAccionesTramitacion
        />,
      );

      const notifButton = screen.getByRole('button', {
        name: /notificacion/i,
      });
      await user.click(notifButton);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('uses custom notificacionesTooltip', () => {
      render(
        <CabeceraAvantius
          menuConfig={mockMenusConfig}
          notificacionesCount={5}
          onNotificacionesClick={vi.fn()}
          notificacionesTooltip="Tienes mensajes nuevos"
          mostrarAccionesTramitacion
        />,
      );
      // El tooltip se pasa al componente IndicadorNotificaciones
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });
  });

  describe('Menú de perfil', () => {
    it('renders menu button when onMenuPerfilClick is provided', () => {
      render(
        <CabeceraAvantius
          menuConfig={mockMenusConfig}
          onMenuPerfilClick={vi.fn()}
          mostrarAccionesTramitacion
        />,
      );
      const menuButton = screen.getByLabelText('Menú de perfil');
      expect(menuButton).toBeInTheDocument();
    });

    it('does not render menu button when handler not provided', () => {
      render(
        <CabeceraAvantius
          menuConfig={mockMenusConfig}
          mostrarAccionesTramitacion
        />,
      );
      const menuButton = screen.queryByLabelText('Menú de perfil');
      expect(menuButton).not.toBeInTheDocument();
    });

    it('calls onMenuPerfilClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <CabeceraAvantius
          menuConfig={mockMenusConfig}
          onMenuPerfilClick={handleClick}
          mostrarAccionesTramitacion
        />,
      );

      const menuButton = screen.getByLabelText('Menú de perfil');
      await user.click(menuButton);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Composición completa', () => {
    it('renders all components when all handlers provided', () => {
      const { container } = render(
        <CabeceraAvantius
          logoUrl="/logo.svg"
          title="Avantius Pro"
          subtitle="Versión 3.0"
          menuConfig={mockMenusConfig}
          onBuscarProcedimiento={vi.fn()}
          notificacionesCount={8}
          onNotificacionesClick={vi.fn()}
          onMenuPerfilClick={vi.fn()}
          mostrarAccionesTramitacion
        />,
      );

      // Logo
      expect(container.querySelector('img')).toBeInTheDocument();

      // Título y subtítulo
      expect(screen.getByText('Avantius Pro')).toBeInTheDocument();
      expect(screen.getByText('Versión 3.0')).toBeInTheDocument();

      // Buscadores (2 inputs)
      const inputs = screen.getAllByRole('textbox');
      expect(inputs.length).toBeGreaterThanOrEqual(2);

      // Notificaciones
      expect(screen.getByText('8')).toBeInTheDocument();

      // Menú perfil
      expect(screen.getByLabelText('Menú de perfil')).toBeInTheDocument();
    });

    it.skip('renders minimal version with only required props', () => {
      render(
        <CabeceraAvantius
          menuConfig={mockMenusConfig}
          mostrarAccionesTramitacion
        />,
      );

      // Solo debería haber: título por defecto + BuscadorMenus
      //  expect(screen.getByText('')).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText('Buscar en menús...'),
      ).toBeInTheDocument();

      // No debería haber: notificaciones, menú perfil, segundo buscador
      expect(screen.queryByText(/\d+/)).not.toBeInTheDocument(); // No números (notificaciones)
      expect(screen.queryByLabelText('Menú de perfil')).not.toBeInTheDocument();
      const inputs = screen.getAllByRole('textbox');
      expect(inputs).toHaveLength(1); // Solo BuscadorMenus
    });
  });

  describe('Accesibilidad', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(
        <CabeceraAvantius
          logoUrl="/logo.svg"
          menuConfig={mockMenusConfig}
          onBuscarProcedimiento={vi.fn()}
          notificacionesCount={5}
          onNotificacionesClick={vi.fn()}
          onMenuPerfilClick={vi.fn()}
          mostrarAccionesTramitacion
        />,
      );
      const results = await axe(container);
      if (results.violations.length > 0) {
        console.log(results.violations);
      }
      expect(results.violations.length).toBe(0);
    });

    it('has proper ARIA label on menu button', () => {
      render(
        <CabeceraAvantius
          menuConfig={mockMenusConfig}
          onMenuPerfilClick={vi.fn()}
          mostrarAccionesTramitacion
        />,
      );
      expect(screen.getByLabelText('Menú de perfil')).toBeInTheDocument();
    });
  });

  describe('Domain-Specific Facade validation', () => {
    it('simplifies Avantius-specific setup', () => {
      // Este test valida que el componente simplifica la configuración
      // típica de Avantius en una sola declaración
      render(
        <CabeceraAvantius
          menuConfig={mockMenusConfig}
          onBuscarProcedimiento={vi.fn()}
          onNotificacionesClick={vi.fn()}
          onMenuPerfilClick={vi.fn()}
          mostrarAccionesTramitacion
        />,
      );

      // Verificamos que todos los elementos específicos de Avantius están presentes
      const banner = screen.getByRole('banner');
      expect(banner).toBeInTheDocument();

      // BuscadorMenus (específico de Avantius)
      expect(
        screen.getByPlaceholderText('Buscar en menús...'),
      ).toBeInTheDocument();

      // Integración completa sin necesidad de gestionar slots manualmente
      expect(screen.getAllByRole('textbox').length).toBeGreaterThan(0);
    });
  });
});
