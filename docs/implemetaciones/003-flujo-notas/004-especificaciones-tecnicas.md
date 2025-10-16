# 🔧 Especificaciones Técnicas - Flujo de Ventas Consolidado

## 📋 Documento Complementario

Este documento proporciona especificaciones técnicas detalladas, casos de uso, validaciones y ejemplos de código para la implementación del flujo de ventas consolidado.

---

## 1. Especificaciones de Datos

### 1.1 Interfaz: TransactionState

```typescript
/**
 * Estado completo de una transacción
 * Usado para transferir datos entre vistas mediante React Router state
 */
interface TransactionState {
    // Identificación
    transactionId?: string;
    timestamp: string; // ISO 8601
    
    // Tipo y monto
    transactionType: "CONTADO" | "CREDITO";
    amount: number; // En pesos colombianos
    
    // Datos de combustible
    fuel: {
        gallons: number;
        pricePerGallon: number;
        fuelType?: "REGULAR" | "EXTRA" | "DIESEL";
    };
    
    // Solo para CONTADO
    paymentMode?: "cash" | "card";
    
    // Solo para CREDITO
    vehicleData?: {
        placa: string;
        identificationType: "MANUAL" | "RFID" | "IBUTTON";
        vehicleId: string;
        isIdentified: boolean;
        identifiedAt?: string; // ISO 8601
    };
    
    // Datos del cliente (completados en payment-view)
    customerData?: {
        placa: string;
        idFacturaElectronica: string;
        idPuntosColombia: string;
        idPromocion: string;
        hasCoupon: boolean;
    };
    
    // Métodos de pago (completados en payment-methods-view)
    paymentMethods?: {
        cash?: number;
        card?: number;
        voucher?: number;
    };
}
```

### 1.2 Validaciones de Datos

#### **Placa de Vehículo**

```typescript
const PLACA_REGEX = /^[A-Z]{3}[0-9]{3}$/;

export const validatePlaca = (placa: string): ValidationResult => {
    if (!placa || placa.trim().length === 0) {
        return {
            isValid: false,
            error: "La placa es requerida"
        };
    }
    
    if (!PLACA_REGEX.test(placa.toUpperCase())) {
        return {
            isValid: false,
            error: "Formato inválido. Use: ABC123 (3 letras + 3 números)"
        };
    }
    
    return { isValid: true };
};
```

#### **Monto de Transacción**

```typescript
export const validateAmount = (amount: number): ValidationResult => {
    if (amount <= 0) {
        return {
            isValid: false,
            error: "El monto debe ser mayor a cero"
        };
    }
    
    if (amount > 1000000) {
        return {
            isValid: false,
            error: "El monto excede el límite permitido ($1.000.000)"
        };
    }
    
    return { isValid: true };
};
```

#### **ID de Factura Electrónica**

```typescript
export const validateIdFactura = (id: string): ValidationResult => {
    // Opcional pero si se ingresa debe tener formato válido
    if (!id || id.trim().length === 0) {
        return { isValid: true }; // Opcional
    }
    
    if (!/^[0-9]{8,12}$/.test(id)) {
        return {
            isValid: false,
            error: "El ID debe tener entre 8 y 12 dígitos"
        };
    }
    
    return { isValid: true };
};
```

---

## 2. Casos de Uso Detallados

### 2.1 Caso de Uso 1: Venta en Contado - Efectivo

**Actores**: Despachador, Sistema HMI

**Precondiciones**: Usuario autenticado, sistema operativo

**Flujo Principal**:

1. Usuario navega al menú principal
2. Usuario selecciona tile "CONTADO"
3. Sistema muestra `CashSaleView`
4. Usuario ingresa monto: `$50.000`
5. Usuario selecciona modo: "EFECTIVO"
6. Usuario presiona ENTER
7. Sistema valida monto > 0
8. Sistema navega a `PaymentView` con state:
   ```typescript
   {
       transactionType: "CONTADO",
       amount: 50000,
       paymentMode: "cash",
       timestamp: "2025-01-15T12:30:00Z"
   }
   ```
