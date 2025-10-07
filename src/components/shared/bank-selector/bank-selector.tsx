import type React from "react";
import { TouchSelect } from "@/components/shared/touch-select";
import { bankOptions } from "./bank-options";

/**
 * Props del componente BankSelector
 */
export interface BankSelectorProps {
	/** Código del banco seleccionado */
	value: string;
	/** Callback al seleccionar un banco */
	onChange: (value: string) => void;
	/** Etiqueta del campo (default: "Banco:") */
	label?: string;
	/** Texto placeholder (default: "Seleccione banco...") */
	placeholder?: string;
	/** Deshabilitar el componente */
	disabled?: boolean;
	/** Clases CSS adicionales */
	className?: string;
}

/**
 * BankSelector - Componente especializado para selección de bancos colombianos
 *
 * Extiende [`TouchSelect`](../touch-select) con una lista pre-configurada de los 16 bancos
 * principales de Colombia en un grid de 3×4 optimizado para HMI touch.
 *
 * Características:
 * - Grid de 3 columnas × 4 filas (12 bancos por página)
 * - Paginación automática (2 páginas para 16 bancos)
 * - Iconos de bancos (emojis por defecto, logos se pueden agregar después)
 * - Optimizado para pantallas touch HMI
 *
 * @example
 * ```tsx
 * <BankSelector
 *   value={selectedBank}
 *   onChange={setSelectedBank}
 *   label="Banco:"
 *   placeholder="Seleccione su banco..."
 * />
 * ```
 */
export const BankSelector: React.FC<BankSelectorProps> = ({
	value,
	onChange,
	label = "Banco:",
	placeholder = "Seleccione banco...",
	disabled = false,
	className,
}) => {
	return (
		<TouchSelect
			value={value}
			options={bankOptions}
			onChange={onChange}
			label={label}
			placeholder={placeholder}
			disabled={disabled}
			className={className}
			gridCols={3}
			useFixedDimensions={true}
		/>
	);
};
