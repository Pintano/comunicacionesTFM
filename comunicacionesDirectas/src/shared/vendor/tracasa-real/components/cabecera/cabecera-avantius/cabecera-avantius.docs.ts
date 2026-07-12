export const cabeceraAvantiusDocumentation = {
  title: 'CabeceraAvantius',
  description:
    'Fachada especializada de CabeceraPrincipal específicamente diseñada para la aplicación Avantius. Integra BuscadorMenus, BuscadorProcedimientos, IndicadorNotificaciones y menú de perfil en una configuración optimizada para el flujo de trabajo de Avantius. Implementa el Facade Pattern a nivel de dominio específico.',

  whenToUse: [
    'Dentro de la aplicación Avantius exclusivamente',
    'Para mantener consistencia entre todas las páginas de Avantius',
    'Cuando necesitas la configuración estándar: logo + búsquedas + notificaciones + perfil',
    'Para simplificar la implementación en páginas nuevas de Avantius',
    'Cuando quieres garantizar que se siguen los estándares UI de Avantius',
  ],

  whenNotToUse: [
    'En aplicaciones diferentes a Avantius (PSP, etc.) → usa sus fachadas',
    'Si necesitas un layout completamente diferente → usa CabeceraPrincipal',
    'Para páginas públicas sin autenticación → usa CabeceraEstandar',
    'Si no tienes configuración de menús → usa CabeceraEstandar',
  ],

  keyAdvantage:
    'API específica de Avantius que garantiza consistencia, integra componentes especializados (BuscadorMenus) y simplifica la implementación reduciendo props necesarias a solo las relevantes para el dominio.',

  codeExamples: {
    Default: `<CabeceraAvantius
    title="Portal Administrativo"
    subtitle="Gestión Centralizada"
    menusConfig={menusAvantius}
    onNotificacionesClick={handleNotificaciones}
    onMenuPerfilClick={handlePerfil}
  />`,

    Básico: `<CabeceraAvantius
    menusConfig={menusAvantius}
    onNotificacionesClick={handleNotificaciones}
    onMenuPerfilClick={handlePerfil}
  />`,

    'Configuración completa': `<CabeceraAvantius
    logoUrl={logoAvantius}
    title="Avantius Pro"
    subtitle="Versión 3.0"
    menusConfig={menusAvantius}
    menuSearchPlaceholder="Buscar funcionalidades..."
    onBuscarProcedimiento={handleBusqueda}
    procedimientoPlaceholder="Buscar expediente..."
    userId="user-12345"
    organoId="organ-67890"
    notificacionesCount={12}
    onNotificacionesClick={handleNotificaciones}
    notificacionesTooltip="Tienes 12 notificaciones pendientes"
    onMenuPerfilClick={handlePerfil}
  />`,

    'Con logo personalizado': `<CabeceraAvantius
    logoElement={<LogoAvantiusCustom />}
    title="Avantius"
    menusConfig={menusAvantius}
    onNotificacionesClick={handleNotificaciones}
    onMenuPerfilClick={handlePerfil}
  />`,
  },

  keyPointsDocs: [
    {
      title: 'Domain-Specific Facade',
      description:
        'Fachada a nivel de dominio específico de Avantius. Incluye componentes que solo Avantius necesita (BuscadorMenus con configuración específica).',
    },
    {
      title: 'Integración de Múltiples Buscadores',
      description:
        'Integra dos buscadores: BuscadorMenus (navegación) y BuscadorProcedimientos (búsqueda rápida), ambos optimizados para el workflow de Avantius.',
    },
    {
      title: 'Sistema de Notificaciones',
      description:
        'Incluye IndicadorNotificaciones con contador y tooltip. Solo se muestra si onNotificacionesClick está definido.',
    },
    {
      title: 'Menús Obligatorios',
      description:
        'menusConfig es obligatorio ya que BuscadorMenus es parte integral de la experiencia de Avantius.',
    },
    {
      title: 'Valores por Defecto',
      description:
        'Proporciona valores por defecto sensatos (title="Avantius", placeholders en español, etc.) para reducir boilerplate.',
    },
  ],

  notes: [
    'Este componente está optimizado para Avantius y no debe usarse en otras apps',
    'BuscadorMenus siempre se renderiza (menusConfig es obligatorio)',
    'BuscadorProcedimientos solo se renderiza si onBuscarProcedimiento está presente',
    'IndicadorNotificaciones solo se muestra si onNotificacionesClick está definido',
    'El título por defecto es "Avantius" si no se proporciona',
    'userId y organoId vacíos son válidos para el BuscadorProcedimientos',
  ],
};
