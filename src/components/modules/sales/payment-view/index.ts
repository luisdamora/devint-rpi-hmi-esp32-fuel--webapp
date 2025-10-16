export * from "./components";
export * from "./hooks";
export * from "./views";

// Nuevas vistas separadas por tipo de transacción
export { PaymentCashView } from "./payment-cash-view";
export { PaymentCreditView } from "./payment-credit-view";

// @deprecated - Usar PaymentCashView o PaymentCreditView en su lugar
export { PaymentViewMaster } from "./payment-view-master";
