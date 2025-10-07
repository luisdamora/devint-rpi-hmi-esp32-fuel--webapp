import { useMemo } from "react";
import type { AmountDistribution, PaymentMethodData } from "../types";

/**
 * Hook para calcular distribución de montos entre métodos de pago
 *
 * Estrategia:
 * 1. Suma montos de todos los métodos activos (enabled=true)
 * 2. Calcula restante = totalAmount - assigned
 * 3. Determina si la distribución está completa (remaining === 0)
 *
 * El cálculo se memoiza para optimizar performance
 *
 * @param methods - Array de métodos de pago
 * @param totalAmount - Monto total a distribuir
 * @returns Objeto con información de distribución
 */
export function useAmountDistribution(
	methods: PaymentMethodData[],
	totalAmount: number,
): AmountDistribution {
	return useMemo(() => {
		// Filtrar solo métodos activos
		const activeMethods = methods.filter((method) => method.enabled);

		// Calcular suma de montos asignados
		const assigned = activeMethods.reduce(
			(sum, method) => sum + method.amount,
			0,
		);

		// Calcular monto restante
		const remaining = totalAmount - assigned;

		// La distribución está completa cuando remaining === 0
		const isComplete = remaining === 0;

		return {
			assigned,
			remaining,
			isComplete,
		};
	}, [methods, totalAmount]);
}

/**
 * Formatea un monto para visualización en pesos colombianos
 *
 * @param amount - Monto a formatear
 * @returns String formateado (ej: "50.000")
 */
export function formatAmount(amount: number): string {
	return amount.toLocaleString("es-CO");
}

/**
 * Calcula la distribución proporcional sugerida entre métodos activos
 * Útil para auto-completar montos cuando el usuario activa múltiples métodos
 *
 * @param methods - Array de métodos de pago
 * @param totalAmount - Monto total a distribuir
 * @returns Map con distribución sugerida por método ID
 */
export function calculateProportionalDistribution(
	methods: PaymentMethodData[],
	totalAmount: number,
): Map<string, number> {
	const distribution = new Map<string, number>();
	const activeMethods = methods.filter((m) => m.enabled);

	if (activeMethods.length === 0) {
		return distribution;
	}

	// Caso 1: Un solo método activo - asignar todo el total
	if (activeMethods.length === 1) {
		distribution.set(activeMethods[0].id, totalAmount);
		return distribution;
	}

	// Caso 2: Múltiples métodos - distribución equitativa
	const amountPerMethod = Math.floor(totalAmount / activeMethods.length);
	let assignedTotal = 0;

	// Asignar monto base a cada método
	activeMethods.forEach((method) => {
		distribution.set(method.id, amountPerMethod);
		assignedTotal += amountPerMethod;
	});

	// Ajustar diferencia de redondeo al primer método
	const difference = totalAmount - assignedTotal;
	if (difference !== 0 && activeMethods.length > 0) {
		const firstMethodId = activeMethods[0].id;
		const currentAmount = distribution.get(firstMethodId) || 0;
		distribution.set(firstMethodId, currentAmount + difference);
	}

	return distribution;
}

/**
 * Valida si un monto es válido para ser ingresado
 *
 * @param amount - Monto a validar
 * @param totalAmount - Total de la transacción
 * @returns true si el monto es válido
 */
export function isValidAmount(amount: number, totalAmount: number): boolean {
	// El monto debe ser mayor a 0
	if (amount <= 0) {
		return false;
	}

	// El monto no debe exceder el total
	if (amount > totalAmount) {
		return false;
	}

	return true;
}

/**
 * Calcula el monto máximo permitido para un método específico
 * considerando lo que ya está asignado en otros métodos
 *
 * @param currentMethodId - ID del método actual
 * @param methods - Array de métodos de pago
 * @param totalAmount - Total de la transacción
 * @returns Monto máximo permitido
 */
export function calculateMaxAmount(
	currentMethodId: string,
	methods: PaymentMethodData[],
	totalAmount: number,
): number {
	// Sumar montos de otros métodos activos (excepto el actual)
	const otherMethodsTotal = methods
		.filter((m) => m.enabled && m.id !== currentMethodId)
		.reduce((sum, method) => sum + method.amount, 0);

	// El máximo es lo que queda por asignar
	return Math.max(0, totalAmount - otherMethodsTotal);
}
