import { Droplet, HandCoins } from "lucide-react";

import React from "react";
import { BUTTON_STYLES } from "@/lib/config/theme";

interface ActionButtonsProps {
	onTripleZero: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
	onTripleZero,
}) => (
	<div className="grid grid-cols-3 gap-3 max-w-xl mx-auto mb-4">
		<button
			type="button"
			className={`${BUTTON_STYLES.primary} flex items-center justify-center`}
		>
			<HandCoins className="w-6 h-6 mr-2" />$
		</button>
		<button
			type="button"
			className={`${BUTTON_STYLES.primary} flex items-center justify-center`}
		>
			<Droplet className="w-6 h-6 mr-2" />
			Vol.
		</button>
		<button
			type="button"
			onClick={onTripleZero}
			className={`${BUTTON_STYLES.primary} flex items-center justify-center`}
		>
			x $1.000
		</button>
	</div>
);
