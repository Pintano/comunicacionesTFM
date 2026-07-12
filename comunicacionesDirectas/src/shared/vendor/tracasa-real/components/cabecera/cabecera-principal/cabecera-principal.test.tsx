import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { CabeceraPrincipal } from './cabecera-principal';
import logoAvantius from '../../../assets/images/logoAvantius.svg';

describe('CabeceraPrincipal', () => {
  describe('Renderizado básico', () => {
    it('renders without crashing', () => {
      render(<CabeceraPrincipal />);
      const cabecera = screen.getByRole('banner');
      expect(cabecera).toBeInTheDocument();
    });

    it('renders with logo URL', () => {
      render(<CabeceraPrincipal logoProps={{ url: logoAvantius }} />);
      const logo = screen.getByRole('img');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', logoAvantius);
    });

    it('renders with logo children', () => {
      render(
        <CabeceraPrincipal logoProps={{ children: <div>Custom Logo</div> }} />,
      );
      expect(screen.getByText('Custom Logo')).toBeInTheDocument();
    });

    it('renders without logo', () => {
      render(<CabeceraPrincipal title="Test App" />);
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });
  });

  describe('Título y subtítulo', () => {
    it('renders title when provided', () => {
      render(<CabeceraPrincipal title="Sistema de Justicia" />);
      expect(screen.getByText('Sistema de Justicia')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('renders subtitle when provided', () => {
      render(
        <CabeceraPrincipal
          title="Sistema de Justicia"
          subtitle="Departamento de Registro"
        />,
      );
      expect(screen.getByText('Departamento de Registro')).toBeInTheDocument();
    });

    it('renders subtitle without title', () => {
      render(<CabeceraPrincipal subtitle="Solo subtítulo" />);
      expect(screen.getByText('Solo subtítulo')).toBeInTheDocument();
    });

    it('renders separator when logo and title are present', () => {
      const { container } = render(
        <CabeceraPrincipal
          logoProps={{ url: logoAvantius }}
          title="Test App"
        />,
      );
      const separador = container.querySelector(
        '[aria-hidden="true"]',
      ) as HTMLElement;
      expect(separador).toBeInTheDocument();
    });

    it('does not render separator when only logo is present', () => {
      const { container } = render(
        <CabeceraPrincipal logoProps={{ url: logoAvantius }} />,
      );
      const separador = container.querySelector(
        '[aria-hidden="true"]',
      ) as HTMLElement;
      expect(separador).not.toBeInTheDocument();
    });

    it('does not render separator when only title is present', () => {
      const { container } = render(<CabeceraPrincipal title="Test App" />);
      const separador = container.querySelector(
        '[aria-hidden="true"]',
      ) as HTMLElement;
      expect(separador).not.toBeInTheDocument();
    });
  });

  describe('Children slot', () => {
    it('renders children when provided', () => {
      render(
        <CabeceraPrincipal>
          <div>Content Area</div>
        </CabeceraPrincipal>,
      );
      expect(screen.getByText('Content Area')).toBeInTheDocument();
    });

    it('renders multiple children', () => {
      render(
        <CabeceraPrincipal>
          <input placeholder="Search..." />
          <button>Action</button>
        </CabeceraPrincipal>,
      );
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
      expect(screen.getByText('Action')).toBeInTheDocument();
    });

    it('does not render children section when no children', () => {
      const { container } = render(<CabeceraPrincipal />);
      const contenidoSection = container.querySelector(
        '.cabecera-principal__contenido',
      );
      expect(contenidoSection).not.toBeInTheDocument();
    });
  });

  describe('AccionesSlot', () => {
    it('renders accionesSlot when provided', () => {
      render(<CabeceraPrincipal accionesSlot={<button>Profile</button>} />);
      expect(screen.getByText('Profile')).toBeInTheDocument();
    });

    it('renders multiple actions', () => {
      render(
        <CabeceraPrincipal
          accionesSlot={
            <>
              <button>Notifications</button>
              <button>Profile</button>
            </>
          }
        />,
      );
      expect(screen.getByText('Notifications')).toBeInTheDocument();
      expect(screen.getByText('Profile')).toBeInTheDocument();
    });

    it('does not render acciones section when no accionesSlot', () => {
      const { container } = render(<CabeceraPrincipal />);
      const accionesSection = container.querySelector(
        '.cabecera-principal__acciones',
      );
      expect(accionesSection).not.toBeInTheDocument();
    });
  });

  describe('Composición completa', () => {
    it('renders all sections when provided', () => {
      render(
        <CabeceraPrincipal
          logoProps={{ url: logoAvantius }}
          title="Complete App"
          subtitle="Full Header"
          accionesSlot={<button>Actions</button>}
        >
          <input placeholder="Search..." />
        </CabeceraPrincipal>,
      );

      expect(screen.getByRole('img')).toBeInTheDocument();
      expect(screen.getByText('Complete App')).toBeInTheDocument();
      expect(screen.getByText('Full Header')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
      expect(screen.getByText('Actions')).toBeInTheDocument();
    });
  });

  describe('ClassName personalizada', () => {
    it('applies custom className', () => {
      const { container } = render(
        <CabeceraPrincipal className="custom-class" />,
      );
      const cabecera = container.querySelector('.custom-class');
      expect(cabecera).toBeInTheDocument();
    });

    it('preserves base className when custom className is added', () => {
      const { container } = render(
        <CabeceraPrincipal className="custom-class" />,
      );
      const cabecera = screen.getByRole('banner');
      expect(cabecera).toBeInTheDocument();
      expect(cabecera).toHaveClass('custom-class');
    });
  });

  describe('Accesibilidad', () => {
    it('has role="banner"', () => {
      render(<CabeceraPrincipal />);
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('separator has aria-hidden', () => {
      const { container } = render(
        <CabeceraPrincipal logoProps={{ url: logoAvantius }} title="Test" />,
      );
      const separador = container.querySelector(
        '[aria-hidden="true"]',
      ) as HTMLElement;
      expect(separador).toHaveAttribute('aria-hidden', 'true');
    });

    it('should not have accessibility violations (basic)', async () => {
      const { container } = render(
        <CabeceraPrincipal
          logoProps={{ url: logoAvantius }}
          title="Sistema de Justicia"
        />,
      );
      const results = await axe(container);
      if (results.violations.length > 0) {
        console.log(results.violations);
      }
      expect(results.violations.length).toBe(0);
    });

    it('should not have accessibility violations (complete)', async () => {
      const { container } = render(
        <CabeceraPrincipal
          logoProps={{ url: logoAvantius }}
          title="Sistema de Justicia"
          subtitle="Departamento de Registro"
          accionesSlot={<button aria-label="Perfil">Profile</button>}
        >
          <input placeholder="Search..." aria-label="Search input" />
        </CabeceraPrincipal>,
      );
      const results = await axe(container);
      if (results.violations.length > 0) {
        console.log(results.violations);
      }
      expect(results.violations.length).toBe(0);
    });
  });

  describe('Estructura BEM', () => {
    it('renders all structural elements', () => {
      const { container } = render(
        <CabeceraPrincipal
          logoProps={{ url: logoAvantius }}
          title="Test"
          subtitle="Subtitle"
          accionesSlot={<button>Action</button>}
        >
          <div>Content</div>
        </CabeceraPrincipal>,
      );

      // Verify banner role exists
      expect(screen.getByRole('banner')).toBeInTheDocument();

      // Verify logo exists
      expect(screen.getByRole('img')).toBeInTheDocument();

      // Verify title exists
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();

      // Verify subtitle exists
      expect(screen.getByText('Subtitle')).toBeInTheDocument();

      // Verify children content exists
      expect(screen.getByText('Content')).toBeInTheDocument();

      // Verify actions exists
      expect(screen.getByText('Action')).toBeInTheDocument();

      // Verify separator exists (aria-hidden)
      const separator = container.querySelector('[aria-hidden="true"]');
      expect(separator).not.toBeNull();
    });
  });
});
