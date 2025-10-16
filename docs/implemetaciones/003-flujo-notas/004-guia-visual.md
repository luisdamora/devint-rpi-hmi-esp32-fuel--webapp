# 📸 Guía Visual - Flujo de Ventas Consolidado

## 🎨 Referencia Rápida para Desarrollo

Este documento proporciona una referencia visual rápida de las pantallas, componentes y flujos basados en las imágenes proporcionadas.

---

## 1. Pantallas Base (De las Imágenes)

### 1.1 Transacción de Contado (Imagen 1)

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  [⛽ INICIO]       TRANSACCION DE CONTADO            ┃
┃                                                      ┃
┃                    ┏━━━━━━━━━━━━━┓  ESTADO ACTUAL   ┃
┃                    ┃  $100.000   ┃  ┏━━━━━━━━━━━┓   ┃
┃                    ┗━━━━━━━━━━━━━┛  ┃ 12.45 Gal ┃   ┃
┃                                     ┗━━━━━━━━━━━┛   ┃
┃  DATOS DEL CLIENTE                                   ┃
┃                                                      ┃
┃  PLACA              ID FACTURA ELECTRONICA          ┃
┃  ┌──────────────┐   ┌──────────────────────────┐   ┃
┃  │ 1256485985   │   │ 1256485985               │   ┃
┃  └──────────────┘   └──────────────────────────┘   ┃
┃                                                      ┃
┃  ID PUNTOS COLOMBIA  ID PROMOCION                   ┃
┃  ┌──────────────┐   ┌──────────────────────────┐   ┃
┃  │ 1256485985   │   │ 1256485985               │   ┃
┃  └──────────────┘   └──────────────────────────┘   ┃
┃                                                      ┃
┃  ☐ CUPÓN?                                           ┃
┃                                                      ┃
┃           ┌────────────────────────────┐            ┃
┃           │  Metodos de Pago           │            ┃
┃           └────────────────────────────┘            ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Componentes Clave**:
- Header con monto verde y estado azul
- Grid 2x2 para campos de datos
- Checkbox para cupón
- Botón grande "Metodos de Pago"

### 1.2 Transacción a Crédito (Imagen 2)

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  [⛽ INICIO]       TRANSACCION A CREDITO             ┃
┃                                                      ┃
┃                    ┏━━━━━━━━━━━━━┓  ESTADO ACTUAL   ┃
┃                    ┃  $100.000   ┃  ┏━━━━━━━━━━━┓   ┃
┃                    ┗━━━━━━━━━━━━━┛  ┃ 12.45 Gal ┃   ┃
┃                                     ┗━━━━━━━━━━━┛   ┃
┃  DATOS DEL CLIENTE                                   ┃
┃                                                      ┃
┃  PLACA              ID FACTURA ELECTRONICA          ┃
┃  ┌──────────────┐   ┌──────────────────────────┐   ┃
┃  │ 1256485985   │   │ 1256485985               │   ┃
┃  └──────────────┘   └──────────────────────────┘   ┃
┃                                                      ┃
┃  ID PUNTOS COLOMBIA  ID PROMOCION                   ┃
┃  ┌──────────────┐   ┌──────────────────────────┐   ┃
┃  │ 1256485985   │   │ 1256485985               │   ┃
┃  └──────────────┘   └──────────────────────────┘   ┃
┃                                                      ┃
┃  ☐ CUPÓN?                                           ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Diferencias con Contado**:
- Título: "TRANSACCION A CREDITO"
- PLACA viene pre-cargada desde identificación
- No muestra "Metodos de Pago" (crédito directo)

### 1.3 Identificación de Vehículo (Imagen 3) ⭐ NUEVO

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  [💳 CREDITO]   IDENTIFICACION DE VEHICULO          ┃
┃  [🏠 INICIO]                                        ┃
┃                                                      ┃
┃  PLACA                    VEHICULO IDENTIFICADO ✅  ┃
┃  ┌──────────────┐         ┌───────────────────────┐┃
┃  │ 1256485985   │         │  VEHICULO             ││
┃  └──────────────┘         │  IDENTIFICADO         ││
┃                           └───────────────────────┘┃
┃                                                      ┃
┃  ┌───────────────────────────────────────────────┐  ┃
┃  │  LECTOR RFID      VEHICULO IDENTIFICADO      │  ┃
┃  └───────────────────────────────────────────────┘  ┃
┃                                                      ┃
┃  ┌───────────────────────────────────────────────┐  ┃
┃  │  LECTOR IBUTTON   VEHICULO IDENTIFICADO      │  ┃
┃  └───────────────────────────────────────────────┘  ┃
┃                                                      ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Componentes Clave**:
- Tres tarjetas de método de identificación
- Estado visual claro: "VEHICULO IDENTIFICADO"
- Botones grandes touch-friendly
- Sidebar con CRÉDITO e INICIO

