import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { HMIContainer } from "@/components/layouts/hmi-container";
import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";
import { useTransactionContext } from "@/lib/hooks/use-transaction-context";
import { PaymentInfoView } from "./views/payment-info-view";
import { PaymentMethodsView } from "./views/payment-methods-view";

/**
 * PaymentCreditView - Vista de pago para transacciones de CRÉDITO
 *
 * Esta vista gestiona el flujo de pago exclusivo para ventas a crédito.
 * El modo de transacción está fijado a "CREDITO" y no puede ser modificado.
 *
 * Flujo:
 * 1. Usuario ingresa desde /vehicle-identification después de identificar vehículo
 * 2. Vista 1: Información del cliente (placa pre-cargada, sin selector de modo)
 * 3. Vista 2: Métodos de pago y finalización
 *
 * Características:
 * - Modo CRÉDITO fijo (no modificable)
 * - Requiere identificación de vehículo previa
 * - Placa pre-cargada desde vehicle-identification
 * - Sin selector de modo de transacción
 * - Navegación entre 2 vistas internas
 *
 * Validación:
 * - Si no hay vehicleData, redirecciona a /vehicle-identification
 *
 * @example
 * ```tsx
 * // Navegación desde vehicle-identification-view
 * navigateTo("payment/credit", { state: transactionState });
 * ```
 */
export const PaymentCreditView: React.FC = () => {
	const { navigateTo } = useHMINavigation();

	// Obtener contexto de transacción (debe venir desde vehicle-identification)
	const { transactionType, amount, vehicleData, currentState, hasValidState } =
		useTransactionContext({ requireValidState: true });

	// Validación: Si no hay vehicleData, redireccionar
	const [shouldRedirect, setShouldRedirect] = useState(false);

	useEffect(() => {
		if (!vehicleData || !vehicleData.placa) {
			console.warn(
				"⚠️ [CRÉDITO] No hay datos de vehículo. Redireccionando a vehicle-identification...",
			);
			setShouldRedirect(true);
		}
	}, [vehicleData]);

	// Estado para navegación entre vistas (1: Info, 2: Métodos)
	const [currentView, setCurrentView] = useState<1 | 2>(1);

	// Estado compartido para datos del formulario
	// Pre-cargar placa desde vehicleData
	const [sharedFormData, setSharedFormData] = useState<{
		mode: "CONTADO" | "CREDITO";
		placa: string;
		idFacturaElectronica: string;
		idPuntosColombia: string;
		hasCoupon: boolean;
		idPromocion: string;
	}>({
		mode: "CREDITO", // Fijo para esta vista
		placa: vehicleData?.placa || "",
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
	// En crédito, la placa ya viene validada desde vehicle-identification
	const canProceed = currentView === 1 ? sharedFormData.placa.length >= 6 : true;

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
		console.log("💾 [CRÉDITO] Guardando pago con datos:", sharedFormData);
		console.log("🚗 Vehículo:", vehicleData);
		// TODO: Implementar lógica de guardado real
	};

	// Redireccionar si no hay datos de vehículo
	if (shouldRedirect) {
		return <Navigate to="/vehicle-identification" replace />;
	}

	return (
		<HMIContainer showHeader={false} showFooter={false}>
			<div className="w-full h-full flex items-center justify-center px-2">
				{currentView === 1 ? (
					<PaymentInfoView
						onProceedToPayment={handleNext}
						sharedFormData={sharedFormData}
						onUpdateSharedData={updateSharedData}
						showModeSelector={false}
						preloadedPlaca={vehicleData?.placa}
						totalAmount={amount}
						transactionType="CREDITO"
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
export default PaymentCreditView;
