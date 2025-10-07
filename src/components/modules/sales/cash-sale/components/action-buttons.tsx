import React from "react";
import { BUTTON_STYLES } from "@/lib/config/theme";

interface ActionButtonsProps {
	onTripleZero: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
	onTripleZero,
}) => (
	<div className="grid grid-cols-3 gap-3 max-w-xl mx-auto mb-4">
		<button type="button" className={BUTTON_STYLES.primary}>
			$
		</button>
		<button type="button" className={BUTTON_STYLES.primary}>
			Vol.
		</button>
		<button
			type="button"
			onClick={onTripleZero}
			className={BUTTON_STYLES.primary}
		>
			x $1.000
		</button>
	</div>
);
