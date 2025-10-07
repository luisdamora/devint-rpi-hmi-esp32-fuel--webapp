# TouchInput - Componente con Teclado Virtual QWERTY

## 🎯 Descripción General

`TouchInput` es un componente de entrada de texto modular optimizado para interfaces HMI táctiles. Reemplaza el elemento `<input>` nativo con una interfaz fullscreen que incluye un **teclado QWERTY virtual**, facilitando la entrada de texto en pantallas touch sin necesidad de teclado físico.

## 📁 Estructura del Módulo

```
touch-input/
├── index.ts                      # Barrel export - punto de entrada
├── types.ts                      # Interfaces y tipos TypeScript
├── constants.ts                  # Constantes y layout del teclado
├── touch-input.tsx               # Componente principal (orchestrator)
├── touch-input-trigger.tsx       # Input trigger que abre el modal
├── touch-input-modal.tsx         # Modal fullscreen con display
├── touch-keyboard.tsx            # Teclado QWERTY virtual
├── touch-input-example.tsx       # Ejemplos de uso
├── use-touch-input.ts            # Hook personalizado con lógica
└── README.md                     # Este archivo
```

## 🧩 Componentes

### 1. **TouchInput** (Principal)
Componente orquestador que coordina todos los sub-componentes.

```tsx
<TouchInput
  value={name}
  onChange={setName}
  label="Nombre:"
  placeholder="Ingrese su nombre"
  maxLength={50}
/>
```

### 2. **TouchInputTrigger**
Input de solo lectura que muestra el valor actual y abre el modal.

- Altura mínima: 30px (compacto)
- Muestra icono de teclado
- Click abre el modal con teclado
- Estados: normal, disabled

### 3. **TouchInputModal**
Modal fullscreen con display y teclado.

- Display grande mostrando el texto actual
- Contador de caracteres (si hay maxLength)
- Teclado QWERTY completo
- Botones: Limpiar y Confirmar

### 4. **TouchKeyboard**
Teclado QWERTY virtual completo.

- **Layout**: 5 filas (números + QWERTY)
- **Teclas especiales**: @ . - _ y más
- **Mayúsculas/Minúsculas**: Toggle automático
- **Teclas de acción**: Backspace, Espacio, Clear
- **Touch-friendly**: Botones grandes (45px)

## 🪝 Hook Personalizado

### `useTouchInput`
Hook que encapsula toda la lógica del componente:

```tsx
const {
  isOpen,           // Estado del modal
  tempValue,        // Valor temporal (antes de confirmar)
  isUppercase,      // Estado mayúsculas
  handleOpen,       // Abrir modal
  handleClose,      // Cerrar sin guardar
  handleConfirm,    // Confirmar y guardar
  handleTempChange, // Cambiar valor temporal
  toggleCase,       // Toggle mayúsculas
} = useTouchInput(value, onChange, disabled);
```

## ⌨️ Layout del Teclado

### Fila 1: Números
```
[1] [2] [3] [4] [5] [6] [7] [8] [9] [0] [BACKSPACE]
```

### Fila 2: QWERTY
```
[q] [w] [e] [r] [t] [y] [u] [i] [o] [p]
```

### Fila 3: ASDF
```
[SHIFT] [a] [s] [d] [f] [g] [h] [j] [k] [l] [ñ]
```

### Fila 4: ZXCV + Especiales
```
[z] [x] [c] [v] [b] [n] [m] [@] [.] [-]
```

### Fila 5: Espacio
```
[         ESPACIO         ]
```

## 📊 Tipos TypeScript

### `TouchInputProps`
```typescript
interface TouchInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "number" | "tel" | "url";
  disabled?: boolean;
  className?: string;
  maxLength?: number;
  required?: boolean;
  id?: string;
  useFixedDimensions?: boolean;
  keyboardMode?: "full" | "numeric";  // Modo del teclado
}
```

## 🎨 Constantes

### Layout del Teclado
```typescript
// Teclado completo QWERTY
KEYBOARD_LAYOUT = {
  row1: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  row2: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  row3: ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"],
  row4: ["z", "x", "c", "v", "b", "n", "m", "@", ".", "-"],
}

// Teclado numérico
NUMERIC_KEYBOARD_LAYOUT = {
  row1: ["1", "2", "3"],
  row2: ["4", "5", "6"],
  row3: ["7", "8", "9"],
  row4: ["-", "0"],
}
```

### Tamaños
```typescript
TOUCH_INPUT_SIZES = {
  triggerMinHeight: "30px",
  keyboardKeySize: "45px",
  modalDisplayHeight: "60px",
  closeButtonSize: "50px",
}
```

## 💡 Uso Básico

### Importación
```tsx
import { TouchInput } from "@/components/shared/touch-input";
```

### Ejemplo Simple
```tsx
const [name, setName] = useState("");

<TouchInput
  value={name}
  onChange={setName}
  label="Nombre:"
  placeholder="Ingrese su nombre"
/>
```

### Ejemplo con Longitud Máxima
```tsx
<TouchInput
  value={email}
  onChange={setEmail}
  label="Email:"
  placeholder="correo@ejemplo.com"
  type="email"
  maxLength={100}
/>
```

### Ejemplo en Formulario
```tsx
const [formData, setFormData] = useState({
  name: "",
  email: "",
});

<TouchInput
  value={formData.name}
  onChange={(value) => setFormData({ ...formData, name: value })}
  label="Nombre / Razón Social:"
  placeholder="Ingrese el nombre completo"
  maxLength={100}
  id="name"
/>
```

