/**
 * Payment View Components - Barrel Exports
 *
 * Exporta todos los componentes UI del módulo payment-view
 * para facilitar las importaciones en otros archivos.
 *
 * @example
 * ```tsx
 * import {
 *   PaymentModeSelector,
 *   IdentificationFields,
 *   PaymentMethodsGrid,
 *   SaveButton
 * } from '@/components/modules/sales/payment-view/components';
 * ```
 */

export type { IdentificationFieldsProps } from "./identification-fields";
export { IdentificationFields } from "./identification-fields";
export type { PaymentMethodCardProps } from "./payment-method-card";
export { PaymentMethodCard } from "./payment-method-card";
export type { PaymentMethodsGridProps } from "./payment-methods-grid";
export { PaymentMethodsGrid } from "./payment-methods-grid";
export type { PaymentModeSelectorProps } from "./payment-mode-selector";
export { PaymentModeSelector } from "./payment-mode-selector";
export type { SaveButtonProps } from "./save-button";
export { SaveButton } from "./save-button";
export type { TransactionSummaryHeaderProps } from "./transaction-summary-header";
export { TransactionSummaryHeader } from "./transaction-summary-header";
export type { ViewNavigationProps } from "./view-navigation";
export { ViewNavigation } from "./view-navigation";
