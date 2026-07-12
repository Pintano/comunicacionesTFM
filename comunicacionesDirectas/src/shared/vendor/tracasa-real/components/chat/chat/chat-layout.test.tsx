import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { axe } from 'vitest-axe';
import useComponentsTranslation from '../../../hooks/use-translation';
import { ChatLayout } from './chat-layout';
import { EstadosBocadillo } from '../bocadillo/bocadillo.types';
import { BocadilloProps } from '../bocadillo/bocadillo';

const { t } = useComponentsTranslation();

vi.mock('../../../hooks/use-screen-size', () => ({
  useScreenSize: () => ({ isMobile: false }),
}));

const mensajesMock: BocadilloProps[] = [
  {
    texto: 'Mensaje recibido',
    fecha: new Date('2025-11-03T10:00:00'),
    estado: EstadosBocadillo.Leido,
    esPropio: false,
    esAdjunto: false,
    onClickEnAdjuntos: () => {},
  },
  {
    texto: 'Mensaje enviado',
    fecha: new Date('2025-11-03T10:05:00'),
    estado: EstadosBocadillo.Enviado,
    esPropio: true,
    esAdjunto: false,
    onClickEnAdjuntos: () => {},
  },
  {
    texto: 'Documento adjunto',
    fecha: new Date('2025-11-03T10:10:00'),
    estado: EstadosBocadillo.Leido,
    esPropio: false,
    esAdjunto: true,
    onClickEnAdjuntos: () => {},
  },
];

describe('Componente ChatLayout', () => {
  const renderChat = (props = {}) =>
    render(
      <ChatLayout
        mensajes={mensajesMock}
        onEnviar={() => {}}
        onAdjuntar={() => {}}
        readonly={false}
        textReadonly=""
        {...props}
      ></ChatLayout>,
    );

  it('renderiza correctamente el componente Chat', () => {
    renderChat();

    expect(screen.getByTestId('chatLayout')).toBeInTheDocument();
  });

  it('es accesible', async () => {
    const { container } = renderChat();

    expect((await axe(container)).violations.length).toBe(0);
  });

  it('agrupa mensajes por fecha', () => {
    const mensajes = [
      {
        texto: 'A',
        fecha: new Date('2025-11-03T10:00:00'),
        esPropio: false,
        esAdjunto: false,
        onClickEnAdjuntos: () => {},
      },
      {
        texto: 'B',
        fecha: new Date('2025-11-04T10:00:00'),
        esPropio: false,
        esAdjunto: false,
        onClickEnAdjuntos: () => {},
      },
    ];

    render(<ChatLayout mensajes={mensajes} />);

    expect(screen.getByText('03 de noviembre de 2025')).toBeInTheDocument();
    expect(screen.getByText('04 de noviembre de 2025')).toBeInTheDocument();
  });

  describe('barra inferior', () => {
    it('el botón enviar está deshabilitado cuando no hay texto', () => {
      renderChat({ onEnviar: () => {} });

      expect(screen.getByTestId('enviar')).toBeDisabled();
    });

    it('envía el mensaje al clickar Enviar', () => {
      const handleEnviar = vi.fn();
      renderChat({ onEnviar: handleEnviar });

      const textarea = screen.getByPlaceholderText(
        t('chat.chatLayout.placeholder'),
      );
      fireEvent.change(textarea, { target: { value: 'Hola Mundo' } });

      const botonEnviar = screen.getByTestId('enviar');
      fireEvent.click(botonEnviar);

      expect(handleEnviar).toHaveBeenCalledWith('Hola Mundo');
    });

    it('envía el mensaje al pulsar Enter', () => {
      const handleEnviar = vi.fn();
      renderChat({ onEnviar: handleEnviar });

      const textarea = screen.getByPlaceholderText(
        t('chat.chatLayout.placeholder'),
      );

      fireEvent.change(textarea, { target: { value: 'Hola Mundo' } });
      fireEvent.keyDown(textarea, { key: 'Enter' });

      expect(handleEnviar).toHaveBeenCalledWith('Hola Mundo');
    });

    it('limpia el input tras enviar', async () => {
      const handleEnviar = vi.fn();
      renderChat({ onEnviar: handleEnviar });

      const textarea = screen.getByPlaceholderText(
        t('chat.chatLayout.placeholder'),
      );

      fireEvent.change(textarea, { target: { value: 'Hola Mundo' } });
      fireEvent.keyDown(textarea, { key: 'Enter' });

      const nuevoTextarea = await screen.findByPlaceholderText(
        t('chat.chatLayout.placeholder'),
      );

      expect(nuevoTextarea).toHaveValue('');
    });

    it('muestra aviso en vez de barra de escritura', () => {
      renderChat({ readonly: true, textReadonly: 'aviso bloqueo' });

      expect(
        screen.queryByPlaceholderText(t('chat.chatLayout.placeholder')),
      ).toBeNull();
      expect(screen.getByText('aviso bloqueo')).toBeInTheDocument();
    });
  });
});
