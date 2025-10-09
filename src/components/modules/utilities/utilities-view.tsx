import { Settings } from "lucide-react";
import React from "react";
import { HMIContainer } from "@/components/layouts/hmi-container";
import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";
import { mockSalesData } from "./mock-data";
import { SalesTable } from "./sales-table";
import { UtilitiesActions } from "./utilities-actions";

/**
 * Vista principal del módulo de Utilidades
 * Incluye tabla de últimas ventas y botones de acción (sin REINICIAR)
 */
export const UtilitiesView: React.FC = () => {
	const { navigateBack, goToMenu } = useHMINavigation();

	/**
	 * Handler para los clicks en botones de acción
	 */
	const handleActionClick = (actionKey: string) => {
		switch (actionKey) {
			case "inicio":
				goToMenu();
				break;
			case "test-print":
				// TODO: Implementar test de impresión
				console.log("Test de impresión");
				break;
			case "printer-settings":
				// TODO: Implementar configuración de impresora
				console.log("Ajustes de impresora");
				break;
			case "last-sales":
				// Ya estamos en esta vista
				break;
			case "last-turn":
				// TODO: Implementar vista de último turno
				console.log("Último turno");
				break;
			default:
				console.warn(`Acción no reconocida: ${actionKey}`);
		}
	};

	return (
		<HMIContainer>
			<div className="h-full p-2">
				{/* Sales Table */}
				<SalesTable salesData={mockSalesData} />

				{/* Actions */}
				<UtilitiesActions onActionClick={handleActionClick} />
			</div>
		</HMIContainer>
	);
};
