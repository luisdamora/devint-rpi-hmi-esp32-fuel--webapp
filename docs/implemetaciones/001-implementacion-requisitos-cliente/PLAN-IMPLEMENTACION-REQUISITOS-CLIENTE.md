# Plan de Implementación - Requisitos del Cliente
**Fecha de Creación:** 2025-10-08  
**Proyecto:** devint-rpi-hmi-esp32-fuel--webapp  
**Status:** Pendiente de Aprobación

---

## 📋 Resumen Ejecutivo

Este documento detalla el plan de implementación basado en los requisitos del cliente comunicados vía WhatsApp. El plan se estructura en módulos específicos para facilitar la revisión y aprobación antes de la implementación.

---

## 🎯 Requisitos del Cliente (Análisis de Imagen)

### Requisitos Identificados:
1. ✅ **Splash**: Cambiar dos números de teléfono por un solo símbolo de WhatsApp
2. ✅ **Menu**: OK (sin cambios)
3. ✅ **Contacto**: OK (sin cambios)
4. 🔄 **Ventas Contado**: Mostrar símbolo de surtidor titilando y datos de transacción al finalizar
5. 🔄 **Restricción Modo Pago**: NO permitir cambiar transacción entre CONTADO y CRÉDITO una vez iniciada
6. ✅ **Inicio/Fin Turno**: OK (sin cambios)
7. 🔄 **Ventas Crédito**: Agregar opción de preset (similar a CONTADO)
8. 🔄 **Pantalla Preset**: La pantalla con monto, teclado y "TANQUE LLENO" debe repetirse en CRÉDITO

---

## 📂 Estructura del Código Actual

### Módulos Principales:
```
src/components/modules/
├── auth/
│   ├── splash-screen.tsx          [REQUIERE MODIFICACIÓN]
│   ├── login-view/                 [SIN CAMBIOS]
│   └── close-turn-view/            [SIN CAMBIOS]
├── main-menu/
│   └── main-menu.tsx               [SIN CAMBIOS]
├── sales/
│   ├── cash-sale/
│   │   └── cash-sale-view.tsx      [BASE PARA CRÉDITO]
│   └── payment-view/
│       ├── payment-view-master.tsx [REQUIERE MODIFICACIÓN]
│       └── views/
│           ├── payment-info-view.tsx     [REQUIERE MODIFICACIÓN]
│           └── payment-methods-view.tsx  [REQUIERE MODIFICACIÓN]
```

### Componentes Compartidos:
```
src/components/shared/
└── hmi-footer-info.tsx             [REQUIERE MODIFICACIÓN]
```

---

## 🚀 Plan de Implementación por Módulos

### **MÓDULO 1: Splash Screen - Contacto WhatsApp**
**Archivo:** `src/components/shared/hmi-footer-info.tsx`  
**Prioridad:** 🔴 Alta  
**Estimación:** 15 minutos

#### Tareas:
- [ ] Reemplazar los dos números de teléfono por un solo ícono de WhatsApp
- [ ] Cambiar de `📞 +57-3184936241` y `📞 +57-3164475985` a `📱 WhatsApp`
- [ ] Verificar que el componente `HMIFooterInfo` se actualice correctamente en `splash-screen.tsx`
- [ ] Probar visualización en splash screen

#### Cambios Específicos:
```tsx
// Líneas 43-46 en hmi-footer-info.tsx
// ANTES:
<span>📞 +57-3184936241</span>
<span>📞 +57-3164475985</span>

// DESPUÉS:
<span>📱 WhatsApp</span>
```

#### Archivos Afectados:
- `src/components/shared/hmi-footer-info.tsx`

#### Testing:
- [ ] Verificar splash screen muestra solo un símbolo de WhatsApp
- [ ] Verificar que otros módulos que usen `HMIFooterInfo` no se vean afectados

---

### **MÓDULO 2: Restricción de Cambio de Modo de Pago**
**Archivos:**
- `src/components/modules/sales/payment-view/views/payment-info-view.tsx`
- `src/components/modules/sales/payment-view/payment-view-master.tsx`

**Prioridad:** 🔴 Alta  
**Estimación:** 45 minutos

#### Tareas:
- [ ] Agregar estado de bloqueo de modo en `payment-view-master.tsx`
- [ ] Deshabilitar selector de modo después de la primera selección
- [ ] Agregar prop `isLocked` al componente `PaymentModeSelector`
- [ ] Mostrar indicador visual cuando el modo esté bloqueado
- [ ] Permitir cambio solo si no hay datos ingresados (placa vacía)
- [ ] Agregar tooltip explicativo: "No se puede cambiar el modo una vez iniciada la transacción"

