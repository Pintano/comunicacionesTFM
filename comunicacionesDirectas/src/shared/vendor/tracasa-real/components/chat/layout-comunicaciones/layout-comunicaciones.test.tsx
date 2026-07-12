import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { vi } from 'vitest';
import LayoutComunicaciones from './layout-comunicaciones';

vi.mock('../../../hooks/use-screen-size', () => ({
  useScreenSize: () => ({ isMobile: false }),
}));

describe('Layout LayoutComunicaciones', () => {
  const renderLayout = (props = {}) =>
    render(
      <LayoutComunicaciones
        sidebar={<div>Filtro de prueba</div>}
        header={{
          buttonLeft: 'arrowNarrowLeft',
          textLeft: 'Título de la comunicación',
          textRight: 'Subtítulo de la comunicación',
          buttonRight: 'archive',
        }}
        contenido="Contenido de prueba"
        id=""
        titulo={'Titulo'}
        colapsableSidebar={true}
        mostrarHeader={false}
        {...props}
      />,
    );

  it('renderiza correctamente', () => {
    renderLayout();

    expect(
      screen.getByTestId('layout-comunicaciones-sidebar'),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('layout-comunicaciones-elementos'),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('layout-comunicaciones-contenido'),
    ).toBeInTheDocument();

    expect(screen.getByText('Contenido de prueba')).toBeInTheDocument();
  });

  it('es accesible', async () => {
    const { container } = renderLayout();
    expect((await axe(container)).violations.length).toBe(0);
  });

  it('el boton toggle colapsa y expande los sidebar', () => {
    renderLayout();

    const toggle = screen.getByRole('button', { name: 'Alternar sidebar' });
    const wrapper = screen.getByTestId(
      'layout-comunicaciones-sidebar',
    ).parentElement!;

    expect(wrapper.className).not.toMatch(/cerrado/);

    fireEvent.click(toggle);
    expect(wrapper.className).toMatch(/cerrado/);

    fireEvent.click(toggle);
    expect(wrapper.className).not.toMatch(/cerrado/);
  });

  it('muestra el header dependiendo del valor de mostrarHeader', () => {
    renderLayout({ mostrarHeader: false });
    expect(
      screen.queryByTestId('layout-comunicaciones-header'),
    ).not.toBeInTheDocument();

    renderLayout({ mostrarHeader: true });
    expect(
      screen.getByTestId('layout-comunicaciones-header'),
    ).toBeInTheDocument();
  });
});
