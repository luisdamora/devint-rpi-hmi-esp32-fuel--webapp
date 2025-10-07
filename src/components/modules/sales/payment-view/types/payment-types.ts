/**
 * Payment View - Type Definitions
 *
 * Tipos completos para el módulo de gestión de pagos
 * Soporta dos modos: CONTADO (con múltiples métodos) y CRÉDITO (simplificado)
 */

/**
 * Modo de pago disponible
 */
export type PaymentMode = "CONTADO" | "CREDITO";

/**
 * Tipo de método de pago individual
 */
export type PaymentMethodType = "TARJETA" | "EFECTIVO" | "OTRO" | "CREDITO";

/**
 * Franquicias de tarjeta soportadas
 */
export type CardFranchise = "VISA" | "MASTERCARD" | "AMEX" | "DINERS";

/**
 * Datos de un método de pago individual
 * Representa cada forma de pago en modo CONTADO
 */
export interface PaymentMethodData {
	/** Identificador único del método (UUID) */
	id: string;

	/** Tipo de método de pago */
	type: PaymentMethodType;

	/** Monto asignado a este método */
	amount: number;

	/** Banco emisor (solo para TARJETA) */
	bank?: string;

	/** Franquicia de tarjeta (solo para TARJETA) */
	franchise?: CardFranchise;

	/** Si el método está habilitado para uso */
	enabled: boolean;
}

/**
 * Datos completos del formulario de pago
 * Contiene toda la información necesaria para ambos modos
 */
export interface PaymentFormData {
	/** Modo de pago seleccionado */
	mode: PaymentMode;

	// === Identificación ===
	/** Placa del vehículo (obligatorio en ambos modos) */
	placa: string;

	/** ID de factura electrónica (opcional en CONTADO, readonly en CRÉDITO) */
	idFacturaElectronica: string;

	/** ID de Puntos Colombia (opcional) */
	idPuntosColombia: string;

	// === Cupón (solo CONTADO) ===
	/** Si se aplica un cupón de descuento */
	hasCoupon: boolean;

	/** ID de la promoción (obligatorio si hasCoupon = true) */
	idPromocion: string;

	// === Métodos de pago (solo CONTADO) ===
	/** Array de métodos de pago configurados */
	paymentMethods: PaymentMethodData[];

	// === Totales ===
	/** Monto total de la transacción (viene del contexto) */
	totalAmount: number;
}

/**
 * Estado de validación del formulario
 * Contiene resultado de validaciones y errores específicos
 */
export interface ValidationState {
	/** Si el formulario es válido globalmente */
	isValid: boolean;

	/** Mapa de errores por campo */
	errors: Record<string, string>;
}

/**
 * Resultado del cálculo de distribución de montos
 * Información sobre cómo se distribuyen los pagos entre métodos
 */
export interface AmountDistribution {
	/** Monto total asignado entre métodos activos */
	assigned: number;

	/** Monto restante por asignar */
	remaining: number;

	/** Si se completó la asignación del total */
	isComplete: boolean;
}