#### Implementación Técnica:
1. **Estado en Master Component:**
```tsx
// payment-view-master.tsx
const [isModeLockedonce, setIsModeLockedonce] = useState(false);

// Bloquear modo cuando se ingrese la placa
useEffect(() => {
  if (sharedFormData.placa.length > 0) {
    setIsModeLockedonce(true);
  }
}, [sharedFormData.placa]);
```

2. **Props en PaymentModeSelector:**
```tsx
interface PaymentModeSelectorProps {
  mode: "CONTADO" | "CREDITO";
  onModeChange: (mode: "CONTADO" | "CREDITO") => void;
  isLocked?: boolean;  // NUEVO
  lockMessage?: string; // NUEVO
}
```

#### Archivos Afectados:
- `src/components/modules/sales/payment-view/payment-view-master.tsx`
- `src/components/modules/sales/payment-view/views/payment-info-view.tsx`
- `src/components/modules/sales/payment-view/components/payment-mode-selector.tsx` (componente a localizar)

#### Testing:
- [ ] Verificar que el modo se puede cambiar cuando no hay datos
- [ ] Verificar que el modo se bloquea al ingresar la placa
- [ ] Verificar indicador visual de bloqueo
- [ ] Verificar mensaje tooltip al intentar cambiar

---

### **MÓDULO 3: Vista de Preset para CRÉDITO**
**Archivos:**
- `src/components/modules/sales/cash-sale/cash-sale-view.tsx` (usar como base)
- Crear: `src/components/modules/sales/credit-sale/credit-sale-view.tsx` (NUEVO)
- `src/router/routes.tsx`

**Prioridad:** 🟡 Media-Alta  
**Estimación:** 2 horas

#### Tareas:
- [ ] Crear nueva carpeta `src/components/modules/sales/credit-sale/`
- [ ] Duplicar estructura de `cash-sale` para `credit-sale`
- [ ] Adaptar componente `CreditSaleViewComponent` basado en `CashSaleViewComponent`
- [ ] Cambiar tile lateral de "CONTADO" a "CRÉDITO"
- [ ] Mantener funcionalidades:
  - [ ] Display de monto
  - [ ] Teclado numérico
  - [ ] Botón "TANQUE LLENO"
  - [ ] Botón "ENTER" para continuar
- [ ] Agregar ruta `/credit-sale` en `routes.tsx`
- [ ] Actualizar navegación desde menú principal

#### Estructura a Crear:
```
src/components/modules/sales/credit-sale/
├── credit-sale-view.tsx          [NUEVO - Basado en cash-sale-view.tsx]
├── components/
│   ├── amount-display.tsx        [COPIAR de cash-sale]
│   ├── action-buttons.tsx        [COPIAR y ADAPTAR]
│   ├── keypad.tsx                [COPIAR de cash-sale]
│   └── side-tile.tsx             [REUTILIZAR de cash-sale]
└── hooks/
    └── use-credit-sale-calculator.tsx [COPIAR de cash-sale]
```

#### Cambios Específicos:
```tsx
// credit-sale-view.tsx
<SideTile
  title="CRÉDITO"  // Cambiar de CONTADO
  icon={<CreditCard size={64} />}  // Cambiar ícono
  onClick={() => navigateTo("credit-sale")}
/>
```

#### Archivos Afectados:
- `src/components/modules/sales/credit-sale/` (carpeta completa NUEVA)
- `src/router/routes.tsx`
- `src/components/modules/main-menu/menu-data.tsx` (si se agrega tile en menú)

#### Testing:
- [ ] Verificar navegación a `/credit-sale`
- [ ] Verificar ingreso de monto con teclado numérico
- [ ] Verificar botón "TANQUE LLENO" funciona
- [ ] Verificar botón "ENTER" navega a payment con modo CRÉDITO
- [ ] Verificar que se pasa correctamente `mode: "CREDITO"` a PaymentView

---

### **MÓDULO 4: Integración Preset CRÉDITO con Payment View**
**Archivos:**
- `src/components/modules/sales/payment-view/payment-view-master.tsx`
- `src/components/modules/sales/credit-sale/credit-sale-view.tsx`
- `src/lib/hooks/use-hmi-navigation.ts`

**Prioridad:** 🟡 Media  
**Estimación:** 1 hora

