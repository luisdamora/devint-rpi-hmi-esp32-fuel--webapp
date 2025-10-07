# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🚀 **Development Commands**

### **Essential Commands**
```bash
npm run dev          # Start development server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run Biome linter
npm run lint:fix     # Fix auto-correctable linter issues
```

### **Testing & Quality**
```bash
npm run test         # Run test suite (when implemented)
npm run test:watch   # Run tests in watch mode
npm run test:ui      # Run tests with UI interface
```

## 🏗️ **Project Architecture**

### **Core System: Nexus POS HMI**
This is a React + TypeScript + Tailwind CSS application implementing a **Point of Sale (POS) Human Machine Interface (HMI)** for fuel stations with exact **800x480px dimensions**.

### **Technology Stack**
- **React 19.1.1** with **TypeScript**
- **React Router v7** for navigation
- **Tailwind CSS 4.1.14** for styling
- **Vite** for build tooling
- **Biome** for linting and formatting

### **Architecture Overview**

```
┌─────────────────────────────────────────────────────────┐
│                    React Router v7                        │
├─────────────────────────────────────────────────────────┤
│                    Main App.tsx                           │
│  ┌─────────────────┬─────────────────┬─────────────────┐  │
│  │    Public       │      HMI         │     Admin       │  │
│  │    Routes       │      Routes       │     Routes       │  │
│  │  (login, 404)    │   (800x480px)     │   (dashboard)    │  │
│  └─────────────────┴─────────────────┴─────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### **Key Architectural Components**

#### **1. HMI System (800x480px fixed)**
- **`HMIRoute`** - Wrapper for all HMI routes with fixed dimensions
- **`HMILayout`** - Header/footer layout with Nexus POS theming
- **`HMIFrame`** - Centers 800x480px content in viewport
- **`useHMINavigation`** - Custom hook for HMI navigation

#### **2. Component Structure**
```
src/components/
├── routes/           # Route wrappers (HMIRoute, AdminRoute, PublicRoute)
├── layouts/          # Layout components (hmi-layout, hmi-frame)
└── modules/          # HMI view components by module
    ├── auth/        # Splash, login, main-menu, close-turn
    ├── sales/       # Keypad, payment-methods
    └── loyalty/     # Points view
```

#### **3. Configuration System**
- **`NEXUS_COLORS`** - Complete color scheme from original POS design
- **`LAYOUT_DIMENSIONS`** - Fixed 800x480px HMI dimensions
- **`view-registry.ts`** - Central registry of all HMI views

#### **4. Navigation Pattern**
```typescript
// HMI Navigation (within 800x480px frame)
const { navigateTo, navigateBack, goToMenu } = useHMINavigation();

// Web Navigation (React Router)
<Link to="/hmi/keypad">Go to Keypad</Link>
```

### **HMI Views Flow**
1. **Splash Screen** → Auto-redirects after 3 seconds
2. **Main Menu** → Navigation hub with turn state management
3. **Module Views** → Sales, Loyalty, Authentication
4. **Turn Management** → Login/Close turn flows

### **Color Scheme & Theming**
The application uses the original Nexus POS color palette:
- **Background**: `#3B4B5C` (dark blue-gray)
- **Primary**: `#2196F3` (blue)
- **States**: Green (#22C55E), Red (#EF4444), Orange (#F97316)
- **Neutral**: Complete gray scale for text/elements

### **Route Structure**
```
/                    → Redirect to /splash
/splash             → Splash screen (brand + contact info)
/menu               → Main menu with 6 tile buttons
/login              → Turn initiation form
/keypad             → Numeric keypad (money/volume modes)
/payment            → Payment methods selection
/loyalty            → Points Colombia lookup
/close-turn         → Turn close summary
*                   → 404 page with brand styling
```

### **Development Workflow**

#### **Adding New HMI Views**
1. Create component in `src/components/modules/[module]/`
2. Add to `view-registry.ts` with proper configuration
3. Add route in `src/router/routes.tsx`
4. Add navigation function to `useHMINavigation` hook
5. Update main menu if needed

#### **Styling Guidelines**
- Use **NEXUS_COLORS** constants, avoid hardcoded colors
- Follow **800x480px** HMI constraints
- Use **Tailwind classes** for responsive elements
- Apply **component-first** styling approach

#### **Navigation Implementation**
```typescript
// ✅ Preferred: Use navigation hook
const { navigateTo, navigateBack } = useHMINavigation();

// ✅ Acceptable: Use React Router for web navigation
<Link to="/hmi/keypad">Navigate</Link>

// ❌ Avoid: Hardcoded navigation
window.location.href = '/hmi';
```

### **Key Files to Understand**
- **`src/router/routes.tsx`** - Complete route definitions
- **`src/lib/hooks/use-hmi-navigation.ts`** - Navigation logic
- **`src/components/routes/HMIRoute.tsx`** - HMI layout wrapper
- **`src/lib/config/theme.ts`** - Nexus POS color scheme
- **`docs/flujo/README.md`** - Original design specifications

### **Build & Deployment**
```bash
npm run build    # Creates optimized production build
npm run preview  # Test production build locally
```

The build outputs to `dist/` with proper asset optimization and routing.

## 🔧 **Important Notes**

- **Fixed Dimensions**: All HMI content must respect 800x480px constraints
- **Brand Consistency**: Maintain Nexus POS visual identity throughout
- **Navigation Separation**: Web navigation (React Router) vs HMI navigation (internal)
- **State Management**: Current HMI views manage their own state locally
- **Asset Management**: Logo and brand assets in `src/assets/images/`