export const mensajeDocumentation = {
  title: 'Mensaje',
  description:
    'Componente para mostrar mensajes informativos, de éxito, advertencia o error. Soporta modos `banner` (con borde) e `inline` (sin borde), versión compacta, enlace de acción y botón de cierre opcional. Este componente utiliza la prop `message` para el texto principal (no acepta children). Está pensado como componente reutilizable para notificaciones en línea y banners informativos dentro de la interfaz.',

  whenToUse: [
    'Para mostrar mensajes informativos que requieren la atención del usuario',
    'En formularios o procesos para indicar éxito, error o advertencias',
    'Como banner en la parte superior de secciones para comunicar estados globales',
    'En-línea dentro de contenido cuando no se quiere alterar el layout general',
    'Cuando necesitas texto interactivo dentro del texto del mensaje (navegación o acciones)',
  ],

  whenNotToUse: [
    'Para alertas temporales que requieren interacción inmediata (usar Toast/Alert si procede)',
    'Para mensajes muy largos con contenido rico (usar un componente de detalle o modal)',
  ],

  keyAdvantage:
    'Unifica el patrón de mensajes en la aplicación permitiendo variantes visuales, integración inline y accesibilidad mediante roles y aria-live.',

  codeExamples: {
    Basico: `<Mensaje message="Este es un mensaje informativo" />`,

    Banner: `// Banner con borde y variante de advertencia\n<Mensaje message="Mensaje de advertencia" variant="warning" mode="banner" />`,

    Inline: `// Inline integrado en el flujo\n<Mensaje message="Texto breve en línea" variant="info" mode="inline" />`,

    Compacto: `// Versión compacta\n<Mensaje message="Mensaje compacto" compact variant="info" />`,

    ConLink: `// Con link de acción\n<Mensaje message="Mensaje con acción" link={{ texto: 'Ver detalles', onClick: () => {} }} />`,

    ConCierre: `// Con botón de cerrar\n<Mensaje message="Mensaje que puede cerrarse" onClose={() => {}} />`,
    
    Colapsable: `// Con botón de colapsar\n<Mensaje message="Mensaje que puede colapsarse." collapsible = true} />`,

    InlineActionsOnClick: `// Texto interactivo con acción (onClick)\n// Renderiza un TextButton cuando se especifica onClick\n<Mensaje message={t('error.subida')} variant="error"  inlineActions={{ retry: { onClick: () => reintentarSubida() } }}/> `,

    InlineActionsMultiple: `// Múltiples textos interactivos en un mismo mensaje\n// Todos los textos interactivos se renderizan como TextButton en línea con el texto\n<Mensaje  message="Error: {retry}reintentar{/retry} o {cancel}cancelar{/cancel}." inlineActions={{ retry: { onClick: () => reintentar() }, cancel: { onClick: () => cancelar() } }}/>`,
  },
};

export default mensajeDocumentation;
