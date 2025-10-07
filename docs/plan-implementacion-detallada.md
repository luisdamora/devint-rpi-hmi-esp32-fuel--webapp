# Plan de Implementación Detallado - HMI Layouts Web

## 📋 Resumen del Proyecto

**Objetivo**: Crear una aplicación web con Next.js 15 para diseñar y exportar layouts de interfaz HMI (800x480px) para el sistema de combustibles Nexus POS.

**Stack Técnico**:
- Next.js 15.5.4 con App Router y TypeScript
- TailwindCSS v4 con shadcn/ui
- Package Manager: pnpm
- Exportación: html2canvas para PNG

## 🎯 Alcance del Proyecto

### Módulos a Implementar
1. **Módulo Autenticación y Turnos** (5 estados)
2. **Módulo Ventas - Contado/Crédito** (3 estados)
3. **Módulo Fidelización** (2 estados)
4. **Módulo Utilidades** (4 estados)
5. **Módulo Finalización** (2 estados)

**Total**: 16 layouts diferentes con múltiples variaciones de estado

## 📁 Estructura de Directorios

```
src/
├── components/
│   ├── common/                    # Componentes reutilizables
│   │   ├── navbar.tsx            # Navegación principal
│   │   ├── layout-container.tsx  # Contenedor 800x480px
│   │   ├── export-button.tsx     # Botón exportar PNG
│   │   └── module-switcher.tsx   # Selector de módulos
│   ├── modules/                   # Módulos por funcionalidad
│   │   ├── auth/                 # Autenticación y turnos
│   │   │   ├── splash-screen.tsx
│   │   │   ├── login-view.tsx
│   │   │   ├── main-menu-closed.tsx
│   │   │   ├── main-menu-open.tsx
│   │   │   └── close-turn.tsx
│   │   ├── sales/                # Ventas contado/crédito
│   │   │   ├── keypad-view.tsx
│   │   │   ├── payment-methods.tsx
│   │   │   └── client-registration.tsx
│   │   ├── loyalty/              # Fidelización
│   │   │   ├── points-colombia.tsx
│   │   │   └── points-query.tsx
│   │   ├── utilities/            # Utilidades
│   │   │   ├── utilities-menu.tsx
│   │   │   ├── printer-settings.tsx
│   │   │   ├── last-sales.tsx
│   │   │   └── last-turn.tsx
│   │   └── finalization/         # Finalización
│   │       ├── sale-summary.tsx
│   │       └── print-preview.tsx
│   └── ui/                       # Componentes shadcn/ui
├── hooks/
│   ├── use-export-png.ts         # Hook para exportación
│   └── use-module-state.ts       # Manejo de estados
├── types/
│   ├── index.ts                  # Tipos centralizados
│   └── modules.ts                # Tipos de módulos
├── constants/
│   ├── modules.ts               # Configuración de módulos
│   ├── navigation.ts            # Configuración navegación
│   └── export-config.ts         # Configuración exportación
├── data/
│   ├── mock-data.ts             # Datos de ejemplo
│   └── layout-configs.ts        # Configuraciones de layouts
├── utils/
│   ├── file-naming.ts           # Utilidades nomenclatura
│   └── canvas-export.ts         # Utilidades exportación
└── app/
    ├── layout.tsx               # Layout raíz
    ├── page.tsx                 # Dashboard principal
    ├── modules/                 # Rutas por módulo
    │   ├── auth/
    │   │   └── page.tsx
    │   ├── sales/
    │   │   └── page.tsx
    │   ├── loyalty/
    │   │   └── page.tsx
    │   ├── utilities/
    │   │   └── page.tsx
    │   └── finalization/
    │       └── page.tsx
    ├── api/
    │   └── export/              # API endpoint para exportación
    │       └── route.ts
    └── globals.css
```

## 🛠️ Fase 1: Configuración Base

### 1.1 Instalar Dependencias Adicionales
```bash
pnpm add html2canvas
pnpm add -D @types/html2canvas
```

