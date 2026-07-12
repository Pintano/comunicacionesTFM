# IconButton Component

Botón simplificado para **acciones de solo icono**. Wrapper semántico sobre `Button` que mantiene toda la consistencia visual pero con una API más simple.

## ✅ Cuándo usar IconButton

- **Acciones rápidas en interfaces**: Cerrar, minimizar, editar, eliminar
- **Controles de media**: Play, pause, stop, volumen, siguiente
- **Navegación compacta**: Anterior, siguiente, expandir, colapsar
- **Toolbars**: Negrita, cursiva, alineación, formato
- **Tablas y listas**: Acciones por fila (editar, eliminar, duplicar)
- **Headers y navbars**: Menú hamburguesa, perfil, notificaciones

## ❌ Cuándo NO usar IconButton

- **FABs circulares**: Usa `IconButtonShape` con `shape="circle"`
- **Botones cuadrados prominentes**: Usa `IconButtonShape` con `shape="square"`
- **Botones con texto**: Usa `Button` estándar
- **Acciones principales de página**: Considera `Button` con texto claro

## 🎯 Ventaja clave

**API simplificada**: Convierte esto ↓

```tsx
<Button variant="icono" size="icon-sm" aria-label="Cerrar">
  <IconWrapper icono="close" size="sm" />
</Button>
```

**En esto** ↓

```tsx
<IconButton icon="close" size="small" aria-label="Cerrar" />
```

## 📋 Casos de uso comunes

### 1. **Toolbars y editores**

```tsx
<div className={styles.toolbar}>
  <IconButton icon="format-bold" size="small" aria-label="Negrita" />
  <IconButton icon="format-italic" size="small" aria-label="Cursiva" />
  <IconButton
    icon="align-left"
    size="small"
    aria-label="Alineación izquierda"
  />
</div>
```

### 2. **Acciones en tablas**

```tsx
<td className={styles.actions}>
  <IconButton icon="edit" size="small" aria-label="Editar registro" />
  <IconButton
    icon="trash"
    size="small"
    variant="danger"
    aria-label="Eliminar registro"
  />
</td>
```

### 3. **Headers y navegación**

```tsx
<header className={styles.header}>
  <IconButton icon="menu" size="medium" aria-label="Abrir menú" />
  <h1>Título</h1>
  <IconButton
    icon="notifications"
    size="medium"
    aria-label="Ver notificaciones"
  />
</header>
```

### 4. **Controles de modal**

```tsx
<div className={styles.modalHeader}>
  <h2>Título del Modal</h2>
  <IconButton
    icon="close"
    size="medium"
    onClick={closeModal}
    aria-label="Cerrar modal"
  />
</div>
```

## Uso Básico

```tsx
import { IconButton } from '@tracasa/justicia-components';

// Botón de cerrar modal
<IconButton icon="close" aria-label="Cerrar modal" />

// Botón de reproducir
<IconButton
  icon="playerFilled"
  size="large"
  aria-label="Reproducir video"
  onClick={handlePlay}
/>

// Botón de ayuda
<IconButton
  icon="help"
  color="white"
  aria-label="Mostrar ayuda"
/>
```

## Props

### Obligatorias

- **`icon`**: `IconName` - Nombre del icono a mostrar
- **`aria-label`**: `string` - Texto descriptivo para accesibilidad (obligatorio)

### Opcionales

- **`size`**: `'small' | 'default' | 'large'` - Tamaño del botón

  - `'small'`: 24x24px (mapea a `icon-sm`)
  - `'default'`: 32x32px (mapea a `icon`)
  - `'large'`: 40x40px (mapea a `icon-lg`)

- **`color`**: `'default' | 'white' | 'transparent'` - Color del botón

  - `'default'`: Estilos normales del botón de icono
  - `'white'`: Icono blanco (para fondos oscuros)
  - `'transparent'`: Fondo siempre transparente

- **`disabled`**: `boolean` - Si el botón está deshabilitado

### Props Heredadas

Acepta todas las props de `HTMLButtonElement` excepto `children`.

## Ejemplos por Caso de Uso

### Cerrar Modal/Dialog

```tsx
<IconButton
  icon="close"
  color="transparent"
  size="small"
  aria-label="Cerrar modal"
  onClick={onClose}
/>
```

### Controles de Reproductor

```tsx
<IconButton
  icon={isPlaying ? "playerPause" : "playerFilled"}
  size="large"
  aria-label={isPlaying ? "Pausar" : "Reproducir"}
  onClick={togglePlay}
/>

<IconButton
  icon={isMuted ? "volumeOff" : "volume"}
  aria-label={isMuted ? "Activar sonido" : "Silenciar"}
  onClick={toggleMute}
/>
```

### Botón de Ayuda en Header

```tsx
<IconButton
  icon="help"
  color="white"
  aria-label="Mostrar ayuda"
  onClick={showHelp}
/>
```

## Diferencias con Button Original

### Antes (Button tradicional)

```tsx
<Button
  variant="icono"
  size="icon"
  color="white"
  aria-label="Cerrar modal"
  onClick={handleClose}
>
  <IconWrapper icono="close" size="md" />
</Button>
```

### Ahora (IconButton)

```tsx
<IconButton
  icon="close"
  color="white"
  aria-label="Cerrar modal"
  onClick={handleClose}
/>
```

## Ventajas

1. **API más simple**: Menos props y estructura más clara
2. **Accesibilidad forzada**: `aria-label` es obligatorio
3. **Tamaños semánticos**: `small`, `default`, `large` en lugar de `icon-sm`, `icon`, `icon-lg`
4. **Menos código**: No necesita `IconWrapper` manual
5. **Autocomplete mejorado**: TypeScript sugiere iconos válidos
6. **Retrocompatible**: Usa internamente el Button existente

## Consideraciones Técnicas

- **Implementación**: Wrapper sobre `Button` existente
- **Estilos**: Reutiliza completamente los estilos de `Button`
- **Comportamiento**: Idéntico al `Button` con `variant="icono"`
- **Performance**: Sin overhead adicional
- **Bundle size**: Mínimo impacto (solo el wrapper)

## Accesibilidad

- **`aria-label` obligatorio**: Garantiza descripción para lectores de pantalla
- **Estados claros**: Hover, focus, active, disabled bien definidos
- **Navegación por teclado**: Completamente funcional
- **Contraste**: Mantiene los estándares del sistema de diseño

## Testing

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IconButton } from './icon-button';

test('ejecuta onClick correctamente', async () => {
  const handleClick = vi.fn();
  const user = userEvent.setup();

  render(<IconButton icon="close" aria-label="Cerrar" onClick={handleClick} />);

  await user.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalled();
});
```
