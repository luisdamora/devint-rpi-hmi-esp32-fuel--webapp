# Auth Module - Structure Documentation

This document describes the modular structure of the authentication module components.

## Directory Structure

```
auth/
├── login-view/
│   ├── index.tsx                    # Main LoginView component
│   ├── components/
│   │   ├── index.ts                 # Components barrel export
│   │   └── login-form.tsx           # Login form with inputs and submit button
│   └── hooks/
│       ├── index.ts                 # Hooks barrel export
│       └── use-login-form.ts        # Custom hook for form state and logic
│
├── close-turn-view/
│   ├── index.tsx                    # Main CloseTurnView component
│   ├── components/
│   │   ├── index.ts                 # Components barrel export
│   │   └── close-turn-button.tsx   # Close turn action button
│   └── hooks/
│       ├── index.ts                 # Hooks barrel export
│       └── use-close-turn.ts        # Custom hook for close turn logic
│
└── shared/
    └── components/
        ├── index.ts                 # Shared components barrel export
        ├── side-tile.tsx            # Reusable side navigation tile
        ├── operator-header.tsx      # Operator information header
        └── side-navigation.tsx      # Side navigation with tiles
```

## Component Responsibilities

### Login View Module

#### `LoginViewComponent` (index.tsx)
- **Purpose**: Main container for the login view
- **Responsibilities**: 
  - Layout composition
  - State management delegation to hook
  - Component orchestration

#### `LoginForm` (components/login-form.tsx)
- **Purpose**: Login form UI
- **Props**:
  - `operatorId`: string
  - `password`: string
  - `onOperatorIdChange`: (value: string) => void
  - `onPasswordChange`: (value: string) => void
  - `onSubmit`: (e: React.FormEvent) => void
- **Responsibilities**: 
  - Render form inputs
  - Handle user input
  - Submit form

#### `useLoginForm` (hooks/use-login-form.ts)
- **Purpose**: Login form state and business logic
- **Returns**:
  - `operatorId`: string
  - `password`: string
  - `setOperatorId`: (value: string) => void
  - `setPassword`: (value: string) => void
  - `handleSubmit`: (e: React.FormEvent) => void
- **Responsibilities**:
  - Manage form state
  - Handle form submission
  - Navigate on success (TODO: add authentication)

### Close Turn View Module

#### `CloseTurnViewComponent` (index.tsx)
- **Purpose**: Main container for the close turn view
- **Responsibilities**: 
  - Layout composition
  - Action delegation to hook
  - Component orchestration

#### `CloseTurnButton` (components/close-turn-button.tsx)
- **Purpose**: Close turn action button
- **Props**:
  - `onClick`: () => void
- **Responsibilities**: 
  - Render action button
  - Trigger onClick handler

#### `useCloseTurn` (hooks/use-close-turn.ts)
- **Purpose**: Close turn business logic
- **Returns**:
  - `handleCloseTurn`: () => void
- **Responsibilities**:
  - Handle close turn action (TODO: add close turn logic)
  - Navigate on completion

### Shared Components

#### `SideTile` (shared/components/side-tile.tsx)
- **Purpose**: Reusable navigation tile
- **Props**:
  - `title`: string
  - `icon`: React.ReactNode
  - `onClick`: () => void (optional)
  - `ariaLabel`: string (optional)
- **Responsibilities**: 
  - Render consistent tile UI
  - Handle click events

#### `OperatorHeader` (shared/components/operator-header.tsx)
- **Purpose**: Display operator information
- **Props**:
  - `operatorName`: string (optional, defaults to "SEBASTIAN RESTREPO BUSTAMANTE")
- **Responsibilities**: 
  - Display operator role and name

#### `SideNavigation` (shared/components/side-navigation.tsx)
- **Purpose**: Side navigation menu
- **Responsibilities**: 
  - Render navigation tiles (TURNOS, INICIO)
  - Handle navigation between views

## Import Patterns

Thanks to barrel exports (index.ts files), imports are clean and organized:

```typescript
// Main view components
import { LoginViewComponent } from "@/components/modules/auth/login-view";
import { CloseTurnViewComponent } from "@/components/modules/auth/close-turn-view";

// Within a module
import { LoginForm } from "./components";
import { useLoginForm } from "./hooks";

// Shared components
import { SideNavigation, OperatorHeader, SideTile } from "../shared/components";
```

## Benefits of This Structure

1. **Separation of Concerns**: Each component has a single, clear responsibility
2. **Reusability**: Shared components avoid duplication
3. **Testability**: Hooks and components can be tested independently
4. **Maintainability**: Changes are localized to specific files
5. **Scalability**: Easy to add new features without modifying existing code
6. **Clean Imports**: Barrel exports make imports more readable

## Future Enhancements

- [ ] Add authentication logic to `useLoginForm`
- [ ] Implement actual close turn logic in `useCloseTurn`
- [ ] Add form validation
- [ ] Add error handling and user feedback
- [ ] Add unit tests for hooks
- [ ] Add component tests
