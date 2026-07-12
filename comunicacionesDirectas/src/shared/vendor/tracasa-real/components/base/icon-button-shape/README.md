# IconButtonShape Component

Botón de icono con **formas geométricas definidas** (circular o cuadrado) para casos especiales donde necesitas geometrías específicas y estilos únicos.

## ✅ Cuándo usar IconButtonShape

- **FABs principales**: Botón circular flotante para la acción más importante de la pantalla
- **Acciones prominentes**: Botones cuadrados que necesitan destacar visualmente
- **CTAs de icono**: Cuando un icono necesita máxima prominencia visual
- **Interfaces modernas**: Diseños que requieren geometrías específicas
- **Esquemas únicos**: Colores o efectos especiales fuera del sistema base

## ❌ Cuándo NO usar IconButtonShape

- **Toolbars normales**: Usa `IconButton` estándar
- **Acciones secundarias**: Usa `IconButton` o `Button` regular
- **Interfaz conservadora**: Mantén consistencia con `Button` estándar
- **Acciones repetitivas**: FABs deben ser únicos por pantalla

## 🎯 Ventaja clave

**Geometrías específicas**: Para casos donde necesitas formas definidas y estilos únicos que destaquen del resto de la interfaz.

## 📋 Casos de uso comunes

### 1. **FAB de acción principal**

```tsx
<IconButtonShape
  icon="plus"
  shape="circle"
  size="lg"
  variant="primary"
  aria-label="Crear nuevo elemento"
  style={{ position: 'fixed', bottom: '24px', right: '24px' }}
/>
```

### 2. **Cerrar overlays y modales**

```tsx
<IconButtonShape
  icon="close"
  shape="circle"
  variant="quaternary"
  aria-label="Cerrar"
  style={{ position: 'absolute', top: '16px', right: '16px' }}
/>
```

### 3. **Grupos de acciones cuadradas**

```tsx
<div className={styles.actionGroup}>
  <IconButtonShape
    icon="edit"
    shape="square"
    variant="secondary"
    aria-label="Editar"
  />
  <IconButtonShape
    icon="copy"
    shape="square"
    variant="secondary"
    aria-label="Copiar"
  />
  <IconButtonShape
    icon="trash"
    shape="square"
    variant="secondary"
    aria-label="Eliminar"
  />
</div>
```

### 4. **Controles de media prominentes**

```tsx
<IconButtonShape
  icon={isPlaying ? 'playerPause' : 'playerFilled'}
  shape="circle"
  size="lg"
  variant="primary"
  aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
/>
```

## Uso

```tsx
import { IconButtonShape } from '@tracasa/justicia-components';

// Circular
<IconButtonShape icon="plus" shape="circle" aria-label="Añadir" />

// Cuadrado
<IconButtonShape icon="userCog" shape="square" variant="tertiary" aria-label="Configuración" />

// FAB grande
<IconButtonShape icon="plus" shape="circle" size="lg" aria-label="Crear" />
```

## Props

| Prop         | Tipo                                                     | Default     | Descripción                        |
| ------------ | -------------------------------------------------------- | ----------- | ---------------------------------- |
| `icon`       | `IconName`                                               | -           | **Requerido.** Icono a mostrar     |
| `shape`      | `'circle' \| 'square'`                                   | -           | **Requerido.** Forma del botón     |
| `size`       | `'md' \| 'lg'`                                           | `'md'`      | Tamaño del botón                   |
| `variant`    | `'primary' \| 'secondary' \| 'tertiary' \| 'quaternary'` | `'primary'` | Variante de color                  |
| `aria-label` | `string`                                                 | -           | **Requerido.** Texto accesibilidad |

## Variantes

```tsx
// Primary - Acción principal
<IconButtonShape icon="plus" shape="circle" variant="primary" aria-label="Crear" />

// Secondary - Acción importante
<IconButtonShape icon="edit" shape="circle" variant="secondary" aria-label="Editar" />

// Tertiary - Acción sutil
<IconButtonShape icon="info" shape="square" variant="tertiary" aria-label="Info" />

// Quaternary - Acción estándar
<IconButtonShape icon="arrowDown" shape="square" variant="quaternary" aria-label="Descargar" />
```

## Uso básico

```tsx
import { IconButtonShape } from '@tracasa/justicia-components';

// Circular
<IconButtonShape icon="plus" shape="circle" aria-label="Añadir" />

// Cuadrado
<IconButtonShape icon="userCog" shape="square" variant="tertiary" aria-label="Configuración" />

// FAB grande
<IconButtonShape icon="plus" shape="circle" size="lg" aria-label="Crear" />
```

## vs IconButton

| Característica | IconButton        | IconButtonShape             |
| -------------- | ----------------- | --------------------------- |
| **Base**       | Wrapper de Button | Componente independiente    |
| **Forma**      | Rectangular       | Circular y cuadrada         |
| **Uso**        | Interfaz general  | FABs y acciones prominentes |

## Notas

- `aria-label` es **obligatorio**
- Navegación por teclado incluida
- Animación scale en hover
