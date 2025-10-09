import React from "react";
import type { SalesTableProps } from "./types";

/**
 * Formatea un número como moneda colombiana
 */
const formatCurrency = (amount: number): string => {
	return new Intl.NumberFormat("es-CO", {
		style: "currency",
		currency: "COP",
		minimumFractionDigits: 0,
	}).format(amount);
};

/**
 * Componente que renderiza la tabla de últimas ventas
 */
export const SalesTable: React.FC<SalesTableProps> = ({ salesData }) => {
	return (
		<div className="bg-white rounded-lg shadow-lg p-2 mb-2">
			<div className="overflow-x-auto">
				<table className="w-full border-collapse">
					<thead className="bg-blue-900 text-white">
						<tr>
							<th className="px-1.5 py-1.5 text-left text-xs font-semibold">#FE</th>
							<th className="px-1.5 py-1.5 text-left text-xs font-semibold">
								ID PUNTOS
							</th>
							<th className="px-1.5 py-1.5 text-left text-xs font-semibold">
								ID PROMO
							</th>
							<th className="px-1.5 py-1.5 text-left text-xs font-semibold">
								PLACA
							</th>
							<th className="px-1.5 py-1.5 text-left text-xs font-semibold">
								PRODUCTO
							</th>
							<th className="px-1.5 py-1.5 text-right text-xs font-semibold">
								DINERO
							</th>
							<th className="px-1.5 py-1.5 text-right text-xs font-semibold">
								VOLUMEN
							</th>
						</tr>
					</thead>
					<tbody>
						{salesData.map((sale) => (
							<tr
								key={sale.fe}
								className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
							>
								<td className="px-1.5 py-1 text-xs text-gray-700">{sale.fe}</td>
								<td className="px-1.5 py-1 text-xs text-gray-700">
									{sale.idPuntos}
								</td>
								<td className="px-1.5 py-1 text-xs text-gray-700">
									{sale.idPromo}
								</td>
								<td className="px-1.5 py-1 text-xs text-gray-700">
									{sale.placa}
								</td>
								<td className="px-1.5 py-1 text-xs text-gray-700">
									{sale.producto}
								</td>
								<td className="px-1.5 py-1 text-xs text-gray-700 text-right font-medium">
									{formatCurrency(sale.dinero)}
								</td>
								<td className="px-1.5 py-1 text-xs text-gray-700 text-right">
									{sale.volumen.toFixed(1)} L
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{salesData.length === 0 && (
				<div className="text-center py-8 text-gray-500">
					<p>No hay ventas registradas</p>
				</div>
			)}
		</div>
	);
};
