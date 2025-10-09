# Resumen Visual - Módulo de Utilidades

**Referencia de diseño rápida para implementación**

---

## 🎨 Vista General

```
┌─────────────────────────────────────────────────────────────────────┐
│                         NEXUS POS - UTILIDADES                       │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ [⚙️ Settings] UTILIDADES                         [← Atrás]   │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    ÚLTIMAS VENTAS                            │   │
│  ├────┬─────────┬─────────┬───────┬─────────┬────────┬────────┤   │
│  │ #FE│ID PUNTOS│ID PROMO │ PLACA │PRODUCTO │ DINERO │ VOLUMEN│   │
│  ├────┼─────────┼─────────┼───────┼─────────┼────────┼────────┤   │
│  │#001│PTS-001  │PROMO-10 │ABC-123│Gasolina │$125,000│  25.5 L│   │
│  │#002│PTS-002  │PROMO-15 │DEF-456│Diesel   │$180,000│  40.0 L│   │
│  │#003│PTS-003  │PROMO-10 │GHI-789│ACPM     │ $95,000│  18.2 L│   │
│  │#004│PTS-004  │PROMO-20 │JKL-012│G. Extra │$210,000│  35.8 L│   │
│  │#005│PTS-005  │PROMO-10 │MNO-345│Gasolina │ $67,000│  13.5 L│   │
│  └────┴─────────┴─────────┴───────┴─────────┴────────┴────────┘   │
│                                                                       │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                     │
│  │INICIO│ │ TEST │ │AJUST.│ │ÚLTIMS│ │ÚLTIMO│                     │
│  │      │ │IMPR. │ │IMPR. │ │VENTAS│ │TURNO │                     │
│  │ 🏠   │ │ 🖨️   │ │ ⚙️   │ │ 🧾   │ │ 🕐   │                     │
│  │ RED  │ │ORANGE│ │PURPLE│ │YELLOW│ │ CYAN │                     │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘                     │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📋 Componentes por Sección

| Sección | Componente | Archivo | Estado |
|---------|------------|---------|--------|
| **Header** | Título + Navegación | `utilities-view.tsx` | ⏳ Pendiente |
| **Tabla** | Tabla de ventas | `sales-table.tsx` | ⏳ Pendiente |
| **Acciones** | Botones de acción | `utilities-actions.tsx` | ⏳ Pendiente |
| **Layout** | Contenedor principal | `utilities-view.tsx` | ⏳ Pendiente |

---

## 🎨 Paleta de Colores

### Fondo y Contenedores

| Elemento | Color | Código Tailwind |
|----------|-------|-----------------|
| **Fondo Principal** | Gradiente Azul | `bg-gradient-to-br from-blue-900 to-blue-600` |
| **Header** | Azul Oscuro | `bg-blue-800` |
| **Tabla Fondo** | Blanco | `bg-white` |
| **Tabla Header** | Azul Marino | `bg-blue-900` |

### Botones de Acción

| Botón | Color Principal | Hover | Código Tailwind |
|-------|----------------|-------|-----------------|
| **INICIO** | 🔴 Rojo | Rojo Oscuro | `bg-red-600 hover:bg-red-700` |
| **TEST DE IMPRESION** | 🟠 Naranja | Naranja Oscuro | `bg-orange-500 hover:bg-orange-600` |
| **AJUSTES IMPRESORA** | 🟣 Morado | Morado Oscuro | `bg-purple-600 hover:bg-purple-700` |
| **ULTIMAS VENTAS** | 🟡 Amarillo (Activo) | Amarillo Oscuro + Ring | `bg-yellow-500 hover:bg-yellow-600 ring-4 ring-yellow-300` |
| **ULTIMO TURNO** | 🔵 Cian | Cian Oscuro | `bg-cyan-500 hover:bg-cyan-600` |
| ~~**REINICIAR**~~ | ~~🟢 Verde~~ | ~~NO IMPLEMENTAR~~ | ~~`N/A`~~ |

---

## 📊 Estructura de Datos

### SaleRecord Interface

| Campo | Tipo | Ejemplo | Descripción |
|-------|------|---------|-------------|
| `fe` | string | "#FE001234" | Número de factura electrónica |
| `idPuntos` | string | "PTS-2024-001" | ID del programa de puntos |
| `idPromo` | string | "PROMO-10" | ID de promoción aplicada |
| `placa` | string | "ABC-123" | Placa del vehículo (formato colombiano) |
| `producto` | string | "Gasolina Corriente" | Nombre del producto |
| `dinero` | number | 125000 | Monto en pesos colombianos |
| `volumen` | number | 25.5 | Volumen en litros |

### Ejemplo de Registro

```json
{
  "fe": "#FE001234",
  "idPuntos": "PTS-2024-001",
  "idPromo": "PROMO-10",
  "placa": "ABC-123",
  "producto": "Gasolina Corriente",
  "dinero": 125000,
  "volumen": 25.5
}
```

---

## 🔤 Tipografía

| Elemento | Tamaño | Peso | Color |
|----------|--------|------|-------|
| **Título Principal** | 2xl (24px) | Bold (700) | Blanco |
| **Título Tabla** | xl (20px) | Bold (700) | Gris-800 |
| **Headers Tabla** | sm (14px) | Semibold (600) | Blanco |
| **Celdas Tabla** | sm (14px) | Regular (400) | Gris-700 |
| **Botones** | base (16px) | Semibold (600) | Blanco |
| **Botón Atrás** | base (16px) | Medium (500) | Blanco |

---

## 📐 Espaciado y Dimensiones

### Layout Principal

```css
Padding general: p-6 (24px)
Min height: min-h-screen (100vh)
```

### Header

```css
Padding: p-4 (16px)
Margin bottom: mb-6 (24px)
Border radius: rounded-lg (8px)
```

### Tabla

```css
Padding: p-6 (24px)
Margin bottom: mb-6 (24px)
Shadow: shadow-lg
Border radius: rounded-lg (8px)
```

### Botones

```css
Grid: grid-cols-5
Gap: gap-4 (16px)
Padding: px-6 py-4 (24px h, 16px v)
Border radius: rounded-lg (8px)
Max width: max-w-6xl
```

### Iconos

```css
Header icon: size={40}
Button icons: size={32}
```

---

## 🎯 Grid System

### Desktop (>1024px)

```
Botones: 5 columnas
Tabla: 100% width
Max width: 6xl (72rem / 1152px)
```

### Tablet (640px - 1024px)

```
Botones: 3 columnas
Tabla: scroll horizontal si necesario
```

### Mobile (<640px)

```
Botones: 2 columnas
Tabla: scroll horizontal
Padding reducido: p-4
```

---

## 🖼️ Iconos por Botón

| Botón | Icono | Librería | Size |
|-------|-------|----------|------|
| INICIO | 🏠 Home | lucide-react | 32 |
| TEST DE IMPRESION | 🖨️ Printer | lucide-react | 32 |
| AJUSTES IMPRESORA | ⚙️ Settings | lucide-react | 32 |
| ULTIMAS VENTAS | 🧾 Receipt | lucide-react | 32 |
| ULTIMO TURNO | 🕐 Clock | lucide-react | 32 |
| Header | ⚙️ Settings | lucide-react | 40 |

---

## 🔗 Rutas y Navegación

### Nueva Ruta

```
Path: /utilities
Component: <UtilitiesView />
Parent: HMIRoute
Protected: Sí (requiere sesión HMI)
```

### Flujo de Navegación

```
┌──────────────┐
│ Menú Principal│
└──────┬───────┘
       │ Clic en tile "UTILIDADES"
       ▼
