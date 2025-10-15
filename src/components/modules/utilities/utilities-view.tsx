import { Settings } from "lucide-react";
import React, { useState } from "react";
import { HMIContainer } from "@/components/layouts/hmi-container";
import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";
import { mockSalesData } from "./mock-data";
import { SalesTable } from "./sales-table";
import { UtilitiesActions } from "./utilities-actions";
import { TestPrintView } from "./views/test-print/test-print-view";
import { PrinterSettingsView } from "./views/printer-settings/printer-settings-view";
import { LastTurnView } from "./views/last-turn/last-turn-view";

/**
 * Vista principal del módulo de Utilidades
 * Incluye navegación entre diferentes funcionalidades
 */
export const UtilitiesView: React.FC = () => {
	const { navigateBack, goToMenu } = useHMINavigation();
	const [currentView, setCurrentView] = useState<'main' | 'test-print' | 'printer-settings' | 'last-turn'>('main');

	/**
	 * Handler para los clicks en botones de acción
	 */
	const handleActionClick = (actionKey: string) => {
		switch (actionKey) {
			case "inicio":
				goToMenu();
				break;
			case "test-print":
				setCurrentView('test-print');
				break;
			case "printer-settings":
				setCurrentView('printer-settings');
				break;
			case "last-sales":
				setCurrentView('main');
				break;
			case "last-turn":
				setCurrentView('last-turn');
				break;
			default:
				console.warn(`Acción no reconocida: ${actionKey}`);
		}
	};

	const handleBackToMain = () => {
		setCurrentView('main');
	};

	// Renderizado condicional basado en la vista actual
	switch (currentView) {
		case 'test-print':
			return <TestPrintView />;
		case 'printer-settings':
			return <PrinterSettingsView />;
		case 'last-turn':
			return <LastTurnView />;
		default:
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
	}
};
