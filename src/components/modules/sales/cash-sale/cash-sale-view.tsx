import React, { useEffect, useState } from "react";
import { HMIContainer } from "@/components/layouts/hmi-container";
import { AmountDisplay } from "@/components/shared/sales/amount-display";
import { Keypad } from "@/components/shared/sales/keypad";
import { SaleSidebar } from "@/components/shared/sales/sale-sidebar";
import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";
import { createTransactionState } from "@/lib/hooks/use-transaction-context";
import type { PaymentMode } from "./components/action-buttons";
import { ActionButtons } from "./components/action-buttons";
import { useCashSaleCalculator } from "./hooks/use-cash-sale-calculator";

export const CashSaleViewComponent: React.FC = () => {
	const { navigateTo } = useHMINavigation();
	const [activeMode, setActiveMode] = useState<PaymentMode>("cash");
	const [isAnimating, setIsAnimating] = useState(true);
	const { value, displayMoney, handleNumber, handleTripleZero, handleClear } =
		useCashSaleCalculator();

	useEffect(() => {
		// Detener la animación después de 5 segundos
		const timer = setTimeout(() => {
			setIsAnimating(false);
		}, 5000);

		return () => clearTimeout(timer);
	}, []);

	const handleModeChange = (mode: PaymentMode) => {
		setActiveMode(mode);
		handleClear();
	};

	const handleTripleZeroWithMode = (mode: PaymentMode) => {
		handleTripleZero(mode);
	};

	const handleEnterWithState = () => {
		const numericValue = Number(value || 0);

		if (numericValue > 0) {
			// Mapear modo: "cash" -> "cash", "volume" -> se trata como "cash"
			// El modo "volume" es para preset por galones, pero el payment es en efectivo
			const transactionState = createTransactionState({
				transactionType: "CONTADO",
				amount: numericValue,
				paymentMode: "cash", // Por defecto efectivo para contado
			});

			navigateTo("payment/cash", { state: transactionState });
		} else {
			console.warn("⚠️ Debe ingresar un monto válido antes de continuar");
		}
	};

	return (
		<HMIContainer showHeader={false} showFooter={false}>
			<div className="w-full h-full flex items-center justify-center px-2">
				<div className="grid grid-cols-4 gap-4 w-full max-w-6xl">
					{/* Sidebar con contado e inicio */}
					<SaleSidebar
						title="CONTADO"
						isAnimating={isAnimating}
						onTitleClick={() => navigateTo("cash-sale")}
					/>

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
							onEnter={handleEnterWithState}
						/>
					</div>
				</div>
			</div>
		</HMIContainer>
	);
};
