import { BanknoteArrowDown, Home } from "lucide-react";
import React, { useState } from "react";
import { HMIContainer } from "@/components/layouts/hmi-container";
import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";
import type { PaymentMode } from "./components/action-buttons";
import { ActionButtons } from "./components/action-buttons";
import { AmountDisplay } from "@/components/shared/sales/amount-display";
import { Keypad } from "@/components/shared/sales/keypad";
import { SideTile } from "@/components/shared/sales/side-tile";
import { useCashSaleCalculator } from "./hooks/use-cash-sale-calculator";

export const CashSaleViewComponent: React.FC = () => {
	const { navigateTo } = useHMINavigation();
	const [activeMode, setActiveMode] = useState<PaymentMode>("cash");
	const { displayMoney, handleNumber, handleTripleZero, handleClear } =
		useCashSaleCalculator();

	const handleModeChange = (mode: PaymentMode) => {
		setActiveMode(mode);
		handleClear();
	};

	const handleTripleZeroWithMode = (mode: PaymentMode) => {
		handleTripleZero(mode);
	};

	return (
		<HMIContainer showHeader={false} showFooter={false}>
			<div className="w-full h-full flex items-center justify-center px-2">
				<div className="grid grid-cols-4 gap-4 w-full max-w-6xl">
					{/* Tiles laterales */}
					<div className="col-span-1 flex flex-col gap-6 self-start pt-8">
						<SideTile
							title="CONTADO"
							icon={<BanknoteArrowDown size={64} />}
							onClick={() => navigateTo("cash-sale")}
						/>
						<SideTile
							title="INICIO"
							icon={<Home size={64} />}
							onClick={() => navigateTo("menu")}
						/>
					</div>

					{/* Centro: preset y keypad */}
					<div className="col-span-3">
						<AmountDisplay displayMoney={displayMoney} mode={activeMode} />

						<ActionButtons
							mode={activeMode}
							onModeChange={handleModeChange}
							onTripleZero={handleTripleZeroWithMode}
						/>

						<Keypad
							onNumber={handleNumber}
							onClear={handleClear}
							onEnter={() => navigateTo("payment")}
						/>
						{/* TODO: Integración futura con PaymentView
									Cuando el usuario presione ENTER después de ingresar un monto:
									1. Validar que displayMoney > 0
									2. Navegar a payment-view con los datos de la venta:
										 navigateTo("payment", {
											 totalAmount: displayMoney,
											 mode: activeMode
										 });
									3. PaymentView procesará el pago y guardará la venta
									Esto reemplazará el actual navigateBack()
							*/}
					</div>
				</div>
			</div>
		</HMIContainer>
	);
};
