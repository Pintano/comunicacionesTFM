import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../base/button/button';

import { Input } from '../base/inputs-and-formularios/input/input';
import { Section } from '../base/section/section';
import { Modal } from './modal';
import { modalDocumentation } from './modal.docs';
import { generateStorybookDocs } from '../../../.storybook/docs-generator/docs.utils';
import { ListadoPaginado } from '../listado/listado-paginado/listado-paginado';
import { ElementoListadoProps } from '../listado/listado';
import { createColumnDefs } from '../listado/listado-paginado/listado-paginado.utils';
import { createColumnHelper } from '@tanstack/react-table';
import {
  ArbolRelacionados,
  GrupoExpedientes,
} from '../arbol-relacionados/arbol-relacionados';
import { TextArea } from '../base/inputs-and-formularios/text-area/text-area';
import { TextButton } from '../base/text-button/text-button';
import { FormField } from '../base/inputs-and-formularios/form-field/form-field';
import { FormGrid } from '../base/inputs-and-formularios/form-grid/form-grid';
import { Selector } from '../base/inputs-and-formularios/selector-simple/selector';
import { IconoCarga } from '../icono/icono-carga/icono-carga';

const meta: Meta<typeof Modal> = {
  title: 'Componentes/Overlays/Modal',
  component: Modal,
  parameters: {
    docs: {
      description: {
        component: generateStorybookDocs(modalDocumentation),
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100px',
          padding: '1rem',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Modal>;
const pStyles = { fontSize: 14, lineHeight: '20px', fontWeight: 400 };

export const Default: Story = {
  name: 'Modal Simple',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Abrir Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <Modal.Header>Modal Predeterminado</Modal.Header>
          <Modal.Body>
            <p style={pStyles}>
              Este es un modal básico con tamaño medium. Perfecto para mensajes
              simples, confirmaciones o formularios pequeños.
            </p>
            <p style={pStyles}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
              possimus quos quia laborum nostrum debitis nihil labore? Nisi
              cupiditate labore voluptatum officia, veritatis ipsam sapiente
              laboriosam ratione accusantium id illum?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <TextButton
              onClick={() => setIsOpen(false)}
              variant="secondary"
              aria-label="Cancelar"
            >
              Cancelar
            </TextButton>
            <Button
              onClick={() => setIsOpen(false)}
              variant="principal"
              textoAccesibilidad="Aceptar"
            >
              Aceptar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
Modal básico con tamaño predeterminado (medium). Incluye:
- Título en el header
- Contenido de texto en el body
- Dos botones en el footer (Cancelar + Aceptar)

**Ideal para:** Confirmaciones simples, mensajes informativos, diálogos básicos.
        `,
      },
    },
  },
};

export const ConSubtitulo: Story = {
  name: 'Con Subtítulo',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Abrir Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="large">
          <Modal.Header subtitle="Este subtítulo proporciona contexto adicional sobre el contenido del modal">
            Título Principal
          </Modal.Header>
          <Modal.Body>
            <p style={pStyles}>
              El subtítulo es opcional y aparece justo debajo del título
              principal. Es útil para dar más contexto sin saturar el título.
            </p>
            <p style={pStyles}>
              Se muestra en color secundario (color-text-secondary) con
              font-weight medium y se trunca con ellipsis si es muy largo.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => setIsOpen(false)}
              variant="principal"
              textoAccesibilidad="Entendido"
            >
              Entendido
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
Modal con subtítulo opcional en el header. El subtítulo:
- Se muestra en color secundario
- Usa font-weight medium
- Se trunca con ellipsis si es muy largo
- Es totalmente opcional

**Cuándo usar subtítulo:**
- Para aclarar el propósito del modal
- Cuando el título necesita contexto adicional
- Para mostrar información complementaria
        `,
      },
    },
  },
};

export const SinFooter: Story = {
  name: 'Sin Footer',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Abrir Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <Modal.Header>Modal sin Footer</Modal.Header>
          <Modal.Body>
            <p style={pStyles}>
              Este modal no tiene footer. Es útil para casos donde no se
              necesitan acciones adicionales, como mensajes informativos simples
              o cuando el cierre solo se hace con el botón X o ESC.
            </p>
            <p style={pStyles}>El usuario puede cerrar el modal usando:</p>
            <ul>
              <li>✅ Botón X en el header</li>
              <li>✅ Tecla ESC</li>
              <li>✅ Click fuera del modal</li>
            </ul>
          </Modal.Body>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
Modal sin footer. Útil cuando:
- Solo se necesita mostrar información
- No hay acciones específicas requeridas
- El cierre es suficiente con X, ESC o click fuera
        `,
      },
    },
  },
};

export const TamañoMedium: Story = {
  name: 'Medium (512px)',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Abrir Modal Medium</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="medium">
          <Modal.Header>Modal Medium</Modal.Header>
          <Modal.Body>
            <p style={pStyles}>
              <strong>Tamaño:</strong> 512px de ancho.
            </p>
            <p style={pStyles}>
              <strong>Uso recomendado:</strong> Formularios simples,
              confirmaciones, mensajes breves.
            </p>
            <FormGrid>
              <FormField labelText="Campo 1" layout="vertical">
                <Input placeholder="Valor 1" />
              </FormField>
              <FormField labelText="Campo 2" layout="vertical">
                <Input placeholder="Valor 2" />
              </FormField>
            </FormGrid>
          </Modal.Body>
          <Modal.Footer>
            <TextButton
              onClick={() => setIsOpen(false)}
              variant="secondary"
              aria-label="Cancelar"
            >
              Cancelar
            </TextButton>
            <Button onClick={() => setIsOpen(false)} variant="principal">
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
Tamaño predeterminado. Perfecto para:
- Confirmaciones
- Formularios con 2-4 campos
- Mensajes informativos
- Diálogos de alerta
        `,
      },
    },
  },
};

