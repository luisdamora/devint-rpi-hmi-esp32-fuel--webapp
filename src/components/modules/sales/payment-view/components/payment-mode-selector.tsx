import type React from "react";
import { cn } from "@/lib/utils";
import type { PaymentMode } from "../types";

/**
 * Props del selector de modo de pago
 */
export interface PaymentModeSelectorProps {
	/** Modo de pago actualmente seleccionado */
	mode: PaymentMode;
	/** Callback al cambiar el modo */
	onModeChange: (mode: PaymentMode) => void;
	/** Deshabilitar el selector */
	disabled?: boolean;
	/** Mostrar mensaje de bloqueo cuando el modo no puede cambiar */
	lockMessage?: string;
}

/**
 * PaymentModeSelector - Selector de modo CONTADO vs CRÉDITO
 *
 * Muestra dos botones grandes lado a lado para seleccionar el modo de pago:
 * - CONTADO (verde): Pago inmediato con múltiples métodos
 * - CRÉDITO (rojo): Pago diferido asociado a cuenta cliente
 *
 * Características:
 * - Botones grandes touch-friendly (altura mínima 80px)
 * - Feedback visual claro del modo activo
 * - Transiciones suaves con efecto de escala al presionar
 * - Iconos visuales (💵 para CONTADO, 💳 para CRÉDITO)
 *
 * @example
 * ```tsx
 * <PaymentModeSelector
 *   mode={currentMode}
 *   onModeChange={handleModeChange}
 *   disabled={isProcessing}
 * />
 * ```
 */
export const PaymentModeSelector: React.FC<PaymentModeSelectorProps> = ({
	mode,
	onModeChange,
	disabled = false,
	lockMessage,
}) => {
	return (
		<div className="space-y-2">
			{disabled && lockMessage && (
				<div className="bg-amber-50 border-2 border-amber-300 rounded-lg px-4 py-2 text-center">
					<p className="text-sm text-amber-800 font-medium">
						🔒 {lockMessage}
					</p>
				</div>
			)}
			<div className="grid grid-cols-2 gap-4 w-full">
			{/* Botón CONTADO */}
			<button
				type="button"
				onClick={() => onModeChange("CONTADO")}
				disabled={disabled}
				className={cn(
					"h-12 px-4 rounded-lg font-semibold text-lg transition-all duration-200",
					"flex flex-row items-center justify-center gap-2 shadow-md",
					"active:scale-95 disabled:cursor-not-allowed disabled:opacity-50",
					mode === "CONTADO"
						? "bg-[#7ED321] text-white border-4 border-[#6BB91C]"
						: "bg-white text-gray-600 border-2 border-gray-300 hover:bg-green-50 hover:border-green-400",
				)}
			>
				<span className="text-2xl">💵</span>
				<span>CONTADO</span>
			</button>

			{/* Botón CRÉDITO */}
			<button
				type="button"
				onClick={() => onModeChange("CREDITO")}
				disabled={disabled}
				className={cn(
					"h-12 px-4 rounded-lg font-semibold text-lg transition-all duration-200",
					"flex flex-row items-center justify-center gap-2 shadow-md",
					"active:scale-95 disabled:cursor-not-allowed disabled:opacity-50",
					mode === "CREDITO"
						? "bg-[#D0021B] text-white border-4 border-[#B00117]"
						: "bg-white text-gray-600 border-2 border-gray-300 hover:bg-red-50 hover:border-red-400",
				)}
			>
				<span className="text-2xl">💳</span>
				<span>CRÉDITO</span>
			</button>
			</div>
		</div>
	);
};