### 1.2 Configurar TypeScript
- Extender tipos de `interface-flujo-01.ts`
- Crear tipos específicos para la aplicación

### 1.3 Configurar TailwindCSS
- Definir colores personalizados del tema Nexus
- Configurar clases para layouts 800x480px

## 🧩 Fase 2: Componentes Base

### 2.1 LayoutContainer Component
```typescript
// src/components/common/layout-container.tsx
interface LayoutContainerProps {
  children: React.ReactNode;
  moduleName: string;
  layoutName: string;
  showExportButton?: boolean;
  className?: string;
}
```

**Características**:
- Dimensiones fijas: 800x480px
- Borde simulando pantalla HMI
- Botón de exportación integrado
- Soporte para dark/light theme

### 2.2 ModuleNavigation Component
```typescript
// src/components/common/navbar.tsx
interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  isActive: boolean;
}
```

**Características**:
- Navegación por módulos
- Indicador visual de módulo activo
- Responsive para mobile/desktop

### 2.3 ExportButton Component
```typescript
// src/components/common/export-button.tsx
interface ExportButtonProps {
  onExport: () => void;
  isExporting?: boolean;
  moduleName: string;
  layoutName: string;
}
```

**Características**:
- Exportación individual
- Batch export (todos los estados)
- Preview antes de exportar
- Nomenclatura automática de archivos

### 2.4 useExportPng Hook
```typescript
// src/hooks/use-export-png.ts
interface ExportOptions {
  filename?: string;
  quality?: number;
  scale?: number;
  backgroundColor?: string;
}
```

**Funcionalidades**:
- Captura de elemento DOM
- Generación de PNG con html2canvas
- Descarga automática del archivo
- Manejo de errores

## 📦 Fase 3: Módulos de Layout

### 3.1 Módulo Autenticación y Turnos

#### Estados a Implementar:
1. **SplashScreen** (`auth/splash-screen.tsx`)
   - Logo Nexus
   - Información de contacto
   - Duración: 3-5 segundos

2. **MainMenu - Turno Cerrado** (`auth/main-menu-closed.tsx`)
   - Botón TURNOS en rojo
   - Opciones deshabilitadas
   - Click solo en TURNOS

3. **LoginView** (`auth/login-view.tsx`)
   - Campos: Usuario y Contraseña
   - Botón INICIAR (rojo)
   - Validación de credenciales

4. **MainMenu - Turno Activo** (`auth/main-menu-open.tsx`)
   - Botón TURNOS en verde
   - Todas las opciones habilitadas
   - Info del vendedor activo

5. **CloseTurnView** (`auth/close-turn.tsx`)
   - Campos: Usuario y Contraseña
   - Botón CERRAR (verde)
   - Validación para cierre

### 3.2 Módulo Ventas

#### Estados a Implementar:
1. **KeypadView** (`sales/keypad-view.tsx`)
   - Teclado numérico completo
   - Preset: $100.000
   - Modos: $ / Vol. / TANQUE LLENO

2. **PaymentMethods** (`sales/payment-methods.tsx`)
   - Métodos: TARJETA, EFECTIVO, OTRO
   - Campos: Banco, Monto, Franquicia
   - Botones: CONSULTA PUNTOS, PROCESAR

3. **ClientRegistration** (`sales/client-registration.tsx`)
   - Formulario completo cliente
   - Tipos de documento
   - Validación de campos

### 3.3 Módulo Fidelización

#### Estados a Implementar:
1. **PointsColombia** (`loyalty/points-colombia.tsx`)
   - Tabla últimas ventas
   - Columnas: #FE, ID PUNTOS, PLACA, etc.
   - Botones: Imprimir, Inicio

2. **PointsQuery** (`loyalty/points-query.tsx`)
   - Consulta de puntos
   - Integración con vista de pagos

### 3.4 Módulo Utilidades

#### Estados a Implementar:
1. **UtilitiesMenu** (`utilities/utilities-menu.tsx`)
   - 6 opciones principales
   - Test impresión, Ajustes, Reportes

