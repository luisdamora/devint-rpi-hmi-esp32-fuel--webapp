import React, { useState } from "react";

export const LoginViewComponent: React.FC = () => {
	const [operatorId, setOperatorId] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-900 to-blue-600">
			<div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
				<div className="text-center mb-8">
					<div className="w-20 h-20 mx-auto bg-blue-900 rounded-full flex items-center justify-center mb-4">
						<span className="text-white text-2xl font-bold">POS</span>
					</div>
					<h2 className="text-2xl font-bold text-gray-800">Iniciar Turno</h2>
					<p className="text-gray-600 mt-2">
						Ingrese sus credenciales para comenzar
					</p>
				</div>

				<form className="space-y-6">
					<div>
						<label
							htmlFor="operatorId"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							ID de Operador
						</label>
						<input
							type="text"
							value={operatorId}
							onChange={(e) => setOperatorId(e.target.value)}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							placeholder="Ingrese su ID"
						/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Contraseña
						</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							placeholder="Ingrese su contraseña"
						/>
					</div>

					<button
						type="submit"
						className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
					>
						Iniciar Turno
					</button>
				</form>

				<div className="mt-6 text-center">
					<button
						type="button"
						className="text-blue-600 hover:text-blue-800 text-sm"
					>
						¿Necesita ayuda?
					</button>
				</div>
			</div>
		</div>
	);
};
