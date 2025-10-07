import React from "react";
import { NEXUS_COLORS } from "@/lib/config/theme";

interface ActionButtonsProps {
	onTripleZero: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
	onTripleZero,
}) => (
	<div className="grid grid-cols-3 gap-3 max-w-xl mx-auto mb-4">
		<button
			type="button"
			className="text-center text-white font-semibold py-2 rounded-md"
			style={{ backgroundColor: NEXUS_COLORS.background.light }}
		>
			$
		</button>
		<button
			type="button"
			className="text-center text-white font-semibold py-2 rounded-md"
			style={{ backgroundColor: NEXUS_COLORS.background.light }}
		>
			Vol.
		</button>
		<button
			type="button"
			onClick={onTripleZero}
			className="text-center text-white font-semibold py-2 rounded-md"
			style={{ backgroundColor: NEXUS_COLORS.background.light }}
		>
			x $1.000
		</button>
	</div>
);