#### Tareas:
- [ ] Modificar `navigateTo` para aceptar parámetros de estado
- [ ] Pasar `totalAmount` y `mode` desde credit-sale a payment-view
- [ ] Actualizar `payment-view-master.tsx` para recibir props iniciales
- [ ] Pre-configurar modo CRÉDITO cuando se viene desde credit-sale
- [ ] Mantener monto ingresado en preset visible en payment view

#### Implementación Técnica:
```tsx
// credit-sale-view.tsx
const handleEnter = () => {
  if (displayMoney > 0) {
    navigateTo("payment", {
      state: {
        totalAmount: displayMoney,
        mode: "CREDITO",
        fromPreset: true
      }
    });
  }
};
```

```tsx
// payment-view-master.tsx
const location = useLocation();
const { totalAmount, mode, fromPreset } = location.state || {};

const [sharedFormData, setSharedFormData] = useState({
  mode: mode || "CONTADO",
  // ... resto
});
```

#### Archivos Afectados:
- `src/components/modules/sales/credit-sale/credit-sale-view.tsx`
- `src/components/modules/sales/payment-view/payment-view-master.tsx`
- `src/lib/hooks/use-hmi-navigation.ts` (posiblemente)

#### Testing:
- [ ] Verificar que el monto se pasa correctamente
- [ ] Verificar que el modo CRÉDITO se pre-selecciona
- [ ] Verificar que el modo queda bloqueado (por MÓDULO 2)
- [ ] Verificar navegación de vuelta funciona correctamente

---

### **MÓDULO 5: Pantalla de Confirmación con Surtidor Titilando (CONTADO)**
**Archivos:**
- Crear: `src/components/modules/sales/transaction-status/transaction-status-view.tsx` (NUEVO)
- `src/components/modules/sales/payment-view/views/payment-methods-view.tsx`
- `src/router/routes.tsx`

**Prioridad:** 🟡 Media  
**Estimación:** 2.5 horas

#### Tareas:
- [ ] Crear nuevo componente `TransactionStatusView`
- [ ] Diseñar layout con dos secciones:
  - [ ] Izquierda: Ícono de surtidor con animación de titilado
  - [ ] Derecha: Datos de la transacción
- [ ] Agregar animación CSS para el ícono del surtidor
- [ ] Mostrar datos de transacción:
  - [ ] Placa
  - [ ] Modo de pago
  - [ ] Monto total
  - [ ] Métodos de pago usados
  - [ ] Fecha y hora
  - [ ] Número de transacción
- [ ] Agregar botones:
  - [ ] "Nueva Venta" (volver a cash-sale)
  - [ ] "Inicio" (volver al menú)
- [ ] Agregar ruta `/transaction-status` en `routes.tsx`
- [ ] Navegar a esta vista después de guardar en modo CONTADO

#### Diseño de Layout:
```
┌─────────────────────────────────────┐
│  TRANSACCIÓN COMPLETADA             │
├──────────────┬──────────────────────┤
│              │  Placa: ABC123       │
│   🚰 (blink) │  Modo: CONTADO       │
│              │  Monto: $100,000     │
│              │  Efectivo: $50,000   │
│              │  Tarjeta: $50,000    │
│              │  Fecha: 08/10/2025   │
│              │  ID: #12345          │
├──────────────┴──────────────────────┤
│  [Nueva Venta]        [Inicio]      │
└─────────────────────────────────────┘
```

#### Implementación de Animación:
```css
/* transaction-status-view.css */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.pump-icon-blinking {
  animation: blink 1.5s ease-in-out infinite;
}
```

#### Archivos Afectados:
- `src/components/modules/sales/transaction-status/` (carpeta completa NUEVA)
- `src/components/modules/sales/payment-view/views/payment-methods-view.tsx`
- `src/router/routes.tsx`

#### Testing:
- [ ] Verificar navegación después de guardar en CONTADO
- [ ] Verificar animación de surtidor funciona
- [ ] Verificar todos los datos se muestran correctamente
- [ ] Verificar botón "Nueva Venta" funciona
- [ ] Verificar botón "Inicio" funciona
- [ ] Verificar que NO se muestra en modo CRÉDITO

---

### **MÓDULO 6: Flujo Diferenciado CONTADO vs CRÉDITO**
**Archivos:**
- `src/components/modules/sales/payment-view/views/payment-methods-view.tsx`
- `src/components/modules/sales/payment-view/payment-view-master.tsx`

**Prioridad:** 🟢 Media-Baja  
**Estimación:** 1 hora

#### Tareas:
- [ ] Implementar lógica condicional en `handleSaveSuccess`
- [ ] En CONTADO: Navegar a `transaction-status`
- [ ] En CRÉDITO: Navegar directamente al menú o mostrar confirmación simple
- [ ] Agregar mensaje diferenciado para CRÉDITO
- [ ] Documentar diferencias en el flujo

