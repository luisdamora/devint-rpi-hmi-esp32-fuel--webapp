import { X } from "lucide-react";
import React from "react";
import { LAYOUT_DIMENSIONS } from "@/lib/config/layout-dimensions";
import { NEXUS_COLORS } from "@/lib/config/theme";
import { cn } from "@/lib/utils";
import {
	GRID_COLS_CLASSES,
	TOUCH_SELECT_CLASSES,
	TOUCH_SELECT_SIZES,
} from "./constants";
import { TouchSelectOptionItem } from "./touch-select-option";
import type { TouchSelectModalProps } from "./types";

/**
 * Modal fullscreen con grid de opciones
 */
export const TouchSelectModal: React.FC<TouchSelectModalProps> = ({
	isOpen,
	value,
	options,
	title,
	gridCols,
	onSelect,
	onClose,
	useFixedDimensions = false,
}) => {
	if (!isOpen) return null;

	const gridColsClass = GRID_COLS_CLASSES[gridCols];

	return (
		<div
			className={TOUCH_SELECT_CLASSES.modalOverlay}
			style={{ backgroundColor: NEXUS_COLORS.background.main }}
		>
			<div
				className={TOUCH_SELECT_CLASSES.modalContainer}
				style={
					useFixedDimensions
						? {
								maxWidth: `${LAYOUT_DIMENSIONS.WIDTH}px`,
								maxHeight: `${LAYOUT_DIMENSIONS.HEIGHT}px`,
							}
						: undefined
				}
			>
				{/* Header con botón de cerrar */}
				<div className={TOUCH_SELECT_CLASSES.modalHeader}>
					<h2 className={TOUCH_SELECT_CLASSES.modalTitle}>{title}</h2>
					<button
						type="button"
						onClick={onClose}
						className={TOUCH_SELECT_CLASSES.closeButton}
						style={{
							minWidth: TOUCH_SELECT_SIZES.closeButtonSize,
							minHeight: TOUCH_SELECT_SIZES.closeButtonSize,
						}}
					>
						<X size={32} className="text-white" />
					</button>
				</div>

				{/* Grid de opciones */}
				<div className={TOUCH_SELECT_CLASSES.optionsContainer}>
					<div className={cn("grid gap-4", gridColsClass)}>
						{options.map((option) => (
							<TouchSelectOptionItem
								key={option.value}
								option={option}
								isSelected={value === option.value}
								onClick={() => onSelect(option.value)}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
