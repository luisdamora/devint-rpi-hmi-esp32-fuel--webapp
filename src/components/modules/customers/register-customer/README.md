# Customer Registration Module

## Overview
This module implements the customer registration view for the Nexus POS HMI system, based on the design specification in `7- Nexus POS registrar clientes.png`.

## Structure

```
register-customer/
├── components/
│   └── customer-form.tsx       # Main form component with all input fields
├── hooks/
│   └── use-customer-form.ts    # Custom hook for form state management
└── register-customer-view.tsx  # Main view component
```

## Components

### `RegisterCustomerViewComponent`
- **Path**: `register-customer-view.tsx`
- **Route**: `/register-customer`
- **Description**: Main container view that follows the same layout pattern as `cash-sale-view`
- **Features**:
  - Side tiles for navigation (REGISTRAR CLIENTES - green, INICIO - red)
  - Central form area with responsive layout
  - Uses HMIContainer for consistent layout

### `CustomerForm`
- **Path**: `components/customer-form.tsx`
- **Description**: Form component with all customer registration fields
- **Fields**:
  - **Tipo de Documento**: Dropdown with document types (CC, NIT, CE, TI, PAS)
  - **Número de Identificación**: Text input for ID number
  - **DV**: Single digit verification number
  - **Nombre / Razón Social**: Text input for name or company name
  - **Email para envío de Factura Electrónica**: Email input
- **Submit Button**: Green "REGISTRAR" button using theme's success style

### `useCustomerForm`
- **Path**: `hooks/use-customer-form.ts`
- **Description**: Custom hook for managing form state
- **Exports**:
  - `formData`: Current form state
  - Handler functions for each field
  - `handleSubmit`: Form submission handler (currently logs to console)
  - `resetForm`: Reset form to initial state

## Usage

Navigate to `/register-customer` or use the navigation helper:

```tsx
const { navigateTo } = useHMINavigation();
navigateTo("register-customer");
```

## Styling

- Uses theme colors from `@/lib/config/theme`
- Consistent with existing HMI design patterns
- Green accent color for the main CTA button
- Form inputs use white background with dark text for readability
- All labels are uppercase with tracking for consistency

## Future Enhancements

- [ ] Add form validation
- [ ] Integrate with backend API for customer registration
- [ ] Add success/error feedback notifications
- [ ] Implement DV calculation for NIT documents
- [ ] Add customer search functionality
