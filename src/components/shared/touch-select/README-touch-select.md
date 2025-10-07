# TouchSelect Component

## Overview
`TouchSelect` es un componente de selección optimizado para interfaces HMI touch. Reemplaza el elemento `<select>` nativo de HTML con una interfaz fullscreen táctil que facilita la selección de opciones en pantallas táctiles.

## Características

- ✅ **Optimizado para Touch**: Botones grandes y espaciados para facilitar la selección
- ✅ **Modal Fullscreen**: Vista inmersiva que ocupa toda la pantalla
- ✅ **Grid Responsive**: Organización en cuadrícula configurable (1, 2, 3 o 4 columnas)
- ✅ **Iconos y Descripciones**: Soporte para iconos y descripciones en cada opción
- ✅ **Indicador Visual**: Muestra claramente la opción seleccionada (verde con borde)
- ✅ **Tipado Fuerte**: Interfaces TypeScript totalmente tipadas
- ✅ **Accesible**: Botón de cierre (X) en posición destacada

## Instalación de Dependencias

El componente usa shadcn/ui para algunos estilos. Asegúrate de tener instalado:

```bash
npx shadcn@latest add dialog
```

## Interfaces

### `TouchSelectOption`
```typescript
interface TouchSelectOption {
  value: string;              // Valor único de la opción
  label: string;              // Texto principal mostrado
  icon?: React.ReactNode;     // Icono opcional (emoji o componente)
  description?: string;       // Descripción adicional opcional
}
```

### `TouchSelectProps`
```typescript
interface TouchSelectProps {
  value: string;              // Valor actualmente seleccionado
  options: TouchSelectOption[]; // Array de opciones disponibles
  onChange: (value: string) => void; // Callback al seleccionar
  placeholder?: string;       // Texto cuando no hay selección
  label?: string;             // Etiqueta del campo
  disabled?: boolean;         // Deshabilitar el componente
  className?: string;         // Clases CSS adicionales
  gridCols?: 1 | 2 | 3 | 4;  // Número de columnas en grid (default: 2)
}
```

## Uso Básico

```tsx
import { TouchSelect, TouchSelectOption } from "@/components/shared/touch-select";

const MyComponent = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const options: TouchSelectOption[] = [
    {
      value: "option1",
      label: "Primera Opción",
      icon: "🎯",
      description: "Descripción de la primera opción"
    },
    {
      value: "option2",
      label: "Segunda Opción",
      icon: "⭐",
      description: "Descripción de la segunda opción"
    }
  ];

  return (
    <TouchSelect
      value={selectedValue}
      options={options}
      onChange={setSelectedValue}
      label="Seleccione una opción:"
      placeholder="Toque para seleccionar..."
      gridCols={2}
    />
  );
};
```

## Ejemplo Avanzado

```tsx
const documentTypeOptions: TouchSelectOption[] = [
  {
    value: "CC",
    label: "Cédula de Ciudadanía (CC)",
    icon: "🆔",
    description: "Documento de identidad para ciudadanos colombianos",
  },
  {
    value: "NIT",
    label: "NIT (Empresa)",
    icon: "🏢",
    description: "Número de Identificación Tributaria para empresas",
  },
  {
    value: "CE",
    label: "Cédula de Extranjería (CE)",
    icon: "🌍",
    description: "Documento para extranjeros residentes en Colombia",
  }
];

<TouchSelect
  value={documentType}
  options={documentTypeOptions}
  onChange={handleDocumentTypeChange}
  label="Tipo de Documento:"
  placeholder="Seleccione tipo de documento..."
  gridCols={2}
/>
```

## Comportamiento UX

1. **Estado Cerrado**: 
   - Muestra como un botón con la opción seleccionada o el placeholder
   - Incluye icono de chevron hacia abajo
   - Altura mínima de 70px para fácil toque

2. **Estado Abierto (Modal)**:
   - Cubre toda la pantalla con fondo oscuro
   - Header con título y botón X de cierre (60x60px mínimo)
   - Grid de opciones con altura mínima de 100px cada una
   - Opción seleccionada destacada en verde con borde

3. **Selección**:
   - Al tocar una opción, se cierra el modal automáticamente
   - El valor seleccionado se muestra en el botón principal

## Personalización

### Grid Columns
```tsx
gridCols={1}  // Una columna vertical
gridCols={2}  // Dos columnas (default, responsive)
gridCols={3}  // Tres columnas (responsive)
gridCols={4}  // Cuatro columnas (responsive)
```

### Iconos Personalizados
Puedes usar:
- Emojis: `icon: "🎯"`
- Componentes de Lucide React: `icon: <Home size={32} />`
- Cualquier React Node

### Estilos Personalizados
```tsx
<TouchSelect
  className="my-custom-class"
  // ... otros props
/>
```

## Accesibilidad

- Botones grandes (mínimo 60-70px) para fácil toque
- Feedback visual claro al seleccionar
- Botón de cierre prominente y accesible
- Estados disabled respetados
- Focus rings para navegación por teclado

## Best Practices

1. **Opciones Limitadas**: Ideal para 2-12 opciones. Para más opciones, considera paginación o búsqueda
2. **Descripciones Claras**: Usa descripciones para opciones que necesiten contexto adicional
3. **Iconos Consistentes**: Mantén un estilo consistente de iconos (todos emojis o todos componentes)
4. **Grid Apropiado**: Usa `gridCols={1}` para opciones con mucho texto, `gridCols={2-4}` para opciones concisas

## Componentes Relacionados

- `HMIContainer`: Layout principal para vistas HMI
- `SideTile`: Botones de navegación lateral
- `touch-input.tsx`: Input de texto optimizado para touch (futuro)

## TODO / Mejoras Futuras

- [ ] Agregar búsqueda/filtrado para muchas opciones
- [ ] Animaciones de apertura/cierre del modal
- [ ] Soporte para múltiple selección
- [ ] Teclado virtual integrado
- [ ] Scroll virtual para listas muy largas
