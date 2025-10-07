# TouchInput - Arquitectura Modular con Teclado Virtual

## 📐 Diagrama de Componentes

```
┌─────────────────────────────────────────────────────────────────┐
│                        TouchInput                               │
│                   (Componente Principal)                        │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │              useTouchInput (Hook)                         │ │
│  │  • Estado: isOpen, tempValue, isUppercase                │ │
│  │  • Lógica: handleOpen, handleClose, handleConfirm        │ │
│  │  • Optimización: useCallback                             │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌──────────────────────┐    ┌──────────────────────────────┐ │
│  │ TouchInputTrigger    │    │   TouchInputModal            │ │
│  │ ─────────────────    │    │   ─────────────────          │ │
│  │ • Label              │    │   • Modal Header             │ │
│  │ • Current Value      │    │   • Close Button (X)         │ │
│  │ • Placeholder        │    │   • Text Display             │ │
│  │ • Keyboard Icon      │    │   ┌──────────────────────┐   │ │
│  │ • onClick → open     │    │   │ TouchKeyboard        │   │ │
│  └──────────────────────┘    │   │ ──────────────────   │   │ │
│                               │   │ • Row 1: Numbers     │   │ │
│                               │   │ • Row 2: QWERTY      │   │ │
│                               │   │ • Row 3: ASDF        │   │ │
│                               │   │ • Row 4: ZXCV        │   │ │
│                               │   │ • Row 5: Space       │   │ │
│                               │   │ • Shift/Backspace    │   │ │
│                               │   └──────────────────────┘   │ │
│                               │   • Clear Button             │ │
│                               │   • Confirm Button           │ │
│                               └──────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘

                                  ↓
                            ┌──────────┐
                            │  types   │
                            └──────────┘
                                  ↓
                           ┌──────────────┐
                           │  constants   │
                           │ - KEYBOARD   │
                           │   LAYOUT     │
                           └──────────────┘
```

## 🔄 Flujo de Datos

```
Usuario                TouchInput             Hook              Modal/Keyboard
  │                        │                    │                  │
  │────click trigger──────>│                    │                  │
  │                        │──get state────────>│                  │
  │                        │<──isOpen=false─────│                  │
  │                        │──handleOpen()─────>│                  │
  │                        │<──isOpen=true──────│                  │
  │                        │──render modal──────┼─────────────────>│
  │                        │   tempValue=value  │    Display       │
  │<────────────────────────────────────────────────────────────────│
  │                        │                    │                  │
  │─press key "A"─────────>│                    │                  │
  │                        │──handleTempChange─>│                  │
  │                        │   (tempValue+"A")  │                  │
  │                        │<──update display───┼─────────────────>│
  │                        │                    │                  │
  │─press Confirm─────────>│                    │                  │
  │                        │──handleConfirm()──>│                  │
  │                        │                    │──onChange()──>   │
  │                        │                    │  (tempValue)     │
  │                        │                    │──setOpen(false)  │
  │                        │<──isOpen=false─────│                  │
  │                        │──close modal───────┼─────────────────>│
  │<────────────────────────────────────────────┴──────────────────┘
```

## 📦 Dependencias entre Módulos

```
index.ts
  ├── touch-input.tsx
  │     ├── types.ts
  │     ├── use-touch-input.ts
  │     ├── touch-input-trigger.tsx
  │     │     ├── types.ts
  │     │     └── constants.ts
  │     └── touch-input-modal.tsx
  │           ├── types.ts
  │           ├── constants.ts
  │           └── touch-keyboard.tsx
  │                 ├── types.ts
  │                 └── constants.ts (KEYBOARD_LAYOUT)
  ├── types.ts
  └── constants.ts
```

## 🎯 Separación de Responsabilidades

### **touch-input.tsx** (Orchestrator)
- **Responsabilidad**: Coordinar sub-componentes
- **Lógica**: Delegada al hook
- **Props**: Interfaz pública del componente
- **Renderizado**: Composición de Trigger + Modal

