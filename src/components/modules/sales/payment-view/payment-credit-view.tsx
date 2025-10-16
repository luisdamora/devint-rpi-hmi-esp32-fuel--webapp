import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { HMIContainer } from "@/components/layouts/hmi-container";
import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";
import { useTransactionContext } from "@/lib/hooks/use-transaction-context";
import { PaymentMethodsView } from "./views/payment-methods-view";

/**
 * PaymentCreditView - Vista de pago para transacciones de CRÉDITO
 *
 * Esta vista gestiona el flujo de pago exclusivo para ventas a crédito.
 * El modo de transacción está fijado a "CREDITO" y no puede ser modificado.
 *
 * Flujo:
 * 1. Usuario ingresa desde /credit-sale después de identificar vehículo e ingresar monto
 * 2. Va DIRECTO a métodos de pago (sin vista intermedia de información)
 * 3. Finaliza la transacción
 *
 * Características:
 * - Modo CRÉDITO fijo (no modificable)
 * - Requiere identificación de vehículo previa
 * - Placa y monto ya fueron ingresados en pasos anteriores
 * - Vista SIMPLIFICADA: solo métodos de pago
 *
 * Validación:
 * - Si no hay vehicleData, redirecciona a /vehicle-identification
 * - Si no hay amount, redirecciona a /credit-sale
 *
 * @example
 * ```tsx
 * // Navegación desde credit-sale-view
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

	// Vista simplificada: ya no hay navegación interna, vamos directo a métodos de pago

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

	// Manejar regreso a credit-sale (ingreso de monto)
	const handleBackToCreditSale = () => {
		navigateTo("credit-sale", {
			state: {
				transactionType: "CREDITO",
				vehicleData,
				timestamp: new Date().toISOString(),
			},
		});
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
				{/* Vista simplificada: directo a métodos de pago */}
				<PaymentMethodsView
					onBackToInfo={handleBackToCreditSale}
					sharedFormData={sharedFormData}
					onUpdateSharedData={updateSharedData}
					onSaveSuccess={handleSave}
				/>
			</div>
		</HMIContainer>
	);
};

/**
 * Export como componente por defecto para lazy loading
 */
export default PaymentCreditView;
