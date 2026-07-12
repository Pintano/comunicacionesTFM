# Button Component

El componente **Button** es el botón principal del sistema de diseño. Úsalo para acciones con texto, combinaciones de icono + texto, y como base para la mayoría de interacciones.

## ✅ Cuándo usar Button

- **Acciones principales**: Guardar, enviar, crear, confirmar
- **Navegación**: "Siguiente", "Anterior", "Ver más"
- **Botones con texto**: Solo texto o icono + texto
- **Formularios**: Submit, reset, cancelar
- **Llamadas a la acción**: "Registrarse", "Comenzar", "Descargar"

## ❌ Cuándo NO usar Button

- **Solo iconos simples**: Usa `IconButton`
- **FABs circulares/cuadrados**: Usa `IconButtonShape`
- **Acciones muy específicas**: Considera componentes especializados

## Casos de uso comunes

### 🎯 Acciones principales

```tsx
import { Button, TextButton } from '@tracasa/justicia-components';

// Formulario principal
<Button variant="principal">Guardar cambios</Button>
<Button variant="principal" color="success">Confirmar pedido</Button>
<Button variant="principal" color="danger">Eliminar cuenta</Button>
```

### 🔗 Navegación y enlaces

```tsx
// Enlaces que parecen botones
<TextButton>Ver detalles</TextButton>
<TextButton variant="secondary" color="info">Más información</TextButton>
```

## Props

### `variant`

Define el estilo base del botón:

- `'principal'` - Botón primario (predeterminado para acciones principales)
- `'secundario'` - Botón secundario (predeterminado por defecto)
- `'icono'` - Solo icono
- `'icono-texto'` - Icono con texto
- `'busqueda'` - Estilo específico para búsqueda

### `color` (Opcional)

**Para botones de icono** (`variant="icono"`):

- `'default'` - Estilos normales del botón de icono
- `'white'` - Icono blanco
- `'transparent'` - Fondo siempre transparente, solo cambia color del icono en hover/active

### `size`

Controla el tamaño del botón:

- `'default'` - Tamaño estándar
- `'small'` - Tamaño pequeño
- `'large'` - Tamaño grande
- `'icon'`, `'icon-xs'`, `'icon-sm'`, `'icon-md'`, `'icon-lg'`, `'icon-xl'` - Para botones de solo icono

### `wordSize`

Controla el tamaño del texto:

- `'default'` - Tamaño de fuente estándar
- `'small'` - Fuente pequeña
- `'large'` - Fuente grande

### Otras Props

- `disabled?: boolean` - Deshabilita el botón
- `conOpciones?: boolean` - Añade un dropdown con opciones
- `opciones?: ButtonOption[]` - Array de opciones para el dropdown
- `textoAccesibilidad?: string` - Texto para accesibilidad

## Ejemplos de Uso

### Botones de Acción por Color

```tsx
// Acciones exitosas
<Button variant="principal" color="success">Guardar</Button>

// Acciones destructivas
<Button variant="principal" color="danger">Eliminar</Button>

// Advertencias
<Button variant="secundario" color="warning">Advertir</Button>

```

### Botones con Opciones

```tsx
<Button
  variant="principal"
  conOpciones={true}
  opciones={[
    { text: 'Opción 1', onClick: () => console.log('Opción 1') },
    { text: 'Opción 2', onClick: () => console.log('Opción 2') },
  ]}
>
  Botón con opciones
</Button>
```

## 🎯 Uso de la Nueva API

## Principios de Uso

### Cuándo usar `variant` vs `color`

- **`variant`**: Define el propósito y jerarquía del botón en la interfaz

  - `principal`: Acción principal de la página/sección
  - `secundario`: Acciones secundarias

- **`color`**: Comunica el tipo de acción o estado
  - `success`: Confirmar, guardar, completar
  - `danger`: Eliminar, cancelar, rechazar
  - `warning`: Advertir, cuidado
  - `info`: Información adicional
  - `neutral`: Acciones neutras

### Ejemplo de Combinación

```tsx
// Botón principal para eliminar (destructivo)
<Button variant="principal" color="danger">Eliminar usuario</Button>

// Botón secundario para confirmar (exitoso)
<Button variant="secundario" color="success">Confirmar cambios</Button>

```

## Consideraciones de Accesibilidad

- Todos los botones incluyen atributos ARIA apropiados
- Los estados de foco son claramente visibles
- Los colores temáticos mantienen suficiente contraste
- Se puede usar `textoAccesibilidad` para contexto adicional

## Personalización

El componente utiliza CSS custom properties que pueden ser sobrescritas en tu tema:

```css
:root {
  --color-success-500: #10b981;
  --color-success-600: #059669;
  --color-success-700: #047857;
  --color-danger-500: #ef4444;
  --color-danger-600: #dc2626;
  --color-danger-700: #b91c1c;
  /* ... más colores */
}
```
