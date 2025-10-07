import type React from "react";

/**
 * Opción individual del TouchSelect
 */
export interface TouchSelectOption {
	/** Valor único de la opción */
	value: string;
	/** Texto principal mostrado */
	label: string;
	/** Icono opcional (emoji o componente React) */
	icon?: React.ReactNode;
	/** Descripción adicional opcional */
	description?: string;
}

/**
 * Props del componente TouchSelect
 */
export interface TouchSelectProps {
	/** Valor actualmente seleccionado */
	value: string;
	/** Array de opciones disponibles */
	options: TouchSelectOption[];
	/** Callback al seleccionar una opción */
	onChange: (value: string) => void;
	/** Texto cuando no hay selección */
	placeholder?: string;
	/** Etiqueta del campo */
	label?: string;
	/** Deshabilitar el componente */
	disabled?: boolean;
	/** Clases CSS adicionales */
	className?: string;
	/** Número de columnas en grid (responsive) */
	gridCols?: 1 | 2 | 3 | 4;
	/** Usar dimensiones fijas del layout HMI (800x480px) */
	useFixedDimensions?: boolean;
}

/**
 * Props del componente TouchSelectTrigger
 */
export interface TouchSelectTriggerProps {
	/** Opción seleccionada actual */
	selectedOption?: TouchSelectOption;
	/** Texto placeholder */
	placeholder: string;
	/** Etiqueta del campo */
	label?: string;
	/** Estado deshabilitado */
	disabled: boolean;
	/** Clases CSS adicionales */
	className?: string;
	/** Callback al hacer click */
	onClick: () => void;
}

/**
 * Props del componente TouchSelectModal
 */
export interface TouchSelectModalProps {
	/** Estado de apertura del modal */
	isOpen: boolean;
	/** Valor seleccionado actual */
	value: string;
	/** Array de opciones */
	options: TouchSelectOption[];
	/** Título del modal */
	title: string;
	/** Número de columnas en grid */
	gridCols: 1 | 2 | 3 | 4;
	/** Callback al seleccionar opción */
	onSelect: (value: string) => void;
	/** Callback al cerrar modal */
	onClose: () => void;
	/** Usar dimensiones fijas del layout HMI (800x480px) */
	useFixedDimensions?: boolean;
}

/**
 * Props del componente TouchSelectOption
 */
export interface TouchSelectOptionItemProps {
	/** Opción a mostrar */
	option: TouchSelectOption;
	/** Si está seleccionada */
	isSelected: boolean;
	/** Callback al hacer click */
	onClick: () => void;
}
