import { X } from "lucide-react";
import type React from "react";
import { BankSelector } from "@/components/shared/bank-selector";
import { TouchInput } from "@/components/shared/touch-input";
import { TouchSelect } from "@/components/shared/touch-select";
import type { TouchSelectOption } from "@/components/shared/touch-select/types";
import { cn } from "@/lib/utils";
import type { PaymentMethodData } from "../types";

/**
 * Props del componente PaymentMethodCard
 */
export interface PaymentMethodCardProps {
	/** Datos del método de pago */
	method: PaymentMethodData;
	/** Índice del método en la lista (para título) */
	index: number;
	/** Monto total de la venta */
	totalAmount: number;
	/** Monto restante por asignar */
	remaining: number;
	/** Callback al actualizar el método */
	onUpdate: (id: string, updates: Partial<PaymentMethodData>) => void;
	/** Callback al remover el método (opcional) */
	onRemove?: (id: string) => void;
	/** Errores de validación */
	validationErrors: Record<string, string>;
	/** Si se debe mostrar el botón de remover */
	showRemove?: boolean;
}

/**
 * Opciones de tipo de método de pago
 */
const methodTypeOptions: TouchSelectOption[] = [
	{ value: "TARJETA", label: "Tarjeta", icon: "💳" },
	{ value: "EFECTIVO", label: "Efectivo", icon: "💵" },
	{ value: "OTRO", label: "Otro", icon: "📝" },
];

/**
 * Opciones de franquicia de tarjeta
 */
const franchiseOptions: TouchSelectOption[] = [
	{ value: "VISA", label: "Visa", icon: "💳" },
	{ value: "MASTERCARD", label: "Mastercard", icon: "💳" },
	{ value: "AMEX", label: "American Express", icon: "💳" },
	{ value: "DINERS", label: "Diners Club", icon: "💳" },
];

/**
 * Helper para formatear montos en pesos colombianos
 */
function formatCurrency(amount: number): string {
	return new Intl.NumberFormat("es-CO", {
		style: "currency",
		currency: "COP",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(amount);
}

/**
 * PaymentMethodCard - Card individual para un método de pago
 *
 * Renderiza un card con los campos necesarios según el tipo de método:
 * - TARJETA: Selector de banco, franquicia y monto
 * - EFECTIVO: Solo campo de monto
 * - OTRO: Solo campo de monto
 *
 * Características:
 * - Campos condicionales según tipo seleccionado
 * - Validación de montos y campos obligatorios
 * - Estado deshabilitado visual si enabled=false
 * - Botón de remover opcional
 * - Feedback visual de errores
 *
 * @example
 * ```tsx
 * <PaymentMethodCard
 *   method={paymentMethod}
 *   index={0}
 *   totalAmount={50000}
 *   remaining={0}
 *   onUpdate={handleUpdate}
 *   onRemove={handleRemove}
 *   validationErrors={errors}
 *   showRemove={true}
 * />
 * ```
 */
export const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({
	method,
	index,
	totalAmount: _totalAmount,
	remaining,
	onUpdate,
	onRemove,
	validationErrors,
	showRemove = false,
}) => {
	const isDisabled = !method.enabled;
	const isTarjeta = method.type === "TARJETA";

	// Calcular monto máximo permitido (monto actual + restante)
	const maxAmount = method.amount + remaining;

	return (
		<div
			className={cn(
				"border-2 rounded-lg p-4 space-y-4 transition-all duration-200",
				isDisabled
					? "opacity-50 bg-gray-50 border-gray-300"
					: "bg-white border-blue-400 shadow-md",
			)}
		>
			{/* Header con título y botón remover */}
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-bold text-gray-700">Método {index + 1}</h3>
				{showRemove && onRemove && (
					<button
						type="button"
						onClick={() => onRemove(method.id)}
						className={cn(
							"p-2 rounded-full transition-colors",
							"hover:bg-red-100 active:scale-95",
							"text-red-500 hover:text-red-700",
						)}
						aria-label="Remover método"
					>
						<X size={20} />
					</button>
				)}
			</div>

			{/* Selector de tipo de método */}
			<div className="space-y-1">
				<TouchSelect
					value={method.type}
					options={methodTypeOptions}
					onChange={(value) =>
						onUpdate(method.id, { type: value as PaymentMethodData["type"] })
					}
					label="Tipo de Pago:"
					placeholder="Seleccione tipo..."
					disabled={isDisabled}
					gridCols={3}
				/>
				{validationErrors[`method_${method.id}_type`] && (
					<p className="text-sm text-red-500 px-2">
						{validationErrors[`method_${method.id}_type`]}
					</p>
				)}
			</div>

			{/* Campos específicos para TARJETA */}
			{isTarjeta && (
				<>
					{/* Selector de banco */}
					<div className="space-y-1">
						<BankSelector
							value={method.bank || ""}
							onChange={(value) => onUpdate(method.id, { bank: value })}
							label="Banco:"
							placeholder="Seleccione banco..."
							disabled={isDisabled}
						/>
						{validationErrors[`method_${method.id}_bank`] && (
							<p className="text-sm text-red-500 px-2">
								{validationErrors[`method_${method.id}_bank`]}
							</p>
						)}
					</div>

					{/* Selector de franquicia */}
					<div className="space-y-1">
						<TouchSelect
							value={method.franchise || ""}
							options={franchiseOptions}
							onChange={(value) =>
								onUpdate(method.id, {
									franchise: value as PaymentMethodData["franchise"],
								})
							}
							label="Franquicia:"
							placeholder="Seleccione franquicia..."
							disabled={isDisabled}
							gridCols={2}
						/>
						{validationErrors[`method_${method.id}_franchise`] && (
							<p className="text-sm text-red-500 px-2">
								{validationErrors[`method_${method.id}_franchise`]}
							</p>
						)}
					</div>
				</>
			)}

			{/* Campo de monto (todos los tipos) */}
			<div className="space-y-1">
				<TouchInput
					value={method.amount.toString()}
					onChange={(value) => {
						const numValue = Number.parseInt(value, 10) || 0;
						// Limitar al máximo permitido
						const finalValue = Math.min(numValue, maxAmount);
						onUpdate(method.id, { amount: finalValue });
					}}
					label="Monto:"
					placeholder="0"
					keyboardMode="numeric"
					disabled={isDisabled}
				/>
				<div className="flex items-center justify-between text-sm px-2">
					<span className="text-gray-600">
						Máximo: {formatCurrency(maxAmount)}
					</span>
					{validationErrors[`method_${method.id}_amount`] && (
						<span className="text-red-500">
							{validationErrors[`method_${method.id}_amount`]}
						</span>
					)}
				</div>
			</div>

			{/* Información adicional */}
			<div className="pt-2 border-t border-gray-200">
				<div className="flex items-center justify-between text-sm">
					<span className="text-gray-600">Estado:</span>
					<span
						className={cn(
							"font-semibold",
							method.enabled ? "text-green-600" : "text-gray-400",
						)}
					>
						{method.enabled ? "Activo" : "Inactivo"}
					</span>
				</div>
			</div>
		</div>
	);
};
