export const emptyStateDocumentation = {
  title: 'EmptyState',
  description:
    'Un componente versátil para mostrar estados vacíos o mensajes informativos cuando no hay contenido disponible. Soporta diferentes variantes visuales, iconos opcionales, títulos y enlaces de acción.',

  whenToUse: [
    'Cuando una lista o tabla no tiene resultados que mostrar',
    'Para indicar que no hay datos disponibles en un estado inicial',
    'Como placeholder en búsquedas sin resultados',
    'Para mostrar mensajes informativos en secciones vacías',
    'Cuando se necesita guiar al usuario con una acción específica',
  ],

  whenNotToUse: [
    'Para errores críticos del sistema (usar componentes de error)',
    'Para estados de carga (usar Skeleton o Spinner)',
    'Para validaciones de formulario (usar mensajes de error específicos)',
    'Para notificaciones temporales (usar Toast o Alert)',
  ],

  keyAdvantage:
    'EmptyState proporciona una experiencia de usuario amigable al comunicar claramente por qué no hay contenido y opcionalmente ofrece acciones para resolver la situación, mejorando la percepción del usuario sobre el estado de la aplicación.',

  codeExamples: {
    Básico: `<EmptyState>
  No hay elementos disponibles
</EmptyState>`,

    'Con título': `<EmptyState titulo="Sin resultados">
  No se encontraron coincidencias para tu búsqueda
</EmptyState>`,

    'Con icono': `<EmptyState icono="Buscar" titulo="Sin resultados">
  Intenta con otros términos de búsqueda
</EmptyState>`,

    'Con fondo': `<EmptyState background icono="Carpeta" titulo="Carpeta vacía">
  Esta carpeta no contiene documentos
</EmptyState>`,

    'Con link': `<EmptyState
  icono="Mas"
  titulo="Sin elementos"
  link={{
    texto: "Crear nuevo elemento",
    onClick: () => console.log('Crear')
  }}
>
  Comienza creando tu primer elemento
</EmptyState>`,

    Compacto: `<EmptyState compacto>
  Sin datos disponibles
</EmptyState>`,

    Inline: `<EmptyState inline icono="Info">
  Información no disponible
</EmptyState>`,

    'Completo (tabla)': `<EmptyState
  background
  icono="Buscar"
  titulo="No se encontraron resultados"
  link={{
    texto: "Limpiar filtros",
    onClick: handleClearFilters
  }}
>
  Intenta ajustar los criterios de búsqueda
</EmptyState>`,
  },
};