#### Implementación Técnica:
```tsx
// payment-methods-view.tsx
const handleSaveSuccess = () => {
  const mode = sharedFormData?.mode || formData.mode;
  
  if (mode === "CONTADO") {
    // Navegar a pantalla de status con surtidor
    navigateTo("transaction-status", {
      state: {
        transactionData: {
          placa: formData.placa,
          mode: mode,
          totalAmount: formData.totalAmount,
          paymentMethods: paymentMethods,
          timestamp: new Date().toISOString()
        }
      }
    });
  } else {
    // CRÉDITO: Confirmación simple y volver al menú
    console.log("✅ Crédito registrado exitosamente");
    navigateTo("menu");
  }
};
```

#### Archivos Afectados:
- `src/components/modules/sales/payment-view/views/payment-methods-view.tsx`
- `src/components/modules/sales/payment-view/payment-view-master.tsx`

#### Testing:
- [ ] Verificar flujo CONTADO lleva a transaction-status
- [ ] Verificar flujo CRÉDITO lleva directo al menú
- [ ] Verificar que los datos se pasan correctamente
- [ ] Probar ambos flujos end-to-end

---

### **MÓDULO 7: Actualización del Menú Principal**
**Archivos:**
- `src/components/modules/main-menu/menu-data.tsx`
- `src/components/modules/main-menu/main-menu.tsx`

**Prioridad:** 🟢 Baja  
**Estimación:** 30 minutos

#### Tareas:
- [ ] Revisar tiles actuales en el menú
- [ ] Considerar agregar tiles separados para CONTADO y CRÉDITO
- [ ] O mantener tile único "VENTAS" que lleve a selector
- [ ] Actualizar iconos si es necesario
- [ ] Verificar estados de habilitación según turno activo

#### Opciones de Diseño:

**Opción A: Tiles Separados**
```
┌─────────┬─────────┐
│ CONTADO │ CRÉDITO │
├─────────┼─────────┤
│ PUNTOS  │ CLIENTE │
└─────────┴─────────┘
```

**Opción B: Tile Único (Actual)**
```
┌─────────┬─────────┐
│ VENTAS  │ PUNTOS  │
├─────────┼─────────┤
│ CLIENTE │ OTROS   │
└─────────┴─────────┘
```

#### Archivos Afectados:
- `src/components/modules/main-menu/menu-data.tsx`
- `src/components/modules/main-menu/types.ts` (posiblemente)

#### Testing:
- [ ] Verificar navegación desde menú a cash-sale
- [ ] Verificar navegación desde menú a credit-sale
- [ ] Verificar estados de habilitación

---

## 🔧 Tareas Técnicas Adicionales

### **TAREA TÉCNICA 1: Refactorización de Navegación**
**Prioridad:** 🟡 Media  
**Estimación:** 1 hora

#### Tareas:
- [ ] Revisar hook `use-hmi-navigation.ts`
- [ ] Asegurar soporte para pasar estado entre rutas
- [ ] Documentar API de navegación
- [ ] Agregar tipos TypeScript para estados de navegación

---

### **TAREA TÉCNICA 2: Componentes Compartidos**
**Prioridad:** 🟢 Baja  
**Estimación:** 45 minutos

#### Tareas:
- [ ] Extraer componentes comunes entre cash-sale y credit-sale
- [ ] Crear carpeta `src/components/modules/sales/shared/`
- [ ] Mover componentes compartidos:
  - [ ] `amount-display.tsx`
  - [ ] `keypad.tsx`
  - [ ] `side-tile.tsx` (ya existe en cash-sale)
- [ ] Actualizar imports en ambos módulos

---

### **TAREA TÉCNICA 3: Testing y Validación**
**Prioridad:** 🔴 Alta  
**Estimación:** 2 horas

#### Tareas:
- [ ] Crear casos de prueba para cada módulo
- [ ] Probar flujo completo CONTADO:
  - [ ] Splash → Menú → Cash Sale → Payment → Transaction Status
- [ ] Probar flujo completo CRÉDITO:
  - [ ] Splash → Menú → Credit Sale → Payment → Menú
- [ ] Probar restricción de cambio de modo
- [ ] Probar navegación entre vistas
- [ ] Validar datos se persisten correctamente
- [ ] Probar casos edge:
  - [ ] Monto 0
  - [ ] Placa inválida
  - [ ] Sin métodos de pago en CONTADO
  - [ ] Navegación hacia atrás

