# TouchSelect - Componente Modular para HMI Touch

## 🎯 Descripción General

`TouchSelect` es un componente de selección totalmente modular y optimizado para interfaces HMI táctiles. Reemplaza el elemento `<select>` nativo con una interfaz fullscreen que facilita la selección en pantallas touch.

## 📁 Estructura del Módulo

```
touch-select/
├── index.ts                      # Barrel export - punto de entrada
├── types.ts                      # Interfaces y tipos TypeScript
├── constants.ts                  # Constantes reutilizables
├── touch-select.tsx              # Componente principal (orchestrator)
├── touch-select-trigger.tsx      # Botón trigger que abre el modal
├── touch-select-modal.tsx        # Modal fullscreen
├── touch-select-option.tsx       # Componente de opción individual
├── touch-select-example.tsx      # Ejemplos de uso
├── use-touch-select.ts           # Hook personalizado con lógica
└── README.md                     # Este archivo
```

## 🧩 Componentes

### 1. **TouchSelect** (Principal)
Componente orquestador que coordina todos los sub-componentes.

```tsx
<TouchSelect
  value={selectedValue}
  options={myOptions}
  onChange={handleChange}
  label="Seleccione:"
  gridCols={2}
/>
```

### 2. **TouchSelectTrigger**
Botón de input que muestra la opción seleccionada y abre el modal.

- Altura mínima: 70px (touch-friendly)
- Muestra icono + label de la opción seleccionada
- Placeholder cuando no hay selección
- Estados: normal, disabled

### 3. **TouchSelectModal**
Modal fullscreen con grid de opciones.

- Fondo oscuro (color del tema HMI)
- Header con título y botón X de cierre
- Grid responsive de opciones
- Scroll automático si hay muchas opciones

### 4. **TouchSelectOptionItem**
Opción individual en el grid.

- Tamaño mínimo: 100px de alto
- Soporte para icono + label + descripción
- Estado seleccionado: verde con borde
- Estado normal: blanco con hover

## 🪝 Hook Personalizado

### `useTouchSelect`
Hook que encapsula toda la lógica del componente:

```tsx
const {
  isOpen,           // Estado del modal
  selectedOption,   // Opción seleccionada actual
  handleOpen,       // Abrir modal
  handleClose,      // Cerrar modal
  handleSelect,     // Seleccionar opción
} = useTouchSelect(value, options, onChange, disabled);
```

**Optimizaciones:**
- `useMemo` para memoizar la opción seleccionada
- `useCallback` para evitar re-renders innecesarios
- Lógica separada de la presentación

## 📊 Tipos TypeScript

### `TouchSelectOption`
```typescript
interface TouchSelectOption {
  value: string;              // Valor único
  icon?: React.ReactNode;     // Icono (emoji o componente)
  description?: string;       // Descripción opcional
}
```
### TouchSelectProps
```typescript
interface TouchSelectProps {
  value: string;
  options: TouchSelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  gridCols?: 1 | 2 | 3 | 4;
  useFixedDimensions?: boolean;  // Usar dimensiones fijas HMI (800x480px)
}
```
## 🎨 Constantes
```typescript
GRID_COLS_CLASSES = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
}
```

### Tamaños
```typescript
TOUCH_SELECT_SIZES = {
  triggerMinHeight: "70px",
  triggerFontSize: "1.2rem",
  optionMinHeight: "100px",
  optionFontSize: "1.1rem",
  closeButtonSize: "60px",
}
```

### Clases CSS
Todas las clases de Tailwind están centralizadas en `TOUCH_SELECT_CLASSES`.

## 💡 Uso Básico

### Importación
```tsx
import { TouchSelect, type TouchSelectOption } from "@/components/shared/touch-select";
```

### Ejemplo Simple
```tsx
const [value, setValue] = useState("");

const options: TouchSelectOption[] = [
  { value: "1", label: "Opción 1", icon: "🎯" },
  { value: "2", label: "Opción 2", icon: "⭐" }
];

<TouchSelect
  value={value}
  options={options}
  onChange={setValue}
  label="Seleccione:"
  gridCols={2}
/>
```

