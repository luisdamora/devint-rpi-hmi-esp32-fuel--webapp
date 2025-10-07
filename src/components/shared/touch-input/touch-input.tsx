import React from "react";
import { TouchInputModal } from "./touch-input-modal";
import { TouchInputTrigger } from "./touch-input-trigger";
import type { TouchInputProps } from "./types";
import { useTouchInput } from "./use-touch-input";

/**
 * TouchInput - Componente de input optimizado para HMI touch
 *
 * Reemplaza el elemento <input> nativo con una interfaz fullscreen táctil
 * que incluye un teclado QWERTY virtual para facilitar la entrada de texto
 * en pantallas táctiles.
 *
 * @example
 * ```tsx
 * <TouchInput
 *   value={name}
 *   onChange={setName}
 *   label="Nombre:"
 *   placeholder="Ingrese su nombre"
 *   maxLength={50}
 * />
 * ```
 */
export const TouchInput: React.FC<TouchInputProps> = ({
	value,
	onChange,
	label,
	placeholder = "Toque para escribir...",
	type = "text",
	disabled = false,
	className,
	maxLength,
	id,
	useFixedDimensions = false,
	keyboardMode = "full",
}) => {
	const { isOpen, tempValue, handleOpen, handleClose, handleConfirm, handleTempChange } =
		useTouchInput(value, onChange, disabled);

	return (
		<>
			<TouchInputTrigger
				value={value}
				placeholder={placeholder}
				label={label}
				type={type}
				disabled={disabled}
				className={className}
				id={id}
				onClick={handleOpen}
			/>

			<TouchInputModal
				isOpen={isOpen}
				value={tempValue}
				title={label || "Escriba aquí"}
				placeholder={placeholder}
				type={type}
				maxLength={maxLength}
				onChange={handleTempChange}
				onClose={handleClose}
				onConfirm={handleConfirm}
				useFixedDimensions={useFixedDimensions}
				keyboardMode={keyboardMode}
			/>
		</>
	);
};
