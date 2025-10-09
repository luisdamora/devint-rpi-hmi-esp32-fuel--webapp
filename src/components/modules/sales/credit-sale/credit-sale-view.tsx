import { CreditCard, Home } from "lucide-react";
import React from "react";
import { HMIContainer } from "@/components/layouts/hmi-container";
import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";
import { AmountDisplay } from "@/components/shared/sales/amount-display";
import { Keypad } from "@/components/shared/sales/keypad";
import { SideTile } from "@/components/shared/sales/side-tile";
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
	const { displayMoney, handleNumber, handleTripleZero, handleClear } =
		useCashSaleCalculator();

	const handleEnter = () => {
		// Navegar a payment-view con modo CRÉDITO y monto ingresado
		navigateTo("payment");
		// TODO: Pasar datos vía state cuando se implemente navegación con estado
		// navigateTo("payment", {
		//   state: {
		//     totalAmount: displayMoney,
		//     mode: "CREDITO",
		//     fromPreset: true
		//   }
		// });
	};

	return (
		<HMIContainer showHeader={false} showFooter={false}>
			<div className="w-full h-full flex items-center justify-center px-2">
				<div className="grid grid-cols-4 gap-4 w-full max-w-6xl">
					{/* Tiles laterales */}
					<div className="col-span-1 flex flex-col gap-6 self-start pt-8">
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