9. Sistema muestra `PaymentInfoView` con:
   - Header: "TRANSACCION DE CONTADO"
   - Monto: "$50.000"
   - Estado: "6.22 Gal" (calculado)
10. Usuario ingresa placa: "ABC123"
11. Usuario ingresa ID Factura: "123456789"
12. Sistema valida formato de placa ✅
13. Usuario presiona "CONTINUAR"
14. Sistema muestra `PaymentMethodsView`
15. Usuario confirma método: EFECTIVO ($50.000)
16. Usuario presiona "GUARDAR"
17. Sistema guarda transacción
18. Sistema navega a `TransactionStatus`

**Postcondiciones**: Transacción registrada, recibo impreso

**Flujos Alternativos**:

- **4a. Monto inválido**: Sistema muestra error, no permite continuar
- **10a. Placa inválida**: Sistema muestra error en tiempo real
- **16a. Monto insuficiente**: Sistema alerta y solicita ajuste

### 2.2 Caso de Uso 2: Venta a Crédito - RFID

**Actores**: Despachador, Sistema HMI, Lector RFID

**Precondiciones**: 
- Usuario autenticado
- Lector RFID conectado y operativo
- Vehículo registrado en sistema

**Flujo Principal**:

1. Usuario navega al menú principal
2. Usuario selecciona tile "CREDITO"
3. Sistema muestra `CreditSaleView`
4. Usuario ingresa monto: `$100.000`
5. Usuario presiona ENTER
6. Sistema navega a `VehicleIdentificationView` con state:
   ```typescript
   {
       transactionType: "CREDITO",
       amount: 100000,
       timestamp: "2025-01-15T12:30:00Z"
   }
   ```
7. Sistema muestra opciones de identificación
8. Usuario selecciona "LECTOR RFID"
9. Sistema activa lector RFID
10. Sistema muestra: "⏳ Esperando tag RFID..."
11. Usuario acerca tag RFID al lector
12. Sistema lee tag: `RFID-001-ABC123`
13. Sistema busca vehículo en base de datos
14. Sistema valida vehículo registrado ✅
15. Sistema muestra: "✅ VEHICULO IDENTIFICADO"
16. Sistema extrae placa: "ABC123"
17. Usuario presiona "CONTINUAR"
18. Sistema navega a `PaymentView` con state:
   ```typescript
   {
       transactionType: "CREDITO",
       amount: 100000,
       vehicleData: {
           placa: "ABC123",
           identificationType: "RFID",
           vehicleId: "RFID-001-ABC123",
           isIdentified: true,
           identifiedAt: "2025-01-15T12:31:00Z"
       },
       timestamp: "2025-01-15T12:30:00Z"
   }
   ```
19. Sistema muestra `PaymentInfoView` con:
    - Header: "TRANSACCION A CREDITO"
    - Placa: "ABC123" (pre-cargada, bloqueada)
20. Usuario completa datos adicionales
21. Usuario presiona "CONTINUAR"
22. Sistema muestra `PaymentMethodsView`
23. Usuario confirma (crédito no requiere métodos)
24. Usuario presiona "GUARDAR"
25. Sistema guarda transacción
26. Sistema navega a `TransactionStatus`

**Postcondiciones**: 
- Transacción registrada
- Crédito aplicado a cuenta del vehículo
- Recibo impreso

**Flujos Alternativos**:

- **11a. No se detecta tag (30s)**: Sistema muestra timeout, permite reintentar
- **13a. Vehículo no registrado**: Sistema muestra error, permite ingreso manual
- **14a. Vehículo bloqueado**: Sistema alerta y no permite continuar

### 2.3 Caso de Uso 3: Venta a Crédito - Ingreso Manual

**Flujo Principal** (variación del 2.2):

8. Usuario selecciona "PLACA (Manual)"
9. Sistema muestra teclado virtual
10. Usuario ingresa: "ABC123"
11. Sistema valida formato en tiempo real
12. Usuario confirma ingreso
13. Sistema busca vehículo por placa
14. Sistema valida vehículo registrado ✅
15. Sistema muestra: "✅ VEHICULO IDENTIFICADO"
16. ... continúa desde paso 17 del caso 2.2

