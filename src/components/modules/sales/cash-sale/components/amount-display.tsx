import { BatteryFull } from "lucide-react";
import React from "react";

interface AmountDisplayProps {
	displayMoney: () => string;
	mode: "cash" | "volume";
}

export const AmountDisplay: React.FC<AmountDisplayProps> = ({
	displayMoney,
	mode,
}) => (
	<div className="mb-3 text-center">
		<div className="flex gap-3 justify-center mt-2">
			<div
				className={`flex-1 px-6 py-3 rounded-md font-bold text-2xl text-white ${
					mode === "cash" ? "bg-blue-600" : "bg-green-600"
				}`}
			>
				{mode === "cash" ? `$ ${displayMoney()}` : `${displayMoney()} Gal.`}
			</div>
			<button
				type="button"
				className="flex items-center justify-center px-6 py-3 rounded-md font-bold text-white text-xl bg-orange-600 hover:bg-orange-700 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-md hover:shadow-lg"
			>
				<BatteryFull className="w-6 h-6 mr-2" />
				TANQUE LLENO
			</button>
		</div>
	</div>
);
