import React from "react";
import { cn } from "@/lib/utils";
import { TOUCH_SELECT_CLASSES, TOUCH_SELECT_SIZES } from "./constants";
import type { TouchSelectOptionItemProps } from "./types";

/**
 * Componente de una opción individual en el grid
 */
export const TouchSelectOptionItem: React.FC<TouchSelectOptionItemProps> = ({
	option,
	isSelected,
	onClick,
}) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				TOUCH_SELECT_CLASSES.option,
				isSelected
					? TOUCH_SELECT_CLASSES.optionSelected
					: TOUCH_SELECT_CLASSES.optionUnselected,
			)}
			style={{
				minHeight: TOUCH_SELECT_SIZES.optionMinHeight,
				fontSize: TOUCH_SELECT_SIZES.optionFontSize,
			}}
		>
			<div className="flex items-center gap-4">
				{option.icon && (
					<span className="text-4xl flex-shrink-0">{option.icon}</span>
				)}
				<div className="flex-1">
					<div className="font-bold text-xl">{option.label}</div>
					{option.description && (
						<div
							className={cn(
								"text-sm mt-1",
								isSelected ? "text-green-100" : "text-gray-600",
							)}
						>
							{option.description}
						</div>
					)}
				</div>
			</div>
		</button>
	);
};