**Flujos Alternativos**:

- **10a. Formato inválido**: Sistema muestra error en tiempo real, no permite confirmar
- **13a. Vehículo no encontrado**: Sistema muestra alerta, permite reintentar

---

## 3. Componentes Técnicos

### 3.1 Hook: `use-transaction-context.ts`

```typescript
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

interface UseTransactionContextReturn {
    transactionType: "CONTADO" | "CREDITO";
    amount: number;
    paymentMode?: "cash" | "card";
    vehicleData?: VehicleData;
    gallons: number;
    hasValidState: boolean;
    redirectIfInvalid: boolean;
}

export const useTransactionContext = (
    options: { requireValidState?: boolean } = {}
): UseTransactionContextReturn => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as TransactionState | undefined;
    
    const hasValidState = Boolean(
        state?.transactionType && 
        state?.amount > 0
    );
    
    // Redirigir si no hay estado válido y es requerido
    useEffect(() => {
        if (options.requireValidState && !hasValidState) {
            console.warn("⚠️ No hay datos de transacción válidos");
            navigate("/menu", { replace: true });
        }
    }, [hasValidState, options.requireValidState, navigate]);
    
    // Valores por defecto
    const transactionType = state?.transactionType || "CONTADO";
    const amount = state?.amount || 0;
    const paymentMode = state?.paymentMode;
    const vehicleData = state?.vehicleData;
    
    // Calcular galones (precio simulado: $8040/gal)
    const PRICE_PER_GALLON = 8040;
    const gallons = amount / PRICE_PER_GALLON;
    
    return {
        transactionType,
        amount,
        paymentMode,
        vehicleData,
        gallons,
        hasValidState,
        redirectIfInvalid: options.requireValidState || false
    };
};
```

### 3.2 Componente: `transaction-summary-header.tsx`

```typescript
import { Fuel } from "lucide-react";

interface TransactionSummaryHeaderProps {
    transactionType: "CONTADO" | "CREDITO";
    amount: number;
    gallons: number;
}

export const TransactionSummaryHeader: React.FC<TransactionSummaryHeaderProps> = ({
    transactionType,
    amount,
    gallons
}) => {
    return (
        <div className="grid grid-cols-2 gap-3 p-3 bg-gradient-to-r from-navy-900 to-navy-800 rounded-lg shadow-lg">
            {/* Columna 1: Tipo y Monto */}
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-white">
                    <Fuel size={20} />
                    <h2 className="text-lg font-bold">
                        TRANSACCION DE {transactionType}
                    </h2>
                </div>
                <div className="p-3 bg-green-500 rounded-lg text-center shadow-md">
                    <div className="text-xs text-white opacity-90 mb-1">MONTO</div>
                    <span className="text-2xl font-bold text-white">
                        ${amount.toLocaleString('es-CO')}
                    </span>
                </div>
            </div>
            
            {/* Columna 2: Estado Actual */}
            <div className="space-y-2">
                <div className="text-yellow-400 text-sm font-bold">
                    ESTADO ACTUAL
                </div>
                <div className="p-3 bg-blue-600 rounded-lg text-center shadow-md">
                    <div className="text-xs text-white opacity-90 mb-1">ID FACTURA ELECTRONICA</div>
                    <span className="text-2xl font-bold text-white">
                        {gallons.toFixed(2)} Gal
                    </span>
                </div>
            </div>
        </div>
    );
};
```

### 3.3 Hook: `use-vehicle-identification.ts`

