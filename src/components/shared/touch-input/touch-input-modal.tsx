import { Check, Eraser, X } from "lucide-react";
import React from "react";
import { LAYOUT_DIMENSIONS } from "@/lib/config/layout-dimensions";
import { NEXUS_COLORS } from "@/lib/config/theme";
import { TOUCH_INPUT_CLASSES, TOUCH_INPUT_SIZES } from "./constants";
import { TouchKeyboard } from "./touch-keyboard";
import type { TouchInputModalProps } from "./types";

/**
 * Modal fullscreen con teclado QWERTY
 */
export const TouchInputModal: React.FC<TouchInputModalProps> = ({
	isOpen,
	value,
	title,
	placeholder,
	maxLength,
	onChange,
	onClose,
	onConfirm,
	useFixedDimensions = false,
}) => {
	if (!isOpen) return null;

	// Handlers del teclado
	const handleKeyPress = (key: string) => {
		if (!maxLength || value.length < maxLength) {
			onChange(value + key);
		}
	};

	const handleBackspace = () => {
		if (value.length > 0) {
			onChange(value.slice(0, -1));
		}
	};

	const handleSpace = () => {
		if (!maxLength || value.length < maxLength) {
			onChange(value + " ");
		}
	};

	const handleClear = () => {
		onChange("");
	};

	const [isUppercase, setIsUppercase] = React.useState(false);

	return (
		<div
			className={TOUCH_INPUT_CLASSES.modalOverlay}
			style={{
				backgroundColor: useFixedDimensions
					? "black"
					: NEXUS_COLORS.background.main,
			}}
		>
			<div
				className={TOUCH_INPUT_CLASSES.modalContainer}
				style={
					useFixedDimensions
						? {
								maxWidth: `${LAYOUT_DIMENSIONS.WIDTH}px`,
								maxHeight: `${LAYOUT_DIMENSIONS.HEIGHT}px`,
								backgroundColor: NEXUS_COLORS.background.main,
								borderRadius: "3px",
								border: "1px solid #ccc",
							}
						: undefined
				}
			>
				{/* Header con título y botón cerrar */}
				<div className={TOUCH_INPUT_CLASSES.modalHeader}>
					<h2 className={TOUCH_INPUT_CLASSES.modalTitle}>{title}</h2>
					<button
						type="button"
						onClick={onClose}
						className={TOUCH_INPUT_CLASSES.closeButton}
						style={{
							minWidth: TOUCH_INPUT_SIZES.closeButtonSize,
							minHeight: TOUCH_INPUT_SIZES.closeButtonSize,
						}}
						title="Cancelar"
					>
						<X size={24} className="text-white" />
					</button>
				</div>

				{/* Display del texto */}
				<div
					className={TOUCH_INPUT_CLASSES.display}
					style={{
						minHeight: TOUCH_INPUT_SIZES.modalDisplayHeight,
						fontSize: TOUCH_INPUT_SIZES.modalDisplayFontSize,
					}}
				>
					<span className={value ? "text-gray-900" : "text-gray-400"}>
						{value || placeholder}
					</span>
					{maxLength && (
						<span className="text-gray-400 text-sm ml-2">
							({value.length}/{maxLength})
						</span>
					)}
				</div>

				{/* Teclado QWERTY */}
				<TouchKeyboard
					onKeyPress={handleKeyPress}
					onBackspace={handleBackspace}
					onSpace={handleSpace}
					onClear={handleClear}
					isUppercase={isUppercase}
					onToggleCase={() => setIsUppercase(!isUppercase)}
				/>

				{/* Botones de acción */}
				<div className={TOUCH_INPUT_CLASSES.actionButtons}>
					<button
						type="button"
						onClick={handleClear}
						className={TOUCH_INPUT_CLASSES.buttonClear}
						title="Limpiar"
					>
						<Eraser size={20} className="inline mr-2" />
						Limpiar
					</button>
					<button
						type="button"
						onClick={onConfirm}
						className={TOUCH_INPUT_CLASSES.buttonConfirm}
						title="Confirmar"
					>
						<Check size={20} className="inline mr-2" />
						Confirmar
					</button>
				</div>
			</div>
		</div>
	);
};
