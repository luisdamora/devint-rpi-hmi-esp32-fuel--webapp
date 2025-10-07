import { useMemo } from "react";
import type { PaymentFormData, PaymentMode, ValidationState } from "../types";

/**
 * Hook para validación condicional del formulario según modo activo
 *
 * Reglas de validación:
 * - MODO CONTADO: Valida placa, cupón condicional, métodos de pago y distribución
 * - MODO CRÉDITO: Solo valida placa
 *
 * @param formData - Datos del formulario a validar
 * @param mode - Modo de pago activo
 * @returns Estado de validación con errores específicos
 */
export function usePaymentValidation(
	formData: PaymentFormData,
	mode: PaymentMode,
): ValidationState {
	return useMemo(() => {
		const errors: Record<string, string> = {};

		// === Validación de PLACA (ambos modos) ===
		const placaError = validatePlaca(formData.placa);
		if (placaError) {
			errors.placa = placaError;
		}

		// === Validaciones específicas de modo CONTADO ===
		if (mode === "CONTADO") {
			// Validar ID PROMOCION si cupón está activo
			if (formData.hasCoupon) {
				const promoError = validatePromocion(formData.idPromocion);
				if (promoError) {
					errors.idPromocion = promoError;
				}
			}

			// Validar métodos de pago
			const methodsError = validatePaymentMethods(formData);
			if (methodsError) {
				errors.paymentMethods = methodsError;
			}

			// Validar distribución de montos
			const distributionError = validateAmountDistribution(formData);
			if (distributionError) {
				errors.distribution = distributionError;
			}
		}

		// El formulario es válido si no hay errores
		return {
			isValid: Object.keys(errors).length === 0,
			errors,
		};
	}, [formData, mode]);
}

/**
 * Valida el formato de placa colombiana
 * Formato esperado: 3 letras + 3 números (ej: ABC123)
 */
function validatePlaca(placa: string): string | null {
	if (!placa || placa.trim().length === 0) {
		return "La placa es obligatoria";
	}

	// Remover espacios
	const cleanPlaca = placa.trim();

	// Validar longitud
	if (cleanPlaca.length !== 6) {
		return "La placa debe tener 6 caracteres";
	}

	// Validar formato: 3 letras + 3 números
	const placaRegex = /^[A-Z]{3}[0-9]{3}$/i;
	if (!placaRegex.test(cleanPlaca)) {
		return "Formato inválido. Debe ser 3 letras + 3 números (ej: ABC123)";
	}

	return null;
}

/**
 * Valida el ID de promoción cuando el cupón está activo
 */
function validatePromocion(idPromocion: string): string | null {
	if (!idPromocion || idPromocion.trim().length === 0) {
		return "El ID de promoción es obligatorio cuando se activa el cupón";
	}

	// Validar que sea numérico
	const numericRegex = /^[0-9]+$/;
	if (!numericRegex.test(idPromocion.trim())) {
		return "El ID de promoción debe ser numérico";
	}

	// Validar longitud mínima
	if (idPromocion.trim().length < 8) {
		return "El ID de promoción debe tener al menos 8 dígitos";
	}

	return null;
}

/**
 * Valida que exista al menos un método de pago activo
 * y que los campos obligatorios estén completos para métodos TARJETA
 */
function validatePaymentMethods(formData: PaymentFormData): string | null {
	const activeMethods = formData.paymentMethods.filter((m) => m.enabled);

	// Debe haber al menos un método activo
	if (activeMethods.length === 0) {
		return "Debe activar al menos un método de pago";
	}

	// Validar que todos los métodos activos tengan tipo seleccionado
	for (const method of activeMethods) {
		if (!method.type || method.type === "CREDITO") {
			return "Todos los métodos activos deben tener un tipo seleccionado";
		}

		// Si es TARJETA, validar banco y franquicia
		if (method.type === "TARJETA") {
			if (!method.bank) {
				return "El método TARJETA requiere seleccionar un banco";
			}
			if (!method.franchise) {
				return "El método TARJETA requiere seleccionar una franquicia";
			}
		}

		// Validar que el monto sea mayor a 0
		if (method.amount <= 0) {
			return "Todos los métodos activos deben tener un monto mayor a 0";
		}
	}

	return null;
}

/**
 * Valida que la suma de montos sea igual al total
 */
function validateAmountDistribution(formData: PaymentFormData): string | null {
	const activeMethods = formData.paymentMethods.filter((m) => m.enabled);

	// Calcular suma total asignada
	const totalAssigned = activeMethods.reduce(
		(sum, method) => sum + method.amount,
		0,
	);

	// Validar que la suma sea exactamente igual al total
	if (totalAssigned !== formData.totalAmount) {
		const remaining = formData.totalAmount - totalAssigned;
		if (remaining > 0) {
			return `Falta asignar $${remaining.toLocaleString("es-CO")} para completar el total`;
		} else {
			return `El total asignado excede por $${Math.abs(remaining).toLocaleString("es-CO")}`;
		}
	}

	return null;
}

/**
 * Valida un campo individual del formulario
 * Útil para validación en tiempo real mientras el usuario escribe
 *
 * @param field - Nombre del campo a validar
 * @param value - Valor actual del campo
 * @param formData - Datos completos del formulario (para validaciones contextuales)
 * @returns Mensaje de error o null si es válido
 */
export function validateField(
	field: string,
	value: unknown,
	formData: PaymentFormData,
): string | null {
	switch (field) {
		case "placa":
			return validatePlaca(value as string);

		case "idPromocion":
			return formData.hasCoupon ? validatePromocion(value as string) : null;

		case "paymentMethods":
			return validatePaymentMethods(formData);

		case "distribution":
			return validateAmountDistribution(formData);

		default:
			return null;
	}
}
