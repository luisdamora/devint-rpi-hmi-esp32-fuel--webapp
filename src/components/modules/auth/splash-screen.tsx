import React from "react";

export const SplashScreen: React.FC = () => {
	return (
		<div className="flex items-center justify-center h-screen bg-gradient-to-b from-blue-900 to-blue-600">
			<div className="text-center text-white">
				<div className="mb-8">
					<div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center">
						<span className="text-blue-900 text-4xl font-bold">POS</span>
					</div>
				</div>
				<h1 className="text-3xl font-bold mb-4">Nexus POS</h1>
				<p className="text-lg opacity-80">Sistema de Punto de Venta</p>
				<div className="mt-8">
					<div className="animate-pulse">
						<span className="text-sm">Cargando...</span>
					</div>
				</div>
			</div>
		</div>
	);
};
