import React from "react";

export const CloseTurnViewComponent: React.FC = () => {
	return (
		<div className="flex items-center justify-center h-screen bg-gradient-to-br from-red-900 to-red-600">
			<div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-2xl">
				<div className="text-center mb-8">
					<div className="w-20 h-20 mx-auto bg-red-600 rounded-full flex items-center justify-center mb-4">
						<span className="text-white text-3xl">🔒</span>
					</div>
					<h2 className="text-2xl font-bold text-gray-800">Cerrar Turno</h2>
					<p className="text-gray-600 mt-2">Resumen del turno actual</p>
				</div>

				{/* Turn Summary */}
				<div className="bg-gray-50 rounded-lg p-6 mb-6">
					<h3 className="font-semibold text-lg mb-4">Resumen de Ventas</h3>
					<div className="space-y-3">
						<div className="flex justify-between">
							<span className="text-gray-600">Ventas Totales:</span>
							<span className="font-semibold">$45,230.50</span>
						</div>
						<div className="flex justify-between">
							<span className="text-gray-600">Transacciones:</span>
							<span className="font-semibold">127</span>
						</div>
						<div className="flex justify-between">
							<span className="text-gray-600">Promedio:</span>
							<span className="font-semibold">$356.15</span>
						</div>
						<hr className="my-3" />
						<div className="flex justify-between text-lg">
							<span className="font-semibold">Total:</span>
							<span className="font-bold text-green-600">$45,230.50</span>
						</div>
					</div>
				</div>

				{/* Action Buttons */}
				<div className="flex space-x-4">
					<button
						type="button"
						className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
					>
						Cerrar Turno
					</button>
					<button
						type="button"
						className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors"
					>
						Cancelar
					</button>
				</div>
			</div>
		</div>
	);
};
