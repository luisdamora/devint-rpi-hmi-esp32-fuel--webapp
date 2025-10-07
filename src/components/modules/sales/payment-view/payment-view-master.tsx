import React, { useState } from "react";
import { HMIContainer } from "@/components/layouts/hmi-container";
import { PaymentInfoView } from "./views/payment-info-view";
import { PaymentMethodsView } from "./views/payment-methods-view";

/**
 * PaymentViewMaster - Componente maestro que gestiona las dos vistas de pago
 *
 * Este componente actúa como orquestador entre las dos vistas especializadas:
 * - PaymentInfoView: Información del cliente y modo de pago
 * - PaymentMethodsView: Métodos de pago y finalización
 *
 * Características:
 * - Gestión unificada del estado entre vistas
 * - Navegación inteligente basada en completitud
 * - Layout HMI consistente en ambas vistas
 *
 * @example
 * ```tsx
 * <PaymentViewMaster />
 * ```
 */
export const PaymentViewMaster: React.FC = () => {
	const { navigateTo } = useHMINavigation();

	// Estado simple para navegación entre vistas
	const [currentView, setCurrentView] = useState<1 | 2>(1);

	// Estado compartido para datos del formulario
	const [sharedFormData, setSharedFormData] = useState({
		mode: "CONTADO" as "CONTADO" | "CREDITO",
		placa: "",
		idFacturaElectronica: "",
		idPuntosColombia: "",
		hasCoupon: false,
		idPromocion: "",
	});

	// Validar si puede proceder a la siguiente vista
	const canProceed =
		currentView === 1
			? sharedFormData.placa.trim().length >= 6 &&
				sharedFormData.placa.match(/^[A-Z]{3}[0-9]{3}$/)
			: true; // Para la segunda vista, asumir que siempre puede proceder

	// Si la vista actual está completa
	const isCurrentViewComplete = currentView === 1 ? canProceed : true;

	// Callback para actualizar datos compartidos
	const updateSharedData = (updates: Partial<typeof sharedFormData>) => {
		setSharedFormData((prev) => ({ ...prev, ...updates }));
	};

	// Navegar a la siguiente vista
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

	// Manejar guardado (simulado por ahora)
	const handleSave = () => {
		console.log("💾 Guardando pago con datos:", sharedFormData);
		// TODO: Implementar lógica de guardado real
	};

	return (
		<HMIContainer showHeader={false} showFooter={false}>
			<div className="w-full h-full flex items-center justify-center px-2">
				<div className=" w-full max-w-6xl">
					{/* Columna 1: Navegación lateral */}
					{/* <div className="col-span-1 flex flex-col gap-6 self-start pt-8">
						<SideTile
							title="VENTAS"
							icon={<DollarSign size={64} />}
							onClick={() => navigateTo("payment")}
						/>
						<SideTile
							title="INICIO"
							icon={<Home size={64} />}
							onClick={() => navigateTo("menu")}
						/>
					</div> */}

					{/* Columnas 2-4: Contenido principal con navegación */}
					{/* <div className="col-span-3 space-y-4 overflow-hidden"> */}
					{/* Navegación entre vistas */}
					{/* <ViewNavigation
							currentView={currentView}
							canProceed={canProceed}
							isCurrentViewComplete={isCurrentViewComplete}
							onPrevious={currentView === 2 ? handlePrevious : undefined}
							onNext={currentView === 1 ? handleNext : undefined}
							onSave={currentView === 2 ? handleSave : undefined}
							isLastView={currentView === 2}
						/> */}

					{/* Vista actual */}
					{/* <div className="flex-1 overflow-hidden"> */}
					{currentView === 1 ? <PaymentInfoView /> : <PaymentMethodsView />}
					{/* </div> */}
					{/* </div> */}
				</div>
			</div>
		</HMIContainer>
	);
};

/**
 * Export como componente por defecto para lazy loading
 */
export default PaymentViewMaster;
