# UI Store - Zustand v5 con TypeScript

Store global para gestión de estado de UI del sistema Nexus POS.

## 📦 Características

- ✅ **TypeScript** completo con tipos seguros
- ✅ **Persistencia** en `sessionStorage` (se limpia al cerrar pestaña)
- ✅ **DevTools** habilitado en desarrollo
- ✅ **Modular** - Estado y acciones separados
- ✅ **Selectores optimizados** para prevenir re-renders innecesarios

## 🏗️ Estructura

```
ui-store/
├── types.ts           # Definiciones de tipos e interfaces
├── state.ts           # Estado inicial y constantes
├── actions.ts         # Implementación de acciones
├── store-creator.ts   # StateCreator combinado
├── ui-store.ts        # Store principal con middlewares
└── README.md          # Esta documentación
```

## 📚 Uso Básico

### Importar el store

```typescript
import { useUIStore } from '@/lib/store/ui-store';

function MyComponent() {
  // Obtener todo el estado
  const store = useUIStore();
  
  // O usar selectores para optimizar
  const isTurnActive = useUIStore(state => state.isTurnActive);
  const login = useUIStore(state => state.login);
}
```

### Usar hooks personalizados (recomendado)

```typescript
import { useSession, useMenuTheme } from '@/lib/hooks/use-ui-store-helpers';

function LoginComponent() {
  const { login, isAuthenticated, operatorName } = useSession();
  
  const handleLogin = () => {
    login('Operador 1');
    // Automáticamente inicia el turno y actualiza el tema del menú
  };
  
  return (
    <button onClick={handleLogin}>
      {isAuthenticated ? `Hola ${operatorName}` : 'Iniciar Sesión'}
    </button>
  );
}

function MenuComponent() {
  const { borderColor, isTurnActive } = useMenuTheme();
  
  return (
    <div style={{ borderColor }}>
      Estado: {isTurnActive ? 'Activo' : 'Inactivo'}
    </div>
  );
}
```

## 🎯 Estado Disponible

### Session State
- `isAuthenticated: boolean` - Usuario autenticado
- `isTurnActive: boolean` - Turno activo
- `operatorName: string | null` - Nombre del operador
- `turnStartTime: Date | null` - Hora de inicio del turno
- `sessionId: string | null` - ID de sesión único

### UI State
- `menuBorderColor: string` - Color de borde del menú (`#EF4444` rojo / `#22C55E` verde)
- `menuTilesEnabled: boolean` - Habilitar tiles del menú
- `showCloseTurnDialog: boolean` - Mostrar diálogo de cierre
- `isLoading: boolean` - Estado de carga global
- `notification: Notification | null` - Notificación actual

### Turn State
- `turnClosed: boolean` - Turno cerrado
- `closeTurnReason: string | null` - Razón del cierre
- `lastTurnCloseTime: Date | null` - Última vez que se cerró

## ⚡ Acciones Disponibles

### Session Actions

#### `login(operatorName: string)`
Inicia sesión y automáticamente abre un turno.

```typescript
const login = useUIStore(state => state.login);
login('Juan Pérez');
```

#### `logout()`
Cierra sesión y turno si está activo.

```typescript
const logout = useUIStore(state => state.logout);
logout();
```

#### `startTurn()`
Abre un nuevo turno de trabajo.

```typescript
const startTurn = useUIStore(state => state.startTurn);
startTurn();
```

#### `closeTurn(reason?: string)`
Cierra el turno actual.

```typescript
const closeTurn = useUIStore(state => state.closeTurn);
closeTurn('Fin de jornada');
```

### UI Actions

#### `setMenuTheme(turnActive: boolean)`
Actualiza colores del menú basado en estado de turno.

```typescript
const setMenuTheme = useUIStore(state => state.setMenuTheme);
setMenuTheme(true); // Verde
setMenuTheme(false); // Rojo
```

#### `showNotification(message: string, type: NotificationType)`
Muestra una notificación.