```typescript
import { useState, useEffect } from "react";

type IdentificationMethod = "MANUAL" | "RFID" | "IBUTTON";

interface VehicleData {
    placa: string;
    identificationType: IdentificationMethod;
    vehicleId: string;
    isIdentified: boolean;
}

export const useVehicleIdentification = () => {
    const [activeMethod, setActiveMethod] = useState<IdentificationMethod | null>(null);
    const [isIdentified, setIsIdentified] = useState(false);
    const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
    const [isReading, setIsReading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    // Simular lectura RFID
    const readRFID = async () => {
        setIsReading(true);
        setError(null);
        
        // Simular espera de lectura (5 segundos)
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        // Simular lectura exitosa (90% probabilidad)
        if (Math.random() > 0.1) {
            const mockPlaca = "ABC" + Math.floor(Math.random() * 900 + 100);
            setVehicleData({
                placa: mockPlaca,
                identificationType: "RFID",
                vehicleId: `RFID-${Date.now()}`,
                isIdentified: true
            });
            setIsIdentified(true);
        } else {
            setError("No se pudo leer el tag RFID. Intente nuevamente.");
        }
        
        setIsReading(false);
    };
    
    // Simular lectura iButton
    const readIButton = async () => {
        setIsReading(true);
        setError(null);
        
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        if (Math.random() > 0.1) {
            const mockPlaca = "DEF" + Math.floor(Math.random() * 900 + 100);
            setVehicleData({
                placa: mockPlaca,
                identificationType: "IBUTTON",
                vehicleId: `IBTN-${Date.now()}`,
                isIdentified: true
            });
            setIsIdentified(true);
        } else {
            setError("No se detectó llave iButton. Intente nuevamente.");
        }
        
        setIsReading(false);
    };
    
    // Validar placa manual
    const validatePlaca = (placa: string): boolean => {
        const PLACA_REGEX = /^[A-Z]{3}[0-9]{3}$/;
        return PLACA_REGEX.test(placa.toUpperCase());
    };
    
    // Identificar manualmente
    const identifyManual = (placa: string) => {
        setError(null);
        
        if (!validatePlaca(placa)) {
            setError("Formato de placa inválido. Use: ABC123");
            return false;
        }
        
        setVehicleData({
            placa: placa.toUpperCase(),
            identificationType: "MANUAL",
            vehicleId: placa.toUpperCase(),
            isIdentified: true
        });
        setIsIdentified(true);
        return true;
    };
    
    // Auto-activar lectura cuando se selecciona método
    useEffect(() => {
        if (activeMethod === "RFID" && !isIdentified) {
            readRFID();
        } else if (activeMethod === "IBUTTON" && !isIdentified) {
            readIButton();
        }
    }, [activeMethod]);
    
    // Reset cuando cambia el método
    const resetIdentification = () => {
        setIsIdentified(false);
        setVehicleData(null);
        setError(null);
        setIsReading(false);
    };
    
    return {
        activeMethod,
        isIdentified,
        vehicleData,
        isReading,
        error,
        setActiveMethod,
        readRFID,
        readIButton,
        identifyManual,
        validatePlaca,
        resetIdentification
    };
};
```

---

## 4. Modificaciones a Componentes Existentes

### 4.1 `cash-sale-view.tsx`

**Cambio en líneas 60-72**:

```typescript
// ANTES
<Keypad
    onNumber={handleNumber}
    onClear={handleClear}
    onEnter={() => navigateTo("payment")}
/>

// DESPUÉS
<Keypad
    onNumber={handleNumber}
    onClear={handleClear}
    onEnter={handleEnterWithState}
/>
```

**Nueva función**:

```typescript
const handleEnterWithState = () => {
    if (displayMoney > 0) {
        const transactionState: TransactionState = {
            transactionType: "CONTADO",
            amount: displayMoney,
            paymentMode: activeMode,
            fuel: {
                gallons: displayMoney / 8040,
                pricePerGallon: 8040
            },
            timestamp: new Date().toISOString()
        };
        
        navigateTo("payment", { state: transactionState });
    } else {
        // Mostrar error: monto requerido
        console.warn("⚠️ Debe ingresar un monto válido");
    }
};
```

### 4.2 `credit-sale-view.tsx`

**Cambio en líneas 35-46**:

```typescript
// ANTES
const handleEnter = () => {
    navigateTo("payment");
    // TODO: Pasar datos vía state
};

// DESPUÉS
const handleEnter = () => {
    if (displayMoney > 0) {
        const transactionState: TransactionState = {
            transactionType: "CREDITO",
            amount: displayMoney,
            fuel: {
                gallons: displayMoney / 8040,
                pricePerGallon: 8040
            },
            timestamp: new Date().toISOString()
        };
        
        navigateTo("vehicle-identification", { state: transactionState });
    } else {
        console.warn("⚠️ Debe ingresar un monto válido");
    }
};
```