export const TamañoLarge: Story = {
  name: 'Large (768px)',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Abrir Modal Large</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="large">
          <Modal.Header subtitle="Formulario con múltiples campos">
            Formulario de Búsqueda
          </Modal.Header>
          <Modal.Body>
            <FormGrid>
              <FormField labelText="Nombre" layout="vertical">
                <Input placeholder="Introduce el nombre" />
              </FormField>
              <FormField labelText="Apellidos" layout="vertical">
                <Input placeholder="Introduce los apellidos" />
              </FormField>
              <FormField labelText="Email" layout="vertical">
                <Input type="email" placeholder="usuario@ejemplo.com" />
              </FormField>
              <FormField labelText="Teléfono" layout="vertical">
                <Input type="tel" placeholder="+34 600 000 000" />
              </FormField>
              <FormField labelText="Dirección" layout="vertical">
                <Input placeholder="Calle, número, piso" />
              </FormField>
              <FormField labelText="Ciudad" layout="vertical">
                <Input placeholder="Ciudad" />
              </FormField>
            </FormGrid>
          </Modal.Body>
          <Modal.Footer>
            <TextButton
              onClick={() => setIsOpen(false)}
              aria-label="Cancelar"
              variant="secondary"
            >
              Cancelar
            </TextButton>
            <Button onClick={() => setIsOpen(false)} variant="principal">
              Buscar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
Tamaño grande (768px). Ideal para:
- Formularios complejos (6-10 campos)
- Búsquedas avanzadas
- Selección de datos con filtros
- Contenido que necesita más espacio horizontal
        `,
      },
    },
  },
};

export const TamañoFull: Story = {
  name: 'Full (1024px)',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Abrir Modal Full</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="full">
          <Modal.Header subtitle="Modal 1024px de ancho">
            Formulario Extenso con Scroll
          </Modal.Header>
          <Modal.Body>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Section id="datos-personales" title="Datos Personales">
                <FormGrid>
                  <FormField labelText="Nombre" layout="vertical">
                    <Input />
                  </FormField>
                  <FormField labelText="Apellidos" layout="vertical">
                    <Input />
                  </FormField>
                  <FormField labelText="DNI/NIE" layout="vertical">
                    <Input />
                  </FormField>
                  <FormField labelText="Fecha de nacimiento" layout="vertical">
                    <Input type="date" />
                  </FormField>
                </FormGrid>
              </Section>

              <Section id="datos-contacto" title="Datos de Contacto">
                <FormGrid>
                  <FormField labelText="Email" layout="vertical">
                    <Input type="email" />
                  </FormField>
                  <FormField labelText="Teléfono" layout="vertical">
                    <Input type="tel" />
                  </FormField>
                  <FormField labelText="Dirección" layout="vertical">
                    <Input />
                  </FormField>
                  <FormField labelText="Código Postal" layout="vertical">
                    <Input />
                  </FormField>
                </FormGrid>
              </Section>

              <Section id="observaciones" title="Observaciones">
                <FormField labelText="Comentarios" layout="vertical">
                  <TextArea rows={4} placeholder="Escribe tus observaciones" />
                </FormField>
              </Section>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <TextButton
              onClick={() => setIsOpen(false)}
              aria-label="Cancelar"
              variant="secondary"
            >
              Cancelar
            </TextButton>
            <Button onClick={() => setIsOpen(false)} variant="principal">
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
Tamaño completo (1024px). Perfecto para:
- Formularios muy extensos con múltiples secciones
- Vistas completas de datos
- Contenido que requiere scroll vertical
- Casos donde se necesita el máximo espacio disponible
        `,
      },
    },
  },
};

export const TamañoWide: Story = {
  name: 'Wide (1280px)',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Abrir Modal Wide</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="wide">
          <Modal.Header subtitle="Ideal para tablas y contenido ancho">
            Datos en Formato Tabla
          </Modal.Header>
          <Modal.Body>
            <div style={{ overflowX: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '14px',
                }}
              >
                <thead>
                  <tr style={{ background: '#f5f5f5' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>
                      ID
                    </th>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>
                      Nombre
                    </th>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>
                      Email
                    </th>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>
                      Teléfono
                    </th>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>
                      Departamento
                    </th>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 15 }, (_, i) => (
                    <tr
                      key={i}
                      style={{
                        borderBottom: '1px solid #eee',
                      }}
                    >
                      <td style={{ padding: '0.75rem' }}>{i + 1}</td>
                      <td style={{ padding: '0.75rem' }}>Usuario {i + 1}</td>
                      <td style={{ padding: '0.75rem' }}>
                        usuario{i + 1}@ejemplo.com
                      </td>
                      <td style={{ padding: '0.75rem' }}>+34 600 00 00 {i}</td>
                      <td style={{ padding: '0.75rem' }}>
                        Departamento {(i % 5) + 1}
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        {i % 2 === 0 ? 'Activo' : 'Inactivo'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setIsOpen(false)} variant="principal">
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
Tamaño extra ancho (1280px). Diseñado para:
- Tablas con muchas columnas
- Comparación de datos lado a lado
- Contenido que necesita máximo espacio horizontal
- Visualizaciones amplias
        `,
      },
    },
  },
};

export const TamañoFit: Story = {
  name: 'Fit (Ajustado al contenido)',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Abrir Modal Fit</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="fit">
          <Modal.Header>Confirmación</Modal.Header>
          <Modal.Body>
            <p style={pStyles}>¿Estás seguro de que deseas continuar?</p>
          </Modal.Body>
          <Modal.Footer>
            <TextButton
              onClick={() => setIsOpen(false)}
              aria-label="No"
              variant="secondary"
            >
              No
            </TextButton>
            <Button onClick={() => setIsOpen(false)} variant="principal">
              Sí, continuar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
Tamaño ajustado al contenido (fit-content). Útil para:
- Diálogos de confirmación muy breves
- Alertas simples
- Cuando el contenido es mínimo y no necesita un ancho fijo
        `,
      },
    },
  },
};

