import { useState, useCallback } from "react";
import type { PaymentFormData } from "../types";

/**
 * Estados posibles de navegación entre vistas
 */
export type NavigationState = "info" | "methods";

/**
 * Hook para gestionar la navegación entre vistas de pago
 * 
 * Proporciona:
 * - Estado actual de navegación
 * - Validación para cambiar de vista
 * - Persistencia de datos entre vistas
 * - Callbacks para navegación
 * 
 * @param initialData - Datos iniciales del formulario
 */
export function usePaymentNavigation(initialData: PaymentFormData) {
	// Estado actual de navegación
	const [currentView, setCurrentView] = useState<NavigationState>("info");
	
	// Datos del formulario (compartidos entre vistas)
	const [formData, setFormData] = useState<PaymentFormData>(initialData);
	
	// Si la vista actual está completa y puede proceder
	const [canProceed, setCanProceed] = useState(false);
	
	// Si la información básica está completa
	const isInfoComplete = useCallback(() => {
		return formData.placa.trim().length >= 6 && !!formData.placa.match(/^[A-Z]{3}[0-9]{3}$/);
	}, [formData.placa]);
	
	// Si los métodos de pago están completos (solo para vista de métodos)
	const isMethodsComplete = useCallback(() => {
		if (formData.mode === "CREDITO") return true;
		
		// Para CONTADO, verificar que la distribución esté completa
		return formData.paymentMethods.length > 0 && 
			   formData.paymentMethods.filter(m => m.enabled).length > 0;
	}, [formData.mode, formData.paymentMethods]);
	
	// Actualizar estado de "puede proceder" basado en vista actual
	const updateCanProceed = useCallback(() => {
		if (currentView === "info") {
			setCanProceed(isInfoComplete());
		} else {
			setCanProceed(isMethodsComplete());
		}
	}, [currentView, isInfoComplete, isMethodsComplete]);
	
	// Callback para actualizar datos del formulario
	const updateFormData = useCallback((updates: Partial<PaymentFormData>) => {
		setFormData(prev => ({ ...prev, ...updates }));
	}, []);
	
	// Navegar a la vista de información del cliente
	const navigateToInfo = useCallback(() => {
		setCurrentView("info");
		updateCanProceed();
	}, [updateCanProceed]);
	
	// Navegar a la vista de métodos de pago
	const navigateToMethods = useCallback(() => {
		if (isInfoComplete()) {
			setCurrentView("methods");
			updateCanProceed();
		}
	}, [isInfoComplete, updateCanProceed]);
	
	// Resetear navegación al estado inicial
	const resetNavigation = useCallback(() => {
		setCurrentView("info");
		setFormData(initialData);
		setCanProceed(false);
	}, [initialData]);
	
	// Actualizar estado de "puede proceder" cuando cambian los datos
	const checkCompletion = useCallback(() => {
		updateCanProceed();
	}, [updateCanProceed]);
	
	return {
		// Estado
		currentView,
		formData,
		canProceed,
		isInfoComplete: isInfoComplete(),
		isMethodsComplete: isMethodsComplete(),
		
		// Acciones
		updateFormData,
		navigateToInfo,
		navigateToMethods,
		resetNavigation,
		checkCompletion,
	};
}