```typescript
const showNotification = useUIStore(state => state.showNotification);
showNotification('Turno cerrado correctamente', 'success');
showNotification('Error al procesar', 'error');
```

#### `setLoading(loading: boolean)`
Cambia estado de carga global.

```typescript
const setLoading = useUIStore(state => state.setLoading);
setLoading(true);
// ... operación async
setLoading(false);
```

### Reset Actions

#### `resetSession()`
Resetea solo datos de sesión.

```typescript
const resetSession = useUIStore(state => state.resetSession);
resetSession();
```

#### `resetAll()`
Resetea todo el estado del store.

```typescript
const resetAll = useUIStore(state => state.resetAll);
resetAll();
```

## 🎨 Selectores Optimizados

Usa selectores predefinidos para mejor performance:

```typescript
import { useUIStore, uiStoreSelectors } from '@/lib/store/ui-store';

function MyComponent() {
  const isTurnActive = useUIStore(uiStoreSelectors.isTurnActive);
  const menuTheme = useUIStore(uiStoreSelectors.menuTheme);
  const sessionInfo = useUIStore(uiStoreSelectors.sessionInfo);
}
```

## 🔄 Flujo de Estados

### Login → Apertura de Turno → Menú Activo

```typescript
// 1. Usuario hace login
login('Operador 1');
// ↓ Automáticamente ejecuta:
// - isAuthenticated = true
// - sessionId = generado
// - startTurn() llamado automáticamente
// ↓
// - isTurnActive = true
// - turnStartTime = Date.now()
// - setMenuTheme(true) llamado
// ↓
// - menuBorderColor = '#22C55E' (verde)
// - menuTilesEnabled = true
```

### Cierre de Turno → Menú Inactivo

```typescript
// 1. Usuario cierra turno
closeTurn('Fin de jornada');
// ↓
// - isTurnActive = false
// - turnClosed = true
// - closeTurnReason = 'Fin de jornada'
// - lastTurnCloseTime = Date.now()
// - setMenuTheme(false) llamado
// ↓
// - menuBorderColor = '#EF4444' (rojo)
// - menuTilesEnabled = false
// - Notificación de éxito mostrada
```

## 💾 Persistencia

Solo se persisten datos críticos en `sessionStorage`:
- `isAuthenticated`
- `isTurnActive`
- `operatorName`
- `sessionId`
- `turnStartTime`

Al recargar la página, el tema del menú se restaura automáticamente.

## 🛠️ Debugging

En modo desarrollo, el store está conectado a Redux DevTools:

1. Instalar [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools)
2. Abrir DevTools en el navegador
3. Inspeccionar estado y acciones en tiempo real

## 📝 Ejemplos de Integración

### MainMenu Component

```typescript
import { useMenuTheme } from '@/lib/hooks/use-ui-store-helpers';

export const MainMenu = () => {
  const { borderColor, isTurnActive } = useMenuTheme();
  
  return (
    <div style={{ borderColor }}>
      {/* tiles aquí */}
    </div>
  );
};
```

### CloseTurnView Component

```typescript
import { useSession } from '@/lib/hooks/use-ui-store-helpers';

export const CloseTurnView = () => {
  const { closeTurn } = useSession();
  
  const handleClose = () => {
    closeTurn('Cierre manual');
    navigate('/menu');
  };
  
  return <button onClick={handleClose}>Cerrar Turno</button>;
};
```

## 🔐 Seguridad

- Los datos se almacenan en `sessionStorage`, se borran al cerrar el navegador
- No se persisten datos sensibles
- Cada sesión tiene un ID único generado

## 🚀 Performance

- Selectores optimizados previenen re-renders innecesarios
- Estado modular permite suscripciones granulares
- Middlewares aplicados en orden óptimo (devtools → persist)

## 📖 Recursos

- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [TypeScript Guide](https://github.com/pmndrs/zustand#typescript)
- [Persist Middleware](https://github.com/pmndrs/zustand#persist-middleware)
