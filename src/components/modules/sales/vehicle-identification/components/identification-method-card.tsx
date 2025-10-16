import { CheckCircle, CreditCard, Key, Keyboard, Loader2 } from "lucide-react";
import { getCardClasses, HMI_COLORS } from "@/lib/config/hmi-styles-config";
import type { IdentificationMethod } from "@/lib/hooks/use-transaction-context";

export interface IdentificationMethodCardProps {
	method: IdentificationMethod;
	label: string;
	isActive: boolean;
	isIdentified: boolean;
	isReading?: boolean;
	placa?: string;
	onSelect: () => void;
}

/**
 * Tarjeta para método de identificación de vehículo
 *
 * Muestra diferentes estados:
 * - Inactivo: Seleccionable
 * - Activo/Leyendo: Esperando lectura
 * - Identificado: Vehículo identificado exitosamente
 *
 * @example
 * ```tsx
 * <IdentificationMethodCard
 *   method="RFID"
 *   label="LECTOR RFID"
 *   isActive={true}
 *   isIdentified={false}
 *   isReading={true}
 *   onSelect={() => setMethod("RFID")}
 * />
 * ```
 */
export const IdentificationMethodCard: React.FC<
	IdentificationMethodCardProps
> = ({
	method,
	label,
	isActive,
	isIdentified,
	isReading = false,
	placa,
	onSelect,
}) => {
	// Determinar ícono según método
	const getIcon = () => {
		const iconSize = 32;
		const iconProps = { size: iconSize, className: "flex-shrink-0" };

		switch (method) {
			case "RFID":
				return <CreditCard {...iconProps} />;
			case "IBUTTON":
				return <Key {...iconProps} />;
			case "MANUAL":
				return <Keyboard {...iconProps} />;
			default:
				return <CreditCard {...iconProps} />;
		}
	};

	// Determinar estado visual
	const getCardState = () => {
		if (isIdentified) return "success";
		if (isActive) return "active";
		return "default";
	};

	// Determinar contenido del status
	const getStatusContent = () => {
		if (isIdentified && placa) {
			return (
				<div className="flex items-center gap-3">
					<div className="flex items-center gap-2 text-green-700 font-bold">
						<CheckCircle size={20} />
						<span>IDENTIFICADO</span>
					</div>
					<div className="text-gray-800 font-mono text-xl font-bold tracking-wider">
						{placa}
					</div>
				</div>
			);
		}

		if (isReading) {
			return (
				<div className="flex items-center gap-2 text-blue-700 font-semibold">
					<Loader2 size={20} className="animate-spin" />
					<span>Esperando lectura...</span>
				</div>
			);
		}

		if (isActive) {
			return (
				<div className="text-blue-700 font-semibold">
					{method === "MANUAL" ? "Ingrese placa" : "Acerque dispositivo"}
				</div>
			);
		}

		return (
			<div className="text-gray-600">
				Click para {method === "MANUAL" ? "ingresar placa" : "iniciar lectura"}
			</div>
		);
	};

	const cardState = getCardState();

	return (
		<button
			type="button"
			onClick={onSelect}
			disabled={isIdentified || isReading}
			className={`
				${getCardClasses("md", cardState)}
				w-full min-h-[80px]
				cursor-pointer
				transition-all duration-200
				hover:shadow-md
				active:scale-98
				disabled:cursor-not-allowed
				disabled:opacity-90
			`}
			style={{
				borderColor:
					cardState === "success"
						? HMI_COLORS.success
						: cardState === "active"
							? HMI_COLORS.info
							: HMI_COLORS.border.medium,
			}}
		>
			<div className="flex items-center gap-3">
				{/* Ícono del método */}
				<div
					className="flex items-center justify-center p-2 rounded"
					style={{
						backgroundColor:
							cardState === "success"
								? HMI_COLORS.success + "20"
								: cardState === "active"
									? HMI_COLORS.info + "20"
									: HMI_COLORS.bg.medium,
						color:
							cardState === "success"
								? HMI_COLORS.success
								: cardState === "active"
									? HMI_COLORS.info
									: HMI_COLORS.textSecondary,
					}}
				>
					{getIcon()}
				</div>

				{/* Contenido */}
				<div className="flex-1 text-left">
					<div className="font-bold text-gray-800 mb-1">{label}</div>
					<div className="text-sm">{getStatusContent()}</div>
				</div>
			</div>
		</button>
	);
};

export default IdentificationMethodCard;
