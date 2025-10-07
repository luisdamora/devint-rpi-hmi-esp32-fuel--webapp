import React from "react";

interface MainMenuProps {
	turnActive?: boolean;
}

export const MainMenu: React.FC<MainMenuProps> = ({ turnActive = false }) => {
	return (
		<div className="flex flex-col h-screen bg-gray-100">
			{/* Header */}
			<div
				className={`px-6 py-4 ${turnActive ? "bg-green-600" : "bg-red-600"} text-white`}
			>
				<div className="flex justify-between items-center">
					<h1 className="text-2xl font-bold">Nexus POS</h1>
					<div className="flex items-center space-x-2">
						<span className="text-sm">Estado:</span>
						<span className="font-semibold">
							{turnActive ? "Turno Activo" : "Turno Inactivo"}
						</span>
					</div>
				</div>
			</div>

			{/* Menu Grid */}
			<div className="flex-1 p-6">
				<div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
					{turnActive ? (
						<>
							<button
								type="button"
								className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-8 flex flex-col items-center transition-colors"
							>
								<div className="text-4xl mb-3">💰</div>
								<span className="text-lg font-semibold">Ventas</span>
							</button>
							<button
								type="button"
								className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg p-8 flex flex-col items-center transition-colors"
							>
								<div className="text-4xl mb-3">💳</div>
								<span className="text-lg font-semibold">Pagos</span>
							</button>
							<button
								type="button"
								className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg p-8 flex flex-col items-center transition-colors"
							>
								<div className="text-4xl mb-3">⭐</div>
								<span className="text-lg font-semibold">Puntos Colombia</span>
							</button>
							<button
								type="button"
								className="bg-teal-500 hover:bg-teal-600 text-white rounded-lg p-8 flex flex-col items-center transition-colors"
							>
								<div className="text-4xl mb-3">📊</div>
								<span className="text-lg font-semibold">Reportes</span>
							</button>
							<button
								type="button"
								className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg p-8 flex flex-col items-center transition-colors"
							>
								<div className="text-4xl mb-3">⚙️</div>
								<span className="text-lg font-semibold">Configuración</span>
							</button>
						</>
					) : (
						<button
							type="button"
							className="bg-green-500 hover:bg-green-600 text-white rounded-lg p-8 flex flex-col items-center transition-colors mx-auto"
						>
							<div className="text-4xl mb-3">🔑</div>
							<span className="text-xl font-semibold">Iniciar Turno</span>
						</button>
					)}
				</div>
			</div>

			{/* Footer */}
			<div className="bg-gray-800 text-white px-6 py-3">
				<div className="flex justify-between items-center text-sm">
					<span>v1.0.0</span>
					<span>Caprinosol Cloud</span>
				</div>
			</div>
		</div>
	);
};
