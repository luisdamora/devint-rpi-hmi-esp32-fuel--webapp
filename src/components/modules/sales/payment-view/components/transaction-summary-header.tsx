import { Fuel } from "lucide-react";
import { HMI_COLORS } from "@/lib/config/hmi-styles-config";
import type { TransactionType } from "@/lib/hooks/use-transaction-context";

export interface TransactionSummaryHeaderProps {
	/** Tipo de transacción */
	transactionType: TransactionType;
	/** Monto de la transacción en pesos */
	amount: number;
	/** Galones calculados */
	gallons: number;
	/** Opcional: Mostrar ID de factura */
	invoiceId?: string;
}

/**
 * TransactionSummaryHeader - Header consolidado para Payment View
 *
 * Muestra de forma prominente:
 * - Tipo de transacción (CONTADO/CREDITO)
 * - Monto total (en verde)
 * - Estado actual en galones (en azul)
 *
 * Diseño basado en las imágenes de referencia con optimizaciones HMI
 *
 * @example
 * ```tsx
 * <TransactionSummaryHeader
 *   transactionType="CONTADO"
 *   amount={100000}
 *   gallons={12.45}
 * />
 * ```
 */
export const TransactionSummaryHeader: React.FC<
	TransactionSummaryHeaderProps
> = ({ transactionType, amount, gallons, invoiceId }) => {
	// Formatear monto a pesos colombianos
	const formattedAmount = amount.toLocaleString("es-CO", {
		style: "currency",
		currency: "COP",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	});

	// Formatear galones con 2 decimales
	const formattedGallons = gallons.toFixed(2);

	return (
		<div
			className="grid grid-cols-2 gap-3 p-3 rounded-lg shadow-lg"
			style={{
				background: `linear-gradient(135deg, ${HMI_COLORS.navy[900]} 0%, ${HMI_COLORS.navy[800]} 100%)`,
			}}
		>
			{/* Columna 1: Tipo y Monto */}
			<div className="space-y-2">
				{/* Título con ícono */}
				<div className="flex items-center gap-2 text-white">
					<Fuel size={20} className="flex-shrink-0" />
					<h2 className="text-lg font-bold truncate">
						TRANSACCION DE {transactionType}
					</h2>
				</div>

				{/* Monto principal */}
				<div
					className="p-3 rounded-lg text-center shadow-md"
					style={{ backgroundColor: HMI_COLORS.success }}
				>
					<div className="text-xs text-white opacity-90 mb-1 font-medium">
						MONTO
					</div>
					<span className="text-2xl font-bold text-white">
						{formattedAmount}
					</span>
				</div>
			</div>

			{/* Columna 2: Estado Actual */}
			<div className="space-y-2">
				{/* Label de estado */}
				<div
					className="text-sm font-bold"
					style={{ color: HMI_COLORS.warning }}
				>
					ESTADO ACTUAL
				</div>

				{/* Estado en galones */}
				<div
					className="p-3 rounded-lg text-center shadow-md"
					style={{ backgroundColor: HMI_COLORS.info }}
				>
					<div className="text-xs text-white opacity-90 mb-1 font-medium">
						{invoiceId ? "ID FACTURA" : "GALONES"}
					</div>
					<span className="text-2xl font-bold text-white">
						{invoiceId || `${formattedGallons} Gal`}
					</span>
				</div>
			</div>
		</div>
	);
};

export default TransactionSummaryHeader;