export const CompactaBasica: Story = {
  name: 'Compacta - Básica',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Abrir Modal Compacta</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size="medium"
          variant="compact"
        >
          <Modal.Header>Confirmación de eliminación</Modal.Header>
          <Modal.Body>
            <p style={pStyles}>
              ¿Estás seguro de que deseas eliminar este elemento? Esta acción no
              se puede deshacer.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <TextButton
              onClick={() => setIsOpen(false)}
              aria-label="Cancelar"
              variant="secondary"
            >
              Cancelar
            </TextButton>
            <Button onClick={() => setIsOpen(false)} variant="principal">
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
Modal con variante compacta (variant="compact"). Aplica espaciados reducidos en:
- Header: Menos padding y gap entre elementos
- Body: Márgenes reducidos
- Footer: Padding y gaps más pequeños

Ideal para diálogos de confirmación rápidos donde se necesita optimizar el espacio.
        `,
      },
    },
  },
};

export const CompactaConSubtitulo: Story = {
  name: 'Compacta - Con Subtítulo',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>
          Abrir Modal Compacta con Subtítulo
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size="medium"
          variant="compact"
        >
          <Modal.Header subtitle="Esta acción afectará a todos los registros seleccionados">
            Confirmar operación masiva
          </Modal.Header>
          <Modal.Body>
            <p style={pStyles}>
              Se van a actualizar 15 expedientes. ¿Deseas continuar con esta
              operación?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <TextButton
              onClick={() => setIsOpen(false)}
              aria-label="Cancelar"
              variant="secondary"
            >
              Cancelar
            </TextButton>
            <Button onClick={() => setIsOpen(false)} variant="principal">
              Confirmar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
Modal compacta con subtítulo. El subtítulo mantiene el espaciado adecuado incluso con la variante compacta, proporcionando contexto adicional sin ocupar demasiado espacio.
        `,
      },
    },
  },
};

export const CompactaFormulario: Story = {
  name: 'Compacta - Formulario',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>
          Abrir Modal Compacta con Formulario
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size="medium"
          variant="compact"
        >
          <Modal.Header>Cambiar contraseña</Modal.Header>
          <Modal.Body>
            <FormGrid>
              <FormField labelText="Contraseña actual" layout="vertical">
                <Input
                  type="password"
                  placeholder="Introduce tu contraseña actual"
                />
              </FormField>
              <FormField labelText="Nueva contraseña" layout="vertical">
                <Input
                  type="password"
                  placeholder="Introduce la nueva contraseña"
                />
              </FormField>
              <FormField labelText="Confirmar contraseña" layout="vertical">
                <Input
                  type="password"
                  placeholder="Confirma la nueva contraseña"
                />
              </FormField>
              <FormField labelText="Fecha de nacimiento" layout="vertical">
                <Input type="date" />
              </FormField>
            </FormGrid>
          </Modal.Body>
          <Modal.Footer>
            <TextButton
              onClick={() => setIsOpen(false)}
              aria-label="Cancelar"
              variant="secondary"
            >
              Cancelar
            </TextButton>
            <Button onClick={() => setIsOpen(false)} variant="principal">
              Actualizar contraseña
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
Modal compacta con formulario. La variante compacta es útil para formularios pequeños donde se necesita optimizar el espacio vertical, especialmente en pantallas más pequeñas.
        `,
      },
    },
  },
};

export const CompactaComparacion: Story = {
  name: 'Compacta - Comparación',
  render: () => {
    const [isOpenDefault, setIsOpenDefault] = useState(false);
    const [isOpenCompact, setIsOpenCompact] = useState(false);

    return (
      <>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button onClick={() => setIsOpenDefault(true)}>
            Abrir Modal Default
          </Button>
          <Button onClick={() => setIsOpenCompact(true)}>
            Abrir Modal Compacta
          </Button>
        </div>

        <Modal
          isOpen={isOpenDefault}
          onClose={() => setIsOpenDefault(false)}
          size="medium"
          variant="default"
        >
          <Modal.Header>Modal con espaciado estándar</Modal.Header>
          <Modal.Body>
            <p style={pStyles}>
              Esta modal usa la variante default (estándar) con espaciados
              normales. Es la opción por defecto y recomendada para la mayoría
              de casos de uso.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <TextButton
              onClick={() => setIsOpenDefault(false)}
              variant="secondary"
              aria-label="Cancelar"
            >
              Cerrar
            </TextButton>
            <Button onClick={() => setIsOpenDefault(false)} variant="principal">
              Confirmar
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          isOpen={isOpenCompact}
          onClose={() => setIsOpenCompact(false)}
          size="medium"
          variant="compact"
        >
          <Modal.Header>Modal con espaciado compacto</Modal.Header>
          <Modal.Body>
            <p style={pStyles}>
              Esta modal usa la variante compact con espaciados reducidos. Útil
              para optimizar espacio en confirmaciones rápidas o pantallas más
              pequeñas.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <TextButton
              onClick={() => setIsOpenCompact(false)}
              variant="secondary"
              aria-label="Cancelar"
            >
              Cerrar
            </TextButton>
            <Button onClick={() => setIsOpenCompact(false)} variant="principal">
              Confirmar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
Comparación visual entre las dos variantes. Abre ambas modales para ver la diferencia de espaciado:
- **Default**: Espaciados estándar, recomendado para uso general
- **Compact**: Espaciados reducidos, para optimización de espacio
        `,
      },
    },
  },
};

