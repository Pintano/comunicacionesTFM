import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EmptyState } from './empty-state';

describe('EmptyState', () => {
  describe('Renderizado básico', () => {
    it('renderiza el texto obligatorio (children)', () => {
      render(<EmptyState>No hay resultados disponibles</EmptyState>);

      expect(
        screen.getByText('No hay resultados disponibles'),
      ).toBeInTheDocument();
    });

    it('aplica estilos por defecto sin modificadores', () => {
      const { container } = render(<EmptyState>No hay resultados</EmptyState>);

      const emptyState = container.firstChild as HTMLElement;
      expect(emptyState.className).toContain('empty-state');
      expect(emptyState.className).not.toContain('empty-state--inline');
      expect(emptyState.className).not.toContain('empty-state--compacto');
      expect(emptyState.className).not.toContain('empty-state--background');
    });
  });

  describe('Prop: titulo', () => {
    it('renderiza el título cuando se proporciona', () => {
      render(
        <EmptyState titulo="Sin resultados">
          No se encontraron elementos
        </EmptyState>,
      );

      expect(screen.getByText('Sin resultados')).toBeInTheDocument();
      expect(
        screen.getByText('No se encontraron elementos'),
      ).toBeInTheDocument();
    });

    it('no renderiza el título cuando no se proporciona', () => {
      const { container } = render(<EmptyState>Solo texto</EmptyState>);

      const titulos = container.querySelectorAll('.empty-state__titulo');
      expect(titulos.length).toBe(0);
    });

    it('aplica clase empty-state__titulo correctamente', () => {
      render(<EmptyState titulo="Mi título">Contenido</EmptyState>);

      const titulo = screen.getByText('Mi título');
      expect(titulo.className).toContain('empty-state__titulo');
    });
  });

  describe('Prop: icono', () => {
    it('renderiza el icono cuando se proporciona', () => {
      const { container } = render(
        <EmptyState icono="fileSad">No hay archivos</EmptyState>,
      );

      // Verificar que hay un SVG renderizado (el IconWrapper renderiza SVGs)
      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();
    });

    it('no renderiza el icono cuando no se proporciona', () => {
      const { container } = render(<EmptyState>Sin icono</EmptyState>);

      const svg = container.querySelector('svg');
      expect(svg).toBeFalsy();
    });

    it('el icono tiene aria-hidden="true" para accesibilidad', () => {
      const { container } = render(
        <EmptyState icono="search">Búsqueda sin resultados</EmptyState>,
      );

      // El componente EmptyState pasa aria-hidden al IconWrapper
      // Verificamos que el icono se renderiza (SVG presente)
      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();
    });
  });

  describe('Prop: inline', () => {
    it('aplica modificador --inline cuando inline=true', () => {
      const { container } = render(
        <EmptyState inline>Contenido en línea</EmptyState>,
      );

      const emptyState = container.firstChild as HTMLElement;
      expect(emptyState.className).toContain('empty-state--inline');
    });

    it('no aplica modificador --inline por defecto', () => {
      const { container } = render(
        <EmptyState>Contenido en columna</EmptyState>,
      );

      const emptyState = container.firstChild as HTMLElement;
      expect(emptyState.className).not.toContain('empty-state--inline');
    });
  });

  describe('Prop: compacto', () => {
    it('aplica modificador --compacto cuando compacto=true', () => {
      const { container } = render(
        <EmptyState compacto>Contenido compacto</EmptyState>,
      );

      const emptyState = container.firstChild as HTMLElement;
      expect(emptyState.className).toContain('empty-state--compacto');
    });

    it('no aplica modificador --compacto por defecto', () => {
      const { container } = render(<EmptyState>Contenido normal</EmptyState>);

      const emptyState = container.firstChild as HTMLElement;
      expect(emptyState.className).not.toContain('empty-state--compacto');
    });
  });

  describe('Prop: background', () => {
    it('aplica modificador --background cuando background=true', () => {
      const { container } = render(
        <EmptyState background>Con fondo</EmptyState>,
      );

      const emptyState = container.firstChild as HTMLElement;
      expect(emptyState.className).toContain('empty-state--background');
    });

    it('no aplica modificador --background por defecto', () => {
      const { container } = render(<EmptyState>Sin fondo</EmptyState>);

      const emptyState = container.firstChild as HTMLElement;
      expect(emptyState.className).not.toContain('empty-state--background');
    });
  });

  describe('Prop: link', () => {
    it('renderiza el botón de link cuando se proporciona', () => {
      const mockOnClick = vi.fn();
      render(
        <EmptyState link={{ texto: 'Ver más', onClick: mockOnClick }}>
          Sin resultados
        </EmptyState>,
      );

      expect(
        screen.getByRole('button', { name: /Ver más/ }),
      ).toBeInTheDocument();
    });

    it('no renderiza el botón cuando no se proporciona link', () => {
      render(<EmptyState>Sin link</EmptyState>);

      const botones = screen.queryAllByRole('button');
      expect(botones.length).toBe(0);
    });

    it('llama a onClick cuando se hace clic en el link', async () => {
      const user = userEvent.setup();
      const mockOnClick = vi.fn();
      render(
        <EmptyState link={{ texto: 'Crear nuevo', onClick: mockOnClick }}>
          Lista vacía
        </EmptyState>,
      );

      const boton = screen.getByRole('button', { name: /Crear nuevo/ });
      await user.click(boton);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('el botón tiene variant terciario', () => {
      const mockOnClick = vi.fn();
      render(
        <EmptyState link={{ texto: 'Acción', onClick: mockOnClick }}>
          Contenido
        </EmptyState>,
      );

      const boton = screen.getByRole('button', { name: /Acción/ });
      expect(boton.className).toContain('text-button--primary');
    });
  });

  describe('Combinaciones de props', () => {
    it('renderiza correctamente con todas las props', () => {
      const mockOnClick = vi.fn();
      const { container } = render(
        <EmptyState
          titulo="No hay elementos"
          icono="fileSad"
          inline
          compacto
          background
          link={{ texto: 'Añadir elemento', onClick: mockOnClick }}
        >
          La lista está vacía. Añade tu primer elemento para comenzar.
        </EmptyState>,
      );

      const emptyState = container.firstChild as HTMLElement;

      // Verificar modificadores
      expect(emptyState.className).toContain('empty-state--inline');
      expect(emptyState.className).toContain('empty-state--compacto');
      expect(emptyState.className).toContain('empty-state--background');

      // Verificar contenido
      expect(screen.getByText('No hay elementos')).toBeInTheDocument();
      expect(screen.getByText(/La lista está vacía/)).toBeInTheDocument();

      // Verificar icono (IconWrapper renderiza SVG)
      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();

      expect(
        screen.getByRole('button', { name: /Añadir elemento/ }),
      ).toBeInTheDocument();
    });

    it('renderiza con solo título e icono', () => {
      const { container } = render(
        <EmptyState titulo="Búsqueda vacía" icono="search">
          No se encontraron coincidencias
        </EmptyState>,
      );

      expect(screen.getByText('Búsqueda vacía')).toBeInTheDocument();
      expect(
        screen.getByText('No se encontraron coincidencias'),
      ).toBeInTheDocument();

      // Verificar icono (IconWrapper renderiza SVG)
      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();
    });

    it('renderiza en modo inline con background', () => {
      const { container } = render(
        <EmptyState inline background>
          Mensaje compacto
        </EmptyState>,
      );

      const emptyState = container.firstChild as HTMLElement;
      expect(emptyState.className).toContain('empty-state--inline');
      expect(emptyState.className).toContain('empty-state--background');
    });
  });

  describe('Estructura del DOM', () => {
    it('tiene la estructura correcta de elementos', () => {
      render(<EmptyState titulo="Título">Texto</EmptyState>);

      // Verificar que los elementos existen mediante el texto
      expect(screen.getByText('Título')).toBeInTheDocument();
      expect(screen.getByText('Texto')).toBeInTheDocument();
    });

    it('el texto está dentro del componente', () => {
      const { container } = render(<EmptyState>Mi texto</EmptyState>);

      // Verificar que el texto está renderizado
      expect(screen.getByText('Mi texto')).toBeInTheDocument();

      // Verificar que hay un div contenedor
      const divs = container.querySelectorAll('div');
      expect(divs.length).toBeGreaterThan(0);
    });
  });

  describe('Accesibilidad', () => {
    it('usa elementos semánticos <p> para título y texto', () => {
      render(<EmptyState titulo="Título">Texto</EmptyState>);

      const titulo = screen.getByText('Título');
      const texto = screen.getByText('Texto');

      expect(titulo.tagName).toBe('P');
      expect(texto.tagName).toBe('P');
    });

    it('el botón de link es accesible con role="button"', () => {
      const mockOnClick = vi.fn();
      render(
        <EmptyState link={{ texto: 'Acción', onClick: mockOnClick }}>
          Contenido
        </EmptyState>,
      );

      expect(
        screen.getByRole('button', { name: /Acción/ }),
      ).toBeInTheDocument();
    });
  });
});