---

## 2. Mapeo de Colores

### 2.1 Paleta de Colores del Sistema

```typescript
export const HMI_COLORS = {
    // Backgrounds
    navy: {
        900: "#0A1628", // Fondo principal
        800: "#1A2744", // Fondo secundario
    },
    
    // Estados
    success: "#10B981", // Verde - Monto, éxito
    info: "#3B82F6",    // Azul - Estado actual, información
    warning: "#F59E0B", // Amarillo - Advertencias
    error: "#EF4444",   // Rojo - Errores
    
    // Acentos
    primary: "#10B981",  // Verde principal
    secondary: "#3B82F6", // Azul secundario
    
    // Texto
    textPrimary: "#FFFFFF",
    textSecondary: "#94A3B8",
};
```

### 2.2 Aplicación de Colores

```
TRANSACCION DE CONTADO [texto blanco]
┌────────────────┐  
│  $100.000      │  ← Verde (#10B981)
└────────────────┘  

ESTADO ACTUAL [texto amarillo]
┌────────────────┐  
│  12.45 Gal     │  ← Azul (#3B82F6)
└────────────────┘  
```

---

## 3. Especificaciones de Layout

### 3.1 Grid Principal

```
┌────────────────────────────────────────────────────┐
│                   max-w-6xl                        │
│  ┌──────────┬──────────────────────────────────┐  │
│  │ Col 1    │ Col 2-4 (Span 3)                 │  │
│  │ (Sidebar)│                                   │  │
│  │          │  ┌──────────────────────────────┐│  │
│  │ [VENTAS] │  │  TransactionSummaryHeader    ││  │
│  │          │  └──────────────────────────────┘│  │
│  │ [INICIO] │                                   │  │
│  │          │  ┌──────────────────────────────┐│  │
│  │          │  │  PaymentModeSelector         ││  │
│  │          │  └──────────────────────────────┘│  │
│  │          │                                   │  │
│  │          │  ┌────────────┬────────────────┐ │  │
│  │          │  │ Campo 1    │ Campo 2        │ │  │
│  │          │  ├────────────┼────────────────┤ │  │
│  │          │  │ Campo 3    │ Campo 4        │ │  │
│  │          │  └────────────┴────────────────┘ │  │
│  └──────────┴──────────────────────────────────┘  │
└────────────────────────────────────────────────────┘
```

**Clases Tailwind**:
```typescript
<div className="grid grid-cols-4 gap-4 w-full max-w-6xl">
    {/* Sidebar */}
    <div className="col-span-1 flex flex-col gap-6">
        {/* ... */}
    </div>
    
    {/* Contenido principal */}
    <div className="col-span-3 space-y-4">
        {/* ... */}
    </div>
</div>
```

### 3.2 Grid de Campos (2x2)

```
┌─────────────────────────┬─────────────────────────┐
│  PLACA                  │  ID FACTURA             │
│  ┌───────────────────┐  │  ┌───────────────────┐  │
│  │ [input]           │  │  │ [input]           │  │
│  └───────────────────┘  │  └───────────────────┘  │
├─────────────────────────┼─────────────────────────┤
│  ID PUNTOS              │  ID PROMOCION           │
│  ┌───────────────────┐  │  ┌───────────────────┐  │
│  │ [input]           │  │  │ [input]           │  │
│  └───────────────────┘  │  └───────────────────┘  │
└─────────────────────────┴─────────────────────────┘
```

**Clases Tailwind**:
```typescript
<div className="grid grid-cols-2 gap-4">
    <InputField label="PLACA" />
    <InputField label="ID FACTURA ELECTRONICA" />
    <InputField label="ID PUNTOS COLOMBIA" />
    <InputField label="ID PROMOCION" />
</div>
```

---

## 4. Componentes Visuales

### 4.1 Transaction Summary Header

```typescript
// Dimensiones y espaciado
const headerConfig = {
    padding: "p-3",        // 12px
    gap: "gap-3",          // 12px entre columnas
    borderRadius: "rounded-lg",
    
    // Monto (verde)
    amountBg: "bg-green-500",
    amountPadding: "p-3",
    amountFontSize: "text-2xl",
    
    // Estado (azul)
    stateBg: "bg-blue-600",
    statePadding: "p-3",
    stateFontSize: "text-2xl",
};
```

### 4.2 Input Field

```typescript
// Especificaciones
const inputFieldConfig = {
    // Label
    labelFontSize: "text-sm",
    labelColor: "text-gray-700",
    labelWeight: "font-semibold",
    labelMargin: "mb-1",
    
    // Input
    inputHeight: "h-12",       // 48px
    inputPadding: "px-3",      // 12px
    inputFontSize: "text-base", // 16px
    inputBorder: "border-2",
    inputBorderColor: "border-gray-300",
    inputBorderRadius: "rounded",
    
    // Focus
    focusBorder: "focus:border-blue-500",
    focusRing: "focus:ring-2 focus:ring-blue-200",
};
```

