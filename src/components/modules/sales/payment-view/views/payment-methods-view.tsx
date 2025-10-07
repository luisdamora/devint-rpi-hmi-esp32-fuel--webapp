import { ArrowLeft, DollarSign, Home, Save } from "lucide-react";
import React from "react";
import { HMIContainer } from "@/components/layouts/hmi-container";
import { SideTile } from "@/components/modules/sales/cash-sale/components/side-tile";
import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";
import {
	PaymentMethodsGrid,
	PaymentModeSelector,
	SaveButton,
} from "../components";
import { usePaymentForm } from "../hooks";

/**
 * PaymentMethodsView - Segunda vista: Métodos de pago y finalización
 *
 * Esta vista se enfoca exclusivamente en la gestión de métodos de pago
 * y el proceso de finalización de la transacción.
 *
 * Características:
 * - Layout HMI touch-optimizado enfocado en pagos
 * - Gestión completa de métodos de pago
 * - Navegación hacia información del cliente
 * - Proceso de guardado optimizado
 *
 * @example
 * ```tsx
 * <PaymentMethodsView />
 * ```
 */
export const PaymentMethodsView: React.FC = () => {
	const { navigateTo } = useHMINavigation();

	// TODO: Obtener totalAmount desde props, context o state global
	const MOCK_TOTAL = 100000; // $100,000 COP

	// Hook principal que orquesta todo el estado del formulario
	const {
		formData,
		validation,
		distribution,
		paymentMethods,
		setMode,
		updatePaymentMethod,
		removeMethod,
		addMethod,
		handleSubmit,
	} = usePaymentForm(MOCK_TOTAL);

	// TODO: Implementar handleSaveSuccess para integración con API
	const handleSaveSuccess = () => {
		console.log("✅ Pago guardado exitosamente:", formData);
		navigateTo("payment-confirmation");
	};

	// Navegar de vuelta a información del cliente
	const handleBackToInfo = () => {
		// TODO: Navegar a vista de información del cliente
		console.log("⬅️ Volviendo a información del cliente");
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

					{/* Columnas 2-4: Métodos de pago */}
					<div className="col-span-3 space-y-6 overflow-y-auto max-h-screen pb-8">
						{/* Encabezado de la vista */}
						<div className="text-center space-y-2">
							<h1 className="text-3xl font-bold text-gray-800">
								Métodos de Pago
							</h1>
							<p className="text-lg text-gray-600">
								Paso 2 de 2: Configure los métodos de pago y complete la
								transacción
							</p>
						</div>

						{/* Información del cliente (resumen) */}
						<div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
							<div className="flex justify-between items-center">
								<div className="flex-1">
									<p className="text-sm text-gray-600">
										<strong>Vehículo:</strong>{" "}
										{formData.placa || "No especificado"}
									</p>
									<p className="text-sm text-gray-600">
										<strong>Modo:</strong> {formData.mode}
									</p>
								</div>
								<button
									type="button"
									onClick={handleBackToInfo}
									className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
								>
									<ArrowLeft size={16} />
									<span>Editar Información</span>
								</button>
							</div>
						</div>

						{/* Selector de modo de pago (modo activo visible) */}
						<div className="bg-white rounded-lg p-6 shadow-sm border-2 border-gray-200">
							<h2 className="text-xl font-semibold text-gray-700 mb-4">
								Modo de Pago Actual
							</h2>
							<PaymentModeSelector
								mode={formData.mode}
								onModeChange={setMode}
							/>
						</div>

						{/* Grid de métodos de pago (solo en modo CONTADO) */}
						{formData.mode === "CONTADO" && (
							<div className="bg-white rounded-lg p-6 shadow-sm border-2 border-gray-200">
								<h2 className="text-xl font-semibold text-gray-700 mb-4">
									Métodos de Pago
								</h2>
								<PaymentMethodsGrid
									methods={paymentMethods}
									totalAmount={formData.totalAmount}
									distribution={distribution}
									onUpdateMethod={updatePaymentMethod}
									onRemoveMethod={removeMethod}
									onAddMethod={addMethod}
									validationErrors={validation.errors}
								/>
							</div>
						)}

						{/* Información adicional para modo CRÉDITO */}
						{formData.mode === "CREDITO" && (
							<div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
								<h3 className="text-lg font-semibold text-green-800 mb-2">
									Pago a Crédito
								</h3>
								<p className="text-green-700">
									El pago será registrado como crédito asociado a la cuenta del
									cliente. No se requieren métodos de pago adicionales.
								</p>
							</div>
						)}

						{/* Botón de guardar */}
						<div className="pt-4">
							<SaveButton
								isValid={validation.isValid}
								isComplete={distribution.isComplete}
								onSave={handleSubmit}
							/>
						</div>

						{/* Información de ayuda */}
						<div className="text-center">
							<p className="text-sm text-gray-500">
								Revise todos los datos antes de guardar la transacción
							</p>
						</div>
					</div>
				</div>
			</div>
		</HMIContainer>
	);
};

/**
 * Export como componente por defecto para lazy loading
 */
export default PaymentMethodsView;
