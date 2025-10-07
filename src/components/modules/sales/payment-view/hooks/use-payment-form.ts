import { useCallback, useEffect, useState } from "react";
import type {
	AmountDistribution,
	PaymentFormData,
	PaymentMethodData,
	PaymentMode,
	ValidationState,
} from "../types";
import { useAmountDistribution } from "./use-amount-distribution";
import { usePaymentMethods } from "./use-payment-methods";
import { usePaymentValidation } from "./use-payment-validation";

/**
 * Valor de retorno del hook principal usePaymentForm
 */
export interface UsePaymentFormReturn {
	// Estado
	formData: PaymentFormData;
	validation: ValidationState;
	distribution: AmountDistribution;

	// Setters básicos
	setMode: (mode: PaymentMode) => void;
	setPlaca: (placa: string) => void;
	setIdFacturaElectronica: (id: string) => void;
	setIdPuntosColombia: (id: string) => void;
	setHasCoupon: (has: boolean) => void;
	setIdPromocion: (id: string) => void;

	// Gestión de métodos de pago
	paymentMethods: PaymentMethodData[];
	updatePaymentMethod: (
		id: string,
		updates: Partial<PaymentMethodData>,
	) => void;
	addMethod: () => void;
	removeMethod: (id: string) => void;

	// Acciones
	handleSubmit: () => void;
	resetForm: () => void;
}

/**
 * Hook principal para gestión del formulario de pago
 *
 * Orquesta todos los sub-hooks y proporciona la interfaz completa
 * para gestionar el estado del formulario de pago.
 *
 * Responsabilidades:
 * - Gestiona el estado completo del formulario
 * - Coordina cambios entre modos CONTADO/CRÉDITO
 * - Integra validación, métodos de pago y distribución de montos
 * - Proporciona callbacks para actualización de campos
 *
 * @param initialTotal - Total de la venta desde el contexto previo
 * @returns Objeto con estado completo y funciones de control
 */
export function usePaymentForm(initialTotal: number): UsePaymentFormReturn {
	// === Estado del formulario ===
	const [formData, setFormData] = useState<PaymentFormData>({
		mode: "CONTADO",
		placa: "",
		idFacturaElectronica: "",
		idPuntosColombia: "",
		hasCoupon: false,
		idPromocion: "",
		paymentMethods: [],
		totalAmount: initialTotal,
	});

	// === Hooks especializados ===
	const {
		methods,
		updateMethod,
		addMethod,
		removeMethod,
		initializeForContado,
		clearMethods,
	} = usePaymentMethods();

	// Validación del formulario según modo activo
	const validation = usePaymentValidation(formData, formData.mode);

	// Distribución de montos entre métodos
	const distribution = useAmountDistribution(methods, formData.totalAmount);

	// === Sincronizar métodos con formData ===
	useEffect(() => {
		setFormData((prev) => ({
			...prev,
			paymentMethods: methods,
		}));
	}, [methods]);

	// === Inicialización ===
	useEffect(() => {
		// Inicializar métodos de pago para modo CONTADO al montar
		initializeForContado(initialTotal);
	}, [initialTotal, initializeForContado]);

	/**
	 * Cambia el modo de pago y resetea campos según corresponda
	 */
	const setMode = useCallback(
		(mode: PaymentMode) => {
			setFormData((prev) => {
				const newData = { ...prev, mode };

				if (mode === "CREDITO") {
					// Al cambiar a CRÉDITO: limpiar métodos de pago y cupón
					clearMethods();
					return {
						...newData,
						hasCoupon: false,
						idPromocion: "",
						paymentMethods: [],
					};
				} else {
					// Al cambiar a CONTADO: inicializar métodos de pago
					initializeForContado(prev.totalAmount);
					return newData;
				}
			});
		},
		[clearMethods, initializeForContado],
	);

	/**
	 * Actualiza el campo placa (obligatorio en ambos modos)
	 */
	const setPlaca = useCallback((placa: string) => {
		setFormData((prev) => ({ ...prev, placa: placa.toUpperCase() }));
	}, []);

	/**
	 * Actualiza el ID de factura electrónica
	 */
	const setIdFacturaElectronica = useCallback((id: string) => {
		setFormData((prev) => ({ ...prev, idFacturaElectronica: id }));
	}, []);

	/**
	 * Actualiza el ID de Puntos Colombia
	 */
	const setIdPuntosColombia = useCallback((id: string) => {
		setFormData((prev) => ({ ...prev, idPuntosColombia: id }));
	}, []);

	/**
	 * Alterna el estado del cupón
	 * Si se desactiva, limpia el ID de promoción
	 */
	const setHasCoupon = useCallback((has: boolean) => {
		setFormData((prev) => ({
			...prev,
			hasCoupon: has,
			idPromocion: has ? prev.idPromocion : "",
		}));
	}, []);

	/**
	 * Actualiza el ID de promoción (solo activo si hasCoupon = true)
	 */
	const setIdPromocion = useCallback((id: string) => {
		setFormData((prev) => ({ ...prev, idPromocion: id }));
	}, []);

	/**
	 * Actualiza propiedades de un método de pago específico
	 */
	const updatePaymentMethod = useCallback(
		(id: string, updates: Partial<PaymentMethodData>) => {
			updateMethod(id, updates);
		},
		[updateMethod],
	);

	/**
	 * Maneja el submit del formulario
	 * Valida y procesa el pago según el modo activo
	 */
	const handleSubmit = useCallback(() => {
		// Verificar validación
		if (!validation.isValid) {
			console.warn("Formulario inválido. Errores:", validation.errors);
			// En implementación real, aquí se mostraría feedback al usuario
			return;
		}

		// En modo CONTADO, verificar distribución completa
		if (formData.mode === "CONTADO" && !distribution.isComplete) {
			console.warn("Distribución de montos incompleta");
			return;
		}

		// TODO: Aquí iría la lógica de guardado (API call, navegación, etc.)
		console.log("Formulario válido. Datos a guardar:", formData);
	}, [validation, formData, distribution]);

	/**
	 * Resetea el formulario a su estado inicial
	 */
	const resetForm = useCallback(() => {
		setFormData({
			mode: "CONTADO",
			placa: "",
			idFacturaElectronica: "",
			idPuntosColombia: "",
			hasCoupon: false,
			idPromocion: "",
			paymentMethods: [],
			totalAmount: initialTotal,
		});
		initializeForContado(initialTotal);
	}, [initialTotal, initializeForContado]);

	return {
		// Estado
		formData,
		validation,
		distribution,

		// Setters
		setMode,
		setPlaca,
		setIdFacturaElectronica,
		setIdPuntosColombia,
		setHasCoupon,
		setIdPromocion,

		// Métodos de pago
		paymentMethods: methods,
		updatePaymentMethod,
		addMethod,
		removeMethod,

		// Acciones
		handleSubmit,
		resetForm,
	};
}
