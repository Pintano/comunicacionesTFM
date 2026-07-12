export const inputDocumentation = {
  title: 'Input',
  description:
    'Componente de entrada de texto fundamental y altamente configurable que soporta múltiples tipos, iconos, estados de validación y estilos. Construido con accesibilidad en mente, sirve como base para componentes especializados como NigField, Selector y campos de fecha.',

  whenToUse: [
    'Cuando necesitas capturar texto simple del usuario (nombres, emails, búsquedas)',
    'Para formularios que requieren entrada de datos estructurada',
    'Como componente base para inputs especializados (NIGs, procedimientos, selectores)',
    'Para campos de búsqueda con iconos y funcionalidad extendida',
    'Cuando necesitas diferentes tipos de input (text, email, password, number, tel, url)',
    'Para validación de datos con mensajes de error visuales',
  ],

  whenNotToUse: [
    'Para texto multilínea extenso (usar TextArea o RichTextArea)',
    'Para selección de opciones predefinidas (usar Selector o SelectorMultiple)',
    'Para entrada de fechas complejas (usar InputDate, InputMonthYear, etc.)',
    'Para NIGs específicos (usar InputNig/NigField que extiende Input)',
    'Para procedimientos judiciales (usar ProcedimientoField)',
  ],

  keyAdvantage:
    'El Input es extremadamente versátil y sirve como base sólida para construir componentes especializados. Soporta iconos, validación visual, múltiples estados interactivos y mantiene accesibilidad completa en todas sus variantes.',

  codeExamples: {
    Básico: `<Input
    placeholder="Introduce tu nombre"
    textoAccesibilidad="Campo de nombre"
/>`,

    'Con estado controlado': `const [value, setValue] = useState('');
<Input
    value={value}
    onChange={(e) => setValue(e.target.value)}
    placeholder="Email"
    type="email"
/>`,

    'Con iconos': `// Icono izquierda (búsqueda)
<Input
    iconoIzquierda="search"
    placeholder="Buscar..."
    textoAccesibilidad="Campo de búsqueda"
/>
// Icono derecha (calendario)
<Input
    iconoDerecha="calendar"
    type="date"
    textoAccesibilidad="Seleccionar fecha"
/>
// Ambos iconos
<Input
    iconoIzquierda="user"
    iconoDerecha="x"
    placeholder="Usuario"
    textoAccesibilidad="Nombre de usuario"
/>`,

    'Estado de error': `<Input
    error={true}
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    type="email"
    placeholder="correo@ejemplo.com"
    textoAccesibilidad="Email con error"
/>`,

    Deshabilitado: `<Input
    disabled={true}
    value="Valor no editable"
    textoAccesibilidad="Campo deshabilitado"
/>`,

    'Solo lectura': `<Input
    readOnly={true}
    value="Texto de solo lectura"
    textoAccesibilidad="Campo de solo lectura"
/>`,

    'Con maxLength': `<Input
    maxLength={10}
    placeholder="Máximo 10 caracteres"
    textoAccesibilidad="Campo con límite de caracteres"
/>`,

    'Tipos especiales': `// Password
<Input
    type="password"
    placeholder="Contraseña"
    textoAccesibilidad="Campo de contraseña"
/>
// Number
<Input
    type="number"
    placeholder="Edad"
    textoAccesibilidad="Campo numérico"
/>
// Tel
<Input
    type="tel"
    placeholder="Teléfono"
    textoAccesibilidad="Número de teléfono"
/>`,

    'Con autofocus': `<Input
    autofoco={true}
    placeholder="Este campo recibe el foco automáticamente"
    textoAccesibilidad="Campo con autofoco"
/>`,

    'En FormField': `<FormField
    labelText="Nombre completo"
    error={{ message: "Este campo es obligatorio" }}
>
    <Input
      error={true}
      placeholder="Introduce tu nombre"
      textoAccesibilidad="Campo de nombre"
    />
</FormField>`,
  },
};