### **use-touch-input.ts** (Business Logic)
- **Responsabilidad**: Toda la lógica del componente
- **Estado**: Manejo de isOpen, tempValue, isUppercase
- **Callbacks**: Funciones memoizadas
- **Optimización**: Performance con hooks
- **Patrón**: Valor temporal antes de confirmar

### **touch-input-trigger.tsx** (Presentational)
- **Responsabilidad**: Mostrar valor actual
- **Interacción**: onClick para abrir modal
- **UI**: Input de solo lectura con icono
- **Sin estado**: Totalmente controlado

### **touch-input-modal.tsx** (Container)
- **Responsabilidad**: Contener display y teclado
- **Layout**: Fullscreen con header, display, keyboard, actions
- **Coordinación**: Gestiona eventos del teclado
- **Estados**: Valor temporal mientras se edita

### **touch-keyboard.tsx** (Interactive)
- **Responsabilidad**: Teclado QWERTY completo
- **Layout**: 5 filas de teclas
- **Interactividad**: Eventos de teclas
- **Estados**: Mayúsculas/Minúsculas
- **Touch-optimizado**: Teclas grandes (45px)

### **types.ts** (Type Definitions)
- **Responsabilidad**: Definiciones TypeScript
- **Contratos**: Interfaces de todos los componentes
- **Type Safety**: Prevenir errores

### **constants.ts** (Configuration)
- **Responsabilidad**: Valores reutilizables
- **Keyboard Layout**: Distribución de teclas QWERTY
- **Estilos**: Clases de Tailwind
- **Tamaños**: Dimensiones touch-friendly

## 🎹 Diseño del Teclado

### Layout QWERTY Español
```
┌───────────────────────────────────────────────────┐
│  [1] [2] [3] [4] [5] [6] [7] [8] [9] [0] [DEL]   │  Números + Backspace
├───────────────────────────────────────────────────┤
│  [q] [w] [e] [r] [t] [y] [u] [i] [o] [p]         │  QWERTY
├───────────────────────────────────────────────────┤
│ [ABC] [a] [s] [d] [f] [g] [h] [j] [k] [l] [ñ]    │  ASDF + Shift
├───────────────────────────────────────────────────┤
│  [z] [x] [c] [v] [b] [n] [m] [@] [.] [-]         │  ZXCV + Especiales
├───────────────────────────────────────────────────┤
│               [   ESPACIO   ]                     │  Barra espaciadora
└───────────────────────────────────────────────────┘
```

### Características del Teclado
- ✅ **45px** de tamaño mínimo (touch-friendly)
- ✅ **Layout español** con letra **Ñ**
- ✅ **Caracteres especiales** (@, ., -, etc.)
- ✅ **Toggle Shift** visual (ABC/abc)
- ✅ **Backspace** con icono
- ✅ **Espacio** grande y centrado
- ✅ **Colores diferenciados** (normal/acción/especial)

## 🔀 Patrones de Diseño Aplicados

### 1. **Composition Pattern**
```tsx
<TouchInput>
  <TouchInputTrigger />
  <TouchInputModal>
    <Display />
    <TouchKeyboard />
    <ActionButtons />
  </TouchInputModal>
</TouchInput>
```

### 2. **Custom Hook Pattern**
```tsx
const logic = useTouchInput(props);
// Separa lógica de presentación
```

### 3. **Controlled Component Pattern**
```tsx
value={externalValue}
onChange={externalHandler}
// Estado controlado desde afuera
```

### 4. **Temporary State Pattern**
```tsx
tempValue  // Valor temporal mientras edita
value      // Valor real solo al confirmar
// Permite cancelar cambios
```

### 5. **Event Delegation Pattern**
```tsx
// Modal maneja eventos del teclado
onKeyPress={(key) => handleKeyPress(key)}
// Propaga a través de callbacks
```

## 🚀 Ventajas de esta Arquitectura

