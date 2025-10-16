# 🎯 Plan de Consolidación y Optimización - Flujo de Ventas HMI

## 📊 Resumen Ejecutivo

Este documento detalla la estrategia completa para consolidar y optimizar el flujo de ventas en el sistema HMI de estaciones de combustible, integrando:
- **Transacciones en Contado** (efectivo)
- **Transacciones a Crédito** (con identificación de vehículos)
- **Vista de Pago Consolidada** (adaptativa según tipo de transacción)
- **Identificación de Vehículos** (nuevo módulo para crédito)

---

## 📋 Índice

1. [Análisis del Estado Actual](#1-análisis-del-estado-actual)
2. [Arquitectura Propuesta](#2-arquitectura-propuesta)
3. [Flujo de Navegación Completo](#3-flujo-de-navegación-completo)
4. [Nuevo Módulo: Vehicle Identification](#4-nuevo-módulo-vehicle-identification)
5. [Optimización de Payment View](#5-optimización-de-payment-view)
6. [Gestión de Estado y Datos](#6-gestión-de-estado-y-datos)
7. [Plan de Implementación por Fases](#7-plan-de-implementación-por-fases)

---

## 1. Análisis del Estado Actual

### 1.1 Componentes Existentes

#### **Cash Sale View** (`/cash-sale`)
- ✅ Vista de preset para ventas en efectivo
- ✅ Selector de modo de pago (efectivo/tarjeta)
- ✅ Teclado numérico para ingreso de monto
- ✅ Botón "TANQUE LLENO" (000)
- ⚠️ **PENDIENTE**: Navegación con estado a `payment-view`

```typescript
// Líneas 60-72 en cash-sale-view.tsx
onEnter={() => navigateTo("payment")}
// TODO: Pasar datos de la venta (monto, modo)
```

#### **Credit Sale View** (`/credit-sale`)
- ✅ Vista de preset para ventas a crédito
- ✅ Teclado numérico similar a Cash Sale
- ✅ Botón "TANQUE LLENO"
- ⚠️ **PENDIENTE**: Navegación con estado
- ❌ **FALTA**: Vista de identificación de vehículo antes de payment

```typescript
// Líneas 35-46 en credit-sale-view.tsx
const handleEnter = () => {
    navigateTo("payment");
    // TODO: Pasar datos vía state
};
```

#### **Payment View Master** (`/payment`)
- ✅ Sistema de dos vistas (info y métodos)
- ✅ PaymentInfoView: Información del cliente
- ✅ PaymentMethodsView: Métodos de pago
- ⚠️ **LIMITACIÓN**: No recibe datos de vistas anteriores
- ⚠️ **LIMITACIÓN**: No diferencia entre contado/crédito en navegación

### 1.2 Flujo Actual (Incompleto)

```
MENÚ PRINCIPAL
    ↓
[CONTADO] → Cash Sale View → [ENTER] → Payment View ❌
    ↓                                      (sin datos)
[CRÉDITO] → Credit Sale View → [ENTER] → Payment View ❌
                                            (sin datos)
```

### 1.3 Problemas Identificados

| Problema | Impacto | Prioridad |
|----------|---------|-----------|
| **No se pasa monto ingresado** | Usuario debe reingresar datos | 🔴 ALTA |
| **No se pasa modo de pago** | Sistema no distingue contado/crédito | 🔴 ALTA |
| **No hay identificación de vehículo** | Requisito faltante para crédito | 🔴 ALTA |
| **Payment View no diferencia origen** | UX inconsistente | 🟡 MEDIA |
| **Datos consolidados no disponibles** | No hay estado actual visible | 🟡 MEDIA |

---

## 2. Arquitectura Propuesta

### 2.1 Diagrama de Flujo Completo

```
MENÚ PRINCIPAL
    │
    ├─[CONTADO]──> Cash Sale View
    │                  │ (Ingresa monto + modo)
    │                  ↓ [ENTER]
    │              Payment View
    │                  │ (Vista 1: Info)
    │                  ↓
    │              Payment Methods View
    │                  │ (Vista 2: Métodos)
    │                  ↓ [GUARDAR]
    │              Transaction Status
    │
    └─[CRÉDITO]──> Credit Sale View
                       │ (Ingresa monto)
                       ↓ [ENTER]
                   Vehicle Identification ⭐ NUEVO
                       │ (RFID/iButton/Manual)
                       ↓ [IDENTIFICADO]
                   Payment View
                       │ (Vista 1: Info con placa pre-cargada)
                       ↓
                   Payment Methods View
                       │ (Vista 2: Métodos)
                       ↓ [GUARDAR]
                   Transaction Status
```

### 2.2 Estructura de Directorios

```
src/components/modules/sales/
├── cash-sale/
│   ├── cash-sale-view.tsx ✏️
│   └── ...
│
├── credit-sale/
│   ├── credit-sale-view.tsx ✏️
│   └── ...
│
├── vehicle-identification/ ⭐ NUEVO
│   ├── vehicle-identification-view.tsx
│   ├── components/
│   │   ├── identification-method-card.tsx
│   │   └── vehicle-status-display.tsx
│   └── hooks/
│       └── use-vehicle-identification.ts
│
└── payment-view/
    ├── payment-view-master.tsx ✏️
    ├── views/
    │   ├── payment-info-view.tsx ✏️
    │   └── payment-methods-view.tsx
    └── components/
        ├── transaction-summary-header.tsx ⭐ NUEVO
        └── consolidated-status-display.tsx ⭐ NUEVO
```

---

## 3. Flujo de Navegación Completo

### 3.1 Flujo CONTADO (Efectivo)

**1. MENÚ PRINCIPAL** → Usuario selecciona [CONTADO]

**2. CASH SALE VIEW** (`/cash-sale`)
- Usuario ingresa monto: `$100.000`
- Selecciona modo: `EFECTIVO` o `TARJETA`
- Presiona `[ENTER]`
- **Navegación**:
```typescript
navigateTo("payment", {
    state: {
        transactionType: "CONTADO",
        amount: 100000,
        paymentMode: "cash",
        timestamp: new Date().toISOString()
    }
});
```

**3. PAYMENT VIEW** (`/payment`)
- **Vista 1**: Payment Info View
  - Muestra header: "TRANSACCION DE CONTADO"
  - Muestra monto: "$100.000" (pre-cargado)
  - Muestra estado: "12.45 Gal" (calculado)
  - Usuario ingresa: PLACA, IDs, CUPÓN
  - Click `[CONTINUAR]` → Vista 2

- **Vista 2**: Payment Methods View
  - Confirma datos
  - Selecciona métodos
  - Click `[GUARDAR]` → Transaction Status

**4. TRANSACTION STATUS** → Venta completada

### 3.2 Flujo CRÉDITO (con Identificación)

**1. MENÚ PRINCIPAL** → Usuario selecciona [CRÉDITO]

**2. CREDIT SALE VIEW** (`/credit-sale`)
- Usuario ingresa monto: `$100.000`
- Presiona `[ENTER]`
- **Navegación**:
```typescript
navigateTo("vehicle-identification", {
    state: {
        transactionType: "CREDITO",
        amount: 100000,
        timestamp: new Date().toISOString()
    }
});
```

**3. VEHICLE IDENTIFICATION VIEW** (`/vehicle-identification`) ⭐ **NUEVO**
- Muestra: "IDENTIFICACION DE VEHICULO"
- Tres opciones:
  - `[PLACA]` → Input manual
  - `[LECTOR RFID]` → Lectura automática
  - `[LECTOR IBUTTON]` → Lectura automática
- Usuario identifica vehículo
- Estado: "✅ VEHICULO IDENTIFICADO"
- Click `[CONTINUAR]`
- **Navegación**:
```typescript
navigateTo("payment", {
    state: {
        transactionType: "CREDITO",
        amount: 100000,
        vehicleData: {
            placa: "ABC123",
            identificationType: "RFID",
            vehicleId: "1256485985",
            isIdentified: true
        },
        timestamp: new Date().toISOString()
    }
});
```

**4. PAYMENT VIEW** (`/payment`)
- **Vista 1**: Payment Info View
  - Header: "TRANSACCION A CREDITO"
  - **PLACA**: Pre-cargada desde identificación ✅
  - Usuario completa datos adicionales
  - Click `[CONTINUAR]` → Vista 2

- **Vista 2**: Payment Methods View
  - Click `[GUARDAR]` → Transaction Status

**5. TRANSACTION STATUS** → Venta completada

---

## 4. Nuevo Módulo: Vehicle Identification

### 4.1 Diseño Visual

Basado en la **Imagen 3** adjunta:

```
┌────────────────────────────────────────────────────┐
│ [🔖 CRÉDITO]     IDENTIFICACION DE VEHICULO        │
│ [🏠 INICIO]                                        │
│                                                    │
│ PLACA                  VEHICULO IDENTIFICADO ✅    │
│ ┌─────────────┐        ┌────────────────────────┐ │
│ │ 1256485985  │        │  VEHICULO              │ │
│ └─────────────┘        │  IDENTIFICADO          │ │
│                        └────────────────────────┘ │
│                                                    │
│ ┌────────────────────────────────────────────────┐│
│ │  LECTOR RFID          VEHICULO IDENTIFICADO   ││
│ └────────────────────────────────────────────────┘│
│                                                    │
│ ┌────────────────────────────────────────────────┐│
│ │  LECTOR IBUTTON       VEHICULO IDENTIFICADO   ││
│ └────────────────────────────────────────────────┘│
│                                                    │
│              [CONTINUAR A PAGO] →                 │
└────────────────────────────────────────────────────┘
```

### 4.2 Componentes

#### **A. `vehicle-identification-view.tsx`** (Principal)

```typescript
export const VehicleIdentificationView: React.FC = () => {
    const { navigateTo } = useHMINavigation();
    const location = useLocation();
    const transactionData = location.state;
    
    const {
        activeMethod,
        isIdentified,
        vehicleData,
        setActiveMethod,
        identifyVehicle,
    } = useVehicleIdentification();
    
    const handleContinue = () => {
        if (isIdentified && vehicleData) {
            navigateTo("payment", {
                state: {
                    ...transactionData,
                    vehicleData
                }
            });
        }
    };
    
    return (
        <HMIContainer>
            {/* Sidebar */}
            <SideTile title="CRÉDITO" />
            <SideTile title="INICIO" onClick={() => navigateTo("menu")} />
            
            {/* Métodos de identificación */}
            <IdentificationMethodCard
                method="MANUAL"
                isActive={activeMethod === "MANUAL"}
                onSelect={() => setActiveMethod("MANUAL")}
            />
            <IdentificationMethodCard
                method="RFID"
                isActive={activeMethod === "RFID"}
                onSelect={() => setActiveMethod("RFID")}
            />
            <IdentificationMethodCard
                method="IBUTTON"
                isActive={activeMethod === "IBUTTON"}
                onSelect={() => setActiveMethod("IBUTTON")}
            />
            
            {/* Botón continuar */}
            <button
                onClick={handleContinue}
                disabled={!isIdentified}
            >
                CONTINUAR A PAGO →
            </button>
        </HMIContainer>
    );
};
```

#### **B. `use-vehicle-identification.ts`** (Hook)

```typescript
export const useVehicleIdentification = () => {
    const [activeMethod, setActiveMethod] = useState<IdentificationMethod | null>(null);
    const [isIdentified, setIsIdentified] = useState(false);
    const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
    
    const identifyVehicle = async (method: IdentificationMethod, input?: string) => {
        if (method === "MANUAL" && input) {
            // Validar formato de placa
            if (/^[A-Z]{3}[0-9]{3}$/.test(input)) {
                setVehicleData({
                    placa: input,
                    identificationType: "MANUAL",
                    vehicleId: input,
                    isIdentified: true
                });
                setIsIdentified(true);
            }
        } else if (method === "RFID") {
            // Simular lectura RFID
            await simulateRFIDRead();
        } else if (method === "IBUTTON") {
            // Simular lectura iButton
            await simulateIButtonRead();
        }
    };
    
    return {
        activeMethod,
        isIdentified,
        vehicleData,
        setActiveMethod,
        identifyVehicle
    };
};
```

---

## 5. Optimización de Payment View

### 5.1 Header con Estado Consolidado

Basado en las **Imágenes 1 y 2** adjuntas:

```
┌────────────────────────────────────────────────────┐
│  TRANSACCION DE CONTADO        ESTADO ACTUAL       │
│  ┌──────────────────┐          ┌────────────────┐  │
│  │   $100.000       │          │  12.45 Gal     │  │
│  └──────────────────┘          └────────────────┘  │
└────────────────────────────────────────────────────┘
```

**Componente**: `transaction-summary-header.tsx`

```typescript
export const TransactionSummaryHeader: React.FC<{
    transactionType: "CONTADO" | "CREDITO";
    amount: number;
    gallons: number;
}> = ({ transactionType, amount, gallons }) => {
    return (
        <div className="grid grid-cols-2 gap-4 p-4 bg-navy-900">
            <div className="text-white">
                <h2 className="text-xl font-bold">
                    TRANSACCION DE {transactionType}
                </h2>
                <div className="mt-2 p-4 bg-green-500 rounded text-center">
                    <span className="text-2xl font-bold">
                        ${amount.toLocaleString()}
                    </span>
                </div>
            </div>
            
            <div className="text-white">
                <h3 className="text-lg font-bold mb-2">ESTADO ACTUAL</h3>
                <div className="p-4 bg-blue-600 rounded text-center">
                    <span className="text-2xl font-bold">
                        {gallons.toFixed(2)} Gal
                    </span>
                </div>
            </div>
        </div>
    );
};
```

### 5.2 Campos Optimizados (Grid 2 Columnas)

```
DATOS DEL CLIENTE

PLACA                          ID FACTURA ELECTRONICA
┌────────────────┐            ┌────────────────┐
│ ABC123         │            │ 1256485985     │
└────────────────┘            └────────────────┘

ID PUNTOS COLOMBIA             ID PROMOCION
┌────────────────┐            ┌────────────────┐
│ 1256485985     │            │ 1256485985     │
└────────────────┘            └────────────────┘

☐ CUPÓN?
```

**Actualización en `payment-info-view.tsx`**:

```typescript
<div className="grid grid-cols-2 gap-4">
    <InputField label="PLACA" value={placa} />
    <InputField label="ID FACTURA ELECTRONICA" value={idFactura} />
    <InputField label="ID PUNTOS COLOMBIA" value={idPuntos} />
    <InputField label="ID PROMOCION" value={idPromo} />
</div>
```

---

## 6. Gestión de Estado y Datos

### 6.1 Hook: `use-transaction-context.ts`

```typescript
import { useLocation } from "react-router";

export const useTransactionContext = () => {
    const location = useLocation();
    const state = location.state as TransactionState | undefined;
    
    const transactionType = state?.transactionType || "CONTADO";
    const amount = state?.amount || 0;
    const vehicleData = state?.vehicleData;
    
    // Calcular galones (simulado: $8040 por galón)
    const gallons = amount / 8040;
    
    return {
        transactionType,
        amount,
        vehicleData,
        gallons,
        hasValidState: Boolean(state)
    };
};
```

### 6.2 Actualización de `use-hmi-navigation.ts`

```typescript
export function useHMINavigation() {
    const navigate = useNavigate();
    
    return {
        navigateTo: (viewId: string, options?: { state?: any }) => {
            navigate(`/${viewId}`, options);
        },
        // ... otros métodos
    };
}
```

---

## 7. Plan de Implementación por Fases

### **FASE 1: Fundamentos** (Semana 1)

#### Sprint 1.1: Sistema de Estado
- [ ] Crear `use-transaction-context.ts`
- [ ] Actualizar `use-hmi-navigation.ts` (soportar state)
- [ ] Modificar `cash-sale-view.tsx` (pasar datos)
- [ ] Modificar `credit-sale-view.tsx` (pasar datos)
- [ ] Actualizar `payment-view-master.tsx` (recibir datos)

**Criterio de Aceptación**:
- ✅ Navegación pasa datos correctamente
- ✅ Payment-view recibe y muestra datos
- ✅ Redirección si no hay datos válidos

#### Sprint 1.2: Optimización Payment View
- [ ] Crear `transaction-summary-header.tsx`
- [ ] Actualizar `payment-info-view.tsx` (agregar header)
- [ ] Implementar grid 2 columnas en campos
- [ ] Aplicar estilos HMI-optimizados

**Criterio de Aceptación**:
- ✅ Header visible con datos consolidados
- ✅ Layout responsive y touch-friendly

### **FASE 2: Vehicle Identification** (Semana 2)

#### Sprint 2.1: Estructura
- [ ] Crear directorios `vehicle-identification/`
- [ ] Crear `vehicle-identification-view.tsx`
- [ ] Agregar ruta en `routes.tsx`
- [ ] Crear tipos en `vehicle-types.ts`

#### Sprint 2.2: Componentes y Lógica
- [ ] Crear `identification-method-card.tsx`
- [ ] Crear `vehicle-status-display.tsx`
- [ ] Crear `use-vehicle-identification.ts`
- [ ] Implementar simulación RFID/iButton
- [ ] Implementar validación de placa manual

#### Sprint 2.3: Integración
- [ ] Conectar credit-sale → vehicle-identification
- [ ] Conectar vehicle-identification → payment
- [ ] Testing de flujo completo crédito
- [ ] Validar pre-carga de placa

### **FASE 3: Testing y Optimización** (Semana 3)

#### Sprint 3.1: Testing
- [ ] Testing flujo CONTADO completo
- [ ] Testing flujo CRÉDITO completo
- [ ] Testing de validaciones
- [ ] Testing de casos extremos

#### Sprint 3.2: Optimizaciones
- [ ] Animaciones y transiciones
- [ ] Optimización para pantallas pequeñas
- [ ] Performance improvements
- [ ] Documentación

---

## 8. Criterios de Éxito

### Funcionales
- ✅ Flujo CONTADO completo funcional
- ✅ Flujo CRÉDITO con identificación funcional
- ✅ Datos se transfieren correctamente entre vistas
- ✅ Validaciones funcionan en todos los puntos

### UX/UI
- ✅ Interfaz HMI touch-friendly (botones ≥44px)
- ✅ Estados consolidados visibles en todo momento
- ✅ Feedback visual claro en cada acción
- ✅ Navegación intuitiva y fluida

### Técnicos
- ✅ Código modular y mantenible
- ✅ TypeScript sin errores
- ✅ Performance óptimo (< 100ms transiciones)
- ✅ Documentación completa

---

## 📝 Notas de Implementación

### Prioridades
1. 🔴 **CRÍTICO**: Sistema de estado y navegación
2. 🟠 **ALTA**: Vehicle Identification para crédito
3. 🟡 **MEDIA**: Optimizaciones visuales
4. 🟢 **BAJA**: Animaciones y efectos

### Consideraciones Técnicas
- Usar `useLocation()` de React Router para state
- Mantener compatibilidad con código existente
- Seguir patrones establecidos en el proyecto
- Aplicar reglas de nomenclatura kebab-case

### Riesgos y Mitigaciones
| Riesgo | Mitigación |
|--------|------------|
| Pérdida de datos en navegación | Validar state en cada vista |
| Incompatibilidad con flujo existente | Testing exhaustivo |
| Performance en pantallas pequeñas | Optimizaciones específicas HMI |

---

**Última actualización**: 2025-01-15  
**Versión**: 1.0  
**Estado**: 📋 Pendiente de aprobación
