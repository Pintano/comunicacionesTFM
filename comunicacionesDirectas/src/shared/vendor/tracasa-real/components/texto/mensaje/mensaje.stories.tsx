import type { Meta, StoryObj } from '@storybook/react-vite';
import type { MensajeProps } from './mensaje';
import { Mensaje } from './mensaje';
import { mensajeDocumentation } from './mensaje.docs';
import { generateStorybookDocs } from '../../../../.storybook/docs-generator/docs.utils';
import { CabeceraEstandar } from '../../cabecera/cabecera-estandar/cabecera-estandar';
//import logoAvantius from '../../../assets/images/logoAvantius.svg';
import { PanelInformacion } from '../../panel-informacion/panel-informacion';
import { FormGrid } from '../../base/inputs-and-formularios/form-grid/form-grid';
import { FormField } from '../../base/inputs-and-formularios/form-field/form-field';
import { Input } from '../../base/inputs-and-formularios/input/input';

const meta: Meta<MensajeProps> = {
  title: 'Componentes/Feedback/Mensaje',
  component: Mensaje,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: generateStorybookDocs(mensajeDocumentation),
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Variante visual del mensaje',
    },
    mode: {
      control: 'select',
      options: ['banner', 'inline'],
      description:
        'Modo de visualización (banner con borde o inline sin borde)',
    },
    compact: {
      control: 'boolean',
      description: 'Versión compacta con menor padding',
    },
    message: {
      control: 'text',
      description: 'Texto del mensaje',
    },
    collapsible: {
      control: 'boolean',
      description: 'Permite que el mensaje se pueda colapsar (mostrar ...)',
    },
    defaultExpanded: {
      control: 'boolean',
      description: 'Estado inicial del mensaje colapsable',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// ============================================
// VARIANTES BÁSICAS EN MODO BANNER
// ============================================

export const Info: Story = {
  args: {
    message: 'Este es un mensaje informativo',
    variant: 'info',
    onClose: undefined,
  },
};

export const Success: Story = {
  args: {
    message: 'Operación completada exitosamente',
    variant: 'success',
    onClose: undefined,
  },
};

export const Warning: Story = {
  args: {
    message: 'Ten cuidado, esta acción puede tener consecuencias',
    variant: 'warning',
    onClose: undefined,
  },
};

export const Error: Story = {
  args: {
    message: 'Ha ocurrido un error al procesar tu solicitud',
    variant: 'error',
    onClose: undefined,
  },
};

// ============================================
// CON BOTÓN DE CIERRE (onClose)
// ============================================

export const ConBotonCerrar: Story = {
  name: 'Info + Icono cerrar',
  args: {
    message: 'Este mensaje se puede cerrar',
    variant: 'info',
    onClose: () => alert('Mensaje cerrado'),
  },
};

export const SuccessConCierre: Story = {
  name: 'Éxito + Icono cerrar',
  args: {
    message: 'Operación exitosa. Puedes cerrar esta notificación',
    variant: 'success',
    onClose: () => alert('Mensaje cerrado'),
  },
};

export const ErrorConCierre: Story = {
  name: 'Error + Icono cerrar',
  args: {
    message: 'Error al guardar los cambios',
    variant: 'error',
    onClose: () => alert('Mensaje cerrado'),
  },
};
// ============================================
// CON BOTÓN DE plegar
// ============================================

export const ConBotonColapsable: Story = {
  name: 'Info + Icono Colapsable',
  args: {
    message:
      'Este es un mensaje muy largo que se puede colapsar. Es importante que el mensaje sea completamente legible y que el usuario sea capaz de entender todo el contenido sin problemas. El texto se ajusta automáticamente al ancho del contenedor.',
    variant: 'info',
    collapsible: true,
    defaultExpanded: false,
    onClose: undefined,
  },
};

export const SuccessConColapsable: Story = {
  name: 'Éxito + Icono Colapsable',
  args: {
    message:
      'Este es un mensaje muy largo que se puede colapsar. Es importante que el mensaje sea completamente legible y que el usuario sea capaz entender todo el contenido sin problemas. El texto se ajusta automáticamente al ancho del contenedor.',
    variant: 'success',
    collapsible: true,
    defaultExpanded: false,
    onClose: undefined,
  },
};

export const ErrorConColapsable: Story = {
  name: 'Error + Icono Colapsable',
  args: {
    message:
      'Este es un mensaje muy largo que se puede colapsar. Es importante que el mensaje sea completamente legible y que el usuario sea  entender todo el contenido sin problemas. El texto se ajusta automáticamente al ancho del contenedor.',
    variant: 'error',
    collapsible: true,
    defaultExpanded: false,
    onClose: undefined,
  },
};
// ============================================
// MODO INLINE (sin borde)
// ============================================

export const InlineInfo: Story = {
  args: {
    message: 'Mensaje informativo integrado en el flujo del contenido',
    variant: 'info',
    mode: 'inline',
  },
};

export const InlineSuccess: Story = {
  args: {
    message: 'Mensaje de éxito sin borde',
    variant: 'success',
    mode: 'inline',
  },
};

export const InlineWarning: Story = {
  args: {
    message: 'Mensaje de advertencia sin borde',
    variant: 'warning',
    mode: 'inline',
  },
};

export const InlineError: Story = {
  args: {
    message: 'Mensaje de error sin borde',
    variant: 'error',
    mode: 'inline',
  },
};

// ============================================
// VERSIÓN COMPACTA
// ============================================

export const CompactInfo: Story = {
  name: 'Compacto Info',
  args: {
    message: 'Mensaje informativo compacto',
    variant: 'info',
    compact: true,
    onClose: undefined,
  },
};

export const CompactConCierre: Story = {
  name: 'Compacto + Icono cerrar',
  args: {
    message: 'Mensaje compacto con botón de cerrar',
    variant: 'warning',
    compact: true,
    onClose: () => alert('Mensaje cerrado'),
  },
};

// ============================================
// CON LINK
// ============================================

export const ConLink: Story = {
  args: {
    message: 'Este mensaje incluye un enlace para más información',
    variant: 'info',
    link: {
      texto: 'Ver detalles',
      onClick: () => alert('Click en el enlace'),
    },
  },
};

export const ConLinkEIcono: Story = {
  name: 'Con link + Icono',
  args: {
    message: 'Mensaje con enlace que incluye icono',
    variant: 'warning',
    onClose: undefined,
    link: {
      texto: 'Ir a configuración',
      icono: 'arrowRight',
      onClick: () => alert('Click en el enlace con icono'),
    },
  },
};

export const ConLinkYCierre: Story = {
  name: 'Con link + Icono + Cierre',
  args: {
    message: 'Puedes ver más detalles o cerrar este mensaje',
    variant: 'info',
    link: {
      texto: 'Ver más',
      icono: 'arrowRight',
      onClick: () => alert('Ver más detalles'),
    },
    onClose: () => alert('Mensaje cerrado'),
  },
};

// ============================================
// COMPACTO CON LINK (link en nueva línea)
// ============================================

export const CompactoConLink: Story = {
  name: 'Compacto con link',
  args: {
    message: 'Mensaje compacto - el enlace aparece en la siguiente línea',
    variant: 'error',
    compact: true,
    onClose: undefined,
    link: {
      texto: 'Reintentar',
      onClick: () => alert('Reintentando...'),
    },
  },
};

export const CompactoConLinkYCierre: Story = {
  name: 'Compacto con link + Icono cerrar',
  args: {
    message: 'Error en la operación',
    variant: 'error',
    compact: true,
    link: {
      texto: 'Reintentar',
      onClick: () => alert('Reintentando...'),
    },
    onClose: () => alert('Mensaje cerrado'),
  },
};

// ============================================
// MENSAJE LARGO
// ============================================

export const MensajeLargo: Story = {
  args: {
    message:
      'Este es un mensaje muy largo que contiene mucha información importante que el usuario necesita leer. Es importante que el mensaje sea completamente legible y que el usuario pueda entender todo el contenido sin problemas. El texto se ajusta automáticamente al ancho del contenedor.',
    variant: 'info',
    onClose: undefined,
  },
};

export const MensajeLargoConCierre: Story = {
  name: 'Mensaje largo + Icono cerrar',
  args: {
    message:
      'Este es un mensaje muy largo que contiene mucha información importante. Incluye un botón de cerrar que permanece alineado en la parte superior derecha, independientemente de la longitud del texto.',
    variant: 'warning',
    onClose: () => alert('Mensaje cerrado'),
  },
};

export const ConEnlaceInlineOnClick: Story = {
  args: {
    message: 'Error al subir el archivo. {retry}Reintentar{/retry}',
    variant: 'error',
    inlineActions: {
      retry: {
        onClick: () => alert('Reintentando...'),
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Muestra un mensaje con texto interactivo usando `onClick` (acción). El texto entre `{retry}` y `{/retry}` se renderiza como un TextButton que ejecuta la acción especificada. El texto interactivo se muestra en línea con el texto sin saltos de línea.',
      },
    },
  },
};

export const ConMultiplesEnlacesInline: Story = {
  args: {
    message:
      'Error al procesar: {retry}reintentar operación{/retry} o {cancel}cancelar{/cancel}.',
    variant: 'warning',
    inlineActions: {
      retry: { onClick: () => alert('Reintentando...') },
      cancel: { onClick: () => alert('Cancelado') },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Muestra un mensaje con múltiples textos interactivos de acción (`onClick`). Puedes combinar tantos textos interactivos como necesites en un mismo mensaje. Todos se renderizan como TextButton en línea con el texto.',
      },
    },
  },
};

