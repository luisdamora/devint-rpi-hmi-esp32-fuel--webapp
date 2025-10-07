import React, { useState } from "react";

export const PointsView: React.FC = () => {
	const [documentNumber, setDocumentNumber] = useState("");
	const [isSearching, setIsSearching] = useState(false);
	const [customerData, setCustomerData] = useState<any>(null);

	const handleSearch = () => {
		setIsSearching(true);
		// Simulate API call
		setTimeout(() => {
			setCustomerData({
				name: "Juan Pérez",
				document: documentNumber,
				points: 2450,
				level: "Oro",
				benefits: ["5% descuento", "Acumulación 2x puntos", "Acceso VIP"],
			});
			setIsSearching(false);
		}, 1500);
	};

	return (
		<div className="flex flex-col h-screen bg-gradient-to-br from-purple-900 to-purple-600">
			{/* Header */}
			<div className="bg-purple-800 text-white px-6 py-4">
				<div className="flex justify-between items-center">
					<h1 className="text-xl font-bold">Puntos Colombia</h1>
					<button type="button" className="text-white hover:text-purple-200">
						← Atrás
					</button>
				</div>
			</div>

			{/* Search Section */}
			<div className="bg-white rounded-t-3xl flex-1 p-6">
				<div className="max-w-md mx-auto">
					<h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
						Consultar Puntos
					</h2>

					{/* Document Input */}
					<div className="mb-6">
						<label
							htmlFor="documentNumber"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Número de Documento
						</label>
						<div className="flex space-x-3">
							<input
								type="text"
								value={documentNumber}
								onChange={(e) => setDocumentNumber(e.target.value)}
								className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
								placeholder="Ingrese el documento"
								id="documentNumber"
							/>
							<button
								type="button"
								onClick={handleSearch}
								disabled={!documentNumber || isSearching}
								className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
							>
								{isSearching ? "Buscando..." : "Buscar"}
							</button>
						</div>
					</div>

					{/* Results */}
					{customerData && (
						<div className="bg-purple-50 rounded-lg p-6">
							<div className="flex items-center mb-4">
								<div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
									{customerData.name.charAt(0)}
								</div>
								<div>
									<h3 className="text-lg font-semibold text-gray-800">
										{customerData.name}
									</h3>
									<p className="text-gray-600">CC: {customerData.document}</p>
								</div>
							</div>

							<div className="bg-white rounded-lg p-4 mb-4">
								<div className="text-center">
									<div className="text-3xl font-bold text-purple-600 mb-1">
										{customerData.points.toLocaleString()}
									</div>
									<div className="text-gray-600">Puntos disponibles</div>
								</div>
							</div>

							<div className="grid grid-cols-3 gap-2 mb-4">
								{customerData.benefits.map((benefit: string, index: number) => (
									<div
										key={index}
										className="bg-purple-100 text-purple-800 text-sm px-3 py-2 rounded-lg text-center"
									>
										{benefit}
									</div>
								))}
							</div>

							<div className="flex space-x-3">
								<button
									type="button"
									className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
								>
									Canjear Puntos
								</button>
								<button
									type="button"
									className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors"
								>
									Nueva Consulta
								</button>
							</div>
						</div>
					)}

					{/* Instructions */}
					{!customerData && (
						<div className="text-center text-gray-600 mt-8">
							<div className="text-6xl mb-4">🎯</div>
							<p className="text-lg">
								Ingrese el número de documento para consultar los puntos del
								cliente
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