export const TituloTruncado: Story = {
  name: 'Título Truncado con Tooltip',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const longTitle =
      'Este es un título extremadamente largo que definitivamente se va a truncar y mostrará un tooltip cuando pases el ratón por encima para poder leer el contenido completo del título';

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>
          Abrir Modal con Título Largo
        </Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="medium">
          <Modal.Header>{longTitle}</Modal.Header>
          <Modal.Body>
            <p style={pStyles}>
              Cuando el título del modal es demasiado largo y excede el ancho
              disponible, se trunca automáticamente con puntos suspensivos
              (text-overflow: ellipsis).
            </p>
            <p style={pStyles}>
              Al pasar el ratón sobre el título truncado, aparece un tooltip
              nativo (atributo title) que muestra el texto completo. Esta
              funcionalidad se detecta automáticamente usando JavaScript que
              compara scrollWidth con clientWidth.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <TextButton
              onClick={() => setIsOpen(false)}
              variant="secondary"
              aria-label="Cancelar"
            >
              Cerrar
            </TextButton>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
Demostración del tooltip automático en títulos truncados:

**Funcionamiento:**
- El título se trunca con \`text-overflow: ellipsis\` cuando excede el ancho
- Se detecta automáticamente si el título está truncado comparando \`scrollWidth > clientWidth\`
- Si está truncado, se añade el atributo \`title\` con el texto completo
- El tooltip nativo del navegador aparece al hacer hover

**Accesibilidad:**
- El atributo \`title\` es accesible para lectores de pantalla
- Se recalcula automáticamente en resize de ventana
        `,
      },
    },
  },
};

export const Confirmacion: Story = {
  name: 'Confirmación',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [resultado, setResultado] = useState('');

    const handleConfirm = () => {
      setResultado('Acción confirmada');
      setIsOpen(false);
    };

    const handleCancel = () => {
      setResultado('Acción cancelada');
      setIsOpen(false);
    };

    return (
      <>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Button onClick={() => setIsOpen(true)}>Eliminar elemento</Button>
          {resultado && (
            <div
              style={{
                padding: '1rem',
                background: '#f0f0f0',
                borderRadius: '4px',
              }}
            >
              Resultado: {resultado}
            </div>
          )}
        </div>
        <Modal isOpen={isOpen} onClose={handleCancel} size="medium">
          <Modal.Header>Confirmar eliminación</Modal.Header>
          <Modal.Body>
            <p style={pStyles}>
              ¿Estás seguro de que deseas eliminar este elemento? Esta acción no
              se puede deshacer.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <TextButton
              onClick={handleCancel}
              variant="secondary"
              aria-label="Cancelar"
            >
              Cancelar
            </TextButton>
            <Button onClick={handleConfirm} variant="principal">
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
Modal de confirmación típico. Características:
- Mensaje claro sobre la acción
- Advertencia si la acción es irreversible
- Dos botones: Cancelar (text-button secondary) y Acción principal
- Callback diferente para cada acción
        `,
      },
    },
  },
};

export const BotonConCarga: Story = {
  name: 'Botón con Cargando (3s)',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cargando, setCargando] = useState(false);

    const handleAccionConCarga = () => {
      setCargando(true);
      setTimeout(() => {
        setCargando(false);
        setIsOpen(false);
      }, 3000);
    };

    const handleClose = () => {
      if (cargando) return;
      setIsOpen(false);
    };

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Abrir modal con carga</Button>
        {cargando && <IconoCarga texto="Cargando..." />}
        <Modal isOpen={isOpen} onClose={handleClose} size="medium">
          <Modal.Header>Simulación de guardado</Modal.Header>
          <Modal.Body>   
              <p style={pStyles}>
                Pulsa "Guardar" para activar el estado de carga del modal.
              </p>
          </Modal.Body>
          <Modal.Footer>
            <TextButton
              onClick={handleClose}
              variant="secondary"
              aria-label="Cancelar"
              disabled={cargando}
            >
              Cancelar
            </TextButton>
            <Button
              onClick={handleAccionConCarga}
              variant="principal"
              disabled={cargando}
            >
              {cargando ? 'Cargando...' : 'Guardar'}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
Modal con estado de carga simulado:
- Al pulsar "Guardar", se activa un indicador de carga
- Se muestra el componente \`IconoCarga\` durante 3 segundos
- El botón principal se deshabilita mientras carga
- Al finalizar, la modal se cierra automáticamente
        `,
      },
    },
  },
};