| Aspecto | Ventaja |
|---------|---------|
| **Modularidad** | 8 archivos especializados |
| **Testabilidad** | Cada componente testeable individualmente |
| **Reutilización** | Teclado puede usarse en otros contextos |
| **Mantenimiento** | Cambios localizados por responsabilidad |
| **UX** | Valor temporal permite cancelar |
| **Performance** | Callbacks memoizados |
| **Type Safety** | 100% TypeScript con tipos estrictos |
| **Touch-Optimized** | Diseñado para pantallas táctiles |

## 📊 Comparación con TouchSelect

| Aspecto | TouchSelect | TouchInput |
|---------|-------------|------------|
| **Propósito** | Selección de opciones | Entrada de texto |
| **Input Method** | Click en opciones | Teclado virtual |
| **Layout** | Grid de opciones | Teclado QWERTY |
| **Confirmación** | Inmediata | Requiere confirmar |
| **Cancelar** | Cierra sin más | Descarta cambios |
| **Componentes** | 4 principales | 5 principales |
| **Complejidad** | Media | Alta |

## 🎓 Principios SOLID Aplicados

- **S**ingle Responsibility: Cada archivo una responsabilidad
  - `touch-keyboard.tsx`: Solo el teclado
  - `touch-input-modal.tsx`: Solo el contenedor
  
- **O**pen/Closed: Extensible sin modificar existente
  - Agregar teclas sin cambiar estructura
  
- **L**iskov Substitution: Props intercambiables
  - TouchInput puede reemplazar `<input>`
  
- **I**nterface Segregation: Interfaces específicas
  - `TouchKeyboardProps` separado de `TouchInputModalProps`
  
- **D**ependency Inversion: Depende de abstracciones
  - Usa types.ts, no implementaciones concretas

## 🔮 Extensibilidad

### Agregar nuevo tipo de teclado

**Ejemplo: Teclado Numérico**

1. Crear `touch-keyboard-numeric.tsx`
2. Definir nuevo layout en `constants.ts`
3. Agregar prop `keyboardType` en `types.ts`
4. Importar en modal y usar condicional
5. Exportar desde `index.ts`

```tsx
// Uso
<TouchInput
  keyboardType="numeric"  // Nuevo prop
  ...
/>
```

## 🧪 Testing Strategy

### Componentes Pequeños = Tests Simples
```tsx
// Test del teclado aislado
test("TouchKeyboard emits key on press", () => {
  const onKeyPress = jest.fn();
  render(<TouchKeyboard onKeyPress={onKeyPress} ... />);
  fireEvent.click(screen.getByText("a"));
  expect(onKeyPress).toHaveBeenCalledWith("a");
});

// Test del hook
test("useTouchInput manages temp value", () => {
  const { result } = renderHook(() => useTouchInput(...));
  act(() => result.current.handleOpen());
  expect(result.current.isOpen).toBe(true);
});
```

## 📈 Métricas de Calidad

- **Archivos**: 9 archivos modulares
- **Líneas por archivo**: 40-150 líneas
- **Complejidad Ciclomática**: < 6 por función
- **Acoplamiento**: Bajo (interfaces bien definidas)
- **Cohesión**: Alta (cada módulo hace una cosa)
- **Cobertura de Tipos**: 100% TypeScript
- **Touch Target Size**: 45px (cumple WCAG)

## 🎯 HMI Design Compliance

✅ **Touch Targets**: ≥ 45px (recomendado: 48px)  
✅ **Contrast**: Alto contraste en todas las teclas  
✅ **Visual Feedback**: Active states en teclas  
✅ **Error Prevention**: Valor temporal + confirmar  
✅ **Visibility**: Display grande y legible  
✅ **Consistency**: Misma arquitectura que TouchSelect  

## 📚 Recursos Adicionales

- Ver `README.md` para guía de uso completa
- Ver `touch-input-example.tsx` para ejemplos prácticos
- Ver archivos individuales para detalles de implementación
- Comparar con `touch-select/` para consistencia
