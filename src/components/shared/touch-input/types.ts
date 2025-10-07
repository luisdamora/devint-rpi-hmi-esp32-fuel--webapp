/**
 * TouchInput - Definiciones de tipos TypeScript
 */

/**
 * Props del componente TouchInput
 */
export interface TouchInputProps {
	/** Valor actual del input */
	value: string;
	/** Callback al cambiar el valor */
	onChange: (value: string) => void;
	/** Etiqueta del campo */
	label?: string;
	/** Placeholder del input */
	placeholder?: string;
	/** Tipo de input (text, email, number, etc.) */
	type?: "text" | "email" | "number" | "tel" | "url";
	/** Deshabilitar el input */
	disabled?: boolean;
	/** Clases CSS adicionales */
	className?: string;
	/** Longitud máxima del texto */
	maxLength?: number;
	/** Requerido */
	required?: boolean;
	/** ID del input */
	id?: string;
	/** Usar dimensiones fijas del layout HMI (800x480px) */
	useFixedDimensions?: boolean;
	/** Modo del teclado: completo o solo numérico con guion */
	keyboardMode?: "full" | "numeric";
}

/**
 * Props del componente TouchInputTrigger
 */
export interface TouchInputTriggerProps {
	/** Valor actual */
	value: string;
	/** Placeholder */
	placeholder: string;
	/** Etiqueta */
	label?: string;
	/** Tipo de input */
	type?: string;
	/** Deshabilitado */
	disabled?: boolean;
	/** Clases adicionales */
	className?: string;
	/** ID del input */
	id?: string;
	/** Callback al hacer clic */
	onClick: () => void;
}

/**
 * Props del componente TouchInputModal
 */
export interface TouchInputModalProps {
	/** Estado de apertura */
	isOpen: boolean;
	/** Valor actual */
	value: string;
	/** Título del modal */
	title: string;
	/** Placeholder */
	placeholder: string;
	/** Tipo de input */
	type?: string;
	/** Longitud máxima */
	maxLength?: number;
	/** Callback al cambiar valor */
	onChange: (value: string) => void;
	/** Callback al cerrar */
	onClose: () => void;
	/** Callback al confirmar */
	onConfirm: () => void;
	/** Usar dimensiones fijas HMI */
	useFixedDimensions?: boolean;
	/** Modo del teclado */
	keyboardMode?: "full" | "numeric";
}

/**
 * Props del componente TouchKeyboard
 */
export interface TouchKeyboardProps {
	/** Callback al presionar una tecla */
	onKeyPress: (key: string) => void;
	/** Callback al presionar backspace */
	onBackspace: () => void;
	/** Callback al presionar espacio */
	onSpace: () => void;
	/** Callback al presionar clear */
	onClear: () => void;
	/** Estado de mayúsculas/minúsculas */
	isUppercase: boolean;
	/** Callback al cambiar mayúsculas */
	onToggleCase: () => void;
	/** Modo del teclado */
	mode?: "full" | "numeric";
}

/**
 * Tecla del teclado
 */
export interface KeyboardKey {
	/** Valor de la tecla */
	value: string;
	/** Label a mostrar */
	label: string;
	/** Ancho relativo (1 = normal, 2 = doble, etc.) */
	width?: number;
	/** Tipo especial de tecla */
	type?: "letter" | "number" | "special" | "action";
}
