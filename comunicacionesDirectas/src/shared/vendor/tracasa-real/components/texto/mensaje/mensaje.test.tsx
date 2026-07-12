import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Mensaje } from './mensaje';

describe('Mensaje', () => {
  it('renderiza un botón inline con onClick correctamente', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Mensaje
        message="Error. {retry}Reintentar{/retry}"
        inlineActions={{
          retry: { onClick: handleClick },
        }}
        variant="error"
      />,
    );

    const button = screen.getByRole('button', { name: 'Reintentar' });
    expect(button).toBeInTheDocument();

    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renderiza múltiples botones inline en un mismo mensaje', () => {
    render(
      <Mensaje
        message="Error: {retry}reintentar{/retry} o {cancel}cancelar{/cancel}."
        inlineActions={{
          retry: { onClick: vi.fn() },
          cancel: { onClick: vi.fn() },
        }}
      />,
    );

    const retryButton = screen.getByRole('button', { name: 'reintentar' });
    const cancelButton = screen.getByRole('button', { name: 'cancelar' });

    expect(retryButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  it('aplica aria-label personalizado a botones inline', () => {
    render(
      <Mensaje
        message="Error. {retry}Reintentar{/retry}"
        inlineActions={{
          retry: {
            onClick: vi.fn(),
            ariaLabel: 'Reintentar operación de subida',
          },
        }}
      />,
    );

    const button = screen.getByRole('button', {
      name: 'Reintentar operación de subida',
    });
    expect(button).toBeInTheDocument();
  });

  it('renderiza solo texto si un token no tiene definición en inlineActions', () => {
    render(
      <Mensaje
        message="Token {undefined}sin definición{/undefined}."
        inlineActions={{}}
      />,
    );

    expect(screen.getByText(/sin definición/)).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'sin definición' }),
    ).not.toBeInTheDocument();
  });

  it('no procesa tokens si inlineActions no está definido', () => {
    render(<Mensaje message="Texto con {token}token{/token}." />);

    expect(
      screen.getByText(/Texto con {token}token{\/token}\./),
    ).toBeInTheDocument();
  });

  it('combina trailing link con inline links correctamente', async () => {
    const handleInlineClick = vi.fn();
    const handleTrailingClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Mensaje
        message="Error. {retry}Reintentar{/retry}"
        inlineActions={{
          retry: { onClick: handleInlineClick },
        }}
        link={{
          texto: 'Ver detalles',
          onClick: handleTrailingClick,
        }}
        variant="error"
      />,
    );

    const retryButton = screen.getByRole('button', { name: 'Reintentar' });
    const trailingButton = screen.getByRole('button', { name: 'Ver detalles' });

    await user.click(retryButton);
    expect(handleInlineClick).toHaveBeenCalledTimes(1);

    await user.click(trailingButton);
    expect(handleTrailingClick).toHaveBeenCalledTimes(1);
  });

  it('renderiza el contenido inline sin saltos de línea', () => {
    render(
      <Mensaje
        message="Error al procesar. {retry}Reintentar ahora{/retry} o intentar más tarde."
        inlineActions={{
          retry: { onClick: vi.fn() },
        }}
      />,
    );

    const paragraph = screen.getByText(/Error al procesar\./);
    expect(paragraph.tagName).toBe('P');

    // Verificar que el botón está dentro del mismo párrafo
    const button = screen.getByRole('button', { name: 'Reintentar ahora' });
    expect(paragraph.contains(button)).toBe(true);
  });

  it('incluye el atributo data-testid en el elemento raíz', () => {
    render(<Mensaje message="Hola mundo" />);
    const root = screen.getByTestId('mensaje');
    expect(root).toBeInTheDocument();
  });

  it('renderiza un trailing link independiente y responde al click', async () => {
    const handle = vi.fn();
    const user = userEvent.setup();

    render(
      <Mensaje
        message="Información disponible"
        link={{ texto: 'Más', onClick: handle }}
      />,
    );

    const trailing = screen.getByRole('button', { name: 'Más' });
    expect(trailing).toBeInTheDocument();

    await user.click(trailing);
    expect(handle).toHaveBeenCalledTimes(1);
  });

  it('muestra botón de cierre cuando se pasa onClose y lo ejecuta al click', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    render(<Mensaje message="Cerrar esto" onClose={onClose} />);

    // Buscar cualquier botón cuyo accessible name contenga "cerrar" o "close"
    const closeButton = screen.getByRole('button', { name: /cerrar|close/i });
    expect(closeButton).toBeInTheDocument();

    await user.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('preserva el orden del texto y los tokens inline en el contenido', () => {
    render(
      <Mensaje
        message="A {one}1{/one} B {two}2{/two} C"
        inlineActions={{
          one: { onClick: vi.fn() },
          two: { onClick: vi.fn() },
        }}
      />,
    );

    const root = screen.getByTestId('mensaje');
    // El texto combinado debe respetar el orden y contener los textos renderizados de los botones
    const text = root.textContent?.replace(/\s+/g, ' ').trim();
    expect(text).toContain('A 1 B 2 C');
  });
});
