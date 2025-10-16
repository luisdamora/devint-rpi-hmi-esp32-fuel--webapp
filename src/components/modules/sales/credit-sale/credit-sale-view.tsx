import React, { useEffect, useState } from "react";
import { HMIContainer } from "@/components/layouts/hmi-container";
import { AmountDisplay } from "@/components/shared/sales/amount-display";
import { Keypad } from "@/components/shared/sales/keypad";
import { SaleSidebar } from "@/components/shared/sales/sale-sidebar";
import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";
import { createTransactionState, useTransactionContext } from "@/lib/hooks/use-transaction-context";
import { useCashSaleCalculator } from "../cash-sale/hooks/use-cash-sale-calculator";

/**
 * CreditSaleViewComponent - Vista de preset para ventas a crédito
 *
 * Similar a CashSaleView pero específicamente para modo CRÉDITO.
 * Permite ingresar el monto de la venta después de identificar el vehículo.
 *
 * Flujo:
 * 1. Usuario llega desde vehicle-identification con datos del vehículo
 * 2. Ingresa el monto de la venta
 * 3. Continúa a payment/credit con monto + vehicleData
 *
 * Características:
 * - Teclado numérico para ingreso de monto
 * - Botón "TANQUE LLENO" para preset rápido
 * - Validación de vehicleData desde paso anterior
 */
export const CreditSaleViewComponent: React.FC = () => {
	const { navigateTo } = useHMINavigation();
	const [isAnimating, setIsAnimating] = useState(true);
	const { value, displayMoney, handleNumber, handleTripleZero, handleClear } =
		useCashSaleCalculator();

	// Obtener datos del vehículo desde vehicle-identification
	const { vehicleData, hasValidState } = useTransactionContext({
		requireValidState: true,
		redirectPath: "/vehicle-identification",
	});

	useEffect(() => {
		// Detener la animación después de 5 segundos
		const timer = setTimeout(() => {
			setIsAnimating(false);
		}, 5000);

		return () => clearTimeout(timer);
	}, []);

	const handleEnter = () => {
		const numericValue = Number(value || 0);

		if (numericValue > 0 && vehicleData) {
			// Navegar a payment/credit con monto + vehicleData
			const transactionState = createTransactionState({
				transactionType: "CREDITO",
				amount: numericValue,
				vehicleData: vehicleData,
			});

			navigateTo("payment/credit", { state: transactionState });
		} else if (!vehicleData) {
			console.warn("⚠️ No hay datos del vehículo. Redirigiendo...");
			navigateTo("vehicle-identification");
		} else {
			console.warn("⚠️ Debe ingresar un monto válido antes de continuar");
		}
	};

	// Mostrar indicador si no hay datos del vehículo
	if (!hasValidState || !vehicleData) {
		return null; // El hook redirige automáticamente
	}

	return (
		<HMIContainer showHeader={false} showFooter={false}>
			<div className="w-full h-full flex items-center justify-center px-2">
				<div className="grid grid-cols-4 gap-4 w-full max-w-6xl">
					{/* Indicador de vehículo identificado */}
					<div className="col-span-4 mb-2">
						<div className="bg-green-500/20 border-2 border-green-500 rounded-lg p-3 text-center">
							<p className="text-green-700 font-bold text-lg">
								✅ VEHÍCULO IDENTIFICADO: {vehicleData.placa}
							</p>
						</div>
					</div>
					{/* Sidebar con crédito e inicio */}
					<SaleSidebar
						title="CRÉDITO"
						isAnimating={isAnimating}
						onTitleClick={() => navigateTo("credit-sale")}
					/>

					{/* Centro: display y keypad */}
					<div className="col-span-3">
						<AmountDisplay displayMoney={displayMoney} mode="cash" />

						{/* Botón TANQUE LLENO para crédito */}
						<div className="flex justify-center my-6">
							<button
								type="button"
								onClick={() => handleTripleZero("cash")}
								className="px-12 py-4 bg-red-600 hover:bg-red-700 text-white text-xl font-bold rounded-lg shadow-lg transition-all duration-200 active:scale-95"
							>
								🚰 TANQUE LLENO
							</button>
						</div>

						<Keypad
							onNumber={handleNumber}
							onClear={handleClear}
							onEnter={handleEnter}
						/>
					</div>
				</div>
			</div>
		</HMIContainer>
	);
};