export const FormularioBusqueda: Story = {
  name: 'Formulario de Búsqueda',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [valor, setValor] = useState<string | null>(null);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Abrir búsqueda avanzada</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="large">
          <Modal.Header subtitle="Introduce los criterios de búsqueda">
            Búsqueda Avanzada
          </Modal.Header>
          <Modal.Body>
            <FormGrid>
              <FormField labelText="Número de expediente" layout="vertical">
                <Input placeholder="Ej: EXP-2024-001" />
              </FormField>
              <FormField labelText="Tipo de procedimiento" layout="vertical">
                <Selector
                  placeholderSelector="Selecciona un tipo"
                  idSeleccionado={valor}
                  onChange={setValor}
                  permitirBusqueda={false}
                  opciones={[
                    { id: '1', texto: 'Civil' },
                    { id: '2', texto: 'Penal' },
                    { id: '3', texto: 'Contencioso' },
                  ]}
                />
              </FormField>
              <FormField labelText="Fecha desde" layout="vertical">
                <Input type="date" />
              </FormField>
              <FormField labelText="Fecha hasta" layout="vertical">
                <Input type="date" />
              </FormField>
              <FormField labelText="Estado" layout="vertical">
                <Selector
                  placeholderSelector="Todos"
                  idSeleccionado={valor}
                  onChange={setValor}
                  permitirBusqueda={false}
                  opciones={[
                    { id: '1', texto: 'Activo' },
                    { id: '2', texto: 'Archivado' },
                    { id: '3', texto: 'En tramitación' },
                  ]}
                />
              </FormField>
              <FormField labelText="Interviniente" layout="vertical">
                <Input placeholder="Nombre del interviniente" />
              </FormField>
            </FormGrid>
          </Modal.Body>
          <Modal.Footer>
            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              <TextButton onClick={() => setIsOpen(false)}>Limpiar</TextButton>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '8px',
                }}
              >
                <TextButton
                  variant="secondary"
                  onClick={() => setIsOpen(false)}
                >
                  Cancelar
                </TextButton>
                <Button onClick={() => setIsOpen(false)} variant="principal">
                  Buscar
                </Button>
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
Formulario de búsqueda avanzada. Incluye:
- Múltiples campos de filtro
- Dropdowns para selección
- Campos de fecha
- Tres botones: Limpiar, Cancelar, Buscar
        `,
      },
    },
  },
};

/**
 * ### 🔄 Modal con Scroll
 *
 * Ejemplo que demuestra el **comportamiento de scroll** cuando el contenido excede el
 * alto disponible del modal.
 *
 * **Características mostradas:**
 * - Scroll vertical automático cuando el contenido es muy largo
 * - Indicador visual de scroll (sombras en header/footer)
 * - El header y footer permanecen fijos
 * - Gestión automática del scroll con el hook `useHasOverflowY`
 *
 * **Ideal para:**
 * - Mostrar contenido extenso (términos y condiciones, políticas)
 * - Formularios largos
 * - Listas con muchos elementos
 */
export const ConScroll: Story = {
  args: {
    size: 'medium',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Abrir modal con scroll</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size={args.size}
        >
          <Modal.Header>Términos y condiciones</Modal.Header>
          <Modal.Body>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              {Array.from({ length: 20 }).map((_, index) => (
                <p key={index} style={pStyles}>
                  {index + 1}. Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat.
                </p>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <TextButton variant="secondary" onClick={() => setIsOpen(false)}>
              Cancelar
            </TextButton>
            <Button onClick={() => setIsOpen(false)} variant="principal">
              Aceptar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
**Comportamiento de scroll:**
- El body del modal tiene un \`max-height\` definido
- Cuando el contenido excede este límite, aparece scroll vertical
- El header y footer permanecen visibles y fijos
- Se añaden sombras sutiles para indicar que hay más contenido

**Implementación:**
- El hook \`useHasOverflowY\` detecta automáticamente si hay overflow
- Se aplican clases CSS condicionales para mostrar las sombras
- El scroll es suave y nativo del navegador
        `,
      },
    },
  },
};

/**
 * ### Modal sin Cerrar al Hacer Clic Fuera
 *
 * Modal que **no se cierra** al hacer clic en el overlay (fondo oscuro). El usuario
 * **debe usar el botón de cerrar** o los botones de acción.
 *
 * **Características mostradas:**
 * - Prop `disableCloseOnClickOutside` activada
 * - El botón X en el header sigue funcionando
 * - Los botones del footer pueden cerrar el modal
 * - Útil para operaciones críticas que requieren confirmación explícita
 *
 * **Casos de uso:**
 * - Confirmaciones de acciones destructivas (eliminar, rechazar)
 * - Formularios con cambios sin guardar
 * - Procesos que no deben interrumpirse
 * - Modales con información crítica
 */
export const DisableCloseOnClickOutside: Story = {
  args: {
    size: 'medium',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Abrir modal bloqueado</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size={args.size}
          disableCloseOnClickOutside
        >
          <Modal.Header subtitle="Este modal solo se cierra con los botones">
            Acción crítica
          </Modal.Header>
          <Modal.Body>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <p style={pStyles}>
                <strong>⚠️ Intenta hacer clic fuera del modal.</strong>
              </p>
              <p style={pStyles}>
                Este modal tiene la propiedad{' '}
                <code>disableCloseOnClickOutside</code> activada, por lo que{' '}
                <strong>no se cerrará</strong> al hacer clic en el overlay
                oscuro.
              </p>
              <p style={pStyles}>
                Esto es útil para operaciones críticas donde necesitas asegurar
                que el usuario tome una decisión explícita usando los botones,
                en lugar de cerrar accidentalmente el modal.
              </p>
              <p style={pStyles}>
                <strong>Opciones disponibles:</strong>
              </p>
              <ul>
                <li>Usar el botón X en el header</li>
                <li>Usar el botón "Cancelar" del footer</li>
                <li>Usar el botón "Confirmar" del footer</li>
              </ul>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <TextButton variant="secondary" onClick={() => setIsOpen(false)}>
              Cancelar
            </TextButton>
            <Button onClick={() => setIsOpen(false)} variant="principal">
              Confirmar acción
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
**Uso de disableCloseOnClickOutside:**

\`\`\`tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  disableCloseOnClickOutside  // ← Bloquea el cierre al hacer clic fuera
>
  {/* contenido */}
</Modal>
\`\`\`

**Recomendaciones:**
- Usa esta opción para operaciones críticas o irreversibles
- Asegura siempre tener botones claros para cerrar el modal
- Informa al usuario por qué el modal no se puede cerrar fácilmente
- Considera usar un subtítulo explicativo en el header
        `,
      },
    },
  },
};

/**
 * ### Selección de Documentos
 *
 * Modal que muestra una **tabla con selección múltiple** de documentos judiciales.
 * Incluye paginación y permite seleccionar varios elementos.
 *
 * **Características mostradas:**
 * - Integración con `ListadoPaginado` para tablas complejas
 * - Selección múltiple de filas
 * - Paginación de resultados
 * - Botón de acción que opera sobre los elementos seleccionados
 * - Tamaño `large` para acomodar la tabla cómodamente
 *
 * **Casos de uso:**
 * - Seleccionar anexos para adjuntar a un expediente
 * - Elegir documentos para generar un informe
 * - Marcar elementos para procesar en lote
 * - Cualquier flujo que requiera selección de múltiples items
 */
