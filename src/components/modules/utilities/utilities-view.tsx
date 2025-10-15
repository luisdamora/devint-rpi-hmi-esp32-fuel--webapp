import { Settings } from "lucide-react";
b
import { Outlet, useNavigate } from "react-router";
import { HMIContainer } from "@/components/layouts/hmi-container";
import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";
import { mockSalesData } from "./mock-data";
import { SalesTable } from "./sales-table";
import { UtilitiesActions } from "./utilities-actions";

/**
 * Vista principal del módulo de Utilidades
 * Incluye navegación entre diferentes funcionalidades usando rutas anidadas
 */
export const UtilitiesView: React.FC = () => {
	const { goToMenu } = useHMINavigation();
	const navigate = useNavigate();

	/**
	 * Handler para los clicks en botones de acción
	 */
	const handleActionClick = (actionKey: string) => {
		switch (actionKey) {
			case "inicio":
				goToMenu();
				break;
			case "test-print":
				navigate("/utilities/test-print");
				break;
			case "printer-settings":
				navigate("/utilities/printer-settings");
				break;
			case "last-sales":
				navigate("/utilities");
				break;
			case "last-turn":
				navigate("/utilities/last-turn");
				break;
			default:
				console.warn(`Acción no reconocida: ${actionKey}`);
		}
	};

	return (
		<HMIContainer>
			<div className="h-full p-2">
				{/* Renderiza la vista actual basada en la ruta */}
				<Outlet />

				{/* Si estamos en la ruta principal /utilities, mostrar la tabla y acciones */}
				{window.location.pathname === "/utilities" && (
					<>
						{/* Sales Table */}
						<SalesTable salesData={mockSalesData} />

						{/* Actions */}
						<UtilitiesActions onActionClick={handleActionClick} />
					</>
				)}
			</div>
		</HMIContainer>
	);
};
