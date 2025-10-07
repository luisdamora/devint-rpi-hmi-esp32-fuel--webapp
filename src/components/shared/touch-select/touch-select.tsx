import React from "react";
import { TouchSelectModal } from "./touch-select-modal";
import { TouchSelectTrigger } from "./touch-select-trigger";
import type { TouchSelectProps } from "./types";
import { useTouchSelect } from "./use-touch-select";

/**
 * TouchSelect - Componente de selección optimizado para HMI touch
 *
 * Reemplaza el elemento <select> nativo con una interfaz fullscreen táctil
 * que facilita la selección de opciones en pantallas táctiles.
 *
 * @example
 * ```tsx
 * <TouchSelect
 *   value={selectedValue}
 *   options={myOptions}
 *   onChange={handleChange}
 *   label="Tipo de Documento:"
 *   gridCols={2}
 * />
 * ```
 */
export const TouchSelect: React.FC<TouchSelectProps> = ({
	value,
	options,
	onChange,
	placeholder = "Seleccione una opción...",
	label,
	disabled = false,
	className,
	gridCols = 2,
	useFixedDimensions = false,
}) => {
	const { isOpen, selectedOption, handleOpen, handleClose, handleSelect } =
		useTouchSelect(value, options, onChange, disabled);

	return (
		<>
			<TouchSelectTrigger
				selectedOption={selectedOption}
				placeholder={placeholder}
				label={label}
				disabled={disabled}
				className={className}
				onClick={handleOpen}
			/>

			<TouchSelectModal
				isOpen={isOpen}
				value={value}
				options={options}
				title={label || "Seleccione una opción"}
				gridCols={gridCols}
				onSelect={handleSelect}
				onClose={handleClose}
				useFixedDimensions={useFixedDimensions}
			/>
		</>
	);
};
