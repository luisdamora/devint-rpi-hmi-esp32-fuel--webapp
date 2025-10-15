import React, { useState, useEffect } from "react";
import { ArrowLeft, Clock, User, DollarSign, Fuel, Receipt, TrendingUp } from "lucide-react";
import { HMIContainer } from "@/components/layouts/hmi-container";
import { NEXUS_COLORS } from "@/lib/config/theme";
import { BUTTON_STYLES } from "@/lib/config/theme";
import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";
import type { TurnInfo, SaleRecord } from "../../types";
import { mockSalesData } from "../../mock-data";

export const LastTurnView: React.FC = () => {
	const { navigateBack } = useHMINavigation();
	const [isLoading, setIsLoading] = useState(true);
	const [turnInfo, setTurnInfo] = useState<TurnInfo | null>(null);
	const [turnSales, setTurnSales] = useState<SaleRecord[]>([]);

	useEffect(() => {
		const loadLastTurnData = async () => {
			setIsLoading(true);
			try {
				// Simular carga de datos del último turno
				await new Promise(resolve => setTimeout(resolve, 1500));

				// Crear datos ficticios del último turno basados en ventas mock
				const lastTurn: TurnInfo = {
					id: "turn-001",
					startTime: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 horas atrás
					endTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 horas atrás
					operator: "María González",
					totalSales: mockSalesData.reduce((sum, sale) => sum + sale.dinero, 0),
					totalVolume: mockSalesData.reduce((sum, sale) => sum + sale.volumen, 0),
					transactionCount: mockSalesData.length,
					status: "closed"
				};

				setTurnInfo(lastTurn);
				setTurnSales(mockSalesData.slice(0, 5)); // Últimas 5 ventas
			} catch (error) {
				console.error('Error cargando datos del turno:', error);
			} finally {
				setIsLoading(false);
			}
		};

		loadLastTurnData();
	}, []);

	const handleBackToUtilities = () => {
		navigateBack();
	};

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('es-CO', {
			style: 'currency',
			currency: 'COP',
			minimumFractionDigits: 0
		}).format(amount);
	};

	const formatVolume = (volume: number) => {
		return `${volume.toLocaleString('es-CO')} L`;
	};

	if (isLoading) {
		return (
			<HMIContainer showHeader={true} showFooter={true}>
				<div className="w-full h-full flex items-center justify-center">
					<div className="text-center">
						<div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
						<p className="text-white text-xl">Cargando información del turno...</p>
					</div>
				</div>
			</HMIContainer>
		);
	}

	if (!turnInfo) {
		return (
			<HMIContainer showHeader={true} showFooter={true}>
				<div className="w-full h-full flex items-center justify-center">
					<div className="text-center">
						<p className="text-white text-xl mb-4">No se encontró información del último turno</p>
						<button
							type="button"
							onClick={handleBackToUtilities}
							className={`${BUTTON_STYLES.primary} px-6 py-3`}
						>
							Volver a Utilidades
						</button>
					</div>
				</div>
			</HMIContainer>
		);
	}

	return (
		<HMIContainer showHeader={true} showFooter={true}>
			<div className="w-full h-full flex items-center justify-center p-4">
				<div className="w-full max-w-4xl space-y-6">
					{/* Header */}
					<div className="flex items-center justify-between">
						<button
							type="button"
							onClick={handleBackToUtilities}
							className="flex items-center text-white hover:text-gray-300 transition-colors"
						>
							<ArrowLeft size={24} className="mr-2" />
							Volver a Utilidades
						</button>
						<h1 className="text-2xl font-bold text-white">Último Turno</h1>
					</div>

					{/* Turn Summary Cards */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						{/* Operator Card */}
						<div className="bg-gray-800 rounded-lg p-4 text-center">
							<User size={32} className="mx-auto mb-2 text-blue-400" />
							<h3 className="text-sm font-medium text-gray-300 mb-1">Operador</h3>
							<p className="text-white font-semibold">{turnInfo.operator}</p>
						</div>

						{/* Duration Card */}
						<div className="bg-gray-800 rounded-lg p-4 text-center">
							<Clock size={32} className="mx-auto mb-2 text-green-400" />
							<h3 className="text-sm font-medium text-gray-300 mb-1">Duración</h3>
							<p className="text-white font-semibold">
								{new Date(turnInfo.startTime).toLocaleDateString('es-CO')}
							</p>
							<p className="text-gray-400 text-xs">
								{new Date(turnInfo.startTime).toLocaleTimeString('es-CO', {
									hour: '2-digit',
									minute: '2-digit'
								})} - {' '}
								{turnInfo.endTime && new Date(turnInfo.endTime).toLocaleTimeString('es-CO', {
									hour: '2-digit',
									minute: '2-digit'
								})}
							</p>
						</div>

						{/* Sales Card */}
						<div className="bg-gray-800 rounded-lg p-4 text-center">
							<DollarSign size={32} className="mx-auto mb-2 text-yellow-400" />
							<h3 className="text-sm font-medium text-gray-300 mb-1">Ventas Totales</h3>
							<p className="text-white font-semibold text-lg">
								{formatCurrency(turnInfo.totalSales)}
							</p>
						</div>

						{/* Volume Card */}
						<div className="bg-gray-800 rounded-lg p-4 text-center">
							<Fuel size={32} className="mx-auto mb-2 text-purple-400" />
							<h3 className="text-sm font-medium text-gray-300 mb-1">Volumen Total</h3>
							<p className="text-white font-semibold text-lg">
								{formatVolume(turnInfo.totalVolume)}
							</p>
						</div>
					</div>

					{/* Statistics Cards */}
					<div className="grid grid-cols-2 gap-4">
						{/* Transactions Card */}
						<div className="bg-gray-800 rounded-lg p-4">
							<div className="flex items-center justify-between">
								<div>
									<h3 className="text-sm font-medium text-gray-300 mb-1">Transacciones</h3>
									<p className="text-white font-semibold text-2xl">{turnInfo.transactionCount}</p>
								</div>
								<Receipt size={24} className="text-gray-400" />
							</div>
						</div>

						{/* Average Sale Card */}
						<div className="bg-gray-800 rounded-lg p-4">
							<div className="flex items-center justify-between">
								<div>
									<h3 className="text-sm font-medium text-gray-300 mb-1">Venta Promedio</h3>
									<p className="text-white font-semibold text-2xl">
										{formatCurrency(turnInfo.transactionCount > 0 ?
											turnInfo.totalSales / turnInfo.transactionCount : 0)}
									</p>
								</div>
								<TrendingUp size={24} className="text-gray-400" />
							</div>
						</div>
					</div>

					{/* Recent Sales Table */}
					<div className="bg-gray-800 rounded-lg p-4">
						<h3 className="text-lg font-semibold text-white mb-4">Últimas Ventas del Turno</h3>
						<div className="space-y-2 max-h-64 overflow-y-auto">
							{turnSales.map((sale, index) => (
								<div key={`${sale.fe}-${index}`} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
									<div>
										<p className="text-white font-medium">{sale.producto}</p>
										<p className="text-gray-400 text-sm">
											{sale.placa} • {sale.fe}
										</p>
									</div>
									<div className="text-right">
										<p className="text-white font-semibold">
											{formatCurrency(sale.dinero)}
										</p>
										<p className="text-gray-400 text-sm">
											{formatVolume(sale.volumen)}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Turn Status */}
					<div className="bg-gray-800 rounded-lg p-4 text-center">
						<div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
							turnInfo.status === 'closed'
								? 'bg-green-900 text-green-200'
								: turnInfo.status === 'active'
								? 'bg-yellow-900 text-yellow-200'
								: 'bg-red-900 text-red-200'
						}`}>
							<div className={`w-2 h-2 rounded-full mr-2 ${
								turnInfo.status === 'closed'
									? 'bg-green-400'
									: turnInfo.status === 'active'
									? 'bg-yellow-400'
									: 'bg-red-400'
							}`}></div>
							Turno {turnInfo.status === 'closed' ? 'Cerrado' :
								 turnInfo.status === 'active' ? 'Activo' : 'Cancelado'}
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex justify-center">
						<button
							type="button"
							onClick={handleBackToUtilities}
							className={`${BUTTON_STYLES.primary} px-8 py-3`}
							style={{ minWidth: "200px" }}
						>
							VOLVER A UTILIDADES
						</button>
					</div>
				</div>
			</div>
		</HMIContainer>
	);
};
