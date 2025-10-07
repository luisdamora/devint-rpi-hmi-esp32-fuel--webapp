import { Plus } from "lucide-react";
import type React from "react";
import { cn } from "@/lib/utils";
import type { AmountDistribution, PaymentMethodData } from "../types";
import { PaymentMethodCard } from "./payment-method-card";

/**
 * Props del grid de métodos de pago
 */
export interface PaymentMethodsGridProps {
	/** Lista de métodos de pago configurados */
	methods: PaymentMethodData[];
	/** Monto total de la venta */
	totalAmount: number;
	/** Información de distribución de montos */
	distribution: AmountDistribution;
	/** Callback al actualizar un método */
	onUpdateMethod: (id: string, updates: Partial<PaymentMethodData>) => void;
	/** Callback al remover un método */
	onRemoveMethod: (id: string) => void;
	/** Callback al agregar un nuevo método */
	onAddMethod: () => void;
	/** Errores de validación */
	validationErrors: Record<string, string>;
}

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
 * PaymentMethodsGrid - Grid contenedor de métodos de pago
 *
 * Muestra un grid con las cards de métodos de pago y un panel de información
 * sobre la distribución de montos. Permite agregar hasta 3 métodos de pago.
 *
 * Características:
 * - Grid responsivo (3 columnas en desktop, vertical en mobile)
 * - Panel de información con totales y restante
 * - Botón para agregar métodos (máximo 3)
 * - Indicadores visuales de estado de distribución
 * - Validación de asignación completa
 *
 * @example
 * ```tsx
 * <PaymentMethodsGrid
 *   methods={paymentMethods}
 *   totalAmount={50000}
 *   distribution={distribution}
 *   onUpdateMethod={handleUpdate}
 *   onRemoveMethod={handleRemove}
 *   onAddMethod={handleAdd}
 *   validationErrors={errors}
 * />
 * ```
 */
export const PaymentMethodsGrid: React.FC<PaymentMethodsGridProps> = ({
	methods,
	totalAmount,
	distribution,
	onUpdateMethod,
	onRemoveMethod,
	onAddMethod,
	validationErrors,
}) => {
	const canAddMore = methods.length < 3;
	const isComplete = distribution.isComplete;

	return (
		<div className="space-y-6">
			{/* Panel de información de distribución */}
			<div
				className={cn(
					"border-2 rounded-lg p-4 transition-colors",
					isComplete
						? "bg-green-50 border-green-400"
						: "bg-yellow-50 border-yellow-400",
				)}
			>
				<h3 className="text-lg font-bold text-gray-700 mb-3">
					Distribución de Pagos
				</h3>
				<div className="grid grid-cols-3 gap-4 text-center">
					{/* Total */}
					<div className="space-y-1">
						<p className="text-sm text-gray-600 font-medium">Total</p>
						<p className="text-xl font-bold text-gray-800">
							{formatCurrency(totalAmount)}
						</p>
					</div>

					{/* Asignado */}
					<div className="space-y-1">
						<p className="text-sm text-gray-600 font-medium">Asignado</p>
						<p className="text-xl font-bold text-blue-600">
							{formatCurrency(distribution.assigned)}
						</p>
					</div>

					{/* Restante */}
					<div className="space-y-1">
						<p className="text-sm text-gray-600 font-medium">Restante</p>
						<p
							className={cn(
								"text-xl font-bold",
								distribution.remaining === 0
									? "text-green-600"
									: "text-red-600",
							)}
						>
							{formatCurrency(distribution.remaining)}
						</p>
					</div>
				</div>

				{/* Mensaje de validación */}
				{!isComplete && (
					<div className="mt-3 pt-3 border-t border-yellow-300">
						<p className="text-sm text-yellow-800 text-center">
							⚠️{" "}
							{validationErrors.distribution ||
								"Complete la distribución de montos para continuar"}
						</p>
					</div>
				)}

				{isComplete && (
					<div className="mt-3 pt-3 border-t border-green-300">
						<p className="text-sm text-green-800 text-center flex items-center justify-center gap-2">
							✓ Distribución completa
						</p>
					</div>
				)}
			</div>

			{/* Grid de métodos de pago */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				{methods.map((method, index) => (
					<PaymentMethodCard
						key={method.id}
						method={method}
						index={index}
						totalAmount={totalAmount}
						remaining={distribution.remaining}
						onUpdate={onUpdateMethod}
						onRemove={index > 0 ? onRemoveMethod : undefined}
						showRemove={index > 0}
						validationErrors={validationErrors}
					/>
				))}
			</div>

			{/* Botón agregar método */}
			{canAddMore && (
				<div className="flex justify-center">
					<button
						type="button"
						onClick={onAddMethod}
						className={cn(
							"flex items-center gap-2 px-6 py-3 rounded-lg",
							"border-2 border-dashed border-gray-400",
							"text-gray-600 font-semibold",
							"hover:bg-gray-50 hover:border-gray-600",
							"active:scale-95 transition-all duration-200",
						)}
					>
						<Plus size={20} />
						<span>Agregar Método de Pago</span>
					</button>
				</div>
			)}

			{/* Mensaje si ya hay 3 métodos */}
			{!canAddMore && (
				<div className="text-center">
					<p className="text-sm text-gray-500">
						Máximo de métodos de pago alcanzado (3)
					</p>
				</div>
			)}

			{/* Errores generales de métodos de pago */}
			{validationErrors.paymentMethods && (
				<div className="border-2 border-red-300 bg-red-50 rounded-lg p-4">
					<p className="text-sm text-red-700 text-center">
						⚠️ {validationErrors.paymentMethods}
					</p>
				</div>
			)}
		</div>
	);
};
