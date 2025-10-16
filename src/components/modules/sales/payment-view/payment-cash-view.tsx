import { useState } from "react";
import { HMIContainer } from "@/components/layouts/hmi-container";
import { useTransactionContext } from "@/lib/hooks/use-transaction-context";
import { PaymentInfoView } from "./views/payment-info-view";
import { PaymentMethodsView } from "./views/payment-methods-view";

/**
 * PaymentCashView - Vista de pago para transacciones de CONTADO
 *
 * Esta vista gestiona el flujo de pago exclusivo para ventas de contado.
 * El modo de transacción está fijado a "CONTADO" y no puede ser modificado.
 *
 * Flujo:
 * 1. Usuario ingresa desde /cash-sale presionando Enter
 * 2. Vista 1: Información del cliente (sin selector de modo)
 * 3. Vista 2: Métodos de pago y finalización
 *
 * Características:
 * - Modo CONTADO fijo (no modificable)
 * - Sin selector de modo de transacción
 * - Navegación entre 2 vistas internas
 *
 * @example
 * ```tsx
 * // Navegación desde cash-sale-view
 * navigateTo("payment/cash", { state: transactionState });
 * ```
 */
export const PaymentCashView: React.FC = () => {
	// Obtener contexto de transacción (debe venir desde cash-sale)
	const { transactionType, amount, currentState, hasValidState } =
		useTransactionContext({ requireValidState: true });

	// Estado para navegación entre vistas (1: Info, 2: Métodos)
	const [currentView, setCurrentView] = useState<1 | 2>(1);

	// Estado compartido para datos del formulario
	const [sharedFormData, setSharedFormData] = useState<{
		mode: "CONTADO" | "CREDITO";
		placa: string;
		idFacturaElectronica: string;
		idPuntosColombia: string;
		hasCoupon: boolean;
		idPromocion: string;
	}>({
		mode: "CONTADO", // Fijo para esta vista
		placa: "",
		idFacturaElectronica: "",
		idPuntosColombia: "",
		hasCoupon: false,
		idPromocion: "",
	});

	// Callback para actualizar datos compartidos
	const updateSharedData = (updates: Partial<typeof sharedFormData>) => {
		setSharedFormData((prev) => ({ ...prev, ...updates }));
	};

	// Validar si puede proceder a la siguiente vista
	const canProceed =
		currentView === 1
			? sharedFormData.placa.trim().length >= 6 &&
				/^[A-Z]{3}[0-9]{3}$/.test(sharedFormData.placa)
			: true;

	// Navegar a la vista de métodos de pago
	const handleNext = () => {
		if (canProceed && currentView === 1) {
			setCurrentView(2);
		}
	};

	// Navegar a la vista anterior
	const handlePrevious = () => {
		if (currentView === 2) {
			setCurrentView(1);
		}
	};

	// Manejar guardado final
	const handleSave = () => {
		console.log("💾 [CONTADO] Guardando pago con datos:", sharedFormData);
		// TODO: Implementar lógica de guardado real
	};

	return (
		<HMIContainer showHeader={false} showFooter={false}>
			<div className="w-full h-full flex items-center justify-center px-2">
				{currentView === 1 ? (
					<PaymentInfoView
						onProceedToPayment={handleNext}
						sharedFormData={sharedFormData}
						onUpdateSharedData={updateSharedData}
						showModeSelector={false}
						totalAmount={amount}
						transactionType="CONTADO"
						currentGallons={currentState.gallons}
					/>
				) : (
					<PaymentMethodsView
						onBackToInfo={handlePrevious}
						sharedFormData={sharedFormData}
						onUpdateSharedData={updateSharedData}
						onSaveSuccess={handleSave}
					/>
				)}
			</div>
		</HMIContainer>
	);
};

/**
 * Export como componente por defecto para lazy loading
 */
export default PaymentCashView;
