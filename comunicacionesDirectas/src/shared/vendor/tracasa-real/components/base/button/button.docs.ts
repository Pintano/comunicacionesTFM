export const buttonDocumentation = {
  title: 'Button',
  description:
    '**Botón principal del sistema** - Componente base para todas las acciones con texto, CTAs principales y formularios.',

  whenToUse: [
    '**Formularios**: Enviar, cancelar, siguiente/anterior con texto',
    '**CTAs principales**: "Iniciar sesión", "Registrarse", "Comprar ahora"',
    '**Navegación con texto**: "Ver detalles", "Ir al dashboard"',
    '**Acciones primarias**: Cualquier acción importante que necesite texto descriptivo',
    '**Confirmaciones**: "Sí, eliminar", "Guardar cambios"',
  ],

  whenNotToUse: [
    '**Solo iconos**: Usa `IconButton` para API más simple',
    '**FABs circulares**: Usa `IconButtonShape` con `shape="circle"`',
    '**Botones geométricos**: Usa `IconButtonShape` para formas específicas',
  ],

  keyAdvantage:
    'Componente versátil y completo para todas las acciones con texto, con soporte completo para variantes, tamaños y opciones.',

  codeExamples: {
    'CTA principal': `<Button variant="principal">Iniciar sesión</Button>`,

    Formulario: `<Button type="submit" variant="secundario">Enviar</Button>
<TextButton variant="primary" onClick={handleCancel}>Cancelar</TextButton>`,

    'Con icono y texto': `<Button variant="secundario">
  <IconWrapper icono="download" size="sm" />
  Descargar PDF
</Button>`,

    'Con opciones': `<Button
  variant="principal"
  conOpciones={true}
  opciones={[
    { text: 'Opción 1', onClick: handleOption1 },
    { text: 'Opción 2', onClick: handleOption2 },
  ]}
>
  Botón con opciones
</Button>`,
  },
};
