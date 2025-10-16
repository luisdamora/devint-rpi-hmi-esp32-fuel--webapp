import { useState } from "react";
import { ArrowRight, Home, CreditCard } from "lucide-react";
import { HMIContainer } from "@/components/layouts/hmi-container";
import { SideTile } from "@/components/shared/sales/side-tile";
import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";
import { useTransactionContext } from "@/lib/hooks/use-transaction-context";
import { getButtonClasses, HMI_COLORS, HMI_LAYOUT } from "@/lib/config/hmi-styles-config";
import { useVehicleIdentification } from "./hooks";
import { IdentificationMethodCard } from "./components/identification-method-card";
import { ManualPlacaInput } from "./components/manual-placa-input";

/**
 * VehicleIdentificationView - Vista de identificación de vehículos para crédito
 *
 * Esta vista permite identificar el vehículo mediante tres métodos:
 * - MANUAL: Ingreso manual de placa con teclado virtual
 * - RFID: Lectura automática de tag RFID
 * - IBUTTON: Lectura automática de llave iButton
 *
 * Flujo:
 * 1. Usuario llega desde credit-sale con monto
 * 2. Selecciona método de identificación
 * 3. Identifica vehículo
 * 4. Continúa a payment-view con datos del vehículo
 *
 * @example
 * Navegación:
 * credit-sale → vehicle-identification → payment
 */
export const VehicleIdentificationView: React.FC = () => {
	const { navigateTo } = useHMINavigation();

	// Obtener datos de la transacción desde navegación anterior
	const { amount, transactionType, hasValidState } = useTransactionContext({
		requireValidState: true,
		redirectPath: "/credit-sale",
	});

	// Hook de identificación
	const {
		activeMethod,
		isIdentified,
		vehicleData,
		isReading,
		error,
		setActiveMethod,
		identifyManual,
		validatePlaca,
		resetIdentification,
	} = useVehicleIdentification();

	// Estado para mostrar input manual
	const [showManualInput, setShowManualInput] = useState(false);

	// Manejar selección de método
	const handleMethodSelect = (method: typeof activeMethod) => {
		if (isIdentified) return; // No permitir cambiar si ya está identificado

		resetIdentification();
		setActiveMethod(method);

		// Mostrar input si es manual
		if (method === "MANUAL") {
			setShowManualInput(true);
		} else {
			setShowManualInput(false);
		}
	};

	// Manejar identificación manual exitosa
	const handleManualSubmit = (placa: string): boolean => {
		const success = identifyManual(placa);
		if (success) {
			setShowManualInput(false);
		}
		return success;
	};

	// Continuar a payment con datos del vehículo
	const handleContinue = () => {
		if (isIdentified && vehicleData && hasValidState) {
			navigateTo("payment", {
				state: {
					transactionType,
					amount,
					vehicleData,
					timestamp: new Date().toISOString(),
					fuel: {
						gallons: amount / 8040,
						pricePerGallon: 8040,
					},
				},
			});
		}
	};

	if (!hasValidState) {
		return null; // El hook redirige automáticamente
	}

	return (
		<HMIContainer showHeader={false} showFooter={false}>
			<div className={HMI_LAYOUT.container}>
				<div className={HMI_LAYOUT.mainGrid}>
					{/* Sidebar */}
					<div className={HMI_LAYOUT.sidebar}>
						<SideTile
							title="CRÉDITO"
							icon={<CreditCard size={64} />}
							onClick={() => navigateTo("credit-sale")}
						/>
						<SideTile
							title="INICIO"
							icon={<Home size={64} />}
							onClick={() => navigateTo("menu")}
						/>
					</div>

					{/* Contenido principal */}
					<div className={HMI_LAYOUT.content}>
						{/* Header */}
						<div className="text-center mb-6">
							<h1 className="text-3xl font-bold text-gray-800">
								IDENTIFICACION DE VEHICULO
							</h1>
							<p className="text-lg text-gray-600 mt-2">
								Seleccione el método para identificar el vehículo
							</p>
						</div>

						{/* Métodos de identificación */}
						<div className="space-y-4">
							{/* RFID */}
							<IdentificationMethodCard
								method="RFID"
								label="LECTOR RFID"
								isActive={activeMethod === "RFID"}
								isIdentified={isIdentified && vehicleData?.identificationType === "RFID"}
								isReading={isReading && activeMethod === "RFID"}
								vehicleId={vehicleData?.vehicleId}
								onSelect={() => handleMethodSelect("RFID")}
							/>

							{/* iButton */}
							<IdentificationMethodCard
								method="IBUTTON"
								label="LECTOR IBUTTON"
								isActive={activeMethod === "IBUTTON"}
								isIdentified={isIdentified && vehicleData?.identificationType === "IBUTTON"}
								isReading={isReading && activeMethod === "IBUTTON"}
								vehicleId={vehicleData?.vehicleId}
								onSelect={() => handleMethodSelect("IBUTTON")}
							/>

							{/* Manual */}
							<IdentificationMethodCard
								method="MANUAL"
								label="INGRESO MANUAL"
								isActive={activeMethod === "MANUAL"}
								isIdentified={isIdentified && vehicleData?.identificationType === "MANUAL"}
								isReading={false}
								vehicleId={vehicleData?.vehicleId}
								onSelect={() => handleMethodSelect("MANUAL")}
							/>

							{/* Input manual (condicional) */}
							{showManualInput && activeMethod === "MANUAL" && !isIdentified && (
								<div className="mt-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-300">
									<ManualPlacaInput
										onSubmit={handleManualSubmit}
										onValidate={validatePlaca}
									/>
								</div>
							)}
						</div>

						{/* Error global */}
						{error && (
							<div
								className="mt-4 p-3 rounded-lg border-2"
								style={{
									backgroundColor: HMI_COLORS.error + "20",
									borderColor: HMI_COLORS.error,
								}}
							>
								<p className="text-center font-semibold" style={{ color: HMI_COLORS.error }}>
									{error}
								</p>
							</div>
						)}

						{/* Información del vehículo identificado */}
						{isIdentified && vehicleData && (
							<div
								className="mt-6 p-4 rounded-lg border-2"
								style={{
									backgroundColor: HMI_COLORS.success + "20",
									borderColor: HMI_COLORS.success,
								}}
							>
								<div className="text-center space-y-2">
									<p className="text-lg font-bold" style={{ color: HMI_COLORS.success }}>
										✅ VEHICULO IDENTIFICADO
									</p>
									<div className="flex items-center justify-center gap-4 mt-3">
										<div>
											<span className="text-sm text-gray-600">PLACA:</span>
											<p className="text-2xl font-bold text-gray-900">
												{vehicleData.placa}
											</p>
										</div>
										<div>
											<span className="text-sm text-gray-600">MÉTODO:</span>
											<p className="text-lg font-semibold text-gray-700">
												{vehicleData.identificationType}
											</p>
										</div>
									</div>
								</div>
							</div>
						)}

						{/* Botón continuar */}
						<div className="mt-6 flex justify-center">
							<button
								type="button"
								onClick={handleContinue}
								disabled={!isIdentified}
								className={`${getButtonClasses("lg", "primary")} min-w-[300px]`}
							>
								<span>CONTINUAR A PAGO</span>
								<ArrowRight size={24} className="ml-2" />
							</button>
						</div>

						{/* Hint */}
						{!isIdentified && (
							<p className="mt-4 text-center text-sm" style={{ color: HMI_COLORS.textSecondary }}>
								Identifique el vehículo para continuar con la transacción
							</p>
						)}
					</div>
				</div>
			</div>
		</HMIContainer>
	);
};

export default VehicleIdentificationView;
