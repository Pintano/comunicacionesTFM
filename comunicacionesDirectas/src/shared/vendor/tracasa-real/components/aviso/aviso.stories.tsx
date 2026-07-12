import type { Meta, StoryObj } from '@storybook/react-vite';
import { Aviso } from './aviso';
import { fn } from 'storybook/test';

const meta: Meta<typeof Aviso> = {
  title: 'Componentes/Feedback/Aviso',
  component: Aviso,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Tipo/variante del aviso',
    },
    message: {
      control: 'text',
      description: 'Texto del mensaje a mostrar',
    },
    duration: {
      control: 'number',
      description:
        'Duración en ms antes de cerrar automáticamente (0 = no se cierra)',
    },
    onClose: {
      description: 'Callback cuando el aviso se cierra',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Aviso>;

// ============================================
// VARIANTES BÁSICAS
// ============================================

export const Info: Story = {
  args: {
    message: 'Este es un mensaje informativo',
    variant: 'info',
    duration: 0,
    onClose: fn(),
  },
};

export const Success: Story = {
  args: {
    message: 'Operación completada exitosamente',
    variant: 'success',
    duration: 0,
    onClose: fn(),
  },
};

export const Warning: Story = {
  args: {
    message: 'Ten cuidado, esta acción puede tener consecuencias',
    variant: 'warning',
    duration: 0,
    onClose: fn(),
  },
};

export const Error: Story = {
  args: {
    message: 'Ha ocurrido un error al procesar tu solicitud',
    variant: 'error',
    duration: 0,
    onClose: fn(),
  },
};

// ============================================
// CON AUTO-CIERRE (duration)
// ============================================

export const ConAutoCierre3Seg: Story = {
  name: 'Info + Auto-cierre (3s)',
  args: {
    message: 'Este aviso se cerrará automáticamente en 3 segundos',
    variant: 'info',
    duration: 3000,
    onClose: fn(),
  },
};

export const SuccessAutoCierre: Story = {
  name: 'Success + Auto-cierre (5s)',
  args: {
    message: 'Cambios guardados. Este aviso desaparecerá en 5 segundos',
    variant: 'success',
    duration: 5000,
    onClose: fn(),
  },
};

export const ErrorAutoCierre: Story = {
  name: 'Error + Auto-cierre (4s)',
  args: {
    message: 'Error de conexión. Reintentando...',
    variant: 'error',
    duration: 4000,
    onClose: fn(),
  },
};

// ============================================
// MENSAJES LARGOS
// ============================================

export const MensajoLargo: Story = {
  args: {
    message:
      'Este es un mensaje muy largo que contiene mucha información importante. El aviso se posiciona en la parte superior de la pantalla y ocupa como máximo el 80% del ancho disponible. El usuario puede cerrar el aviso haciendo clic en la X o esperando a que se cierre automáticamente si se proporciona una duración.',
    variant: 'warning',
    duration: 0,
    onClose: fn(),
  },
};

// ============================================
// SHOWCASE DE VARIANTES
// ============================================

export const Showcase: Story = {
  render: () => (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Los avisos aparecen en la parte superior fija de la pantalla</h2>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Cada aviso puede cerrarse manualmente (icono X) o automáticamente
        después de una duración especificada.
      </p>
      <Aviso
        message="Info: Este es un mensaje informativo"
        variant="info"
        duration={0}
        onClose={fn()}
      />
    </div>
  ),
};

// ============================================
// COMPORTAMIENTO DE TOAST
// ============================================

export const ComportamientoToast: Story = {
  name: 'Comportamiento de Toast',
  render: () => (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h3>Características del componente Aviso (Toast)</h3>
      <ul
        style={{ textAlign: 'left', display: 'inline-block', margin: '2rem 0' }}
      >
        <li>✅ Se posiciona de forma fija en la parte superior</li>
        <li>✅ Animación de entrada y salida suave</li>
        <li>✅ Botón de cierre (X) en la esquina superior derecha</li>
        <li>✅ Auto-cierre opcional basado en duración</li>
        <li>✅ 4 variantes visuales (info, success, warning, error)</li>
        <li>✅ Accesibilidad con aria-live</li>
        <li>✅ Reutiliza el componente Mensaje para contenido</li>
      </ul>
      <Aviso
        message="Este es un ejemplo de aviso funcionando"
        variant="success"
        duration={0}
        onClose={fn()}
      />
    </div>
  ),
};
