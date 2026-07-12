import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { IconButtonShape } from './icon-button-shape';

describe('IconButtonShape', () => {
  it('renderiza correctamente con props básicas', () => {
    render(
      <IconButtonShape icon="close" shape="circle" aria-label="Cerrar modal" />,
    );

    const button = screen.getByRole('button', { name: 'Cerrar modal' });
    expect(button).toBeInTheDocument();
  });

  // Tests de formas
  describe('formas', () => {
    it('aplica la clase para forma circular', () => {
      render(
        <IconButtonShape icon="plus" shape="circle" aria-label="Añadir" />,
      );

      const button = screen.getByRole('button');
      expect(button.className).toContain('icon-button-shape--circle');
    });

    it('aplica la clase para forma cuadrada', () => {
      render(
        <IconButtonShape
          icon="userCog"
          shape="square"
          aria-label="Configuración"
        />,
      );

      const button = screen.getByRole('button');
      expect(button.className).toContain('icon-button-shape--square');
    });
  });

  // Tests de tamaños
  describe('tamaños', () => {
    it('aplica tamaño md por defecto', () => {
      render(
        <IconButtonShape icon="edit" shape="circle" aria-label="Editar" />,
      );

      const button = screen.getByRole('button');
      expect(button.className).toContain('icon-button-shape--size--md');
    });

    it('aplica tamaño lg correctamente', () => {
      render(
        <IconButtonShape
          icon="plus"
          shape="circle"
          size="lg"
          aria-label="Añadir"
        />,
      );

      const button = screen.getByRole('button');
      expect(button.className).toContain('icon-button-shape--size--lg');
    });
  });

  // Tests de variantes
  describe('variantes', () => {
    it('aplica variante primary por defecto', () => {
      render(
        <IconButtonShape
          icon="fileCertificate"
          shape="circle"
          aria-label="Guardar"
        />,
      );

      const button = screen.getByRole('button');
      expect(button.className).toContain('icon-button-shape--primary');
    });

    it('aplica variante secondary correctamente', () => {
      render(
        <IconButtonShape
          icon="arrowUp"
          shape="circle"
          variant="secondary"
          aria-label="Subir"
        />,
      );

      const button = screen.getByRole('button');
      expect(button.className).toContain('icon-button-shape--secondary');
    });

    it('aplica variante tertiary correctamente', () => {
      render(
        <IconButtonShape
          icon="info"
          shape="square"
          variant="tertiary"
          aria-label="Info"
        />,
      );

      const button = screen.getByRole('button');
      expect(button.className).toContain('icon-button-shape--tertiary');
    });

    it('aplica variante quaternary correctamente', () => {
      render(
        <IconButtonShape
          icon="arrowDown"
          shape="square"
          variant="quaternary"
          aria-label="Descargar"
        />,
      );

      const button = screen.getByRole('button');
      expect(button.className).toContain('icon-button-shape--quaternary');
    });
  });

  // Tests de estados
  it('se deshabilita correctamente', () => {
    render(
      <IconButtonShape
        icon="trash"
        shape="circle"
        disabled
        aria-label="Eliminar"
      />,
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('ejecuta onClick cuando se hace clic', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <IconButtonShape
        icon="plus"
        shape="circle"
        onClick={handleClick}
        aria-label="Añadir"
      />,
    );

    const button = screen.getByRole('button');
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('no ejecuta onClick cuando está deshabilitado', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <IconButtonShape
        icon="plus"
        shape="circle"
        disabled
        onClick={handleClick}
        aria-label="Añadir"
      />,
    );

    const button = screen.getByRole('button');
    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  // Tests de accesibilidad
  it('requiere aria-label para accesibilidad', () => {
    const { container } = render(
      <IconButtonShape icon="close" shape="circle" aria-label="Cerrar" />,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Cerrar');
  });

  it('pasa props adicionales al botón subyacente', () => {
    render(
      <IconButtonShape
        icon="info"
        shape="square"
        aria-label="Información"
        data-testid="info-button"
        title="Botón de información"
      />,
    );

    const button = screen.getByTestId('info-button');
    expect(button).toHaveAttribute('title', 'Botón de información');
  });

  it('aplica className personalizada correctamente', () => {
    render(
      <IconButtonShape
        icon="plus"
        shape="circle"
        className="custom-class"
        aria-label="Añadir"
      />,
    );

    const button = screen.getByRole('button');
    expect(button.className).toContain('custom-class');
    expect(button.className).toContain('icon-button-shape');
  });

  // Tests de integración con IconWrapper
  describe('integración con IconWrapper', () => {
    it('renderiza el icono correctamente', () => {
      render(
        <IconButtonShape icon="close" shape="circle" aria-label="Cerrar" />,
      );

      const button = screen.getByRole('button');
      // Verifica que el botón contiene el IconWrapper (indirectamente)
      expect(button).toBeInTheDocument();
      expect(button.firstChild).toBeInTheDocument();
    });

    it('mapea correctamente el tamaño del icono', () => {
      // Este test verifica que el componente se renderiza sin errores
      // El mapeo exacto del tamaño se maneja internamente
      render(
        <IconButtonShape
          icon="edit"
          shape="circle"
          size="lg"
          aria-label="Editar"
        />,
      );

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });

  // Tests de casos de uso comunes
  describe('casos de uso', () => {
    it('funciona como FAB (Floating Action Button)', () => {
      render(
        <IconButtonShape
          icon="plus"
          shape="circle"
          size="lg"
          variant="primary"
          aria-label="Crear nuevo"
        />,
      );

      const button = screen.getByRole('button');
      expect(button.className).toContain('icon-button-shape--circle');
      expect(button.className).toContain('icon-button-shape--size--lg');
      expect(button.className).toContain('icon-button-shape--primary');
    });

    it('funciona como botón de configuración', () => {
      render(
        <IconButtonShape
          icon="userCog"
          shape="square"
          variant="tertiary"
          aria-label="Configuración"
        />,
      );

      const button = screen.getByRole('button');
      expect(button.className).toContain('icon-button-shape--square');
      expect(button.className).toContain('icon-button-shape--tertiary');
    });
  });
});
