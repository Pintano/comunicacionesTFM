export const iconButtonDocumentation = {
  title: 'IconButton',
  description:
    '**Botón simplificado para acciones de solo icono** - Wrapper semántico sobre `Button` que mantiene toda la consistencia visual pero con API más simple.',

  whenToUse: [
    '**Acciones rápidas en interfaces**: Cerrar, minimizar, editar, eliminar',
    '**Controles de media**: Play, pause, stop, volumen, siguiente',
    '**Navegación compacta**: Anterior, siguiente, expandir, colapsar',
    '**Toolbars**: Negrita, cursiva, alineación, formato',
    '**Tablas y listas**: Acciones por fila (editar, eliminar, duplicar)',
    '**Headers y navbars**: Menú hamburguesa, perfil, notificaciones',
  ],

  whenNotToUse: [
    '**FABs circulares**: Usa `IconButtonShape` con `shape="circle"`',
    '**Botones cuadrados prominentes**: Usa `IconButtonShape` con `shape="square"`',
    '**Botones con texto**: Usa `Button` estándar',
    '**Acciones principales de página**: Considera `Button` con texto claro',
  ],

  keyAdvantage:
    '**API simplificada y standalone**: Componente independiente con gestión interna de iconos, sin dependencias de Button. API clara y directa.',

  codeExamples: {
    Toolbar: `<div className={styles.toolbar}>
  <IconButton icon="format-bold" size="sm" aria-label="Negrita" />
  <IconButton icon="format-italic" size="sm" aria-label="Cursiva" />
  <IconButton icon="align-left" size="sm" aria-label="Alineación izquierda" />
</div>`,

    'Acciones en tabla': `<td className={styles.actions}>
  <IconButton icon="edit" size="sm" aria-label="Editar registro" />
  <IconButton icon="trash" size="sm" aria-label="Eliminar registro" />
</td>`,

    Header: `<header className={styles.header}>
  <IconButton icon="menu" size="md" aria-label="Abrir menú" />
  <h1>Título</h1>
  <IconButton icon="notifications" size="md" aria-label="Ver notificaciones" />
</header>`,

    Modal: `<div className={styles.modalHeader}>
  <h2>Título del Modal</h2>
  <IconButton icon="close" size="md" onClick={closeModal} aria-label="Cerrar modal" />
</div>`,
  },
};
