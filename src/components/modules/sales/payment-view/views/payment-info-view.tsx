import { ArrowRight, CheckCircle, DollarSign, Home } from "lucide-react";
import React from "react";
import { HMIContainer } from "@/components/layouts/hmi-container";
import { SideTile } from "@/components/modules/sales/cash-sale/components/side-tile";
import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";
import { IdentificationFields, PaymentModeSelector } from "../components";
import { usePaymentForm } from "../hooks";

/**
 * PaymentInfoView - Primera vista: Información del cliente y modo de pago
 *
 * Esta vista se enfoca exclusivamente en recopilar la información del cliente
 * y seleccionar el modo de pago antes de proceder a los métodos de pago.
 *
 * Características:
 * - Layout HMI touch-optimizado
 * - Información del cliente claramente separada
 * - Navegación clara hacia métodos de pago
 * - Validación en tiempo real
 *
 * @example
 * ```tsx
 * <PaymentInfoView />
 * ```
 */
export const PaymentInfoView: React.FC = () => {
	const { navigateTo } = useHMINavigation();

	// TODO: Obtener totalAmount desde props, context o state global
	const MOCK_TOTAL = 100000; // $100,000 COP

	// Hook principal que orquesta todo el estado del formulario
	const {
		formData,
		validation,
		setMode,
		setPlaca,
		setIdFacturaElectronica,
		setIdPuntosColombia,
		setHasCoupon,
		setIdPromocion,
	} = usePaymentForm(MOCK_TOTAL);

	// Validar que tenemos información básica antes de continuar
	const canProceedToPayment = () => {
		return validation.isValid && formData.placa.trim().length > 0;
	};

	// Navegar a métodos de pago si la información está completa
	const handleProceedToPayment = () => {
		if (canProceedToPayment()) {
			// TODO: Navegar a vista de métodos de pago
			console.log("✅ Procediendo a métodos de pago con datos:", formData);
		}
	};

	return (
		<HMIContainer showHeader={false} showFooter={false}>
			<div className="w-full h-full flex items-center justify-center px-2">
				<div className="grid grid-cols-4 gap-4 w-full max-w-6xl">
					{/* Columna 1: Navegación lateral */}
					<div className="col-span-1 flex flex-col gap-6 self-start pt-8">
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
					</div>

					{/* Columnas 2-4: Información del cliente */}
					<div className="col-span-3 space-y-6 overflow-y-auto max-h-screen pb-8">
						{/* Encabezado de la vista */}
						{/* <div className="text-center space-y-2">
							<h1 className="text-3xl font-bold text-gray-800">
								Información del Cliente
							</h1>
							<p className="text-lg text-gray-600">
								Paso 1 de 2: Complete los datos del vehículo y cliente
							</p>
						</div> */}

						{/* Selector de modo de pago - posición prominente */}
						<PaymentModeSelector mode={formData.mode} onModeChange={setMode} />

						{/* Campos de identificación */}
						<div className="rounded-lg px-4 py-2 shadow-sm border-2 border-gray-200">
							{/* <h2 className="text-xl font-semibold text-gray-700 mb-4">
								Datos del Vehículo
							</h2> */}
							<IdentificationFields
								mode={formData.mode}
								placa={formData.placa}
								idFacturaElectronica={formData.idFacturaElectronica}
								idPuntosColombia={formData.idPuntosColombia}
								hasCoupon={formData.hasCoupon}
								idPromocion={formData.idPromocion}
								onPlacaChange={setPlaca}
								onIdFacturaChange={setIdFacturaElectronica}
								onIdPuntosChange={setIdPuntosColombia}
								onHasCouponChange={setHasCoupon}
								onIdPromocionChange={setIdPromocion}
								validationErrors={validation.errors}
							/>
						</div>

						{/* Navegación hacia métodos de pago */}
						<div className="flex justify-center">
							<button
								type="button"
								onClick={handleProceedToPayment}
								disabled={!canProceedToPayment()}
								className={`
									flex items-center gap-3 px-8 py-2 rounded-lg font-bold text-lg
									transition-all duration-200 active:scale-95
									${
										canProceedToPayment()
											? "bg-green-500 hover:bg-green-600 text-white shadow-lg"
											: "bg-gray-300 text-gray-500 cursor-not-allowed"
									}
								`}
							>
								{canProceedToPayment() ? (
									<CheckCircle size={24} />
								) : (
									<div className="w-6 h-6 rounded-full border-2 border-current" />
								)}
								<span>Continuar a Métodos de Pago</span>
								<ArrowRight size={24} />
							</button>
						</div>

						{/* Información de progreso */}
						{/* <div className="text-center">
							<p className="text-sm text-gray-500">
								Complete la información básica para proceder con el pago
							</p>
						</div> */}
					</div>
				</div>
			</div>
		</HMIContainer>
	);
};

/**
 * Export como componente por defecto para lazy loading
 */
export default PaymentInfoView;