export const SeleccionDocumentos: Story = {
  args: {
    size: 'large',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const [seleccionados, setSeleccionados] = useState<Record<string, boolean>>(
      {},
    );

    const handleAgregarSeleccionados = () => {
      console.log('Documentos seleccionados:', seleccionados);
      setIsOpen(false);
    };

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Seleccionar documentos</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size={args.size}
        >
          <Modal.Header subtitle="Selecciona los documentos que deseas adjuntar">
            Seleccionar anexos
          </Modal.Header>
          <Modal.Body>
            <ListadoPaginado
              datos={datosAnexos}
              columnas={columnasAnexos}
              indice={0}
              tamanoPagina={5}
              conSeleccionMultiple={true}
              coloresAlternados={true}
              onCambioSeleccionFila={(selection) => {
                setSeleccionados(selection);
                console.log('Selección actualizada:', selection);
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <TextButton variant="secondary" onClick={() => setIsOpen(false)}>
              Cancelar
            </TextButton>
            <Button
              onClick={handleAgregarSeleccionados}
              variant="principal"
              disabled={Object.keys(seleccionados).length === 0}
            >
              Agregar seleccionados ({Object.keys(seleccionados).length})
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
**Integración con ListadoPaginado:**

\`\`\`tsx
<ListadoPaginado
  datos={datosAnexos}
  columnas={columnasAnexos}
  conSeleccionMultiple={true}  // ← Habilita la selección múltiple
  onCambioSeleccionFila={(selection) => {
    // Maneja los IDs seleccionados
    console.log('Seleccionados:', selection);
  }}
/>
\`\`\`

**Mejores prácticas:**
- Usa \`size="large"\` o mayor para tablas con muchas columnas
- Muestra el número de elementos seleccionados en el botón de acción
- Deshabilita el botón de acción cuando no hay selección
- Proporciona un subtítulo explicativo en el header
- Considera añadir un botón secundario para funciones adicionales
        `,
      },
    },
  },
};

/**
 * ### Navegación por Árbol de Expedientes
 *
 * Modal complejo que muestra un **árbol jerárquico de expedientes relacionados**.
 * Permite cambiar entre vista de tabla y vista de árbol.
 *
 * **Características mostradas:**
 * - Navegación entre diferentes vistas (tabla → árbol)
 * - Árbol de expedientes con estructura jerárquica
 * - Múltiples botones de acción según el estado
 * - Cambio dinámico del contenido del modal
 * - Footer adaptable según la vista activa
 *
 * **Casos de uso:**
 * - Explorar expedientes relacionados jerárquicamente
 * - Navegación entre diferentes niveles de información
 * - Selección de items de estructuras complejas
 * - Workflows con múltiples pasos o vistas
 */
export const ExpedientesRelacionados: Story = {
  args: {
    size: 'large',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const [vistaArbol, setVistaArbol] = useState(false);

    return (
      <>
        <Button
          onClick={() => {
            setIsOpen(true);
            setVistaArbol(false);
          }}
        >
          Ver expedientes relacionados
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            setVistaArbol(false);
          }}
          size={args.size}
        >
          <Modal.Header
            subtitle={
              vistaArbol ? 'Vista de árbol jerárquico' : 'Tabla de documentos'
            }
          >
            {vistaArbol ? 'Expedientes relacionados' : 'Seleccionar anexos'}
          </Modal.Header>
          <Modal.Body>
            {!vistaArbol && (
              <ListadoPaginado
                datos={datosAnexos}
                columnas={columnasAnexos}
                indice={0}
                tamanoPagina={5}
                conSeleccionMultiple={true}
                coloresAlternados={true}
                onCambioSeleccionFila={(selection) =>
                  console.log('Selección:', selection)
                }
              />
            )}
            {vistaArbol && (
              <ArbolRelacionados expedientesOrgano={expedientesEjemplo} />
            )}
          </Modal.Body>
          <Modal.Footer>
            {!vistaArbol && (
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                }}
              >
                <TextButton onClick={() => setVistaArbol(true)}>
                  Ver expedientes relacionados
                </TextButton>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '8px',
                  }}
                >
                  <Button onClick={() => setIsOpen(false)} variant="principal">
                    Agregar seleccionados
                  </Button>
                </div>
              </div>
            )}
            {vistaArbol && (
              <Button onClick={() => setVistaArbol(false)} variant="principal">
                Volver
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
**Implementación de vistas múltiples:**

\`\`\`tsx
const [vistaArbol, setVistaArbol] = useState(false);

return (
  <Modal>
    <Modal.Header subtitle={vistaArbol ? 'Vista árbol' : 'Vista tabla'}>
      {vistaArbol ? 'Expedientes' : 'Anexos'}
    </Modal.Header>
    <Modal.Body>
      {!vistaArbol && <ListadoPaginado {...props} />}
      {vistaArbol && <ArbolRelacionados {...props} />}
    </Modal.Body>
    <Modal.Footer>
      {!vistaArbol && <Button onClick={() => setVistaArbol(true)}>Ver árbol</Button>}
      {vistaArbol && <Button onClick={() => setVistaArbol(false)}>Volver</Button>}
    </Modal.Footer>
  </Modal>
);
\`\`\`

**Ventajas:**
- Un solo modal para múltiples vistas relacionadas
- Transiciones suaves entre estados
- Footer adaptable según el contexto
- Subtítulo dinámico que indica el estado actual
        `,
      },
    },
  },
};

