export const iconButtonShapeDocumentation = {
  title: 'IconButtonShape',
  description:
    '**Botón de icono con formas geométricas definidas** (circular o cuadrado) para casos especiales donde necesitas geometrías específicas y estilos únicos.',

  whenToUse: [
    '**FABs principales**: Botón circular flotante para la acción más importante de la pantalla',
    '**Acciones prominentes**: Botones cuadrados que necesitan destacar visualmente',
    '**CTAs de icono**: Cuando un icono necesita máxima prominencia visual',
    '**Interfaces modernas**: Diseños que requieren geometrías específicas',
    '**Esquemas únicos**: Colores o efectos especiales fuera del sistema base',
  ],

  whenNotToUse: [
    '**Toolbars normales**: Usa `IconButton` estándar',
    '**Acciones secundarias**: Usa `IconButton` o `Button` regular',
    '**Interfaz conservadora**: Mantén consistencia con `Button` estándar',
    '**Acciones repetitivas**: FABs deben ser únicos por pantalla',
  ],

  keyAdvantage:
    '**Geometrías específicas**: Para casos donde necesitas formas definidas y estilos únicos que destaquen del resto de la interfaz.',

  codeExamples: {
    'FAB de acción principal': `<IconButtonShape
  icon="plus"
  shape="circle"
  size="lg"
  variant="primary"
  aria-label="Crear nuevo elemento"
  style={{ position: 'fixed', bottom: '24px', right: '24px' }}
/>`,

    'Cerrar overlay': `<IconButtonShape
  icon="close"
  shape="circle"
  variant="quaternary"
  aria-label="Cerrar"
/>`,

    'Grupo de acciones cuadradas': `<div style={{ display: 'flex', gap: '8px' }}>
  <IconButtonShape icon="edit" shape="square" variant="secondary" aria-label="Editar" />
  <IconButtonShape icon="copy" shape="square" variant="secondary" aria-label="Copiar" />
  <IconButtonShape icon="trash" shape="square" variant="secondary" aria-label="Eliminar" />
</div>`,
  },
};
