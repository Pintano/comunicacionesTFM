import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { Button } from './button';
import { axe } from 'vitest-axe';

describe('<Button />', () => {
  it('se renderiza sin fallar', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText(/click me/i)).toBeDefined();
  });

  it('es accesible', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    if (results.violations.length > 0) console.log(results.violations);
    expect(results.violations.length).toBe(0);
  });

  it('maneja el estado "disabled"', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByText(/disabled button/i);
    expect((button as HTMLButtonElement).disabled).toBe(true);
  });

  it('aplica clases de variante y tamaño', () => {
    render(
      <Button size="large" variant="principal">
        Primary Large
      </Button>,
    );
    const button = screen.getByText(/primary large/i);
    expect(button.className).toContain('button--principal');
    expect(button.className).toContain('button--size--large');
  });

  it('reenvía la referencia al elemento input', () => {
    const ref = { current: null };
    render(<Button ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  describe('botón de opciones', () => {
    it('alternar el desplegable al hacer clic', () => {
      render(
        <Button
          opciones={[{ text: 'Option 1', onClick: vi.fn() }]}
          variant="principal"
          conOpciones={true}
        >
          Options
        </Button>,
      );
      fireEvent.click(screen.getByText(/options/i));
      expect(screen.getByText(/option 1/i)).toBeDefined();
      fireEvent.click(screen.getByText(/options/i));
      expect(screen.queryByText(/option 1/i)).toBeNull();
    });

    it('cierra el desplegable al hacer clic fuera', () => {
      render(
        <Button
          opciones={[{ text: 'Option 1', onClick: vi.fn() }]}
          variant="principal"
          conOpciones={true}
        >
          Options
        </Button>,
      );
      fireEvent.click(screen.getByText(/options/i));
      fireEvent.mouseDown(document);
      expect(screen.queryByText(/option 1/i)).toBeNull();
    });
  });
});