2. **PrinterSettings** (`utilities/printer-settings.tsx`)
   - Configuración Bluetooth
   - Selección de impresora

3. **LastSales** (`utilities/last-sales.tsx`)
   - Reporte últimas ventas
   - Filtros por fecha

4. **LastTurn** (`utilities/last-turn.tsx`)
   - Resumen último turno
   - Totales y estadísticas

### 3.5 Módulo Finalización

#### Estados a Implementar:
1. **SaleSummary** (`finalization/sale-summary.tsx`)
   - Resumen completo venta
   - Tipo: CONTADO / CRÉDITO
   - Info vehículo y cliente

2. **PrintPreview** (`finalization/print-preview.tsx`)
   - Vista previa factura
   - Datos completos
   - Opciones imprimir/guardar

## ⚡ Fase 4: Funcionalidades Avanzadas

### 4.1 Sistema de Estados
```typescript
// src/types/modules.ts
interface ModuleState {
  id: string;
  name: string;
  isActive: boolean;
  variants: StateVariant[];
}

interface StateVariant {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType;
  defaultActive: boolean;
}
```

### 4.2 Nomenclatura de Archivos
```typescript
// src/utils/file-naming.ts
export const generateFilename = (
  moduleName: string,
  stateName: string,
  variant?: string,
  timestamp?: boolean
): string => {
  const base = `${moduleName}-${stateName}`;
  const suffix = variant ? `-${variant}` : '';
  const date = timestamp ? `-${Date.now()}` : '';
  return `${base}${suffix}${date}.png`;
};
```

**Formato**: `{modulo}-{estado}-{variante}-{timestamp}.png`

**Ejemplos**:
- `auth-main-menu-closed-default.png`
- `sales-keypad-view-active-input.png`
- `loyalty-points-colombia-with-data.png`

### 4.3 Mock Data
```typescript
// src/data/mock-data.ts
export const mockUser: User = {
  id: "1",
  username: "sebastian",
  password: "****",
  role: "vendedor",
  fullName: "Sebastian Restrepo Bustamante"
};

export const mockStation: StationInfo = {
  name: "Estacion de Servicio Nexus",
  code: "99999",
  contactEmail: "soporte@vpmnexus.com",
  contactWeb: "www.vpmnexus.com",
  phones: ["+57-3184936241", "+57-3164475985"]
};
```

### 4.4 Batch Export
```typescript
// src/utils/batch-export.ts
export const exportModule = async (
  moduleId: string,
  states: StateVariant[]
): Promise<string[]> => {
  const exportedFiles: string[] = [];

  for (const state of states) {
    const filename = generateFilename(moduleId, state.name);
    // Lógica de exportación...
    exportedFiles.push(filename);
  }

  return exportedFiles;
};
```

## 🔄 Fase 5: Integración y Flujo

### 5.1 Dashboard Principal
```typescript
// src/app/page.tsx
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto py-8">
        <ModuleGrid />
        <QuickActions />
        <RecentExports />
      </main>
    </div>
  );
}
```

**Características**:
- Grid de todos los módulos
- Vista previa de cada layout
- Acceso rápido a exportación
- Historial de exportaciones

### 5.2 Navegación por Módulos
```typescript
// src/app/modules/[moduleId]/page.tsx
export default function ModulePage({ params }: { params: { moduleId: string } }) {
  const module = getModuleById(params.moduleId);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <ModuleHeader module={module} />
      <StateSelector states={module.states} />
      <LayoutContainer>
        <CurrentStateComponent />
      </LayoutContainer>
    </div>
  );
}
```

### 5.3 Demo Interactiva
```typescript
// src/components/interactive-demo.tsx
export const InteractiveDemo: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [flowState, setFlowState] = useState<FlowState>({});

  // Simulación del flujo completo del sistema
  const handleNextStep = () => {
    // Lógica para siguiente paso en el flujo
  };

  return (
    <div className="demo-container">
      <FlowProgress currentStep={currentStep} />
      <LayoutContainer>
        <FlowComponent step={currentStep} state={flowState} />
      </LayoutContainer>
      <FlowControls onNext={handleNextStep} onPrev={handlePrevStep} />
    </div>
  );
};
```