### Ejemplo con Dimensiones Fijas HMI (800x480px)
```tsx
<TouchSelect
  value={value}
  options={options}
  onChange={setValue}
  label="Seleccione:"
  gridCols={2}
  useFixedDimensions={true}  // Modal con dimensiones HMI máximas
/>
```

### Ejemplo con Descripciones
```tsx
const documentOptions: TouchSelectOption[] = [
  {
    value: "CC",
    label: "Cédula de Ciudadanía",
    icon: "🆔",
    description: "Documento de identidad colombiano"
  }
];

<TouchSelect
  value={documentType}
  options={documentOptions}
  onChange={setDocumentType}
  label="Tipo de Documento:"
  placeholder="Seleccione un tipo..."
  gridCols={2}
/>
```

## 🎨 Dimensiones del Modal

El modal puede comportarse de dos formas:

### Modo Fullscreen (predeterminado)
```tsx
<TouchSelect ... />  // Sin prop o useFixedDimensions={false}
```
- Ocupa toda la pantalla disponible
- Responsive a cualquier tamaño de viewport

### Modo Dimensiones Fijas HMI
```tsx
<TouchSelect ... useFixedDimensions={true} />
```
- Dimensiones máximas: **800px × 480px**
- Ideal para interfaces HMI con tamaño fijo
- Centrado en la pantalla
- Previene que el modal se desborde en pantallas HMI estándar

## 🔧 Personalización Avanzada

### Usar Sub-componentes Individualmente
```tsx
import {
  TouchSelectTrigger,
  TouchSelectModal,
  useTouchSelect
} from "@/components/shared/touch-select";

// Crear tu propia lógica personalizada
const MyCustomSelect = () => {
  const { isOpen, handleOpen, handleClose } = useTouchSelect(...);
  
  return (
    <>
      <TouchSelectTrigger ... />
      <TouchSelectModal ... />
    </>
  );
};
```

### Extender Tipos
```typescript
import type { TouchSelectOption } from "@/components/shared/touch-select";

interface ExtendedOption extends TouchSelectOption {
  category?: string;
  color?: string;
}
```

## ✅ Ventajas de la Modularización

1. **Mantenibilidad**: Cada componente tiene una responsabilidad única
2. **Reutilización**: Los sub-componentes pueden usarse independientemente
3. **Testing**: Más fácil testear componentes pequeños
4. **Performance**: Optimizaciones con hooks memoizados
5. **Escalabilidad**: Fácil agregar nuevas funcionalidades
6. **Type Safety**: Tipos centralizados y bien definidos
7. **Consistencia**: Constantes compartidas evitan duplicación

## 🎯 Casos de Uso

- ✅ Selección de tipos de documento
- ✅ Métodos de pago
- ✅ Tipos de combustible
- ✅ Categorías de producto
- ✅ Estados/regiones
- ✅ Configuraciones del sistema
- ✅ Cualquier selector con 2-30 opciones

## 🚀 Performance

- **Memoización**: `useMemo` para opción seleccionada
- **Callbacks**: `useCallback` para evitar re-renders
- **Lazy rendering**: Modal solo se renderiza cuando está abierto
- **Virtual scrolling**: Preparado para listas muy largas (futuro)

## 📝 TODO / Mejoras Futuras

- [ ] Agregar búsqueda/filtrado de opciones
- [ ] Animaciones de apertura/cierre
- [ ] Soporte para selección múltiple
- [ ] Teclado virtual integrado
- [ ] Virtual scrolling para 100+ opciones
- [ ] Modo compacto (no fullscreen)
- [ ] Temas personalizables
- [ ] Tests unitarios con Vitest

## 🤝 Contribución

Al modificar este componente:

1. Mantén la separación de responsabilidades
2. Actualiza los tipos en `types.ts`
3. Agrega constantes en `constants.ts`
4. Documenta cambios en este README
5. Ejecuta `pnpm run lint:fix` antes de commit

## 📚 Referencias

- [Diseño HMI Touch Best Practices](https://www.uxdesigninstitute.com/blog/touch-interface-design/)
- [React Performance Optimization](https://react.dev/reference/react)
- [Tailwind CSS Grid](https://tailwindcss.com/docs/grid-template-columns)
