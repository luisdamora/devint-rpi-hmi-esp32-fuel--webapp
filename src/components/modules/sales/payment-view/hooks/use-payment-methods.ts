import { useCallback, useState } from "react";
import type { PaymentMethodData } from "../types";

/**
 * Valor de retorno del hook usePaymentMethods
 */
export interface UsePaymentMethodsReturn {
	/** Array actual de métodos de pago */
	methods: PaymentMethodData[];

	/** Agregar un nuevo método de pago */
	addMethod: () => void;

	/** Remover un método por ID */
	removeMethod: (id: string) => void;

	/** Actualizar campos específicos de un método */
	updateMethod: (id: string, updates: Partial<PaymentMethodData>) => void;

	/** Inicializar métodos para modo CONTADO */
	initializeForContado: (totalAmount: number) => void;

	/** Limpiar todos los métodos */
	clearMethods: () => void;
}

/**
 * Hook para gestionar múltiples métodos de pago
 *
 * Funcionalidad:
 * - Gestiona un array de hasta 3 métodos de pago simultáneos
 * - Genera IDs únicos automáticamente
 * - Inicializa con primer método activo = total, otros deshabilitados
 * - Permite actualización granular de propiedades
 *
 * @returns Objeto con métodos y funciones para gestionar los pagos
 */
export function usePaymentMethods(): UsePaymentMethodsReturn {
	const [methods, setMethods] = useState<PaymentMethodData[]>([]);

	/**
	 * Inicializa 3 métodos de pago para modo CONTADO
	 * - Primer método (TARJETA): enabled=true, amount=totalAmount
	 * - Otros métodos: enabled=false, amount=0
	 */
	const initializeForContado = useCallback((totalAmount: number) => {
		const initialMethods: PaymentMethodData[] = [
			{
				id: crypto.randomUUID(),
				type: "TARJETA",
				amount: totalAmount,
				enabled: true,
			},
			{
				id: crypto.randomUUID(),
				type: "EFECTIVO",
				amount: 0,
				enabled: false,
			},
			{
				id: crypto.randomUUID(),
				type: "OTRO",
				amount: 0,
				enabled: false,
			},
		];

		setMethods(initialMethods);
	}, []);

	/**
	 * Agrega un nuevo método de pago
	 * Solo permite hasta 3 métodos simultáneos
	 * El nuevo método inicia deshabilitado con amount=0
	 */
	const addMethod = useCallback(() => {
		setMethods((prevMethods) => {
			// Limitar a máximo 3 métodos
			if (prevMethods.length >= 3) {
				console.warn("Máximo 3 métodos de pago permitidos");
				return prevMethods;
			}

			const newMethod: PaymentMethodData = {
				id: crypto.randomUUID(),
				type: "EFECTIVO", // Tipo por defecto
				amount: 0,
				enabled: false,
			};

			return [...prevMethods, newMethod];
		});
	}, []);

	/**
	 * Remueve un método de pago por ID
	 * No permite remover si es el único método activo
	 */
	const removeMethod = useCallback((id: string) => {
		setMethods((prevMethods) => {
			const activeMethods = prevMethods.filter((m) => m.enabled);

			// No permitir remover si solo hay un método activo
			if (activeMethods.length === 1 && activeMethods[0].id === id) {
				console.warn("No se puede remover el único método de pago activo");
				return prevMethods;
			}

			return prevMethods.filter((method) => method.id !== id);
		});
	}, []);

	/**
	 * Actualiza propiedades específicas de un método
	 * Usa spread operator para mantener inmutabilidad
	 *
	 * @param id - ID único del método a actualizar
	 * @param updates - Objeto con propiedades a actualizar
	 */
	const updateMethod = useCallback(
		(id: string, updates: Partial<PaymentMethodData>) => {
			setMethods((prevMethods) =>
				prevMethods.map((method) =>
					method.id === id ? { ...method, ...updates } : method,
				),
			);
		},
		[],
	);

	/**
	 * Limpia todos los métodos de pago
	 * Usado al cambiar a modo CRÉDITO
	 */
	const clearMethods = useCallback(() => {
		setMethods([]);
	}, []);

	return {
		methods,
		addMethod,
		removeMethod,
		updateMethod,
		initializeForContado,
		clearMethods,
	};
}