## 🎨 Fase 6: Estilos y Tema

### 6.1 Colores del Tema Nexus
```css
/* src/app/globals.css */
:root {
  /* Colores primarios Nexus */
  --nexus-green: #22C55E;
  --nexus-red: #EF4444;
  --nexus-orange: #F97316;
  --nexus-blue: #2196F3;
  --nexus-cyan: #00BCD4;
  --nexus-purple: #9C27B0;
  --nexus-gray: #607D8B;

  /* Colores de fondo HMI */
  --hmi-bg: #1a1a1a;
  --hmi-surface: #2d2d2d;
  --hmi-text: #ffffff;
  --hmi-text-secondary: #b0b0b0;
}
```

### 6.2 Componentes Tematizados
```typescript
// src/components/ui/hmi-button.tsx
export const HMIButton: React.FC<HMIButtonProps> = ({
  variant = "primary",
  size = "md",
  disabled = false,
  children,
  ...props
}) => {
  const baseClasses = "font-bold transition-all duration-200";
  const variantClasses = {
    primary: "bg-nexus-green hover:bg-nexus-green/90 text-white",
    secondary: "bg-nexus-orange hover:bg-nexus-orange/90 text-white",
    danger: "bg-nexus-red hover:bg-nexus-red/90 text-white",
    disabled: "bg-gray-600 text-gray-400 cursor-not-allowed"
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
```

## 📱 Fase 7: Características Adicionales

### 7.1 Vista de Preview
```typescript
// src/components/preview-modal.tsx
export const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  imageData,
  filename
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="preview-container">
        <img src={imageData} alt={filename} />
        <div className="preview-actions">
          <Button onClick={handleDownload}>Descargar</Button>
          <Button onClick={handleCopyToClipboard}>Copiar</Button>
        </div>
      </div>
    </Modal>
  );
};
```

### 7.2 Historial de Exportaciones
```typescript
// src/components/export-history.tsx
export const ExportHistory: React.FC = () => {
  const [exports, setExports] = useState<ExportRecord[]>([]);

  return (
    <div className="export-history">
      <h3>Historial de Exportaciones</h3>
      <div className="exports-list">
        {exports.map((exp) => (
          <ExportItem key={exp.id} record={exp} />
        ))}
      </div>
    </div>
  );
};
```

### 7.3 Configuración de Exportación
```typescript
// src/components/export-settings.tsx
export const ExportSettings: React.FC = () => {
  return (
    <div className="export-settings">
      <SettingGroup title="Calidad de Imagen">
        <Select label="Calidad" options={qualityOptions} />
        <Select label="Formato" options={formatOptions} />
      </SettingGroup>
      <SettingGroup title="Nomenclatura">
        <Input label="Prefijo" placeholder="nexus-hmi" />
        <Checkbox label="Incluir timestamp" />
      </SettingGroup>
    </div>
  );
};
```

## 🧪 Fase 8: Testing y Validación

### 8.1 Testing de Componentes
```typescript
// __tests__/components/layout-container.test.tsx
describe('LayoutContainer', () => {
  it('should render with correct dimensions', () => {
    render(<LayoutContainer>Content</LayoutContainer>);
    const container = screen.getByTestId('layout-container');
    expect(container).toHaveStyle({ width: '800px', height: '480px' });
  });

  it('should export PNG when button clicked', async () => {
    const mockExport = jest.fn();
    render(<LayoutContainer onExport={mockExport}>Content</LayoutContainer>);

    fireEvent.click(screen.getByText('Exportar'));
    await waitFor(() => expect(mockExport).toHaveBeenCalled());
  });
});
```