┌──────────────┐
│  Utilities   │◄─┐
│     View     │  │
└──────┬───────┘  │
       │          │
       │ [← Atrás] o [INICIO]
       │          │
       └──────────┘
```

---

## 📝 Archivos a Crear/Modificar

### Nuevos Archivos ✨

```
src/components/modules/utilities/
├── utilities-view.tsx      (Principal)
├── sales-table.tsx         (Tabla)
├── utilities-actions.tsx   (Botones)
├── types.ts               (Interfaces)
└── mock-data.ts           (Datos ejemplo)
```

### Archivos a Modificar ⚠️

```
src/router/
└── routes.tsx
    ↳ Agregar ruta "/utilities"

src/lib/hooks/
└── use-hmi-navigation.ts
    ↳ Agregar método goToUtilities()

src/components/modules/main-menu/
└── menu-data.tsx
    ↳ Conectar action del tile "UTILIDADES"
```

---

## ✅ Checklist Rápido

### Pre-Implementación
- [x] Documentación completa generada
- [x] Diseño analizado y comprendido
- [x] Estructura de archivos definida
- [x] Tipos TypeScript especificados
- [ ] Aprobación del usuario recibida

### Implementación Core
- [ ] types.ts creado
- [ ] mock-data.ts creado
- [ ] sales-table.tsx creado
- [ ] utilities-actions.tsx creado
- [ ] utilities-view.tsx creado

### Integración
- [ ] Ruta agregada a routes.tsx
- [ ] Método agregado a use-hmi-navigation.ts
- [ ] Acción vinculada en menu-data.tsx

### Testing
- [ ] Navegación funciona
- [ ] Tabla renderiza correctamente
- [ ] Solo 5 botones (sin REINICIAR)
- [ ] Colores según diseño
- [ ] Responsive funcionando

### Documentación Final
- [ ] Screenshots tomados
- [ ] IMPLEMENTATION.md actualizado
- [ ] README.md actualizado
- [ ] Changelog actualizado

---

## 🚨 Recordatorios Críticos

### ⛔ NO HACER

- ❌ NO crear botón "REINICIAR" (6to botón)
- ❌ NO usar `any` en TypeScript
- ❌ NO crear archivos barrel (index.ts)
- ❌ NO usar nombres en camelCase para archivos
- ❌ NO hardcodear valores que deban venir de API

### ✅ SÍ HACER

- ✅ Usar kebab-case para nombres de archivos
- ✅ Usar tipos TypeScript estrictos
- ✅ Seguir patrones existentes del proyecto
- ✅ Documentar código con JSDoc
- ✅ Hacer commits atómicos y descriptivos
- ✅ Probar en diferentes resoluciones

---

## 🎯 Objetivos de Cada Componente

### utilities-view.tsx
```
✓ Orquestar toda la vista
✓ Gestionar navegación
✓ Componer subcomponentes
✓ Manejar estado local si necesario
```

### sales-table.tsx
```
✓ Renderizar tabla responsive
✓ Formatear datos (moneda, volumen)
✓ Manejar casos sin datos
✓ Aplicar estilos profesionales
```

### utilities-actions.tsx
```
✓ Renderizar 5 botones de acción
✓ Destacar botón activo (ULTIMAS VENTAS)
✓ Manejar eventos de clic
✓ Mostrar iconos apropiados
```

### types.ts
```
✓ Definir interfaces claras
✓ Documentar con JSDoc
✓ Exportar tipos reutilizables
✓ Mantener tipos simples y específicos
```

### mock-data.ts
```
✓ Proveer 5+ registros de ejemplo
✓ Datos realistas del mercado colombiano
✓ Seguir estructura de tipos
✓ Facilitar testing manual
```

---

## 📊 Métricas de Éxito

### Técnicas
```
✓ TypeScript Coverage: 100%
✓ Errores en consola: 0
✓ Warnings TS: 0
✓ Bundle size: < +50KB
✓ Tiempo de carga: < 200ms
```

### Funcionales
```
✓ Navegación desde menú: ✅
✓ Tabla renderiza datos: ✅
✓ 5 botones presentes: ✅
✓ Botón REINICIAR ausente: ✅
✓ Navegación de retorno: ✅
✓ Colores correctos: ✅
```

### UX
```
✓ Responsive design: ✅
✓ Hover effects: ✅
✓ Transiciones suaves: ✅
✓ Iconos claros: ✅
✓ Accesibilidad: ✅
```

---

## 🔍 Referencias Rápidas

### Código Similar Existente

```typescript
// Patrón de vista similar
src/components/modules/loyalty/points-view.tsx