### 4.3 Identification Method Card

```typescript
// Dimensiones
const cardConfig = {
    // Contenedor
    padding: "p-4",
    borderRadius: "rounded-lg",
    border: "border-2",
    minHeight: "min-h-[80px]",
    
    // Estados
    inactive: "border-gray-300 bg-white",
    active: "border-blue-500 bg-blue-50",
    identified: "border-green-500 bg-green-50",
    
    // Touch
    cursor: "cursor-pointer",
    transition: "transition-all duration-200",
    activeScale: "active:scale-95",
};
```

---

## 5. Flujos Visuales

### 5.1 Flujo CONTADO

```
┌─────────────┐
│ MENÚ        │
│ PRINCIPAL   │
└──────┬──────┘
       │ Click [CONTADO]
       ↓
┌─────────────┐
│ Cash Sale   │
│ View        │
│             │
│ Ingresa:    │
│ • $100.000  │
│ • EFECTIVO  │
└──────┬──────┘
       │ Press [ENTER]
       ↓
┌─────────────┐
│ Payment     │
│ Info View   │────────► Header: CONTADO + $100K + 12.45Gal
│             │
│ Ingresa:    │
│ • PLACA     │
│ • IDs       │
└──────┬──────┘
       │ [CONTINUAR]
       ↓
┌─────────────┐
│ Payment     │
│ Methods     │────────► Selecciona métodos
│ View        │
└──────┬──────┘
       │ [GUARDAR]
       ↓
┌─────────────┐
│ Transaction │
│ Status      │────────► ✅ Venta completada
└─────────────┘
```

### 5.2 Flujo CRÉDITO

```
┌─────────────┐
│ MENÚ        │
│ PRINCIPAL   │
└──────┬──────┘
       │ Click [CRÉDITO]
       ↓
┌─────────────┐
│ Credit Sale │
│ View        │
│             │
│ Ingresa:    │
│ • $100.000  │
└──────┬──────┘
       │ Press [ENTER]
       ↓
┌─────────────┐
│ Vehicle     │⭐
│ Identif.    │   NUEVO
│             │
│ Selecciona: │
│ • PLACA     │
│ • RFID      │
│ • IBUTTON   │
└──────┬──────┘
       │ Identifica → ABC123
       │ [CONTINUAR]
       ↓
┌─────────────┐
│ Payment     │
│ Info View   │────────► Header: CREDITO + $100K + 12.45Gal
│             │────────► PLACA: ABC123 (pre-cargada)
│ Ingresa:    │
│ • IDs       │
└──────┬──────┘
       │ [CONTINUAR]
       ↓
┌─────────────┐
│ Payment     │
│ Methods     │────────► Crédito directo
│ View        │
└──────┬──────┘
       │ [GUARDAR]
       ↓
┌─────────────┐
│ Transaction │
│ Status      │────────► ✅ Venta a crédito
└─────────────┘
```

---

## 6. Estados Visuales

### 6.1 Botones

#### **Estado Normal**
```
┌──────────────────────┐
│  CONTINUAR A PAGO  → │  ← bg-green-500
└──────────────────────┘
```

#### **Estado Deshabilitado**
```
┌──────────────────────┐
│  CONTINUAR A PAGO  → │  ← bg-gray-300 (opaco)
└──────────────────────┘
```

#### **Estado Activo (Touch)**
```
┌─────────────────────┐
│ CONTINUAR A PAGO  → │   ← scale-95 (presionado)
└─────────────────────┘
```

### 6.2 Campos de Input

#### **Normal**
```
PLACA
┌────────────────┐
│ [cursor]       │  ← border-gray-300
└────────────────┘
```

#### **Focus**
```
PLACA
┌────────────────┐
│ ABC[cursor]    │  ← border-blue-500 + ring-2
└────────────────┘
```

#### **Error**
```
PLACA
┌────────────────┐
│ ABC1           │  ← border-red-500
└────────────────┘
⚠️ Formato inválido
```

#### **Success**
```
PLACA
┌────────────────┐
│ ABC123 ✅      │  ← border-green-500
└────────────────┘
```

### 6.3 Tarjetas de Identificación

#### **Inactiva**
```
┌──────────────────────────────┐
│  LECTOR RFID                 │  ← border-gray-300
│  (Seleccionar)               │
└──────────────────────────────┘
```

#### **Activa - Leyendo**
```
┌──────────────────────────────┐
│  LECTOR RFID                 │  ← border-blue-500
│  ⏳ Esperando tag...         │     bg-blue-50
└──────────────────────────────┘
```

