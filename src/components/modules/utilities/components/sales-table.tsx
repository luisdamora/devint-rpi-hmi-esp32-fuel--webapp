import React from "react";

interface SaleItem {
	fe: string;
	producto: string;
	placa: string;
	dinero: number;
	volumen: number;
}

interface SalesTableProps {
	sales: SaleItem[];
	formatCurrency: (amount: number) => string;
	formatVolume: (volume: number) => string;
	title?: string;
	showHeader?: boolean;
}

export const SalesTable: React.FC<SalesTableProps> = ({
	sales,
	formatCurrency,
	formatVolume,
	title = "Últimas Ventas",
	showHeader = true,
}) => (
	<div className="bg-gray-800 rounded-lg p-3">
		{showHeader && (
			<h3 className="text-base font-semibold text-white mb-3">{title}</h3>
		)}
		<div className="space-y-1">
			{sales.map((sale, index) => (
				<div
					key={`${sale.fe}-${index}`}
					className="flex justify-between items-center py-1.5 border-b border-gray-700 last:border-b-0 text-sm"
				>
					<div className="min-w-0 flex-1 pr-2">
						<span className="text-white font-medium">{sale.producto}</span>
						<span className="text-gray-400 text-xs ml-2">
							{sale.placa} • {sale.fe}
						</span>
					</div>
					<div className="text-right flex-shrink-0">
						<span className="text-white font-semibold">
							{formatCurrency(sale.dinero)}
						</span>
						<span className="text-gray-400 text-xs ml-2">
							{formatVolume(sale.volumen)}
						</span>
					</div>
				</div>
			))}
		</div>
	</div>
);
