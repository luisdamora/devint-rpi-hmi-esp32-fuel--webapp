import { ArrowRight, Loader2 } from "lucide-react";
import type React from "react";
import { cn } from "@/lib/utils";

/**
 * Props del botón de guardar
 */
export interface SaveButtonProps {
	/** Si el formulario es válido */
	isValid: boolean;
	/** Si la distribución de montos está completa */
	isComplete: boolean;
	/** Callback al hacer click en guardar */
	onSave: () => void;
	/** Estado de carga/guardando */
	isLoading?: boolean;
	/** Deshabilitar el botón manualmente */
	disabled?: boolean;
	/** Mensaje personalizado cuando está inválido */
	invalidMessage?: string;
}

/**
 * SaveButton - Botón de guardar con validación
 *
 * Botón grande tipo HMI para confirmar y guardar la venta.
 * Muestra estados visuales según validación y distribución.
 *
 * Características:
 * - Botón fullwidth con altura touch-friendly (80px)
 * - Color verde cuando está habilitado y válido
 * - Color gris cuando está deshabilitado o inválido
 * - Icono de flecha derecha (ArrowRight)
 * - Loader animado durante guardado
 * - Feedback visual claro del estado
 * - Mensaje de error cuando está inválido
 *
 * Estados:
 * - Enabled: verde, activo, clickeable
 * - Disabled: gris, no clickeable, cursor not-allowed
 * - Loading: con spinner, no clickeable
 * - Invalid: gris, con mensaje de error
 *
 * @example
 * ```tsx
 * <SaveButton
 *   isValid={validation.isValid}
 *   isComplete={distribution.isComplete}
 *   onSave={handleSave}
 *   isLoading={isSaving}
 * />
 * ```
 */
export const SaveButton: React.FC<SaveButtonProps> = ({
	isValid,
	isComplete,
	onSave,
	isLoading = false,
	disabled = false,
	invalidMessage,
}) => {
	// Determinar si el botón puede ser usado
	const canSave = isValid && isComplete && !disabled && !isLoading;

	// Mensaje de error predeterminado
	const defaultInvalidMessage = !isValid
		? "Complete todos los campos requeridos"
		: !isComplete
			? "Complete la distribución de montos"
			: "No se puede guardar en este momento";

	const errorMessage = invalidMessage || defaultInvalidMessage;

	return (
		<div className="space-y-2">
			{/* Botón principal */}
			<button
				type="button"
				onClick={canSave ? onSave : undefined}
				disabled={!canSave}
				className={cn(
					"w-full h-10 rounded-lg font-bold text-xl",
					"flex items-center justify-center gap-3",
					"transition-all duration-200 shadow-lg",
					"disabled:cursor-not-allowed",
					canSave
						? [
								"bg-[#7ED321] text-white",
								"hover:bg-[#6BB91C]",
								"active:scale-95",
								"shadow-green-300",
							]
						: [
								"bg-gray-400 text-gray-200",
								"cursor-not-allowed",
								"shadow-gray-300",
							],
				)}
			>
				{isLoading ? (
					<>
						<Loader2 size={24} className="animate-spin" />
						<span>GUARDANDO...</span>
					</>
				) : (
					<>
						<span>GUARDAR VENTA</span>
						<ArrowRight size={24} />
					</>
				)}
			</button>

			{/* Mensaje de error/validación */}
			{!canSave && !isLoading && (
				<div className="flex items-center justify-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-300 rounded-lg">
					<span className="text-yellow-700 text-sm font-medium">
						⚠️ {errorMessage}
					</span>
				</div>
			)}

			{/* Mensaje de confirmación cuando está listo */}
			{canSave && !isLoading && (
				<div className="flex items-center justify-center gap-2 px-4 py-2 bg-green-50 border border-green-300 rounded-lg">
					<span className="text-green-700 text-sm font-medium">
						✓ Todo listo para guardar
					</span>
				</div>
			)}
		</div>
	);
};
