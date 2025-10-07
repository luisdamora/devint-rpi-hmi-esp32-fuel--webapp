# Estructura del Sistema HMI

## Overview

Este proyecto implementa una estructura modular para un sistema HMI (Human Machine Interface) de punto de venta para estaciones de servicio, basado en React + TypeScript + Tailwind CSS.

## Arquitectura del Sistema

### 📁 Estructura de Directorios

```
src/
├── lib/
│   ├── types/
│   │   └── modules.ts          # Definiciones de tipos TypeScript
│   ├── config/
│   │   ├── view-registry.ts    # Registro central de vistas
│   │   └── layout-config.ts    # Configuración de layouts
│   ├── navigation/
│   │   └── view-manager.tsx    # Manejador de vistas y navegación
│   └── index.ts               # Exportaciones principales
├── components/
│   ├── layouts/
│   │   └── hmi-layout.tsx     # Layout principal del sistema
│   └── modules/
│       ├── auth/
│       │   ├── splash-screen.tsx
│       │   ├── main-menu.tsx
│       │   ├── login-view.tsx
│       │   └── close-turn-view.tsx
│       ├── sales/
│       │   ├── keypad-view.tsx
│       │   └── payment-methods.tsx
│       └── loyalty/
│           └── points-view.tsx
└── App.tsx                    # Aplicación principal
```

## 🎯 Componentes Principales

### 1. View Registry (`view-registry.ts`)
- Registro centralizado de todas las vistas del sistema
- Define 7 vistas principales organizadas en 4 módulos:
  - **auth**: login, close-turn
  - **sales**: keypad, payment-methods
  - **loyalty**: points-view
  - **splash/menu**: splash-screen, main-menu

### 2. Layout Configuration (`layout-config.ts`)
- Configuración centralizada de temas y layouts
- Define módulos, navegación y configuraciones visuales
- Soporta temas light/dark y personalizaciones

### 3. View Manager (`view-manager.tsx`)
- Orquestador principal del sistema HMI
- Maneja navegación entre vistas
- Gestiona historial de navegación
- Provee estados de carga y manejo de errores

### 4. HMI Layout (`hmi-layout.tsx`)
- Layout principal con header, contenido y footer
- Configurable y responsive
- Soporta diferentes temas y personalizaciones

## 🔄 Flujo de Navegación

1. **Splash Screen** (3 segundos) → **Main Menu**
2. **Main Menu** (turno inactivo) → **Login**
3. **Main Menu** (turno activo) → **Sales, Payments, Loyalty, Reports**
4. **Login** → **Main Menu** (turno activo)
5. **Close Turn** → **Main Menu** (turno inactivo)

## 🎨 Características Implementadas

### ✅ Sistema de Navegación
- Navegación fluida entre vistas
- Historial de navegación
- Botón de regreso
- Transiciones con estados de carga

### ✅ Gestión de Estados
- Estados visuales por vista (ej: turn-active/inactive)
- Estados de carga y error
- Información contextual en header/footer

### ✅ Componentes Modulares
- Componentes reutilizables por módulo
- Props tipadas con TypeScript
- Estilos consistentes con Tailwind CSS

### ✅ Configuración Centralizada
- Temas personalizables
- Configuración de layouts
- Registro de vistas extensible

## 🚀 Uso Básico

### Navegación Programática
```typescript
import { useViewNavigation } from '@/lib/navigation';

const { navigateTo, navigateBack, currentView } = useViewNavigation();

// Navegar a una vista
navigateTo('payment-methods');

// Navegar hacia atrás
navigateBack();
```

### Registro de Nueva Vista
```typescript
// En view-registry.ts
{
  id: "new-view",
  name: "Nueva Vista",
  description: "Descripción de la vista",
  module: "sales",
  states: [{ id: "default", name: "Default", filename: "view.png" }],
  component: NewViewComponent,
}
```

### Personalización de Layout
```typescript
import { DEFAULT_LAYOUT_CONFIG } from '@/lib/config/layout-config';

const customConfig = {
  ...DEFAULT_LAYOUT_CONFIG,
  theme: "light",
  primaryColor: "#custom-color",
  showHeader: true,
};
```

## 🛠 Tecnologías Utilizadas

- **React 19.1.1** - Framework de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS 4.1.14** - Framework de estilos
- **Vite** - Herramienta de build
- **Lucide React** - Iconos

## 📦 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Previsualizar build
npm run lint         # Linting del código
npm run lint:fix     # Corregir automáticamente
```

## 🔧 Desarrollo

### Ambiente de Desarrollo
- Panel de debug en modo desarrollo
- Información de vista actual en tiempo real
- Historial de navegación visible

### Buenas Prácticas
- Componentes con TypeScript estricto
- Estilos consistentes con Tailwind
- Navegación a través del View Manager
- Configuración centralizada

## 📈 Próximos Pasos

1. **Integración con Backend** - Conectar vistas con APIs reales
2. **Manejo de Estados Globales** - Implementar Redux/Zustand
3. **Testing** - Unit tests para componentes y navegación
4. **Accesibilidad** - Mejorar soporte para lectores de pantalla
5. **Internacionalización** - Soporte para múltiples idiomas
6. **Offline Support** - PWA capabilities para funcionamiento sin internet