### Ejemplo con Teclado Numérico
```tsx
const [code, setCode] = useState("");

<TouchInput
  value={code}
  onChange={setCode}
  label="Código:"
  placeholder="Ingrese código..."
  maxLength={20}
  keyboardMode="numeric"
/>
```
Teclado solo con números (0-9) y guion (-)

## 🎨 Dimensiones del Modal

### Modo Fullscreen (predeterminado)
```tsx
<TouchInput ... />  // Sin prop o useFixedDimensions={false}
```
- Ocupa toda la pantalla disponible
- Responsive a cualquier tamaño de viewport

### Modo Dimensiones Fijas HMI
```tsx
<TouchInput ... useFixedDimensions={true} />
```
- Dimensiones máximas: **800px × 480px**
- Ideal para interfaces HMI con tamaño fijo
- Centrado en la pantalla
- Fondo negro fuera del modal

## ✨ Características

### ✅ Ventajas
- 🎹 Teclado QWERTY completo integrado
- 📱 Optimizado para pantallas táctiles
- 🔢 Números y caracteres especiales incluidos
- 🔤 Mayúsculas/Minúsculas con toggle visual
- ⌨️ Teclas grandes (45px) touch-friendly
- 🎯 Display grande para visualizar el texto
- 📏 Contador de caracteres (si hay límite)
- ✅ Confirmar o Cancelar cambios
- 🧹 Botón Limpiar integrado
- 🎨 Diseño consistente con TouchSelect

### 🎯 Funcionalidades
- **Backspace**: Borrar último carácter
- **Espacio**: Agregar espacio
- **Clear**: Limpiar todo el texto
- **Shift**: Toggle mayúsculas/minúsculas
- **Contador**: Muestra caracteres usados/límite
- **Validación**: Respeta maxLength
- **Cancelar**: Descarta cambios (X)
- **Confirmar**: Guarda cambios (✓)

## 🚀 Diferencias con Input Nativo

| Aspecto | `<input>` Nativo | `<TouchInput>` |
|---------|-----------------|----------------|
| **Teclado** | Teclado del SO | Teclado virtual integrado |
| **Touch** | Difícil en HMI | Optimizado para touch |
| **Tamaño** | Pequeño | Fullscreen / Dimensiones fijas |
| **Visibilidad** | Limitada | Display grande |
| **Cancelar** | No disponible | Cancelar cambios |
| **UX HMI** | Pobre | Excelente |

## 🎯 Casos de Uso

- ✅ Nombres y apellidos
- ✅ Direcciones
- ✅ Emails
- ✅ Teléfonos
- ✅ Números de documento
- ✅ Razón social
- ✅ Notas y comentarios
- ✅ Cualquier entrada de texto en HMI

## 🔧 Personalización Avanzada

### Usar Sub-componentes Individualmente
```tsx
import {
  TouchInputTrigger,
  TouchInputModal,
  TouchKeyboard,
  useTouchInput
} from "@/components/shared/touch-input";

// Crear tu propia implementación personalizada
```

### Extender el Layout del Teclado
```tsx
import { KEYBOARD_LAYOUT } from "@/components/shared/touch-input";

// Usar o modificar el layout predefinido
```

## 🎨 Integración con Formularios

### Ejemplo de Reemplazo Directo
```tsx
// Antes (input nativo)
<input
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
  placeholder="Ingrese su nombre"
/>

// Después (TouchInput)
<TouchInput
  value={name}
  onChange={setName}
  placeholder="Ingrese su nombre"
/>
```

### Ejemplo con Validación
```tsx
const [name, setName] = useState("");
const [error, setError] = useState("");

const handleNameChange = (value: string) => {
  setName(value);
  if (value.length < 3) {
    setError("El nombre debe tener al menos 3 caracteres");
  } else {
    setError("");
  }
};

<TouchInput
  value={name}
  onChange={handleNameChange}
  label="Nombre:"
  maxLength={50}
/>
{error && <p className="text-red-500">{error}</p>}
```

## 📈 Performance

- **Memoización**: Callbacks optimizados con `useCallback`
- **Estado Local**: Valor temporal evita re-renders
- **Lazy Rendering**: Modal solo se renderiza cuando está abierto
- **Event Handling**: Gestión eficiente de eventos del teclado

## 🔮 Mejoras Futuras

- [x] Teclado numérico especializado
- [ ] Más layouts (AZERTY, DVORAK)
- [ ] Autocompletado / Sugerencias
- [ ] Voz a texto
- [ ] Emojis y símbolos adicionales
- [ ] Temas personalizables
- [ ] Animaciones de teclas
- [ ] Sonidos de teclas (opcional)
- [ ] Tests unitarios

## 🤝 Contribución

Al modificar este componente:

1. Mantén la separación de responsabilidades
2. Actualiza los tipos en `types.ts`
3. Agrega constantes en `constants.ts`
4. Documenta cambios en este README
5. Ejecuta `pnpm run lint:fix` antes de commit

## 📚 Referencias

- [Touch Interface Design Best Practices](https://www.nngroup.com/articles/touch-design/)
- [Virtual Keyboard UX](https://baymard.com/blog/touch-keyboard-mobile)
- [HMI Design Guidelines](https://www.automation.com/en-us/articles/hmi-design-best-practices)