// ============================================
// COMPARATIVA DE CASOS DE USO
// ============================================

export const Showcase: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '600px',
      }}
    >
      <h3>Básico vs Con cierre</h3>
      <Mensaje message="Mensaje básico sin cierre" variant="info" />
      <Mensaje
        message="Mensaje con botón de cerrar"
        variant="info"
        onClose={() => alert('Cerrado')}
      />

      <h3>Normal vs Compacto</h3>
      <Mensaje message="Mensaje normal" variant="success" />
      <Mensaje message="Mensaje compacto" variant="success" compact />

      <h3>Banner vs Inline</h3>
      <Mensaje message="Mensaje banner (con borde)" variant="warning" />
      <Mensaje
        message="Mensaje inline (sin borde)"
        variant="warning"
        mode="inline"
      />

      <h3>Con link: Normal vs Compacto</h3>
      <Mensaje
        message="Link en la misma línea"
        variant="info"
        link={{ texto: 'Ver más', onClick: () => {} }}
      />
      <Mensaje
        message="Link en nueva línea (compacto)"
        variant="info"
        compact
        link={{ texto: 'Ver más', onClick: () => {} }}
      />

      <h3>Mensajes con textos interactivos</h3>
      <Mensaje
        message="Error al subir el archivo. {retry}Reintentar{/retry}"
        variant="error"
        inlineActions={{
          retry: {
            onClick: () => alert('Reintentando...'),
          },
        }}
      />
      <Mensaje
        message="Error al procesar: {retry}reintentar operación{/retry} o {cancel}cancelar{/cancel}."
        variant="warning"
        inlineActions={{
          retry: { onClick: () => alert('Reintentando...') },
          cancel: { onClick: () => alert('Cancelado') },
        }}
      />
    </div>
  ),
};