### 8.2 Testing de Exportación
```typescript
// __tests__/utils/export.test.ts
describe('PNG Export', () => {
  it('should generate correct filename', () => {
    const filename = generateFilename('auth', 'main-menu', 'closed');
    expect(filename).toBe('auth-main-menu-closed.png');
  });

  it('should export module with all states', async () => {
    const files = await exportModule('auth', mockStates);
    expect(files).toHaveLength(5);
    expect(files[0]).toMatch(/auth-.*\.png/);
  });
});
```

## 📚 Fase 9: Documentación

### 9.1 Guía de Usuario
```markdown
# Guía de Usuario - HMI Layouts Web

## Navegación
- Acceso a todos los módulos desde el dashboard principal
- Cambio entre estados usando el selector superior

## Exportación
- Individual: Botón "Exportar" en cada layout
- Por lote: Botón "Exportar Módulo Completo"

## Nomenclatura
Formato: `{modulo}-{estado}-{variante}.png`
Ejemplo: `auth-main-menu-closed.png`
```

### 9.2 Documentación Técnica
```markdown
# Documentación Técnica

## Arquitectura
- Component-based architecture
- Estado centralizado con React Context
- Exportación con html2canvas

## Extensiones
- Agregar nuevos módulos en `src/components/modules/`
- Configurar estados en `src/constants/modules.ts`
- Extender tipos en `src/types/index.ts`
```

## 🚀 Fase 10: Despliegue y Optimización

### 10.1 Build de Producción
```bash
# Build optimizado
pnpm build

# Análisis de bundle
pnpm build --analyze
```

### 10.2 Optimizaciones
- Lazy loading de componentes de módulos
- Optimización de imágenes de referencia
- Minificación de CSS y JS
- Configuración de cache headers

### 10.3 Despliegue
```bash
# Build y export estático (opcional)
pnpm build
pnpm export

# Despliegue en Vercel/Netlify
vercel --prod
# o
netlify deploy --prod --dir=out
```

## ✅ Checklist de Implementación

### Configuración Base
- [ ] Instalar dependencias adicionales
- [ ] Configurar estructura de directorios
- [ ] Extender tipos TypeScript

### Componentes Base
- [ ] LayoutContainer (800x480px)
- [ ] ModuleNavigation
- [ ] ExportButton con useExportPng
- [ ] Componentes UI tematizados

### Módulos
- [ ] Módulo Autenticación (5 estados)
- [ ] Módulo Ventas (3 estados)
- [ ] Módulo Fidelización (2 estados)
- [ ] Módulo Utilidades (4 estados)
- [ ] Módulo Finalización (2 estados)

### Funcionalidades
- [ ] Sistema de estados y variantes
- [ ] Nomenclatura automática de archivos
- [ ] Batch export por módulo
- [ ] Mock data para visualización

### Integración
- [ ] Dashboard principal
- [ ] Navegación por módulos
- [ ] Demo interactiva del flujo
- [ ] Historial de exportaciones

### Calidad
- [ ] Testing de componentes
- [ ] Testing de exportación
- [ ] Documentación de usuario
- [ ] Documentación técnica

### Finalización
- [ ] Optimización de performance
- [ ] Build de producción
- [ ] Configuración de despliegue
- [ ] Manual de mantenimiento

## 📈 Estimación de Tiempo

- **Fase 1-2**: Configuración y componentes base - 1 día
- **Fase 3**: Implementación de módulos - 3-4 días
- **Fase 4**: Funcionalidades avanzadas - 2 días
- **Fase 5-6**: Integración y estilos - 2 días
- **Fase 7-8**: Características adicionales y testing - 2 días
- **Fase 9-10**: Documentación y despliegue - 1 día

**Total estimado**: 11-12 días hábiles

---

## 🎯 Próximos Pasos

1. **Revisión del plan** con stakeholder
2. **Aprobación de arquitectura** propuesta
3. **Inicio de implementación** fase por fase
4. **Validación continua** con diseños de referencia
5. **Testing exhaustivo** de funcionalidades críticas
6. **Documentación final** para mantenimiento

Este plan proporciona una roadmap completo para la implementación del sistema HMI Layouts Web, asegurando cobertura de todos los requisitos y entregando una solución robusta y mantenible.