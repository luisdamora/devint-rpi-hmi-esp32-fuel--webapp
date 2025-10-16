import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

/**
 * Tipos de transacción soportados
 */
export type TransactionType = "CONTADO" | "CREDITO";

/**
 * Modos de pago para transacciones en contado
 */
export type PaymentMode = "cash" | "card";

/**
 * Métodos de identificación de vehículos
 */
export type IdentificationMethod = "MANUAL" | "RFID" | "IBUTTON";

/**
 * Datos del vehículo identificado (para crédito)
 */
export interface VehicleData {
	placa: string;
	identificationType: IdentificationMethod;
	vehicleId: string;
	isIdentified: boolean;
	identifiedAt?: string;
}

/**
 * Datos de combustible
 */
export interface FuelData {
	gallons: number;
	pricePerGallon: number;
	fuelType?: "REGULAR" | "EXTRA" | "DIESEL";
}

/**
 * Estado completo de una transacción
 * Se transfiere entre vistas mediante React Router state
 */
export interface TransactionState {
	transactionId?: string;
	timestamp: string;
	transactionType: TransactionType;
	amount: number;
	fuel: FuelData;
	paymentMode?: PaymentMode;
	vehicleData?: VehicleData;
}

/**
 * Opciones para el hook
 */
export interface UseTransactionContextOptions {
	/** Si es true, redirige al menú si no hay estado válido */
	requireValidState?: boolean;
	/** Ruta de redirección si no hay estado válido */
	redirectPath?: string;
}

/**
 * Valor de retorno del hook
 */
export interface UseTransactionContextReturn {
	transactionType: TransactionType;
	amount: number;
	paymentMode?: PaymentMode;
	vehicleData?: VehicleData;
	fuel: FuelData;
	timestamp: string;
	hasValidState: boolean;
	currentState: {
		gallons: number;
		displayGallons: string;
		timestamp: Date;
	};
}

/**
 * Hook para acceder al contexto de transacción desde React Router state
 *
 * Este hook extrae los datos de la transacción que se pasan entre vistas
 * mediante el estado de React Router. Proporciona valores por defecto
 * seguros y puede redirigir automáticamente si no hay estado válido.
 *
 * @example
 * ```tsx
 * const {
 *   transactionType,
 *   amount,
 *   vehicleData,
 *   currentState
 * } = useTransactionContext({ requireValidState: true });
 * ```
 */
export const useTransactionContext = (
	options: UseTransactionContextOptions = {},
): UseTransactionContextReturn => {
	const location = useLocation();
	const navigate = useNavigate();
	const state = location.state as TransactionState | undefined;

	// Validar que hay estado y tiene los campos mínimos requeridos
	const hasValidState = Boolean(
		state?.transactionType && state?.amount > 0 && state?.timestamp,
	);

	// Redirigir si no hay estado válido y es requerido
	useEffect(() => {
		if (options.requireValidState && !hasValidState) {
			console.warn("⚠️ No hay datos de transacción válidos. Redirigiendo...");
			const redirectPath = options.redirectPath || "/menu";
			navigate(redirectPath, { replace: true });
		}
	}, [
		hasValidState,
		options.requireValidState,
		navigate,
		options.redirectPath,
	]);

	// Precio por galón por defecto (puede venir del backend)
	const DEFAULT_PRICE_PER_GALLON = 8040;

	// Extraer valores con defaults seguros
	const transactionType = state?.transactionType || "CONTADO";
	const amount = state?.amount || 0;
	const paymentMode = state?.paymentMode;
	const vehicleData = state?.vehicleData;
	const timestamp = state?.timestamp || new Date().toISOString();

	// Calcular datos de combustible
	const pricePerGallon =
		state?.fuel?.pricePerGallon || DEFAULT_PRICE_PER_GALLON;
	const gallons = state?.fuel?.gallons || amount / pricePerGallon;

	const fuel: FuelData = {
		gallons,
		pricePerGallon,
		fuelType: state?.fuel?.fuelType,
	};

	// Estado actual calculado (para mostrar en header)
	const currentState = {
		gallons,
		displayGallons: gallons.toFixed(2),
		timestamp: new Date(timestamp),
	};

	return {
		transactionType,
		amount,
		paymentMode,
		vehicleData,
		fuel,
		timestamp,
		hasValidState,
		currentState,
	};
};

/**
 * Helper para crear un estado de transacción válido
 */
export const createTransactionState = (
	params: Omit<TransactionState, "timestamp" | "fuel"> & {
		fuel?: Partial<FuelData>;
	},
): TransactionState => {
	const DEFAULT_PRICE_PER_GALLON = 8040;

	const pricePerGallon =
		params.fuel?.pricePerGallon || DEFAULT_PRICE_PER_GALLON;
	const gallons = params.fuel?.gallons || params.amount / pricePerGallon;

	return {
		...params,
		timestamp: new Date().toISOString(),
		fuel: {
			gallons,
			pricePerGallon,
			fuelType: params.fuel?.fuelType,
		},
	};
};
