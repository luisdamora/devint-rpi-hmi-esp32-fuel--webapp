import React from "react";

export const PaymentMethods: React.FC = () => {
	const methods = [
		{ id: "cash", name: "Efectivo", icon: "💵", color: "green" },
		{ id: "card", name: "Tarjeta", icon: "💳", color: "blue" },
		{ id: "transfer", name: "Transferencia", icon: "📱", color: "purple" },
		{ id: "voucher", name: "Vale", icon: "🎫", color: "orange" },
		{ id: "credit", name: "Crédito", icon: "📋", color: "red" },
		{ id: "mixed", name: "Mixto", icon: "🔄", color: "teal" },
	];

	return (
		<div className="flex flex-col h-screen bg-gray-100">
			{/* Header */}
			<div className="bg-blue-600 text-white px-6 py-4">
				<div className="flex justify-between items-center">
					<h1 className="text-xl font-bold">Métodos de Pago</h1>
					<button type="button" className="text-white hover:text-gray-200">
						← Atrás
					</button>
				</div>
			</div>

			{/* Amount Display */}
			<div className="bg-white shadow-sm p-6">
				<div className="text-center">
					<div className="text-3xl font-bold text-gray-800 mb-2">$1,250.00</div>
					<div className="text-gray-600">Monto a pagar</div>
				</div>
			</div>

			{/* Payment Methods Grid */}
			<div className="flex-1 p-6">
				<div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
					{methods.map((method) => (
						<button
							type="button"
							key={method.id}
							className={`bg-${method.color}-500 hover:bg-${method.color}-600 text-white rounded-lg p-6 flex flex-col items-center transition-all transform hover:scale-105`}
						>
							<div className="text-4xl mb-3">{method.icon}</div>
							<span className="text-lg font-semibold">{method.name}</span>
						</button>
					))}
				</div>
			</div>

			{/* Footer Info */}
			<div className="bg-gray-200 px-6 py-4">
				<div className="text-center text-gray-600 text-sm">
					Seleccione el método de pago para continuar
				</div>
			</div>
		</div>
	);
};