export const ConElementosEnLayout: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '900px',
      }}
    >
      <CabeceraEstandar
        //logoUrl={logoAvantius}
        title="Sistema Avanzado"
        subtitle="Con notificaciones"
      />

      <Mensaje
        message="Mensaje con botón de cerrar"
        variant="info"
        onClose={() => alert('Cerrado')}
      />

      <PanelInformacion
        titulo="Formato DD/MM/YYYY HH:MM"
        fecha="08/07/2025 14:30"
        descripcion="Fecha en formato día/mes/año con hora."
        abiertoPorDefecto={true}
      />

      <Mensaje
        message="Error al procesar: {retry}reintentar operación{/retry} o {cancel}cancelar{/cancel}."
        variant="warning"
        inlineActions={{
          retry: { onClick: () => alert('Reintentando...') },
          cancel: { onClick: () => alert('Cancelado') },
        }}
      />

      <h3 style={{ marginBottom: '1rem' }}>Formulario</h3>
      <FormGrid>
        <FormField id="campo1" labelText="Campo 1">
          <Input id="campo1" />
        </FormField>

        <FormField id="campo2" labelText="Campo 2">
          <Input id="campo2" />
        </FormField>

        <FormField id="campo3" labelText="Campo 3" skipColumn="right">
          <Input id="campo3" />
        </FormField>

        <FormField id="campo4" labelText="Campo 4" fullWidth>
          <Input id="campo4" />
        </FormField>

        <FormField id="campo5" labelText="Campo 5" fullWidth>
          <Input id="campo5" />
        </FormField>
      </FormGrid>
    </div>
  ),
};

const contenidoEjemplo = (
  <div>
      Este mensaje puede mostrar contenido enriquecido y no solo una cadena de
      texto.
      <p>Párrafo con mucho mucho mucho mucho mucho mucho mucho mucho mucho mucho mucho mucho mucho mucho mucho mucho mucho mucho mucho mucho mucho mucho mucho mucho mucho mucho mucho mucho mucho mucho mucho mucho mucho mucho mucho mucho mucho mucho texto</p>
    <ul>
      <li>Bloques de texto</li>
      <li>Listas con varios elementos</li>
      <li>Composición con cualquier nodo React</li>
    </ul>
  </div>
);
export const ConSaltoDeLinea: Story = {
  args: {
    message: contenidoEjemplo,
    link: {
      texto: 'Ver detalles',
      onClick: () => alert('Click en el enlace'),
    },
    collapsible: true,
    defaultExpanded: false,
    onClose: undefined,
  },
};

const contenidoEjemploVariosParrafos = (
  <div>
      Estos son
      <p/>
      varios párrafos
      <p/>
      para mostrar el mensaje
      <p/>
      colapsado
  </div>
);
export const ConSaltoDeLineaVariosParrafos: Story = {
  args: {
    message: contenidoEjemploVariosParrafos,
    link: {
      texto: 'Ver detalles',
      onClick: () => alert('Click en el enlace'),
    },
    collapsible: true,
    defaultExpanded: false,
    onClose: undefined,
    compact: true,
  },
};