// Uso de navegación
src/lib/hooks/use-hmi-navigation.ts

// Configuración de rutas
src/router/routes.tsx

// Tiles de menú
src/components/modules/main-menu/menu-data.tsx
```

### Comandos Útiles

```bash
# Iniciar dev server
pnpm dev

# Build para producción
pnpm build

# Linting
pnpm lint

# Type checking
pnpm type-check
```

---

## 📞 Puntos de Decisión

Si durante la implementación surgen dudas sobre:

### Diseño/UI
→ Consultar imagen de referencia  
→ Revisar `RESUMEN_VISUAL.md` (este documento)

### Arquitectura
→ Consultar `ARQUITECTURA.md`  
→ Revisar componentes similares existentes

### Detalles Técnicos
→ Consultar `COMPONENTES_DETALLE.md`  
→ Revisar interfaces en types.ts

### Planificación
→ Consultar `PLAN_IMPLEMENTACION.md`  
→ Seguir checklist detallado

---

## 🎨 Mockup en ASCII

```
╔═══════════════════════════════════════════════════════════════════╗
║                    NEXUS POS - UTILIDADES                         ║
╠═══════════════════════════════════════════════════════════════════╣
║  [⚙️] UTILIDADES                                     [← Atrás]    ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                    ║
║  ╔═══════════════════════════════════════════════════════════╗   ║
║  ║                    ÚLTIMAS VENTAS                          ║   ║
║  ╠═════╦═════════╦═════════╦═══════╦═════════╦════════╦═══════╣   ║
║  ║ #FE ║ID PUNTOS║ID PROMO ║ PLACA ║PRODUCTO ║ DINERO ║VOLUMEN║   ║
║  ╠═════╬═════════╬═════════╬═══════╬═════════╬════════╬═══════╣   ║
║  ║ 001 ║PTS-001  ║PROMO-10 ║ABC-123║Gasolina ║$125,000║ 25.5 L║   ║
║  ║ 002 ║PTS-002  ║PROMO-15 ║DEF-456║Diesel   ║$180,000║ 40.0 L║   ║
║  ║ 003 ║PTS-003  ║PROMO-10 ║GHI-789║ACPM     ║ $95,000║ 18.2 L║   ║
║  ║ 004 ║PTS-004  ║PROMO-20 ║JKL-012║G. Extra ║$210,000║ 35.8 L║   ║
║  ║ 005 ║PTS-005  ║PROMO-10 ║MNO-345║Gasolina ║ $67,000║ 13.5 L║   ║
║  ╚═════╩═════════╩═════════╩═══════╩═════════╩════════╩═══════╝   ║
║                                                                    ║
║  ╔═════════╗ ╔═════════╗ ╔═════════╗ ╔═════════╗ ╔═════════╗   ║
║  ║ INICIO  ║ ║  TEST   ║ ║ AJUSTES ║ ║ ULTIMAS ║ ║ ULTIMO  ║   ║
║  ║         ║ ║ IMPRES. ║ ║ IMPRES. ║ ║ VENTAS  ║ ║  TURNO  ║   ║
║  ║   🏠    ║ ║   🖨️    ║ ║   ⚙️    ║ ║   🧾    ║ ║   🕐    ║   ║
║  ║  [RED]  ║ ║[ORANGE] ║ ║[PURPLE] ║ ║[YELLOW] ║ ║ [CYAN]  ║   ║
║  ╚═════════╝ ╚═════════╝ ╚═════════╝ ╚═════════╝ ╚═════════╝   ║
║                                                                    ║
╚═══════════════════════════════════════════════════════════════════╝
```

---

**📅 Última actualización:** 08/10/2025 22:32  
**✍️ Generado por:** Cascade AI  
**📋 Versión:** 1.0

---

*Este documento proporciona una referencia visual rápida durante la implementación. Consultarlo frecuentemente para verificar detalles de diseño.*
