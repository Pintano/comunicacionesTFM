export const textButtonDocumentation = {
  title: 'TextButton',
  description:
    '**Botón para ejecutar acciones con apariencia de enlace o sin estilos.** TextButton fusiona la funcionalidad de botones de acción con la estética de enlaces o elementos inline. Soporta tres variantes: `primary` (ex terciario), `secondary` (ex cuaternario) y `unstyled` (sin estilos, hereda del contexto). Construido con accesibilidad completa, soporte para iconos y ref forwarding.',

  whenToUse: [
    '**Acciones secundarias**: Acciones menos prominentes que no requieren estilo de botón tradicional',
    '**Cancelar/Volver**: Enlaces que ejecutan acciones pero parecen enlaces (no navegación)',
    '**Elementos inline**: Botones dentro de párrafos o listas que deben integrarse visualmente',
    '**Iconos clickeables**: Iconos que ejecutan acciones sin apariencia de botón (variant="unstyled")',
    '**Listas interactivas**: Elementos de lista clickeables que no deben parecer botones',
    '**Texto clicable custom**: Cuando necesitas comportamiento de botón pero con estilos del padre',
  ],

  whenNotToUse: [
    '**Navegación real**: Usa `Enlace` para navegación interna/externa/secciones',
    '**CTAs principales**: Usa `Button` variant="principal" para acciones primarias',
    '**Solo iconos con tamaños**: Usa `IconButton` para botones de icono con tamaños predefinidos',
    '**Formularios submit**: Usa `Button` variant="secundario" type="submit"',
  ],

  keyAdvantage:
    'TextButton unifica tres necesidades en un solo componente: botones con estilo de enlace (primary/secondary), y botones sin estilos para máxima flexibilidad (unstyled). Elimina la necesidad de múltiples componentes para casos de uso similares y garantiza consistencia en toda la aplicación.',

  codeExamples: {
    'Primary (ex terciario)': `<TextButton variant="primary" onClick={handleAction}>
  Ver más detalles
</TextButton>`,

    'Secondary (ex cuaternario)': `<TextButton variant="secondary" onClick={handleCancel}>
  Cancelar
</TextButton>`,

    'Con icono': `<TextButton variant="primary" icono="arrowRight" onClick={handleNext}>
  Siguiente
</TextButton>`,

    'Tamaño pequeño': `<TextButton variant="primary" size="small" onClick={handleEdit}>
  Editar
</TextButton>`,

    'Unstyled - Inline en texto': `<p>
  Este es un párrafo con un{' '}
  <TextButton variant="unstyled" onClick={handleClick}>
    botón inline
  </TextButton>{' '}
  que hereda los estilos.
</p>`,

    'Unstyled - Icono solo': `<TextButton
  variant="unstyled"
  onClick={handleDelete}
  aria-label="Eliminar documento"
>
  <IconTrash size={16} />
</TextButton>`,

    'Unstyled - En lista': `<ul>
  <li>
    <TextButton variant="unstyled" onClick={() => openFile(1)}>
      <IconFile size={14} /> Archivo 1.pdf
    </TextButton>
  </li>
  <li>
    <TextButton variant="unstyled" onClick={() => openFile(2)}>
      <IconFile size={14} /> Archivo 2.pdf
    </TextButton>
  </li>
</ul>`,

    Deshabilitado: `<TextButton variant="primary" disabled onClick={handleAction}>
  Acción no disponible
</TextButton>`,

    'Con ref forwarding': `const buttonRef = useRef<HTMLButtonElement>(null);
<TextButton
    ref={buttonRef}
    variant="primary"
    onClick={handleAction}
>
    Focus me programmatically
</TextButton>`,

    'Custom styling (unstyled)': `<TextButton
     variant="unstyled"
     className="my-custom-link"
     onClick={handleAction}
>
    Styled button
</TextButton>
// CSS
.my-custom-link {
    color: #e74c3c;
    font-weight: 600;
    text-decoration: underline;
}`,

    'Type submit (formularios)': `<form onSubmit={handleSubmit}>
  <Button type="submit" variant="secundario">
    Enviar
  </Button>
  <TextButton
    type="button"
    variant="secondary"
    onClick={handleCancel}
  >
    Cancelar
  </TextButton>
</form>`,
  },

  variants: {
    primary: {
      description:
        'Color primario con subrayado al hover. Reemplaza el antiguo variant="terciario" de Button.',
      usage: 'Acciones secundarias con énfasis moderado',
      color: 'var(--theme-primary-500)',
    },
    secondary: {
      description:
        'Color secundario con subrayado al hover. Reemplaza el antiguo variant="cuaternario" de Button.',
      usage: 'Acciones terciarias o de menor importancia',
      color: 'var(--theme-secondary-800)',
    },
    unstyled: {
      description:
        'Sin estilos predefinidos, hereda color y fuente del padre. Ideal para elementos inline custom.',
      usage:
        'Iconos clickeables, texto inline, listas interactivas, elementos que necesitan estilos del contexto',
      color: 'inherit',
    },
  },

  accessibility: [
    '**aria-label automático**: Se genera automáticamente para iconos sin texto',
    '**aria-label manual**: Puede sobreescribirse con prop explícita',
    '**Aria-hidden en iconos**: Los iconos decorativos tienen aria-hidden="true"',
    '**Disabled state**: Estado deshabilitado correctamente implementado',
    '**Focus visible**: Borde de foco claro para navegación por teclado',
    '**Button type**: type="button" por defecto para evitar envíos accidentales',
  ],

  migration: {
    fromButtonTerciario: `// ❌ Antes
<Button variant="terciario" onClick={handleAction}>
  Ver más
</Button>

// ✅ Ahora
<TextButton variant="primary" onClick={handleAction}>
  Ver más
</TextButton>`,

    fromButtonCuaternario: `// ❌ Antes
<Button variant="cuaternario" onClick={handleCancel}>
  Cancelar
</Button>

// ✅ Ahora
<TextButton variant="secondary" onClick={handleCancel}>
  Cancelar
</TextButton>`,

    fromEnlaceIncorrecto: `// ❌ Antes (anti-patrón)
<Enlace to="">
  <IconMessage />
</Enlace>

// ✅ Ahora
<TextButton variant="unstyled" aria-label="Ver minutado">
  <IconMessage />
</TextButton>`,
  },

  bestPractices: [
    '**Usar primary para acciones secundarias** que necesitan cierta prominencia',
    '**Usar secondary para acciones terciarias** o de menor prioridad visual',
    '**Usar unstyled para elementos inline** que deben integrarse con el texto',
    '**Siempre incluir aria-label** cuando el botón solo contiene iconos',
    '**No usar TextButton para navegación** - usa `Enlace` con prop `to`',
    '**Usar disabled correctamente** - desactiva la acción pero mantiene visible el elemento',
    '**Preferir size="small"** en espacios reducidos o interfaces densas',
  ],

  commonPatterns: {
    'Cancelar en formularios': `<form>
  <Button type="submit">Guardar</Button>
  <TextButton variant="secondary" onClick={onCancel}>
    Cancelar
  </TextButton>
</form>`,

    'Lista de documentos clickeables': `{documentos.map((doc) => (
  <div key={doc.id}>
    <TextButton
      variant="unstyled"
      onClick={() => abrirDocumento(doc.id)}
    >
      <IconFile /> {doc.nombre}
    </TextButton>
  </div>
))}`,

    'Iconos de acciones rápidas': `<div className="quick-actions">
  <TextButton
    variant="unstyled"
    onClick={handleEdit}
    aria-label="Editar"
  >
    <IconEdit />
  </TextButton>
  <TextButton
    variant="unstyled"
    onClick={handleDelete}
    aria-label="Eliminar"
  >
    <IconTrash />
  </TextButton>
</div>`,

    'Empty state con acción': `<EmptyState
  icono="folderOpen"
  mensaje="No hay documentos"
  link={{
    texto: "Subir documento",
    onClick: handleUpload
  }}
/>
// Internamente usa TextButton variant="primary"`,
  },
};
