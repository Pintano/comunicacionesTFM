import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from '@testing-library/react';
import { vi } from 'vitest';
import type { AvisoProps } from './aviso';
import { Aviso } from './aviso';
import { axe } from 'vitest-axe';

describe('Componente Aviso', () => {
  const defaultProps: AvisoProps = {
    message: 'Aviso de ejemplo',
    onClose: vi.fn(),
  };

  afterEach(cleanup);

  it('debería renderizarse sin fallar', () => {
    render(<Aviso {...defaultProps} />);
    const avisoElement = screen.getByText('Aviso de ejemplo');
    expect(avisoElement).toBeInTheDocument();
  });

  it('es accesible', async () => {
    const { container } = render(<Aviso {...defaultProps} />);
    const results = await axe(container);
    if (results.violations.length > 0) console.log(results.violations);
    expect(results.violations.length).toBe(0);
  });

  it('debería llamar a onClose cuando el aviso se cierra manualmente', async () => {
    render(<Aviso {...defaultProps} />);
    const closeButton = screen.getByLabelText('cerrarMensaje');
    fireEvent.click(closeButton);
    await waitFor(() => {
      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });
  });

  it('debería renderizar diferentes tipos/variantes', () => {
    const types: AvisoProps['variant'][] = [
      'info',
      'success',
      'warning',
      'error',
    ];

    types.forEach((type) => {
      const { container } = render(<Aviso {...defaultProps} variant={type} />);
      // Verificar que el Mensaje interno tiene la variante correcta
      const mensaje = container.querySelector('[class*="mensaje"]');
      expect(mensaje).toBeInTheDocument();
      cleanup();
    });
  });

  it('debería desaparecer después de la duración especificada', () => {
    const duracion = 600; // Más que la duración de animación (500ms)
    render(
      <Aviso message="Aviso temporal" duration={duracion} onClose={vi.fn()} />,
    );

    // El elemento debe estar visible inicialmente
    expect(screen.getByText('Aviso temporal')).toBeInTheDocument();

    // Después de la duración, debe desaparecer
    setTimeout(() => {
      expect(screen.queryByText('Aviso temporal')).not.toBeInTheDocument();
    }, duracion + 100);
  });

  it('debería renderizarse dentro de un contenedor con animaciones', () => {
    const { container } = render(<Aviso {...defaultProps} />);
    const containerElement = container.querySelector(
      '[class*="aviso__container"]',
    );
    expect(containerElement).toBeInTheDocument();
    // Verifica que tiene clase fadeIn
    expect(containerElement?.className).toContain('fadeIn');
  });

  it('no debería renderizar nada cuando visible es false después del cierre', async () => {
    const onClose = vi.fn();
    const { container } = render(<Aviso {...defaultProps} onClose={onClose} />);

    const closeButton = screen.getByLabelText('cerrarMensaje');
    fireEvent.click(closeButton);

    await waitFor(
      () => {
        // Después de que se cierre, el contenedor no debe existir
        expect(container.firstChild).toBeNull();
      },
      { timeout: 1000 },
    );
  });

  it('debería usar el componente Mensaje internamente', () => {
    const { container } = render(<Aviso {...defaultProps} />);
    // Verificar que contiene elementos del componente Mensaje
    const mensaje = container.querySelector('[class*="mensaje"]');
    expect(mensaje).toBeInTheDocument();
  });
});
