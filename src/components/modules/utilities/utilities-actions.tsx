import { Clock, Home, Printer, Receipt, Settings } from "lucide-react";
import React from "react";
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
			color: "bg-red-600 hover:bg-red-700",
			icon: <Home size={32} />,
			action: () => onActionClick("inicio"),
		},
		{
			key: "test-print",
			label: "TEST DE IMPRESION",
			color: "bg-orange-500 hover:bg-orange-600",
			icon: <Printer size={32} />,
			action: () => onActionClick("test-print"),
		},
		{
			key: "printer-settings",
			label: "AJUSTES IMPRESORA",
			color: "bg-purple-600 hover:bg-purple-700",
			icon: <Settings size={32} />,
			action: () => onActionClick("printer-settings"),
		},
		{
			key: "last-sales",
			label: "ULTIMAS VENTAS",
			color: "bg-yellow-500 hover:bg-yellow-600",
			icon: <Receipt size={32} />,
			action: () => onActionClick("last-sales"),
			isActive: true,
		},
		{
			key: "last-turn",
			label: "ULTIMO TURNO",
			color: "bg-cyan-500 hover:bg-cyan-600",
			icon: <Clock size={32} />,
			action: () => onActionClick("last-turn"),
		},
	];

	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto px-4">
			{actions.map((action) => (
				<button
					key={action.key}
					type="button"
					onClick={action.action}
					className={`
						${action.color}
						${action.isActive ? "ring-4 ring-yellow-300" : ""}
						text-white font-semibold
						px-6 py-4
						rounded-lg
						flex flex-col items-center justify-center gap-2
						transition-all duration-200
						hover:scale-105
						disabled:opacity-50 disabled:cursor-not-allowed
						shadow-lg
					`}
					disabled={!action.action}
				>
					{action.icon}
					<span className="text-sm text-center leading-tight">
						{action.label}
					</span>
				</button>
			))}
		</div>
	);
};