/**
 * ### Modal con Múltiples Acciones
 *
 * Ejemplo de modal con un **footer complejo** que contiene múltiples botones
 * con diferentes funciones y variantes visuales.
 *
 * **Características mostradas:**
 * - Footer con más de 2 botones
 * - Diferentes variantes de botones (principal, secundario, text-button)
 * - Organización visual clara de las acciones
 * - Uso de gap/spacing para separar grupos de botones
 *
 * **Casos de uso:**
 * - Formularios con múltiples opciones de guardado (Guardar, Guardar y Continuar, Guardar como borrador)
 * - Modales con acciones adicionales (Eliminar, Archivar, Cancelar, Guardar)
 * - Workflows complejos con diferentes caminos de acción
 */
export const MultiplesAcciones: Story = {
  args: {
    size: 'medium',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleGuardar = () => {
      console.log('Guardado');
      setIsOpen(false);
    };

    const handleBorrador = () => {
      console.log('Guardado como borrador');
      setIsOpen(false);
    };

    return (
      <>
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Editar documento
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
          size={args.size}
        >
          <Modal.Header subtitle="Selecciona cómo deseas proceder">
            Editar expediente judicial
          </Modal.Header>
          <Modal.Body>
            <CamposEjemplo />
          </Modal.Body>
          <Modal.Footer>
            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              <TextButton onClick={handleBorrador}>
                Guardar como borrador
              </TextButton>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '8px',
                }}
              >
                <TextButton
                  variant="secondary"
                  onClick={() => setIsOpen(false)}
                >
                  Cancelar
                </TextButton>
                <Button onClick={handleGuardar} variant="principal">
                  Guardar
                </Button>
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
**Organización del footer complejo:**

\`\`\`tsx
<Modal.Footer>
  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
    {/* Grupo izquierda: acciones secundarias */}
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <TextButton>Borrador</TextButton>
    </div>

    {/* Grupo derecha: acciones principales */}
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <Button variant="secundario">Cancelar</Button>
      <Button variant="secundario">Guardar</Button>
      <Button variant="principal">Guardar y continuar</Button>
    </div>
  </div>
</Modal.Footer>
\`\`\`

**Recomendaciones:**
- Coloca la acción principal más a la derecha
- Usa variantes visuales para jerarquizar acciones (principal > secundario > TextButton)
- Agrupa botones relacionados con espacio visual
- No sobrecargues el footer (máximo 4-5 botones)
- Considera un dropdown "Más acciones" si necesitas muchas opciones
        `,
      },
    },
  },
};

function CamposEjemplo() {
  return (
    <FormGrid>
      <FormField labelText="Nombre" layout="vertical">
        <Input />
      </FormField>
      <FormField labelText="Apellido" layout="vertical">
        <Input />
      </FormField>
      <FormField labelText="Correo" layout="vertical">
        <Input type="email" />
      </FormField>
      <FormField labelText="Teléfono" layout="vertical">
        <Input type="tel" />
      </FormField>
    </FormGrid>
  );
}

// ============================================================================
// DATOS DE EJEMPLO
// ============================================================================

interface DocumentoJudicial {
  titulo: string;
  tipo: string;
  origen: string;
  fecha: string;
}

interface Person {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
}
const datosAnexos: ElementoListadoProps<DocumentoJudicial>[] = [
  {
    id: 1,
    titulo: 'Demanda laboral',
    tipo: 'Demanda',
    fecha: '2024-11-20',
    origen: 'Civil 1',
  },
  {
    id: 2,
    titulo: 'Resolución apelación',
    tipo: 'Resolución',
    fecha: '2024-10-15',
    origen: 'Superior',
  },
  {
    id: 3,
    titulo: 'Auto embargo',
    tipo: 'Auto',
    fecha: '2024-09-10',
    origen: 'Mercantil 3',
  },
  {
    id: 4,
    titulo: 'Sentencia divorcio',
    tipo: 'Sentencia',
    fecha: '2024-08-05',
    origen: 'Familiar 2',
  },
  {
    id: 5,
    titulo: 'Resolución cautelares',
    tipo: 'Resolución',
    fecha: '2024-07-25',
    origen: 'Penal 4',
  },
  {
    id: 6,
    titulo: 'Demanda nulidad',
    tipo: 'Demanda',
    fecha: '2024-06-18',
    origen: 'Civil 3',
  },
  {
    id: 7,
    titulo: 'Informe médico',
    tipo: 'Informe',
    fecha: '2024-05-12',
    origen: 'Penal 1',
  },
  {
    id: 8,
    titulo: 'Resolución laboral',
    tipo: 'Resolución',
    fecha: '2024-04-30',
    origen: 'Laboral',
  },
  {
    id: 9,
    titulo: 'Auto archivo',
    tipo: 'Auto',
    fecha: '2024-03-22',
    origen: 'Mercantil 2',
  },
  {
    id: 10,
    titulo: 'Demanda custodia',
    tipo: 'Demanda',
    fecha: '2024-02-14',
    origen: 'Familiar 5',
  },
  {
    id: 11,
    titulo: 'Sentencia civil',
    tipo: 'Sentencia',
    fecha: '2024-01-08',
    origen: 'Civil 4',
  },
  {
    id: 12,
    titulo: 'Resolución admin.',
    tipo: 'Resolución',
    fecha: '2023-12-28',
    origen: 'Administrativo',
  },
  {
    id: 13,
    titulo: 'Auto juicio',
    tipo: 'Auto',
    fecha: '2023-11-15',
    origen: 'Penal 2',
  },
  {
    id: 14,
    titulo: 'Demanda daños',
    tipo: 'Demanda',
    fecha: '2023-10-03',
    origen: 'Civil 6',
  },
];

const columnHelperAnexos =
  createColumnHelper<ElementoListadoProps<DocumentoJudicial>>();
