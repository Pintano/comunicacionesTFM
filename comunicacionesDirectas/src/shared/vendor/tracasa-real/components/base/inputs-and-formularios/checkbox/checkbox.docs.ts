export const checkboxDocumentation = {
  title: 'Checkbox',
  description:
    'Un componente checkbox personalizable que soporta estados checked, indeterminate y error. Construido pensando en la accesibilidad e incluye soporte para navegación por teclado y lectores de pantalla.',

  whenToUse: [
    'Cuando los usuarios necesitan seleccionar una o múltiples opciones de una lista',
    'Para elecciones binarias (sí/no, encendido/apagado, acepto/rechazo)',
    'En formularios donde los usuarios necesitan aceptar términos y condiciones',
    'Para alternar configuraciones individuales o preferencias',
    'Al implementar selección maestro-detalle (estado indeterminate)',
  ],

  whenNotToUse: [
    'Para opciones mutuamente excluyentes (usar Radio buttons en su lugar)',
    'Para selecciones únicas de muchas opciones (usar dropdown Select)',
    'Para selecciones complejas de múltiples pasos (usar componentes personalizados)',
    'Cuando la acción debe ser inmediata (usar Toggle switch)',
  ],

  keyAdvantage:
    'El checkbox proporciona retroalimentación visual clara para los estados de selección y soporta el estado indeterminate para selecciones parciales, haciéndolo ideal para patrones de selección jerárquica',

  codeExamples: {
    Básico: `<Checkbox
    textoAccesibilidad="Aceptar términos"
    texto="Acepto los términos y condiciones"
  />`,

    'Con estado': `const [isChecked, setIsChecked] = useState(false);
<Checkbox
  checked={isChecked}
  onChange={(e) => setIsChecked(e.target.checked)}
  textoAccesibilidad="Suscripción newsletter"
  texto="Suscribirse al newsletter"
/>`,

    Tamaños: `<Checkbox checkboxSize="small" textoAccesibilidad="Opción pequeña" texto="Pequeño" />
<Checkbox checkboxSize="medium" textoAccesibilidad="Opción mediana" texto="Mediano" />
<Checkbox checkboxSize="large" textoAccesibilidad="Opción grande" texto="Grande" />`,

    Indeterminado: `<Checkbox
  indeterminate={true}
  textoAccesibilidad="Seleccionar todos los elementos"
  texto="Seleccionar todo (algunos elementos seleccionados)"
/>`,

    Error: `<Checkbox
  error={true}
  textoAccesibilidad="Campo requerido"
  texto="Este campo es obligatorio"
/>`,

    Deshabilitado: `<Checkbox
  disabled={true}
  textoAccesibilidad="Opción deshabilitada"
  texto="No se puede cambiar"
/>`,

    Readonly: `<Checkbox
  readOnly={true}
  checked={true}
  textoAccesibilidad="Configuración solo lectura"
  texto="Configuración del sistema (solo lectura)"
/>`,
  },
};
