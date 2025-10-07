import { Eraser } from "lucide-react";
import React from "react";
import {
	BUTTON_BG_STYLES,
	BUTTON_CLICK_EFFECTS,
	BUTTON_FOCUS_STYLES,
	BUTTON_VARIANTS,
	NEXUS_COLORS,
} from "@/lib/config/theme";
import { cn } from "@/lib/utils";

interface KeypadProps {
	onNumber: (num: string) => void;
	onClear: () => void;
	onEnter: () => void;
}

export const Keypad: React.FC<KeypadProps> = ({
	onNumber,
	onClear,
	onEnter,
}) => (
	<div className="grid grid-cols-3 gap-3 max-w-xl mx-auto">
		{["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((n) => (
			<button
				key={n}
				type="button"
				onClick={() => onNumber(n)}
				className={cn(
					"py-5 rounded-md text-white text-2xl font-semibold",
					`${BUTTON_BG_STYLES.gray.hover} ${BUTTON_CLICK_EFFECTS.scale} ${BUTTON_CLICK_EFFECTS.transition} ${BUTTON_CLICK_EFFECTS.shadow} ${BUTTON_CLICK_EFFECTS.focus} ${BUTTON_FOCUS_STYLES.gray}`,
				)}
				style={{ backgroundColor: NEXUS_COLORS.background.dark }}
			>
				{n}
			</button>
		))}

		<button
			type="button"
			onClick={onClear}
			className="py-5 rounded-md text-white font-semibold"
			style={{ backgroundColor: NEXUS_COLORS.status.red }}
		>
			<span className="inline-flex items-center gap-2">
				<Eraser size={20} />
				Borrar
			</span>
		</button>
		<button
			type="button"
			onClick={() => onNumber("0")}
			className="py-5 rounded-md text-white text-2xl font-semibold"
			style={{ backgroundColor: NEXUS_COLORS.background.dark }}
		>
			0
		</button>
		<button
			type="button"
			onClick={onEnter}
			className="py-4 rounded-md text-white font-semibold"
			style={{ backgroundColor: NEXUS_COLORS.status.green }}
		>
			Enter
		</button>
	</div>
);
