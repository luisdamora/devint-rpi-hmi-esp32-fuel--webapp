# Sistema de Enrutamiento React Router

## 🛣️ **Estructura de Rutas Implementada**

### **Rutas Principales**

```
/                           → Redirect a /home
/home                      → Página de bienvenida
/login                     → Página de login pública
/hmi                       → Sistema HMI principal
/hmi/splash               → HMI: Splash screen
/hmi/menu                 → HMI: Menú principal
/hmi/login                → HMI: Login de turno
/hmi/cash-sale            → HMI: Venta de contado
/hmi/payment              → HMI: Vista de procesamiento de pago
/hmi/loyalty              → HMI: Puntos Colombia
/hmi/close-turn           → HMI: Cerrar turno
/admin                    → Panel administrativo
/settings                 → Configuración del sistema
/*                         → Página 404
```

### **Componentes de Layout**

#### **1. HMIRoute** (`/src/components/routes/HMIRoute.tsx`)
- **Propósito**: Wrapper para rutas del sistema HMI
- **Dimensiones**: 800x480px fijas
- **Contenido**: ViewManager con navegación interna
- **Uso**: Para todas las rutas `/hmi/*`

#### **2. AdminRoute** (`/src/components/routes/AdminRoute.tsx`)
- **Propósito**: Wrapper para rutas administrativas
- **Dimensiones**: Full viewport
- **Estilo**: Header/footer con colores NEXUS
- **Uso**: Para rutas `/admin` y `/settings`

#### **3. PublicRoute** (`/src/components/routes/PublicRoute.tsx`)
- **Propósito**: Wrapper para rutas públicas
- **Dimensiones**: Responsive, contenido centrado
- **Estilo**: Layout limpio y minimalista
- **Uso**: Para rutas `/home`, `/login`, y 404

### **Navegación**

#### **Navegación Web (React Router)**
- Usa componentes `<Link to="/ruta">`
- URLs específicas para cada vista
- Back/Forward del navegador funcional
- Historial de navegación completo

#### **Navegación HMI (Interna)**
- Usa ViewManager para vistas HMI
- Navegación dentro del contenedor 800x480px
- Transiciones con estados de carga
- Mantenido por separado de la navegación web

### **Flujo de Usuario**

1. **Usuario visita** `http://localhost:5174/`
2. **Redirect automático** a `/home`
3. **Página de bienvenida** con opciones:
   - "Iniciar Sistema HMI" → `/hmi`
   - "Panel Administrativo" → `/admin`
4. **Sistema HMI** cargado con:
   - Dimensiones 800x480px fijas
   - Navegación interna por ViewManager
   - URLs específicas: `/hmi/menu`, `/hmi/keypad`, etc.
5. **Panel Admin** con dashboard y configuración

### **Ejemplos de Uso**

#### **Acceder directamente a vistas HMI:**
```javascript
// Navegación web
<Link to="/hmi/keypad">Ir a Teclado</Link>

// URL directa
http://localhost:5174/hmi/payment
```

#### **Navegación en páginas administrativas:**
```javascript
<Link to="/settings">Configuración</Link>
<Link to="/admin">Dashboard</Link>
```

### **Características Técnicas**

- ✅ **React Router v7** implementado
- ✅ **Lazy loading** de componentes (soportado)
- ✅ **Route protection** (estructura lista para implementar)
- ✅ **404 handling** personalizado
- ✅ **SEO-friendly** URLs específicas
- ✅ **TypeScript** completamente tipado
- ✅ **Colores NEXUS** consistentes en todos los layouts

### **Beneficios**

1. **Doble Navegación**: Web + HMI interna
2. **URLs Bookmarkables**: Cada vista tiene URL única
3. **Historial Navegador**: Back/Forward funcional
4. **Escalabilidad**: Fácil agregar nuevas rutas
5. **SEO**: URLs específicas para cada vista
6. **User Experience**: Navegación intuitiva

### **Servidor de Desarrollo**

- **URL**: http://localhost:5174/
- **Hot Reload**: Funciona con todas las rutas
- **Build**: Compila correctamente (✓ verificado)

## 🚀 **Uso Inmediato**

El sistema está listo para usar. Visita http://localhost:5174/ para:

1. Explorar la página de bienvenida
2. Probar el sistema HMI (800x480px)
3. Navegar por el panel administrativo
4. Verificar URLs específicas de cada vista

---

## `/payment` - Vista de Procesamiento de Pago

**Componente**: `PaymentView`
**Ubicación**: `src/components/modules/sales/payment-view/payment-view.tsx`
**Ruta**: `/payment`
**Tipo**: Protegida (HMIRoute)

### Descripción
Vista completa para procesar pagos en modo CONTADO o CRÉDITO, con soporte para múltiples métodos de pago.

### Características
- ✅ Selector de modo de pago (CONTADO/CRÉDITO)
- ✅ Campos de identificación (Placa, Cédula, Código Cliente)
- ✅ Distribución de monto entre métodos de pago
- ✅ Validación en tiempo real
- ✅ Integración con TouchInput/TouchSelect
- ✅ Arquitectura modular completa

### Flujo de Usuario
1. Usuario selecciona modo de pago (CONTADO o CRÉDITO)
2. Ingresa datos de identificación según el modo:
   - **CONTADO**: Placa (opcional)
   - **CRÉDITO**: Placa, Cédula, Código Cliente
3. En modo CONTADO: distribuye el pago entre métodos disponibles:
   - Tarjeta débito
   - Tarjeta crédito
   - Efectivo
   - Otro método
4. Valida que el total distribuido sea correcto
5. Guarda la venta

### Props Futuras (Backend Integration)
```typescript
interface PaymentViewProps {
  totalAmount?: number;      // Monto total de la venta
  ventaId?: string;          // ID de la venta a procesar
  onSuccess?: () => void;    // Callback al completar el pago
  onCancel?: () => void;     // Callback al cancelar
}
```

### Navegación
```typescript
// Desde cualquier componente con useHMINavigation:
const { navigateTo } = useHMINavigation();

// Navegar a payment view
navigateTo("payment");

// TODO: En el futuro, pasar datos de la venta
// navigateTo("payment", { totalAmount, ventaId });
```

### Estado Actual
- ✅ **Interfaz UI**: Completamente implementada
- ✅ **Lógica de validación**: Funcional
- ✅ **Distribución de montos**: Operativa
- ⏳ **Integración Backend**: Pendiente
- ⏳ **Guardado de venta**: Mock implementado

### Arquitectura
Consulta [`docs/payment-view-architecture.md`](docs/payment-view-architecture.md) para detalles completos de:
- Estructura de componentes
- Hooks personalizados
- Tipos y validaciones
- Patrones de diseño utilizados