#### **Identificada**
```
┌──────────────────────────────┐
│  LECTOR RFID                 │  ← border-green-500
│  ✅ VEHICULO IDENTIFICADO    │     bg-green-50
└──────────────────────────────┘
```

---

## 7. Animaciones y Transiciones

### 7.1 Transición entre Vistas

```typescript
// Configuración de animaciones
const transitionConfig = {
    duration: "duration-200",
    easing: "ease-in-out",
    
    // Entrada
    enter: "transition-opacity",
    enterFrom: "opacity-0",
    enterTo: "opacity-100",
    
    // Salida
    leave: "transition-opacity",
    leaveFrom: "opacity-100",
    leaveTo: "opacity-0",
};
```

### 7.2 Feedback Táctil

```typescript
// Botones
const touchFeedback = {
    scale: "active:scale-95",
    duration: "duration-150",
    brightness: "active:brightness-90",
};

// Aplicación
className={`
    transform transition-transform ${touchFeedback.duration}
    ${touchFeedback.scale}
    ${touchFeedback.brightness}
`}
```

---

## 8. Checklist de Implementación

### Por Pantalla

#### ✅ Cash Sale View
- [ ] Actualizar `handleEnter` para pasar state
- [ ] Validar monto > 0 antes de navegar
- [ ] Incluir `paymentMode` en state
- [ ] Testing de navegación

#### ✅ Credit Sale View
- [ ] Actualizar `handleEnter` para pasar state
- [ ] Navegar a `vehicle-identification` (no directo a payment)
- [ ] Validar monto > 0 antes de navegar
- [ ] Testing de navegación

#### ⭐ Vehicle Identification View (NUEVO)
- [ ] Crear estructura de componente
- [ ] Implementar tres métodos de identificación
- [ ] Crear simulaciones RFID/iButton
- [ ] Implementar validación de placa manual
- [ ] Agregar estados visuales claros
- [ ] Testing de cada método
- [ ] Navegación a payment con datos

#### ✅ Payment Info View
- [ ] Agregar `TransactionSummaryHeader`
- [ ] Usar `useTransactionContext` hook
- [ ] Pre-cargar placa si viene de vehicle-identification
- [ ] Layout grid 2x2 para campos
- [ ] Aplicar optimizaciones HMI
- [ ] Testing con ambos flujos

#### ✅ Payment Methods View
- [ ] Mantener funcionalidad existente
- [ ] Adaptar para modo crédito
- [ ] Testing de guardado

---

## 9. Medidas y Dimensiones

### 9.1 Tamaños de Elementos

| Elemento | Medida | Justificación |
|----------|--------|---------------|
| **Botón touch** | 48px altura | Estándar táctil mínimo |
| **Input field** | 48px altura | Fácil toque con dedo |
| **Espaciado** | 16px (gap-4) | Separación cómoda |
| **Sidebar width** | 25% (col-span-1) | Proporción 1:3 |
| **Contenido width** | 75% (col-span-3) | Área principal amplia |
| **Max width** | 1280px (max-w-6xl) | Pantallas grandes |
| **Font mínimo** | 16px (text-base) | Legibilidad garantizada |
| **Icon touch** | 64px | Iconos sidebar grandes |

### 9.2 Breakpoints

```typescript
// Tailwind breakpoints para HMI
const breakpoints = {
    sm: "640px",   // Pantallas pequeñas (5-7")
    md: "768px",   // Tablets (8-10")
    lg: "1024px",  // Pantallas medianas (10-15")
    xl: "1280px",  // Pantallas grandes (15"+)
};
```

---

## 10. Guía Rápida de Desarrollo

### Paso 1: Setup Inicial
```bash
# Crear nuevos archivos
touch src/lib/hooks/use-transaction-context.ts
touch src/components/modules/sales/vehicle-identification/vehicle-identification-view.tsx
touch src/components/modules/sales/payment-view/components/transaction-summary-header.tsx
```

### Paso 2: Implementar Hook de Contexto
```typescript
// Copiar código de especificaciones técnicas
// use-transaction-context.ts
```

### Paso 3: Actualizar Navegación
```typescript
// Modificar cash-sale-view.tsx línea 60
// Modificar credit-sale-view.tsx línea 35
```

### Paso 4: Crear Vehicle Identification
```typescript
// Implementar componente completo
// Agregar ruta en routes.tsx
```

### Paso 5: Optimizar Payment View
```typescript
// Agregar TransactionSummaryHeader
// Actualizar payment-info-view.tsx
```

### Paso 6: Testing
```bash
# Flujo completo contado
# Flujo completo crédito
# Edge cases
```

---

**Documento de referencia visual basado en imágenes proporcionadas**  
**Última actualización**: 2025-01-15  
**Versión**: 1.0
