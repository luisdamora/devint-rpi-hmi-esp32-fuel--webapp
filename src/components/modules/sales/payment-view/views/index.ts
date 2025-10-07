/**
 * Payment View Views - Barrel Exports
 *
 * Exporta todas las vistas del módulo payment-view
 * para facilitar las importaciones en otros archivos.
 *
 * @example
 * ```tsx
 * import {
 *   PaymentInfoView,
 *   PaymentMethodsView
 * } from '@/components/modules/sales/payment-view/views';
 * ```
 */

export { PaymentInfoView } from "./payment-info-view";
export { PaymentMethodsView } from "./payment-methods-view";

// Exportar tipos para facilitar el uso en otros componentes
export type { PaymentInfoViewProps } from "./payment-info-view";
export type { PaymentMethodsViewProps } from "./payment-methods-view";
