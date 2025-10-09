# Detalles Técnicos de Componentes - Módulo Utilidades

**Fecha:** 08/10/2025 22:32  
**Versión:** 1.0

---

## 📑 Índice de Componentes

1. [types.ts](#1-typests)
2. [mock-data.ts](#2-mock-datats)
3. [sales-table.tsx](#3-sales-tabletsx)
4. [utilities-actions.tsx](#4-utilities-actionstsx)
5. [utilities-view.tsx](#5-utilities-viewtsx)

---

## 1. types.ts

### Propósito
Definir todas las interfaces y tipos TypeScript para el módulo de utilidades.

### Exports

#### `SaleRecord`
```typescript
export interface SaleRecord {
  fe: string;           // Número de factura electrónica (e.g., "#FE")
  idPuntos: string;     // ID del programa de puntos (e.g., "ID PUNTOS")
  idPromo: string;      // ID de la promoción (e.g., "ID PROMO")
  placa: string;        // Placa del vehículo (formato: ABC-123)
  producto: string;     // Nombre del producto (Gasolina, Diesel, etc.)
  dinero: number;       // Monto en COP
  volumen: number;      // Volumen en litros
}
```

#### `UtilityAction`
```typescript
export interface UtilityAction {
  key: string;              // Identificador único ('inicio', 'test-print', etc.)
  label: string;            // Texto del botón
  color: string;            // Clase TailwindCSS (e.g., 'bg-red-600')
  icon: React.ReactNode;    // Componente de lucide-react
  action?: () => void;      // Handler opcional
  isActive?: boolean;       // Si está actualmente seleccionado
}
```

#### `SalesTableProps`
```typescript
export interface SalesTableProps {
  salesData: SaleRecord[];  // Array de ventas a mostrar
}
```

#### `UtilitiesActionsProps`
```typescript
export interface UtilitiesActionsProps {
  onActionClick: (actionKey: string) => void;  // Callback para clicks
}
```

### Ubicación
`src/components/modules/utilities/types.ts`

### Dependencias
- `react` (para React.ReactNode)

---

## 2. mock-data.ts

### Propósito
Proveer datos de ejemplo realistas para desarrollo y testing.

### Estructura de Datos

```typescript
import type { SaleRecord } from "./types";

export const mockSalesData: SaleRecord[] = [
  {
    fe: "#FE001234",
    idPuntos: "PTS-2024-001",
    idPromo: "PROMO-10",
    placa: "ABC-123",
    producto: "Gasolina Corriente",
    dinero: 125000,
    volumen: 25.5,
  },
  {
    fe: "#FE001235",
    idPuntos: "PTS-2024-002",
    idPromo: "PROMO-15",
    placa: "DEF-456",
    producto: "Diesel",
    dinero: 180000,
    volumen: 40.0,
  },
  {
    fe: "#FE001236",
    idPuntos: "PTS-2024-003",
    idPromo: "PROMO-10",
    placa: "GHI-789",
    producto: "ACPM",
    dinero: 95000,
    volumen: 18.2,
  },
  {
    fe: "#FE001237",
    idPuntos: "PTS-2024-004",
    idPromo: "PROMO-20",
    placa: "JKL-012",
    producto: "Gasolina Extra",
    dinero: 210000,
    volumen: 35.8,
  },
  {
    fe: "#FE001238",
    idPuntos: "PTS-2024-005",
    idPromo: "PROMO-10",
    placa: "MNO-345",
    producto: "Gasolina Corriente",
    dinero: 67000,
    volumen: 13.5,
  },
];
```

### Características
- 5 registros de muestra
- Datos realistas del mercado colombiano
- Formatos consistentes con estándares locales
- Variedad de productos y montos

### Ubicación
`src/components/modules/utilities/mock-data.ts`

### Dependencias
- `types.ts` (SaleRecord)

---

## 3. sales-table.tsx

### Propósito
Componente que renderiza la tabla de últimas ventas con formato profesional.

### Características
- Tabla responsive
- Formato de moneda colombiana (COP)
- Formato de volumen con decimales
- Estilos profesionales con TailwindCSS
- Headers destacados

### Estructura JSX

```
<div className="bg-white rounded-lg shadow-lg p-6">
  <h2>ÚLTIMAS VENTAS</h2>
  <table>
    <thead>
      <tr>
        <th>#FE</th>
        <th>ID PUNTOS</th>
        <th>ID PROMO</th>
        <th>PLACA</th>
        <th>PRODUCTO</th>
        <th>DINERO</th>
        <th>VOLUMEN</th>
      </tr>
    </thead>
    <tbody>
      {salesData.map((sale) => (
        <tr key={sale.fe}>
          <td>{sale.fe}</td>
          <td>{sale.idPuntos}</td>
          <td>{sale.idPromo}</td>
          <td>{sale.placa}</td>
          <td>{sale.producto}</td>
          <td>{formatCurrency(sale.dinero)}</td>
          <td>{sale.volumen.toFixed(1)} L</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

### Funciones Helper

```typescript
/**
 * Formatea un número como moneda colombiana
 */
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(amount);
};
```

### Props
- `salesData: SaleRecord[]` - Array de registros a mostrar

### Clases TailwindCSS Principales
```css
/* Container */
.bg-white .rounded-lg .shadow-lg .p-6 .mb-6

/* Título */
.text-xl .font-bold .text-gray-800 .mb-4

/* Table */
.w-full .border-collapse

/* Thead */
.bg-blue-900 .text-white

/* Th */
.px-4 .py-3 .text-left .text-sm .font-semibold

/* Tbody tr */
.border-b .border-gray-200 .hover:bg-gray-50

/* Td */
.px-4 .py-3 .text-sm .text-gray-700
```

### Ubicación
`src/components/modules/utilities/sales-table.tsx`

### Dependencias
- `react`
- `types.ts` (SalesTableProps, SaleRecord)

---

## 4. utilities-actions.tsx

### Propósito
Componente que renderiza los botones de acción en la parte inferior de la vista.

### Acciones a Implementar

| Key | Label | Color | Icono | Acción |
|-----|-------|-------|-------|--------|
| `inicio` | INICIO | Red | Home | Navegar a menú |
| `test-print` | TEST DE IMPRESION | Orange | Printer | Test de impresora |
| `printer-settings` | AJUSTES IMPRESORA | Purple | Settings | Config impresora |
| `last-sales` | ULTIMAS VENTAS | Yellow | Receipt | Vista actual (activo) |
| `last-turn` | ULTIMO TURNO | Cyan | Clock | Info último turno |

⚠️ **IMPORTANTE:** NO incluir botón "REINICIAR"

### Estructura JSX

```
<div className="grid grid-cols-5 gap-4 max-w-6xl mx-auto px-4">
  {actions.map((action) => (
    <button
      key={action.key}
      onClick={() => action.action?.()}
      className={`${action.color} hover:opacity-90 ...`}
      disabled={!action.action}
    >
      {action.icon}
      <span>{action.label}</span>
    </button>
  ))}
</div>
```

### Estados del Botón

```typescript
// Botón activo (vista actual)
className="bg-yellow-500 ring-4 ring-yellow-300"

// Botón con hover
className="hover:opacity-90 hover:scale-105 transition-all"

// Botón deshabilitado
className="opacity-50 cursor-not-allowed"
disabled={true}
```

### Clases por Botón

```typescript
const buttonClasses = {
  inicio: "bg-red-600 hover:bg-red-700",
  testPrint: "bg-orange-500 hover:bg-orange-600",
  printerSettings: "bg-purple-600 hover:bg-purple-700",
  lastSales: "bg-yellow-500 hover:bg-yellow-600 ring-4 ring-yellow-300",
  lastTurn: "bg-cyan-500 hover:bg-cyan-600",
};
```

### Iconos (lucide-react)

```typescript
import { Home, Printer, Settings, Receipt, Clock } from "lucide-react";

const icons = {
  inicio: <Home size={32} />,
  testPrint: <Printer size={32} />,
  printerSettings: <Settings size={32} />,
  lastSales: <Receipt size={32} />,
  lastTurn: <Clock size={32} />,
};
```

### Props
- `onActionClick: (actionKey: string) => void` - Handler para clicks

### Ubicación
`src/components/modules/utilities/utilities-actions.tsx`

### Dependencias
- `react`
- `lucide-react` (Home, Printer, Settings, Receipt, Clock)
- `types.ts` (UtilitiesActionsProps, UtilityAction)

---

## 5. utilities-view.tsx

### Propósito
Componente principal que orquesta la vista completa de utilidades.

### Responsabilidades

1. **Layout Principal**
   - Usar `HMIContainer` como wrapper
   - Estructurar header, contenido y acciones

2. **Gestión de Navegación**
   - Usar `useHMINavigation` hook
   - Implementar botón "Atrás"
   - Handlers para botones de acción

3. **Composición**
   - Integrar `SalesTable`
   - Integrar `UtilitiesActions`
   - Pasar datos y callbacks

### Estructura JSX

```
<HMIContainer>
  <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-600 p-6">
    
    {/* Header */}
    <div className="bg-blue-800 text-white rounded-lg p-4 mb-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Settings size={40} />
          <h1 className="text-2xl font-bold">UTILIDADES</h1>
        </div>
        <button onClick={navigateBack}>← Atrás</button>
      </div>
    </div>

    {/* Sales Table */}
    <SalesTable salesData={mockSalesData} />

    {/* Actions */}
    <UtilitiesActions onActionClick={handleActionClick} />

  </div>
</HMIContainer>
```

### Hooks Utilizados

```typescript
const { navigateBack, goToMenu } = useHMINavigation();
```

### Handlers

```typescript
const handleActionClick = (actionKey: string) => {
  switch (actionKey) {
    case "inicio":
      goToMenu();
      break;
    case "test-print":
      // TODO: Implementar test de impresión
      console.log("Test de impresión");
      break;
    case "printer-settings":
      // TODO: Implementar configuración de impresora
      console.log("Ajustes de impresora");
      break;
    case "last-sales":
      // Ya estamos en esta vista
      break;
    case "last-turn":
      // TODO: Implementar vista de último turno
      console.log("Último turno");
      break;
    default:
      console.warn(`Acción no reconocida: ${actionKey}`);
  }
};
```

### Datos

```typescript
import { mockSalesData } from "./mock-data";

// Pasar directamente al componente
<SalesTable salesData={mockSalesData} />
```

### Ubicación
`src/components/modules/utilities/utilities-view.tsx`

### Dependencias
- `react`
- `lucide-react` (Settings)
- `@/components/layouts/hmi-container` (HMIContainer)
- `@/lib/hooks/use-hmi-navigation` (useHMINavigation)
- `sales-table.tsx` (SalesTable)
- `utilities-actions.tsx` (UtilitiesActions)
- `mock-data.ts` (mockSalesData)

---

## 🎨 Paleta de Colores Completa

### Gradientes de Fondo
```css
bg-gradient-to-br from-blue-900 to-blue-600
```

### Header
```css
bg-blue-800 text-white
```

### Tabla
```css
/* Container */
bg-white

/* Header */
bg-blue-900 text-white

/* Rows */
border-b border-gray-200
hover:bg-gray-50

/* Text */
text-gray-700
```

### Botones de Acción
```css
/* INICIO */
bg-red-600 hover:bg-red-700 text-white

/* TEST DE IMPRESION */
bg-orange-500 hover:bg-orange-600 text-white

/* AJUSTES IMPRESORA */
bg-purple-600 hover:bg-purple-700 text-white

/* ULTIMAS VENTAS (activo) */
bg-yellow-500 hover:bg-yellow-600 text-gray-900
ring-4 ring-yellow-300

/* ULTIMO TURNO */
bg-cyan-500 hover:bg-cyan-600 text-white
```

### Botón Atrás
```css
text-white hover:text-blue-200
bg-blue-700 hover:bg-blue-600
px-4 py-2 rounded-lg
```

---

## 📏 Dimensiones y Espaciado

### Layout Principal
```css
min-h-screen       /* Altura mínima pantalla completa */
p-6                /* Padding general */
```

### Header
```css
p-4                /* Padding interno */
mb-6               /* Margen inferior */
rounded-lg         /* Bordes redondeados */
```

### Tabla
```css
p-6                /* Padding interno */
mb-6               /* Margen inferior */
shadow-lg          /* Sombra pronunciada */
rounded-lg         /* Bordes redondeados */
```

### Botones de Acción
```css
/* Grid container */
grid grid-cols-5   /* 5 columnas */
gap-4              /* Espacio entre botones */
max-w-6xl          /* Ancho máximo */
mx-auto            /* Centrado horizontal */
px-4               /* Padding horizontal */

/* Botones individuales */
px-6 py-4          /* Padding interno */
rounded-lg         /* Bordes redondeados */
```

### Iconos
```css
/* Header icon */
size={40}

/* Button icons */
size={32}
```

---

## 🔍 Responsive Design

### Breakpoints

```css
/* Mobile (< 640px) */
grid-cols-2        /* Botones en 2 columnas */
text-sm            /* Texto más pequeño */

/* Tablet (640px - 1024px) */
grid-cols-3        /* Botones en 3 columnas */
text-base          /* Texto normal */

/* Desktop (> 1024px) */
grid-cols-5        /* Botones en 5 columnas */
max-w-6xl          /* Ancho máximo limitado */
```

### Clases Responsive a Aplicar

```css
/* Botones */
grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5

/* Tabla */
overflow-x-auto    /* Scroll horizontal en mobile */

/* Texto */
text-sm md:text-base lg:text-lg
```

---

## ✅ Checklist de Testing por Componente

### types.ts
- [ ] Todas las interfaces exportadas correctamente
- [ ] Sin errores de TypeScript
- [ ] Propiedades documentadas con JSDoc

### mock-data.ts
- [ ] Datos realistas y coherentes
- [ ] Formato correcto según interfaces
- [ ] Al menos 5 registros

### sales-table.tsx
- [ ] Renderiza todas las columnas
- [ ] Formato de moneda correcto (COP)
- [ ] Formato de volumen correcto (L)
- [ ] Responsive en mobile
- [ ] Hover effects funcionando

### utilities-actions.tsx
- [ ] Solo 5 botones (sin "REINICIAR")
- [ ] Iconos correctos
- [ ] Colores según diseño
- [ ] Hover effects funcionando
- [ ] Botón activo destacado
- [ ] Callbacks ejecutándose

### utilities-view.tsx
- [ ] Layout correcto con HMIContainer
- [ ] Header renderizado
- [ ] Tabla integrada correctamente
- [ ] Botones integrados correctamente
- [ ] Navegación "Atrás" funciona
- [ ] Sin errores en consola
- [ ] Sin warnings de TypeScript

---

## 🐛 Errores Comunes y Soluciones

### Error: "Module not found"
```
Solución: Verificar paths de imports y alias @/
```

### Error: "Cannot read properties of undefined"
```
Solución: Validar que mockSalesData está importado correctamente
```

### Error: "onClick is not a function"
```
Solución: Verificar que handlers están definidos y pasados correctamente
```

### Advertencia: "Each child should have a key prop"
```
Solución: Agregar key={sale.fe} en map de tabla y key={action.key} en botones
```

### Estilos no se aplican
```
Solución: 
1. Verificar que TailwindCSS está configurado
2. Verificar clases en tailwind.config
3. Recargar servidor de desarrollo
```

---

*Documento de detalles técnicos generado por Cascade AI*
