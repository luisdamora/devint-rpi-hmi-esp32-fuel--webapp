import React from "react";
import { NEXUS_COLORS } from "@/lib/config/theme";

interface AmountDisplayProps {
	displayMoney: () => string;
}

export const AmountDisplay: React.FC<AmountDisplayProps> = ({ displayMoney }) => (
	<div className="mb-3 text-center">
		<div className="flex gap-3 justify-center mt-2">
			<div
				className="flex-1 px-6 py-3 rounded-md font-bold text-2xl"
				style={{
					backgroundColor: NEXUS_COLORS.status.green,
					color: NEXUS_COLORS.white,
				}}
			>
				$ {displayMoney()}
			</div>
			<button
				type="button"
				className="px-6 py-3 rounded-md font-bold text-white text-xl"
				style={{ backgroundColor: NEXUS_COLORS.status.red }}
			>
				TANQUE LLENO
			</button>
		</div>
	</div>
);
