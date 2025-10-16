import React, { useEffect, useState } from "react";
import { HMIContainer } from "@/components/layouts/hmi-container";
import { AmountDisplay } from "@/components/shared/sales/amount-display";
import { Keypad } from "@/components/shared/sales/keypad";
import { SaleSidebar } from "@/components/shared/sales/sale-sidebar";
import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";
import { createTransactionState } from "@/lib/hooks/use-transaction-context";
import { useCashSaleCalculator } from "../cash-sale/hooks/use-cash-sale-calculator";

/**
 * CreditSaleViewComponent - Vista de preset para ventas a crédito
 *
 * Similar a CashSaleView pero específicamente para modo CRÉDITO.
 * Permite ingresar el monto de la venta antes de proceder al flujo de pago.
 *
 * Características:
 * - Teclado numérico para ingreso de monto
 * - Botón "TANQUE LLENO" para preset rápido
 * - Navegación directa a payment-view con modo CRÉDITO pre-configurado
 */
export const CreditSaleViewComponent: React.FC = () => {
	const { navigateTo } = useHMINavigation();
	const [isAnimating, setIsAnimating] = useState(true);
	const {
		value,
		displayMoney,
		handleNumber,
		handleTripleZero,
		handleClear,
	} = useCashSaleCalculator();

	useEffect(() => {
		// Detener la animación después de 5 segundos
		const timer = setTimeout(() => {
			setIsAnimating(false);
		}, 5000);

		return () => clearTimeout(timer);
	}, []);

	const handleEnter = () => {
		const numericValue = Number(value || 0);

		if (numericValue > 0) {
			// Para crédito, primero navegar a identificación de vehículo
			const transactionState = createTransactionState({
				transactionType: "CREDITO",
				amount: numericValue,
			});

			navigateTo("vehicle-identification", { state: transactionState });
		} else {
			console.warn("⚠️ Debe ingresar un monto válido antes de continuar");
		}
	};

	return (
		<HMIContainer showHeader={false} showFooter={false}>
			<div className="w-full h-full flex items-center justify-center px-2">
				<div className="grid grid-cols-4 gap-4 w-full max-w-6xl">
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
