export const modalDocumentation = {
  title: 'Modal',
  description:
    'Componente versátil para mostrar contenido en una ventana modal superpuesta. Proporciona un diálogo modal completo con portal rendering, gestión de foco, navegación por teclado y múltiples opciones de personalización. Ideal para formularios, confirmaciones, selección de datos y cualquier interacción que requiera el foco completo del usuario.',

  whenToUse: [
    'Para mostrar formularios que requieren atención completa del usuario',
    'Cuando se necesita confirmar acciones importantes o destructivas',
    'Para seleccionar elementos de listas o tablas (con paginación)',
    'Al mostrar detalles extensos que no caben en el flujo principal',
    'Para workflows de múltiples pasos que requieren contexto aislado',
    'Cuando se necesita editar datos sin perder el contexto de la página principal',
    'Para mostrar contenido temporal que no justifica una nueva página',
  ],

  whenNotToUse: [
    'Para notificaciones breves o mensajes informativos (usar Toast o Alert)',
    'Como navegación principal de la aplicación (usar menús o sidebar)',
    'Para tooltips o ayuda contextual simple (usar Tooltip component)',
    'Cuando el contenido es muy extenso y requiere su propia página dedicada',
    'Para mostrar menús desplegables simples (usar Dropdown)',
    'Si se necesitan múltiples modales anidados (limitar a un nivel cuando sea posible)',
  ],

  keyAdvantage:
    'Modal proporciona una experiencia de usuario completa con portal rendering (evita problemas de z-index), gestión automática de foco y scroll, múltiples tamaños predefinidos, accesibilidad completa (ARIA, teclado) y composición flexible mediante subcomponentes (Header, Body, Footer), haciéndolo ideal para cualquier interacción que requiera atención exclusiva del usuario.',

  features: [
    '✅ **Portal rendering**: Se renderiza fuera del DOM normal para evitar problemas de z-index',
    '✅ **Overlay con backdrop**: Fondo semi-transparente (color/trans/black/33) que oscurece el contenido de fondo',
    '✅ **Cierre flexible**: Botón X, tecla ESC, click fuera del modal (configurable con `disableCloseOnClickOutside`)',
    '✅ **Scrolling inteligente**: El body tiene scroll cuando el contenido es largo, header y footer permanecen fijos',
    '✅ **Múltiples tamaños**: medium (512px), large (768px), full (1024px), wide (1280px), fit (ajustado)',
    '✅ **Variantes de espaciado**: default (espacioso) y compact (más compacto)',
    '✅ **Accesibilidad completa**: ARIA roles, keyboard navigation, focus trap, focus restoration',
    '✅ **Responsive**: Se adapta a dispositivos móviles con estilos optimizados',
    '✅ **Composable**: Modal.Header, Modal.Body, Modal.Footer como subcomponentes independientes',
    '✅ **Título con tooltip**: Muestra tooltip automático cuando el título se trunca',
  ],

  codeExamples: {
    Básico: `<Modal isOpen={isOpen} onClose={handleClose}>
  <Modal.Header>Título del Modal</Modal.Header>
  <Modal.Body>
    <p>Contenido del modal</p>
  </Modal.Body>
  <Modal.Footer>
    <Button onClick={handleClose} variant="secundario">
      Cancelar
    </Button>
    <Button onClick={handleConfirm} variant="principal">
      Aceptar
    </Button>
  </Modal.Footer>
</Modal>`,

    'Con subtítulo': `<Modal isOpen={isOpen} onClose={handleClose} size="large">
  <Modal.Header subtitle="Descripción adicional del propósito">
    Título Principal
  </Modal.Header>
  <Modal.Body>
    <FormGrid>
      <FormField labelText="Nombre">
        <Input value={nombre} onChange={setNombre} />
      </FormField>
      <FormField labelText="Email">
        <Input type="email" value={email} onChange={setEmail} />
      </FormField>
    </FormGrid>
  </Modal.Body>
  <Modal.Footer>
    <Button onClick={handleClose} variant="secundario">
      Cancelar
    </Button>
    <Button onClick={handleSave} variant="principal">
      Guardar
    </Button>
  </Modal.Footer>
</Modal>`,

    Confirmación: `<Modal isOpen={isOpen} onClose={handleClose} size="medium">
  <Modal.Header>¿Eliminar elemento?</Modal.Header>
  <Modal.Body>
    <p>
      Esta acción es irreversible. ¿Estás seguro de que deseas eliminar este
      elemento?
    </p>
  </Modal.Body>
  <Modal.Footer>
    <TextButton onClick={handleClose} variant="secondary">
      Cancelar
    </TextButton>
    <Button onClick={handleDelete} variant="principal">
      Eliminar
    </Button>
  </Modal.Footer>
</Modal>`,

    'Sin cerrar al hacer clic fuera': `<Modal
  isOpen={isOpen}
  onClose={handleClose}
  disableCloseOnClickOutside // ← Usuario debe usar botones o tecla ESC
>
  <Modal.Header subtitle="Solo puedes cerrar con los botones">
    Acción crítica
  </Modal.Header>
  <Modal.Body>
    <p>Este modal no se puede cerrar haciendo clic fuera.</p>
  </Modal.Body>
  <Modal.Footer>
    <Button onClick={handleClose} variant="secundario">
      Cancelar
    </Button>
    <Button onClick={handleConfirm} variant="principal">
      Confirmar
    </Button>
  </Modal.Footer>
</Modal>`,

    'Tamaño personalizado': `// Medium (512px) - Por defecto
<Modal isOpen={isOpen} onClose={handleClose} size="medium">
  {/* Formularios simples, confirmaciones */}
</Modal>
// Large (768px) - Formularios complejos
<Modal isOpen={isOpen} onClose={handleClose} size="large">
  {/* Formularios con 6-10 campos */}
</Modal>
// Full (1024px) - Contenido extenso
<Modal isOpen={isOpen} onClose={handleClose} size="full">
  {/* Formularios muy extensos, múltiples secciones */}
</Modal>
// Wide (1280px) - Extra ancho
<Modal isOpen={isOpen} onClose={handleClose} size="wide">
  {/* Tablas con muchas columnas */}
</Modal>
// Fit - Ajustado al contenido
<Modal isOpen={isOpen} onClose={handleClose} size="fit">
  {/* Diálogos breves, alertas simples */}
</Modal>`,

    'Variante compacta': `<Modal
  isOpen={isOpen}
  onClose={handleClose}
  variant="compact" // ← Padding y gaps reducidos
>
  <Modal.Header>Título Compacto</Modal.Header>
  <Modal.Body>
    <p>Contenido con menos espaciado</p>
  </Modal.Body>
  <Modal.Footer>
    <Button onClick={handleClose}>Cerrar</Button>
  </Modal.Footer>
</Modal>`,

    'Con scroll': `<Modal isOpen={isOpen} onClose={handleClose} size="medium">
  <Modal.Header>Términos y condiciones</Modal.Header>
  <Modal.Body>
    {/* El body tiene scroll automático cuando el contenido es largo */}
    {Array.from({ length: 20 }).map((_, i) => (
      <p key={i}>
        Párrafo {i + 1} - Lorem ipsum dolor sit amet...
      </p>
    ))}
  </Modal.Body>
  <Modal.Footer>
    <Button onClick={handleClose} variant="principal">
      Aceptar
    </Button>
  </Modal.Footer>
</Modal>`,

    'Con tabla y selección': `const [seleccionados, setSeleccionados] = useState<number[]>([]);
<Modal isOpen={isOpen} onClose={handleClose} size="large">
  <Modal.Header subtitle="Selecciona los documentos a adjuntar">
    Seleccionar anexos
  </Modal.Header>
  <Modal.Body>
    <ListadoPaginado
      datos={datosDocumentos}
      columnas={columnasDocumentos}
      conSeleccionMultiple
      onCambioSeleccionFila={(selection) => setSeleccionados(selection)}
    />
  </Modal.Body>
  <Modal.Footer>
    <Button onClick={handleClose} variant="secundario">
      Cancelar
    </Button>
    <Button
      onClick={handleAgregar}
      variant="principal"
      disabled={seleccionados.length === 0}
    >
      Agregar seleccionados ({seleccionados.length})
    </Button>
  </Modal.Footer>
</Modal>`,

    'Footer con múltiples acciones': `<Modal isOpen={isOpen} onClose={handleClose}>
  <Modal.Header>Editar documento</Modal.Header>
  <Modal.Body>
    {/* Formulario */}
  </Modal.Body>
  <Modal.Footer>
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      {/* Acciones secundarias a la izquierda */}
      <TextButton onClick={handleSaveDraft}>
        Guardar como borrador
      </TextButton>

      {/* Acciones principales a la derecha */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button onClick={handleClose} variant="secundario">
          Cancelar
        </Button>
        <Button onClick={handleSave} variant="secundario">
          Guardar
        </Button>
        <Button onClick={handleSaveAndContinue} variant="principal">
          Guardar y continuar
        </Button>
      </div>
    </div>
  </Modal.Footer>
</Modal>`,

    'Vistas múltiples': `const [vistaActual, setVistaActual] = useState<'tabla' | 'arbol'>('tabla');
<Modal isOpen={isOpen} onClose={handleClose} size="large">
  <Modal.Header
    subtitle={vistaActual === 'arbol' ? 'Vista de árbol' : 'Vista de tabla'}
  >
    {vistaActual === 'arbol' ? 'Expedientes relacionados' : 'Seleccionar anexos'}
  </Modal.Header>
  <Modal.Body>
    {vistaActual === 'tabla' && <ListadoPaginado {...propsTabla} />}
    {vistaActual === 'arbol' && <ArbolRelacionados {...propsArbol} />}
  </Modal.Body>
  <Modal.Footer>
    {vistaActual === 'tabla' && (
      <>
        <Button onClick={() => setVistaActual('arbol')} variant="secundario">
          Ver expedientes relacionados
        </Button>
        <Button onClick={handleAgregar} variant="principal">
          Agregar seleccionados
        </Button>
      </>
    )}
    {vistaActual === 'arbol' && (
      <Button onClick={() => setVistaActual('tabla')} variant="principal">
        Volver
      </Button>
    )}
  </Modal.Footer>
</Modal>`,
  },

  sizes: {
    medium: {
      width: '512px ($space-md)',
      description: 'Tamaño predeterminado',
      useCases: [
        'Confirmaciones simples',
        'Formularios con 2-4 campos',
        'Mensajes informativos',
        'Diálogos de alerta',
      ],
    },
    large: {
      width: '768px ($space-lg)',
      description: 'Tamaño grande',
      useCases: [
        'Formularios complejos (6-10 campos)',
        'Búsquedas avanzadas',
        'Selección de datos con filtros',
        'Contenido que necesita más espacio horizontal',
      ],
    },
    full: {
      width: '1024px ($space-xl)',
      description: 'Tamaño completo',
      useCases: [
        'Formularios muy extensos con múltiples secciones',
        'Vistas completas de datos',
        'Contenido que requiere scroll vertical',
        'Casos donde se necesita el máximo espacio disponible',
      ],
    },
    wide: {
      width: '1280px ($space-2xl)',
      description: 'Extra ancho',
      useCases: [
        'Tablas con muchas columnas',
        'Comparación de datos lado a lado',
        'Contenido que necesita máximo espacio horizontal',
        'Visualizaciones amplias',
      ],
    },
    fit: {
      width: 'fit-content',
      description: 'Ajustado al contenido',
      useCases: [
        'Diálogos de confirmación muy breves',
        'Alertas simples',
        'Cuando el contenido es mínimo',
      ],
    },
  },

  variants: {
    default: {
      description: 'Espaciado estándar (predeterminado)',
      spacing: {
        headerPadding: '$space-5 (20px)',
        bodyMargin: '$space-4 $space-5 $space-5 $space-5',
        footerPadding: '$space-4 $space-5 (16px 20px)',
        gap: '$space-2 (8px) entre botones',
      },
    },
    compact: {
      description: 'Espaciado reducido para interfaces más densas',
      spacing: {
        headerPadding: '$space-3 (12px)',
        bodyMargin: '$space-2 $space-3 $space-3 $space-3',
        footerPadding: '$space-2 $space-3 (8px 12px)',
        gap: '$space-1-5 (6px) entre botones',
      },
    },
  },

  accessibility: {
    ariaRoles: [
      'role="dialog" en el contenedor principal',
      'aria-modal="true" para indicar que es un modal',
      'role="presentation" en el overlay',
      'aria-label en el botón close con traducción',
    ],
    keyboardNav: [
      'ESC: Cierra el modal (siempre activo)',
      'Tab: Navegación entre elementos interactivos dentro del modal',
      'Shift+Tab: Navegación inversa',
      'Focus trap: El foco permanece dentro del modal hasta cerrarlo',
    ],
    focusManagement: [
      'Al abrir: Focus automático en el primer elemento interactivo del body',
      'Al cerrar: El focus vuelve al elemento que abrió el modal',
      'Gestión automática con useEffect y ref',
    ],
  },

  bestPractices: [
    '**Tamaño apropiado**: Usa medium para confirmaciones simples, large para formularios, full/wide para contenido extenso',
    '**Subtítulo explicativo**: Añade subtitle cuando el título necesita contexto adicional',
    '**Cierre claro**: Siempre proporciona botones de acción claros (Cancelar, Aceptar, Cerrar)',
    '**Acción principal destacada**: Usa variant="principal" en el botón de acción más importante',
    '**Confirmaciones críticas**: Usa disableCloseOnClickOutside para acciones destructivas',
    '**Scroll en body**: Mantén header y footer visibles, permite scroll solo en body',
    '**Número de botones**: Limita el footer a 2-4 botones. Si necesitas más, usa un dropdown "Más acciones"',
    '**Jerarquía visual**: Ordena botones de menos a más importante (izquierda a derecha)',
    '**Responsive**: El modal se adapta automáticamente a móviles, pero verifica el contenido',
    '**Loading states**: Muestra indicadores de carga durante operaciones asíncronas',
    '**Mensajes de error**: Muestra errores de forma clara dentro del modal body',
    '**Validación**: Valida formularios antes de permitir la acción principal',
  ],

  commonPatterns: {
    confirmation: {
      title: 'Diálogo de confirmación',
      description: 'Modal simple para confirmar acciones importantes',
      size: 'medium',
      features: [
        'Mensaje claro',
        'Advertencia si es irreversible',
        'Dos botones: Cancelar + Acción',
      ],
    },
    form: {
      title: 'Formulario complejo',
      description: 'Modal para editar o crear datos con múltiples campos',
      size: 'large o full',
      features: [
        'FormGrid para organización',
        'Validación de campos',
        'Loading state',
        'Manejo de errores',
      ],
    },
    selection: {
      title: 'Selección de datos',
      description: 'Modal con tabla o lista para seleccionar elementos',
      size: 'large o wide',
      features: [
        'ListadoPaginado',
        'Selección múltiple',
        'Filtros',
        'Contador de seleccionados',
      ],
    },
    multiStep: {
      title: 'Proceso de múltiples pasos',
      description: 'Modal con navegación entre diferentes vistas o pasos',
      size: 'large o full',
      features: [
        'Estado para vista actual',
        'Footer adaptable',
        'Subtítulo dinámico',
        'Botones de navegación',
      ],
    },
  },
};