---

## 📊 Resumen de Prioridades

| Prioridad | Módulos | Estimación Total |
|-----------|---------|------------------|
| 🔴 Alta | MÓDULO 1, MÓDULO 2, TAREA TÉCNICA 3 | 3 horas |
| 🟡 Media-Alta | MÓDULO 3, MÓDULO 4, MÓDULO 5, MÓDULO 6, TAREA TÉCNICA 1 | 7.5 horas |
| 🟢 Media-Baja | MÓDULO 7, TAREA TÉCNICA 2 | 1.25 horas |

**Estimación Total:** ~12 horas de desarrollo

---

## 📝 Checklist General de Implementación

### Preparación
- [ ] Revisar y aprobar este documento
- [ ] Confirmar requisitos con el cliente
- [ ] Crear branch de desarrollo: `feature/client-requirements-oct-2025`
- [ ] Configurar entorno de testing

### Implementación (Orden Recomendado)
1. - [ ] **MÓDULO 1**: Splash Screen - WhatsApp (15 min)
2. - [ ] **MÓDULO 2**: Restricción de Modo (45 min)
3. - [ ] **MÓDULO 3**: Vista Preset CRÉDITO (2 h)
4. - [ ] **MÓDULO 4**: Integración Preset (1 h)
5. - [ ] **MÓDULO 5**: Pantalla Confirmación (2.5 h)
6. - [ ] **MÓDULO 6**: Flujo Diferenciado (1 h)
7. - [ ] **MÓDULO 7**: Menú Principal (30 min)
8. - [ ] **TAREA TÉCNICA 1**: Navegación (1 h)
9. - [ ] **TAREA TÉCNICA 2**: Componentes Compartidos (45 min)
10. - [ ] **TAREA TÉCNICA 3**: Testing (2 h)

### Validación Final
- [ ] Testing completo de todos los flujos
- [ ] Revisión de código
- [ ] Documentación actualizada
- [ ] Preparar demo para el cliente
- [ ] Merge a branch principal

---

## 🚨 Riesgos Identificados

### Riesgo 1: Duplicación de Código
**Descripción:** Al crear `credit-sale` basado en `cash-sale` hay riesgo de duplicación.  
**Mitigación:** Implementar TAREA TÉCNICA 2 para componentes compartidos.  
**Impacto:** Medio

### Riesgo 2: Complejidad en Navegación
**Descripción:** Pasar estado entre múltiples vistas puede ser complejo.  
**Mitigación:** Usar React Router state o Context API.  
**Impacto:** Bajo-Medio

### Riesgo 3: Bloqueo de Modo
**Descripción:** Lógica de bloqueo puede causar UX confusa si no está bien implementada.  
**Mitigación:** Mensajes claros y testing exhaustivo.  
**Impacto:** Bajo

---

## 📞 Próximos Pasos

1. **Revisión del Plan**: Revisar este documento y solicitar feedback
2. **Aprobación del Cliente**: Confirmar que todos los requisitos están cubiertos
3. **Ajustes**: Realizar modificaciones necesarias según feedback
4. **Inicio de Implementación**: Comenzar con MÓDULO 1 una vez aprobado

---

## 📎 Anexos

### A. Estructura de Archivos Completa Post-Implementación
```
src/components/modules/
├── auth/
│   ├── splash-screen.tsx          [MODIFICADO]
│   ├── login-view/
│   └── close-turn-view/
├── main-menu/
│   ├── main-menu.tsx              [MODIFICADO]
│   └── menu-data.tsx              [MODIFICADO]
├── sales/
│   ├── cash-sale/                 [EXISTENTE]
│   ├── credit-sale/               [NUEVO]
│   ├── transaction-status/        [NUEVO]
│   ├── shared/                    [NUEVO]
│   └── payment-view/              [MODIFICADO]
└── shared/
    └── hmi-footer-info.tsx        [MODIFICADO]
```

### B. Convenciones de Código
- Nombres de archivos: `kebab-case.tsx`
- Componentes: `PascalCase`
- Hooks: `use-camel-case.ts`
- Estilos: TailwindCSS inline
- NO crear archivos barrel (`index.ts`)

### C. Referencias
- Imagen de requisitos del cliente (WhatsApp)
- Código actual en: `/src/components/modules/`
- Router: `/src/router/routes.tsx`

---

**Documento generado el:** 2025-10-08  
**Versión:** 1.0  
**Autor:** AI Assistant (Cascade)  
**Estado:** ⏳ Pendiente de Aprobación
