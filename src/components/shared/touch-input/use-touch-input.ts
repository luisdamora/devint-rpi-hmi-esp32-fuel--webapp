import { useCallback, useState } from "react";

/**
 * Hook personalizado para la lógica del TouchInput
 */
export const useTouchInput = (
	value: string,
	onChange: (value: string) => void,
	disabled: boolean,
) => {
	const [isOpen, setIsOpen] = useState(false);
	const [tempValue, setTempValue] = useState(value);
	const [isUppercase, setIsUppercase] = useState(false);

	// Abrir modal y sincronizar valor temporal
	const handleOpen = useCallback(() => {
		if (!disabled) {
			setTempValue(value);
			setIsOpen(true);
		}
	}, [disabled, value]);

	// Cerrar modal sin guardar
	const handleClose = useCallback(() => {
		setIsOpen(false);
		setTempValue(value); // Restaurar valor original
	}, [value]);

	// Confirmar y guardar el valor
	const handleConfirm = useCallback(() => {
		onChange(tempValue);
		setIsOpen(false);
	}, [onChange, tempValue]);

	// Cambiar el valor temporal
	const handleTempChange = useCallback((newValue: string) => {
		setTempValue(newValue);
	}, []);

	// Toggle mayúsculas/minúsculas
	const toggleCase = useCallback(() => {
		setIsUppercase((prev) => !prev);
	}, []);

	return {
		isOpen,
		tempValue,
		isUppercase,
		handleOpen,
		handleClose,
		handleConfirm,
		handleTempChange,
		toggleCase,
	};
};