### 4.3 `payment-view-master.tsx`

**Agregar al inicio del componente**:

```typescript
export const PaymentViewMaster: React.FC = () => {
    const { navigateTo } = useHMINavigation();
    
    // NUEVO: Obtener contexto de transacción
    const {
        transactionType,
        amount,
        vehicleData,
        gallons,
        hasValidState
    } = useTransactionContext({ requireValidState: true });
    
    // Si no hay estado válido, el hook redirige automáticamente
    if (!hasValidState) {
        return null; // O un loader
    }
    
    const [currentView, setCurrentView] = useState<1 | 2>(1);
    const [sharedFormData, setSharedFormData] = useState({
        mode: transactionType,
        placa: vehicleData?.placa || "",
        idFacturaElectronica: "",
        idPuntosColombia: "",
        hasCoupon: false,
        idPromocion: "",
    });
    
    // ... resto del código
};
```

### 4.4 `payment-info-view.tsx`

**Agregar TransactionSummaryHeader**:

```typescript
export const PaymentInfoView: React.FC<PaymentInfoViewProps> = ({
    onProceedToPayment,
    sharedFormData,
    onUpdateSharedData,
    totalAmount = 100000,
    isModeLocked = false,
    lockMessage,
}) => {
    const { navigateTo } = useHMINavigation();
    
    // NUEVO: Obtener contexto
    const { transactionType, amount, gallons } = useTransactionContext();
    
    // Hook principal
    const {
        formData,
        validation,
        setMode,
        setPlaca,
        // ... resto
    } = usePaymentForm(amount || totalAmount);
    
    return (
        <HMIContainer showHeader={false} showFooter={false}>
            <div className="w-full h-full flex items-center justify-center px-2">
                <div className="grid grid-cols-4 gap-4 w-full h-full max-w-6xl">
                    {/* Sidebar */}
                    <div className="col-span-1 flex flex-col gap-6 self-start pt-8">
                        <SideTile title="VENTAS" icon={<DollarSign size={64} />} />
                        <SideTile title="INICIO" icon={<Home size={64} />} 
                            onClick={() => navigateTo("menu")} />
                    </div>

                    {/* Contenido principal */}
                    <div className="col-span-3 space-y-4 overflow-y-auto max-h-screen pb-8">
                        {/* NUEVO: Header con estado consolidado */}
                        <TransactionSummaryHeader
                            transactionType={transactionType}
                            amount={amount}
                            gallons={gallons}
                        />
                        
                        {/* Resto del contenido existente */}
                        <PaymentModeSelector mode={formData.mode} onModeChange={setMode} />
                        
                        {/* ... resto de campos */}
                    </div>
                </div>
            </div>
        </HMIContainer>
    );
};
```

---

## 5. Rutas y Navegación

### 5.1 Actualización de `routes.tsx`

```typescript
// Agregar nueva ruta
{
    path: "vehicle-identification",
    element: <VehicleIdentificationView />,
}
```

### 5.2 Actualización de `use-hmi-navigation.ts`

```typescript
export function useHMINavigation() {
    const navigate = useNavigate();
    
    return {
        // ACTUALIZADO: Soportar state
        navigateTo: (viewId: string, options?: NavigateOptions) => {
            navigate(`/${viewId}`, options);
        },
        
        // NUEVO: Método específico con tipado
        navigateWithState: <T extends object>(
            viewId: string, 
            state: T
        ) => {
            navigate(`/${viewId}`, { state });
        },
        
        // ... resto de métodos
    };
}
```

---

## 6. Testing

### 6.1 Tests Unitarios

