import { useState, useCallback, useMemo } from "react";
import type { TouchSelectOption } from "./types";

/**
 * Hook personalizado para la lógica del TouchSelect
 */
export const useTouchSelect = (
	value: string,
	options: TouchSelectOption[],
	onChange: (value: string) => void,
	disabled: boolean,
) => {
	const [isOpen, setIsOpen] = useState(false);

	// Memoizar la opción seleccionada
	const selectedOption = useMemo(
		() => options.find((opt) => opt.value === value),
		[options, value],
	);

	// Manejar apertura del modal
	const handleOpen = useCallback(() => {
		if (!disabled) {
			setIsOpen(true);
		}
	}, [disabled]);

	// Manejar cierre del modal
	const handleClose = useCallback(() => {
		setIsOpen(false);
	}, []);

	// Manejar selección de opción
	const handleSelect = useCallback(
		(optionValue: string) => {
			onChange(optionValue);
			setIsOpen(false);
		},
		[onChange],
	);

	return {
		isOpen,
		selectedOption,
		handleOpen,
		handleClose,
		handleSelect,
	};
};
