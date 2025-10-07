import React, { useState } from "react";
import { Outlet, useLocation } from "react-router";
import { HMIFrame } from "../layouts/hmi-frame";
import { HMILayout } from "../layouts/hmi-layout";

/**
 * HMIRoute - Layout para rutas del sistema HMI
 * Mantiene las dimensiones fijas 800x480px y el layout HMI
 * Usa Outlet de React Router para renderizar las vistas hijas
 */
export const HMIRoute: React.FC = () => {
	const location = useLocation();
	const [isLoading] = useState(false);
	const [error, setError] = useState<string | undefined>(undefined);

	// Extraer el nombre de la vista desde la ruta actual
	const currentView =
		location.pathname.split("/").filter(Boolean)[0] || "splash";

	return (
		<HMILayout currentView={currentView}>
			<HMIFrame>
				{/* <HMILayout currentView={currentView}> */}
				{/* Loading Overlay */}
				{isLoading && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
						<div className="bg-white rounded-lg p-4 flex items-center space-x-2">
							<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600" />
							<span className="text-sm">Cargando...</span>
						</div>
					</div>
				)}

				{/* Error Display */}
				{error && (
					<div className="fixed top-2 right-2 bg-red-600 text-white px-3 py-2 rounded-lg shadow-lg z-50 text-sm">
						<div className="flex items-center space-x-2">
							<span>⚠️</span>
							<span>{error}</span>
							<button
								type="button"
								onClick={() => setError(undefined)}
								className="ml-2 text-red-200 hover:text-white text-xs"
							>
								✕
							</button>
						</div>
					</div>
				)}

				{/* Current View - Rendered by React Router */}
				<div className="h-full">
					<Outlet />
				</div>

				{/* Debug Panel (only in development) */}
				{import.meta.env.DEV && (
					<div className="fixed bottom-2 left-2 bg-black bg-opacity-80 text-white p-2 rounded-lg text-xs z-40">
						<div>Ruta: {location.pathname}</div>
						<div>Vista: {currentView}</div>
					</div>
				)}
				{/* </HMILayout> */}
			</HMIFrame>
		</HMILayout>
	);
};
