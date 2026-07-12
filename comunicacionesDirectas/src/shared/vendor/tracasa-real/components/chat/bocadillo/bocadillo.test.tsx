import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { vi } from 'vitest';
import useComponentsTranslation from '../../../hooks/use-translation';
import { Bocadillo } from './bocadillo';
import { EstadosBocadillo } from './bocadillo.types';

const { t } = useComponentsTranslation();

describe('Componente Bocadillo', () => {
  const renderBocadillo = (props = {}) =>
    render(
      <Bocadillo
        texto="Hola Mundo"
        fecha={new Date('2009-06-12T04:13:00')}
        estado={EstadosBocadillo.Enviado}
        esPropio={true}
        esGenerico={false}
        esAdjunto={false}
        onClickEnAdjuntos={() => {}}
        {...props}
      />,
    );

  it('renderiza el componente Bocadillo', () => {
    renderBocadillo();
    expect(screen.getByTestId('bocadillo')).toBeInTheDocument();
  });

  it('es accesible el componente Bocadillo', async () => {
    const { container } = renderBocadillo();
    expect((await axe(container)).violations.length).toBe(0);
  });

  it('muestra el texto del mensaje', () => {
    renderBocadillo({ texto: 'Hola mundo' });
    expect(screen.getByText('Hola mundo')).toBeInTheDocument();
  });

  it('muestra la hora correctamente formateada', () => {
    renderBocadillo({ fecha: new Date('2009-06-12T04:13:00') });
    expect(screen.getByText('04:13')).toBeInTheDocument();
  });

  it('ejecuta la función al hacer clic en adjuntos', () => {
    const handleClick = vi.fn();
    renderBocadillo({
      texto: 'Archivo.pdf',
      esAdjunto: true,
      onClickEnAdjuntos: handleClick,
    });

    screen.getByText(t('chat.bocadillo.descargar')).click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
