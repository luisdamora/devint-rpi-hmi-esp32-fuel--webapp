import { ChevronDown } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { TOUCH_SELECT_CLASSES, TOUCH_SELECT_SIZES } from "./constants";
import type { TouchSelectTriggerProps } from "./types";

/**
 * Componente del botón/trigger que abre el modal de selección
 */
export const TouchSelectTrigger: React.FC<TouchSelectTriggerProps> = ({
	selectedOption,
	placeholder,
	label,
	disabled,
	className,
	onClick,
}) => {
	return (
		<div className={cn("relative", className)}>
			{label && <div className={TOUCH_SELECT_CLASSES.label}>{label}</div>}
			<button
				type="button"
				onClick={onClick}
				disabled={disabled}
				className={cn(
					TOUCH_SELECT_CLASSES.trigger,
					disabled && TOUCH_SELECT_CLASSES.triggerDisabled,
				)}
				style={{
					fontSize: TOUCH_SELECT_SIZES.triggerFontSize,
					minHeight: TOUCH_SELECT_SIZES.triggerMinHeight,
				}}
			>
				<span
					className={cn(
						"flex items-center gap-3",
						!selectedOption && "text-gray-400",
					)}
				>
					{selectedOption?.icon && (
						<span className="text-2xl">{selectedOption.icon}</span>
					)}
					<span className="text-gray-900">
						{selectedOption?.label || placeholder}
					</span>
				</span>
				<ChevronDown size={24} className="text-gray-500 flex-shrink-0" />
			</button>
		</div>
	);
};
