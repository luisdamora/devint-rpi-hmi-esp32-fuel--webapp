import { Clock, Home, Printer, Receipt, Settings } from "lucide-react";
import React from "react";
import { NEXUS_COLORS } from "@/lib/config/theme";
import type { UtilitiesActionsProps, UtilityAction } from "./types";

/**
 * Componente que renderiza los botones de acción de utilidades
 * NOTA: No incluye botón "REINICIAR" según requisitos
 */
export const UtilitiesActions: React.FC<UtilitiesActionsProps> = ({
	onActionClick,
}) => {
	const actions: UtilityAction[] = [
		{
			key: "inicio",
			label: "INICIO",
			icon: <Home size={48} />,
			action: () => onActionClick("inicio"),
		},
		{
			key: "test-print",
			label: "TEST DE IMPRESION",
			icon: <Printer size={48} />,
			action: () => onActionClick("test-print"),
		},
		{
			key: "printer-settings",
			label: "AJUSTES IMPRESORA",
			icon: <Settings size={48} />,
			action: () => onActionClick("printer-settings"),
		},
		{
			key: "last-sales",
			label: "ULTIMAS VENTAS",
			icon: <Receipt size={48} />,
			action: () => onActionClick("last-sales"),
			isActive: true,
		},
		{
			key: "last-turn",
			label: "ULTIMO TURNO",
			icon: <Clock size={48} />,
			action: () => onActionClick("last-turn"),
		},
	];

	return (
		<div className="grid grid-cols-5 mt-16 gap-3 mx-auto px-2">
			{actions.map((action) => (
				<button
					key={action.key}
					type="button"
					onClick={action.action}
					className={`group relative rounded-md border-2 p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-transform hover:scale-[1.02] select-none`}
					style={{
						borderColor: NEXUS_COLORS.status.red,
						backgroundColor: "transparent",
					}}
					disabled={!action.action}
				>
					<div
						className="absolute top-0 left-0 right-0 text-center font-semibold"
						style={{
							transform: "translateY(-50%)",
							color: NEXUS_COLORS.white,
						}}
					>
						<span
							className="inline-block px-3 text-xs"
							style={{
								backgroundColor: NEXUS_COLORS.status.red,
								borderRadius: 4,
							}}
						>
							{action.label}
						</span>
					</div>
					<div className="flex items-center justify-center h-24">
						<span className="text-white" aria-hidden>
							{action.icon}
						</span>
					</div>
				</button>
			))}
		</div>
	);
};
