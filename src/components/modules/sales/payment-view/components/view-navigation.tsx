import { ArrowLeft, ArrowRight, CheckCircle, Circle } from "lucide-react";
import type React from "react";
import { cn } from "@/lib/utils";

/**
 * Props del componente de navegación entre vistas
 */
export interface ViewNavigationProps {
	/** Vista actual (1 o 2) */
	currentView: 1 | 2;
	/** Si puede proceder a la siguiente vista */
	canProceed: boolean;
	/** Si la vista actual está completa */
	isCurrentViewComplete: boolean;
	/** Callback al navegar a la vista anterior */
	onPrevious?: () => void;
	/** Callback al navegar a la siguiente vista */
	onNext?: () => void;
	/** Callback al guardar (solo en última vista) */
	onSave?: () => void;
	/** Si es la última vista */
	isLastView: boolean;
}

/**
 * ViewNavigation - Componente de navegación entre vistas de pago
 *
 * Muestra el progreso visual entre las vistas y proporciona controles
 * de navegación hacia atrás/adelante o guardar.
 *
 * Características:
 * - Indicador visual de progreso (Paso 1/2, Paso 2/2)
 * - Estados visuales claros (pendiente, activo, completado)
 * - Navegación condicional según estado de completitud
 * - Diseño touch-friendly para HMI
 *
 * @example
 * ```tsx
 * <ViewNavigation
 *   currentView={1}
 *   canProceed={isValid}
 *   isCurrentViewComplete={isComplete}
 *   onNext={handleNext}
 *   isLastView={false}
 * />
 * ```
 */
export const ViewNavigation: React.FC<ViewNavigationProps> = ({
	currentView,
	canProceed,
	isCurrentViewComplete,
	onPrevious,
	onNext,
	onSave,
	isLastView,
}) => {
	return (
		<div className="flex items-center justify-between w-full bg-white rounded-lg p-4 shadow-sm border-2 border-gray-200">
			{/* Indicador de progreso */}
			<div className="flex items-center gap-4">
				{/* Paso 1: Información del cliente */}
				<div className="flex items-center gap-2">
					<div className={cn(
						"w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
						currentView === 1 
							? "bg-blue-500 text-white" 
							: isCurrentViewComplete 
								? "bg-green-500 text-white" 
								: "bg-gray-300 text-gray-600"
					)}>
						{isCurrentViewComplete && currentView !== 1 ? (
							<CheckCircle size={16} />
						) : (
							"1"
						)}
					</div>
					<span className={cn(
						"text-sm font-medium",
						currentView === 1 ? "text-blue-600" : "text-gray-600"
					)}>
						Información del Cliente
					</span>
				</div>

				{/* Flecha separadora */}
				<ArrowRight size={16} className="text-gray-400" />

				{/* Paso 2: Métodos de pago */}
				<div className="flex items-center gap-2">
					<div className={cn(
						"w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
						currentView === 2 
							? "bg-blue-500 text-white" 
							: isCurrentViewComplete 
								? "bg-green-500 text-white" 
								: "bg-gray-300 text-gray-600"
					)}>
						{isCurrentViewComplete && currentView !== 2 ? (
							<CheckCircle size={16} />
						) : (
							"2"
						)}
					</div>
					<span className={cn(
						"text-sm font-medium",
						currentView === 2 ? "text-blue-600" : "text-gray-600"
					)}>
						Métodos de Pago
					</span>
				</div>
			</div>

			{/* Controles de navegación */}
			<div className="flex items-center gap-3">
				{/* Botón Anterior (solo si no es la primera vista) */}
				{onPrevious && (
					<button
						type="button"
						onClick={onPrevious}
						className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white transition-colors"
					>
						<ArrowLeft size={16} />
						<span>Anterior</span>
					</button>
				)}

				{/* Botón Siguiente/Guardar */}
				{isLastView ? (
					<button
						type="button"
						onClick={onSave}
						disabled={!canProceed}
						className={cn(
							"flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-lg transition-all duration-200",
							canProceed
								? "bg-green-500 hover:bg-green-600 text-white shadow-lg active:scale-95"
								: "bg-gray-300 text-gray-500 cursor-not-allowed"
						)}
					>
						<span>Guardar Pago</span>
						<CheckCircle size={20} />
					</button>
				) : (
					<button
						type="button"
						onClick={onNext}
						disabled={!canProceed}
						className={cn(
							"flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-lg transition-all duration-200",
							canProceed
								? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg active:scale-95"
								: "bg-gray-300 text-gray-500 cursor-not-allowed"
						)}
					>
						<span>Siguiente</span>
						<ArrowRight size={20} />
					</button>
				)}
			</div>
		</div>
	);
};
