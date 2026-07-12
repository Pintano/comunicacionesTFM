import { render, screen } from '@testing-library/react';
import { TarjetaComunicacion } from './tarjeta-comunicacion';
import { axe } from 'vitest-axe';
import { vi } from 'vitest';
import styles from './tarjeta-comunicacion.module.scss';

describe('Componente Tarjeta Comunicacion', () => {
  const renderTarjeta = (props = {}) =>
    render(
      <TarjetaComunicacion
        id={0}
        titulo={'Titulo de prueba'}
        subtitulo={'Subtítulo de prueba'}
        notaSuperior={'04/13'}
        icono={'archive'}
        colorIcono={'primario'}
        texto={'Texto de prueba'}
        onClick={() => {}}
        seleccionada={false}
        archivada={false}
        disabled={false}
        esBoton={false}
        contador={0}
        {...props}
      ></TarjetaComunicacion>,
    );

  it('renderiza correctamente el componente Tarjeta Comunicacion', () => {
    renderTarjeta({
      titulo: 'Titulo de prueba',
      notaSuperior: '04/13',
      texto: 'Texto de prueba',
    });

    expect(screen.getByTestId('tarjetaComunicacion')).toBeInTheDocument();

    expect(screen.getByText('Titulo de prueba')).toBeInTheDocument();
    expect(screen.getByText('04/13')).toBeInTheDocument();
    expect(screen.getByText('Texto de prueba')).toBeInTheDocument();
  });

  it('es accesible', async () => {
    const { container } = renderTarjeta();

    expect((await axe(container)).violations.length).toBe(0);
  });

  it('muestra el subtítulo solo cuando se proporciona', () => {
    renderTarjeta({ subtitulo: '' });
    expect(screen.queryByText('Subtexto')).not.toBeInTheDocument();

    renderTarjeta({ subtitulo: 'Subtexto' });
    expect(screen.getByText('Subtexto')).toBeInTheDocument();
  });

  it('muestra el icono solo cuando se pasa la prop', () => {
    renderTarjeta({ icono: '', colorIcono: '' });
    expect(document.querySelector(`.${styles.icono}`)).toBeNull();

    renderTarjeta({ icono: 'archive', colorIcono: 'primario' });
    expect(document.querySelector(`.${styles.icono}`)).not.toBeNull();
  });

  it('muestra el badge solo cuando contador es mayor que 0', () => {
    renderTarjeta();
    expect(screen.queryByText('0')).not.toBeInTheDocument();

    renderTarjeta({ contador: 0 });
    expect(screen.queryByText('0')).not.toBeInTheDocument();

    renderTarjeta({ contador: 3 });
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('ejecuta el onClick cuando se hace click en la tarjeta', () => {
    const fn = vi.fn();
    renderTarjeta({ onClick: fn });

    const tarjeta = screen.getByTestId('tarjetaComunicacion');
    tarjeta.click();

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