const columnasAnexos = createColumnDefs(columnHelperAnexos, [
  {
    id: 'titulo',
    texto: 'Título',
    tipo: 'texto',
    tamano: 20,
    alinear: 'izquierda',
  },
  {
    id: 'fecha',
    texto: 'Fecha',
    tipo: 'texto',
    tamano: 20,
    alinear: 'izquierda',
  },
  {
    id: 'tipo',
    texto: 'Tipo',
    tipo: 'texto',
    tamano: 10,
    alinear: 'izquierda',
  },
  {
    id: 'origen',
    texto: 'Origen',
    tipo: 'texto',
    tamano: 10,
    alinear: 'izquierda',
  },
]);
const columnHelperIntervinientes =
  createColumnHelper<ElementoListadoProps<Person>>();
const columnasIntervinientes = createColumnDefs(columnHelperIntervinientes, [
  {
    id: 'firstName',
    texto: 'First Name',
    tipo: 'texto',
    tamano: 20,
    alinear: 'izquierda',
  },
  {
    id: 'lastName',
    texto: 'Last Name',
    tipo: 'texto',
    tamano: 30,
    alinear: 'izquierda',
  },
  {
    id: 'status',
    texto: 'Status',
    tipo: 'texto',
    tamano: 20,
    alinear: 'izquierda',
  },
  {
    id: 'progress',
    texto: 'Progress',
    tipo: 'texto',
    tamano: 20,
    alinear: 'izquierda',
  },
]);

const expedientesEjemplo: GrupoExpedientes[] = [
  {
    id: 1,
    nombreOrgano: 'AP. Secc1° (Civil) - Araba/Álava (Vitoria-Gasteiz)',
    expedientes: [
      {
        titulo: 'ABI 0060824/2021 01',
        sinPermiso: false,
        descripcionExpedienteArbol: 'Recurso de apelación - Demanda laboral',
        idObjetoEncriptado: 'exp_001',
        activo: true,
        onClick: (idObjeto: string | number) => {
          console.log('Expediente seleccionado:', idObjeto);
          return idObjeto;
        },
        subExpedientes: [
          {
            titulo: 'ABI 0060824/2021 02',
            sinPermiso: true,
            descripcionExpedienteArbol:
              'Sub-expediente asociado (sin permisos)',
            idObjetoEncriptado: 'exp_001_001',
            activo: true,
            onClick: (idObjeto: string | number) => {
              console.log('Sub-expediente seleccionado:', idObjeto);
              return idObjeto;
            },
          },
          {
            titulo: 'ABI 0060824/2021 03',
            sinPermiso: false,
            descripcionExpedienteArbol: 'Medidas cautelares',
            idObjetoEncriptado: 'exp_001_002',
            activo: true,
            onClick: (idObjeto: string | number) => {
              console.log('Sub-expediente seleccionado:', idObjeto);
              return idObjeto;
            },
          },
        ],
      },
      {
        titulo: 'ABI 0060825/2021 00',
        sinPermiso: false,
        descripcionExpedienteArbol: 'Divorcio contencioso',
        idObjetoEncriptado: 'exp_002',
        activo: true,
        onClick: (idObjeto: string | number) => {
          console.log('Expediente seleccionado:', idObjeto);
          return idObjeto;
        },
        subExpedientes: [
          {
            titulo: 'ABI 0060825/2021 01',
            sinPermiso: false,
            descripcionExpedienteArbol: 'Custodia de menores',
            idObjetoEncriptado: 'exp_002_001',
            activo: true,
            onClick: (idObjeto: string | number) => {
              console.log('Sub-expediente seleccionado:', idObjeto);
              return idObjeto;
            },
          },
        ],
      },
    ],
  },
  {
    id: 2,
    nombreOrgano: 'Juzgado de lo Penal nº 2 - Barcelona',
    expedientes: [
      {
        titulo: 'RQE 0060171/2024 00',
        sinPermiso: true,
        descripcionExpedienteArbol: 'Procedimiento penal (sin permisos)',
        idObjetoEncriptado: 'exp_003',
        activo: true,
        onClick: (idObjeto: string | number) => {
          console.log('Expediente seleccionado:', idObjeto);
          return idObjeto;
        },
      },
      {
        titulo: 'RQE 0060172/2024 00',
        sinPermiso: false,
        descripcionExpedienteArbol: 'Delito contra la salud pública',
        idObjetoEncriptado: 'exp_004',
        activo: true,
        onClick: (idObjeto: string | number) => {
          console.log('Expediente seleccionado:', idObjeto);
          return idObjeto;
        },
      },
    ],
  },
  {
    id: 3,
    nombreOrgano: 'Juzgado de lo Mercantil nº 1 - Madrid',
    expedientes: [
      {
        titulo: 'MERC 0001234/2023 00',
        sinPermiso: false,
        descripcionExpedienteArbol: 'Concurso de acreedores',
        idObjetoEncriptado: 'exp_005',
        activo: true,
        onClick: (idObjeto: string | number) => {
          console.log('Expediente seleccionado:', idObjeto);
          return idObjeto;
        },
        subExpedientes: [
          {
            titulo: 'MERC 0001234/2023 01',
            sinPermiso: false,
            descripcionExpedienteArbol: 'Pieza separada - Calificación',
            idObjetoEncriptado: 'exp_005_001',
            activo: true,
            onClick: (idObjeto: string | number) => {
              console.log('Sub-expediente seleccionado:', idObjeto);
              return idObjeto;
            },
          },
          {
            titulo: 'MERC 0001234/2023 02',
            sinPermiso: false,
            descripcionExpedienteArbol:
              'Pieza separada - Acción de reintegración',
            idObjetoEncriptado: 'exp_005_002',
            activo: true,
            onClick: (idObjeto: string | number) => {
              console.log('Sub-expediente seleccionado:', idObjeto);
              return idObjeto;
            },
          },
        ],
      },
    ],
  },
];
