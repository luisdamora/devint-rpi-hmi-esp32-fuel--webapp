import { Keyboard } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { TOUCH_INPUT_CLASSES, TOUCH_INPUT_SIZES } from "./constants";
import type { TouchInputTriggerProps } from "./types";

/**
 * Input trigger que abre el modal del teclado
 */
export const TouchInputTrigger: React.FC<TouchInputTriggerProps> = ({
	value,
	placeholder,
	label,
	disabled,
	className,
	id,
	onClick,
}) => {
	return (
		<div className={className}>
			{label && (
				<label htmlFor={id} className={TOUCH_INPUT_CLASSES.label}>
					{label}
				</label>
			)}
			<button
				type="button"
				id={id}
				onClick={onClick}
				disabled={disabled}
				className={cn(
					TOUCH_INPUT_CLASSES.trigger,
					disabled && TOUCH_INPUT_CLASSES.triggerDisabled,
				)}
				style={{
					minHeight: TOUCH_INPUT_SIZES.triggerMinHeight,
					fontSize: TOUCH_INPUT_SIZES.triggerFontSize,
				}}
			>
				<span className={cn("text-gray-900", !value && "text-gray-400")}>
					{value || placeholder}
				</span>
				<Keyboard size={20} className="text-gray-500 flex-shrink-0" />
			</button>
		</div>
	);
};