```typescript
// use-transaction-context.test.ts
describe("useTransactionContext", () => {
    it("debe retornar datos válidos del state", () => {
        const mockState = {
            transactionType: "CONTADO",
            amount: 50000,
            timestamp: "2025-01-15T12:00:00Z"
        };
        
        const { result } = renderHook(() => useTransactionContext(), {
            wrapper: ({ children }) => (
                <MemoryRouter initialEntries={[{ state: mockState }]}>
                    {children}
                </MemoryRouter>
            )
        });
        
        expect(result.current.transactionType).toBe("CONTADO");
        expect(result.current.amount).toBe(50000);
        expect(result.current.hasValidState).toBe(true);
    });
    
    it("debe calcular galones correctamente", () => {
        const mockState = {
            transactionType: "CONTADO",
            amount: 80400,
            timestamp: "2025-01-15T12:00:00Z"
        };
        
        const { result } = renderHook(() => useTransactionContext(), {
            wrapper: ({ children }) => (
                <MemoryRouter initialEntries={[{ state: mockState }]}>
                    {children}
                </MemoryRouter>
            )
        });
        
        expect(result.current.gallons).toBe(10); // 80400 / 8040
    });
});
```

### 6.2 Tests de Integración

```typescript
// cash-sale-flow.test.tsx
describe("Flujo completo: Venta en Contado", () => {
    it("debe navegar correctamente con datos", async () => {
        const { getByRole, getByText } = render(<App />);
        
        // 1. Navegar a cash-sale
        fireEvent.click(getByText("CONTADO"));
        
        // 2. Ingresar monto
        fireEvent.click(getByText("5"));
        fireEvent.click(getByText("0"));
        fireEvent.click(getByText("0"));
        fireEvent.click(getByText("0"));
        fireEvent.click(getByText("0"));
        
        // 3. Presionar ENTER
        fireEvent.click(getByText("ENTER"));
        
        // 4. Verificar navegación a payment
        await waitFor(() => {
            expect(getByText("TRANSACCION DE CONTADO")).toBeInTheDocument();
            expect(getByText("$50.000")).toBeInTheDocument();
        });
    });
});
```

---

## 7. Optimizaciones HMI

### 7.1 Estilos Touch-Friendly

```typescript
// Configuración de tamaños mínimos
export const HMI_SIZES = {
    // Botones táctiles
    MIN_TOUCH_TARGET: 44, // px (estándar Apple)
    RECOMMENDED_TOUCH_TARGET: 48, // px (estándar Google)
    
    // Espaciado
    MIN_SPACING: 8, // px entre elementos
    COMFORTABLE_SPACING: 16, // px recomendado
    
    // Fuentes
    MIN_FONT_SIZE: 16, // px para legibilidad
    LABEL_FONT_SIZE: 14, // px para labels
    TITLE_FONT_SIZE: 20, // px para títulos
    
    // Inputs
    INPUT_HEIGHT: 48, // px altura de campos
    INPUT_PADDING: 12, // px padding interno
};
```

### 7.2 Clases Tailwind Optimizadas

```typescript
// Botón touch-optimizado
const TOUCH_BUTTON_CLASSES = `
    min-h-[48px] 
    min-w-[120px] 
    px-4 
    py-2 
    text-lg 
    font-bold 
    rounded-lg 
    active:scale-95 
    transition-transform 
    duration-150
`;

// Input touch-optimizado
const TOUCH_INPUT_CLASSES = `
    h-12 
    px-3 
    text-base 
    rounded 
    border-2 
    focus:border-blue-500 
    focus:ring-2 
    focus:ring-blue-200
`;
```

---

## 8. Consideraciones de Performance

### 8.1 Lazy Loading

```typescript
// router/routes.tsx
const VehicleIdentificationView = lazy(() => 
    import("@/components/modules/sales/vehicle-identification/vehicle-identification-view")
);
```

### 8.2 Memo de Componentes

```typescript
export const TransactionSummaryHeader = memo<TransactionSummaryHeaderProps>(
    ({ transactionType, amount, gallons }) => {
        // ... componente
    },
    (prevProps, nextProps) => {
        // Solo re-renderizar si cambianlos datos
        return (
            prevProps.transactionType === nextProps.transactionType &&
            prevProps.amount === nextProps.amount &&
            prevProps.gallons === nextProps.gallons
        );
    }
);
```

---

**Última actualización**: 2025-01-15  
**Versión**: 1.0  
**Complemento de**: `004-plan-consolidacion-flujo-ventas.md`
