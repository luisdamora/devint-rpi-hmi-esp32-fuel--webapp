import { Droplet, HandCoins } from "lucide-react";

import React, { useState } from "react";
import { BUTTON_STYLES, BUTTON_VARIANTS } from "@/lib/config/theme";

export type PaymentMode = "cash" | "volume";

interface ActionButtonsProps {
	onTripleZero: (mode: PaymentMode) => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
	onTripleZero,
}) => {
	const [activeMode, setActiveMode] = useState<PaymentMode>("cash");

	const handleModeToggle = (mode: PaymentMode) => {
		setActiveMode(mode);
	};

	const handleTripleZeroClick = () => {
		onTripleZero(activeMode);
	};

	return (
		<div className="grid grid-cols-3 gap-3 max-w-xl mx-auto mb-4">
			{/* Cobro por dinero */}
			<button
				type="button"
				onClick={() => handleModeToggle("cash")}
				className={`flex items-center justify-center transition-all duration-200 ${
					activeMode === "cash"
						? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg ring-2 ring-blue-400"
						: "bg-gray-600 hover:bg-gray-700 text-gray-300"
				} py-3 px-4 rounded-lg font-semibold active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500`}
			>
				<HandCoins className="w-6 h-6 mr-2" />$
			</button>

			{/* Cobro por volumen */}
			<button
				type="button"
				onClick={() => handleModeToggle("volume")}
				className={`flex items-center justify-center transition-all duration-200 ${
					activeMode === "volume"
						? "bg-green-600 hover:bg-green-700 text-white shadow-lg ring-2 ring-green-400"
						: "bg-gray-600 hover:bg-gray-700 text-gray-300"
				} py-3 px-4 rounded-lg font-semibold active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500`}
			>
				<Droplet className="w-6 h-6 mr-2" />
				Vol.
			</button>

			{/* Opción según tipo de cobro */}
			<button
				type="button"
				onClick={handleTripleZeroClick}
				className={`${BUTTON_STYLES.primary} flex items-center justify-center`}
			>
				{activeMode === "cash" ? "x $1.000" : ","}
			</button>
		</div>
	);
};
