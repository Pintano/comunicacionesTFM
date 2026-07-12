import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TextArea } from './text-area';
import { axe } from 'vitest-axe';
import styles from './text-area.module.scss';

describe('TextArea', () => {
  it('se renderiza correctamente', () => {
    render(<TextArea placeholder="Ingresa texto aquí" />);

    const textarea = screen.getByTestId('custom-textarea');

    expect(textarea).toBeInTheDocument();
  });

  it('es accesible', async () => {
    const { container } = await render(
      <TextArea placeholder="Ingresa texto aquí" />,
    );
    const results = await axe(container);
    if (results.violations.length > 0) console.log(results.violations);
    expect(results.violations.length).toBe(0);
  });

  it('muestra la clase "error" cuando la propiedad invalid es true', () => {
    render(<TextArea invalid placeholder="Ingresa texto aquí" />);

    const textarea = screen.getByTestId('custom-textarea');

    expect(textarea).toHaveClass(styles['textarea--error']);
  });
  it('muestra la clase "readonly" cuando la propiedad readonly es true', () => {
    render(<TextArea readOnly placeholder="Ingresa texto aquí" />);

    const textarea = screen.getByTestId('custom-textarea');

    expect(textarea).toHaveClass(styles['textarea--read-only']);
  });
  it('maneja el cambio de valor', () => {
    const handleChange = vi.fn();
    render(
      <TextArea onChange={handleChange} placeholder="Ingresa texto aquí" />,
    );

    const textarea = screen.getByTestId('custom-textarea');
    fireEvent.change(textarea, { target: { value: 'Nuevo valor' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('está deshabilitado cuando la propiedad disabled está definida', () => {
    render(<TextArea disabled placeholder="Ingresa texto aquí" />);

    const textarea = screen.getByTestId('custom-textarea');

    expect(textarea).toBeDisabled();
  });
});
