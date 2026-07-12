import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { IconButton } from './icon-button';

describe('IconButton', () => {
  it('renderiza correctamente con props básicas', () => {
    render(<IconButton icon="close" aria-label="Cerrar modal" />);

    const button = screen.getByRole('button', { name: 'Cerrar modal' });
    expect(button).toBeInTheDocument();
  });

  it('aplica el tamaño correctamente', () => {
    render(<IconButton icon="help" size="lg" aria-label="Ayuda" />);

    const button = screen.getByRole('button');
    expect(button.className).toContain('icon-button--lg');
  });

  it('aplica el color correctamente', () => {
    render(<IconButton icon="search" color="white" aria-label="Buscar" />);

    const button = screen.getByRole('button');
    expect(button.className).toContain('icon-button--white');
  });

  it('se deshabilita correctamente', () => {
    render(<IconButton icon="close" disabled aria-label="Cerrar" />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('ejecuta onClick cuando se hace clic', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <IconButton
        icon="folder"
        onClick={handleClick}
        aria-label="Abrir carpeta"
      />,
    );

    const button = screen.getByRole('button');
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('requiere aria-label para accesibilidad', () => {
    const { container } = render(
      <IconButton icon="close" aria-label="Cerrar" />,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Cerrar');
  });

  it('pasa props adicionales al botón subyacente', () => {
    render(
      <IconButton
        icon="help"
        aria-label="Ayuda"
        data-testid="help-button"
        title="Botón de ayuda"
      />,
    );

    const button = screen.getByTestId('help-button');
    expect(button).toHaveAttribute('title', 'Botón de ayuda');
  });

  describe('mapeo de tamaños', () => {
    it('mapea size="xs" a icon-button--xs', () => {
      render(<IconButton icon="close" size="xs" aria-label="Cerrar" />);

      const button = screen.getByRole('button');
      expect(button.className).toContain('icon-button--xs');
    });

    it('mapea size="sm" a icon-button--sm', () => {
      render(<IconButton icon="close" size="sm" aria-label="Cerrar" />);

      const button = screen.getByRole('button');
      expect(button.className).toContain('icon-button--sm');
    });

    it('mapea size="md" (default) a icon-button--md', () => {
      render(<IconButton icon="close" aria-label="Cerrar" />);

      const button = screen.getByRole('button');
      expect(button.className).toContain('icon-button--md');
    });

    it('mapea size="lg" a icon-button--lg', () => {
      render(<IconButton icon="close" size="lg" aria-label="Cerrar" />);

      const button = screen.getByRole('button');
      expect(button.className).toContain('icon-button--lg');
    });
  });

  describe('componente standalone', () => {
    it('es independiente de Button', () => {
      render(<IconButton icon="search" aria-label="Buscar" />);

      const button = screen.getByRole('button');
      expect(button.className).toContain('icon-button');
      expect(button.className).not.toContain('button--icono');
    });

    it('mantiene todas las funcionalidades esperadas', () => {
      const { container } = render(
        <IconButton
          icon="help"
          aria-label="Ayuda"
          className="custom-class"
          style={{ margin: '10px' }}
        />,
      );

      const button = within(container).getByRole('button');
      expect(button).toHaveClass('custom-class');
      expect(button).toHaveStyle({ margin: '10px' });
    });
  });
});
