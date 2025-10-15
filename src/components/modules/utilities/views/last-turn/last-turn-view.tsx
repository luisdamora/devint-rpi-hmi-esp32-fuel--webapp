import {
	ArrowLeft,
	Clock,
	DollarSign,
	Fuel,
	Receipt,
	Settings,
	TrendingUp,
	User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { HMIContainer } from "@/components/layouts/hmi-container";
import { SmallSideTile } from "@/components/shared/sales/small-side-tile";
import { BUTTON_STYLES, NEXUS_COLORS } from "@/lib/config/theme";
import { mockSalesData } from "../../mock-data";
import type { SaleRecord, TurnInfo } from "../../types";

export const LastTurnView: React.FC<{ showRecentSales?: boolean }> = ({
	showRecentSales = false,
}) => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const [turnInfo, setTurnInfo] = useState<TurnInfo | null>(null);
	const [turnSales, setTurnSales] = useState<SaleRecord[]>([]);

	useEffect(() => {
		const loadLastTurnData = async () => {
			setIsLoading(true);
			try {
				// Simular carga de datos del último turno
				await new Promise((resolve) => setTimeout(resolve, 1500));

				// Crear datos ficticios del último turno basados en ventas mock
				const lastTurn: TurnInfo = {
					id: "turn-001",
					startTime: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 horas atrás
					endTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 horas atrás
					operator: "María González",
					totalSales: mockSalesData.reduce((sum, sale) => sum + sale.dinero, 0),
					totalVolume: mockSalesData.reduce(
						(sum, sale) => sum + sale.volumen,
						0,
					),
					transactionCount: mockSalesData.length,
					status: "closed",
				};

				setTurnInfo(lastTurn);
				setTurnSales(mockSalesData.slice(0, 5)); // Últimas 5 ventas
			} catch (error) {
				console.error("Error cargando datos del turno:", error);
			} finally {
				setIsLoading(false);
			}
		};

		loadLastTurnData();
	}, []);

	const handleBackToUtilities = () => {
		navigate("/utilities");
	};

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("es-CO", {
			style: "currency",
			currency: "COP",
			minimumFractionDigits: 0,
		}).format(amount);
	};

	const formatVolume = (volume: number) => {
		return `${volume.toLocaleString("es-CO")} L`;
	};

	if (isLoading) {
		return (
			<HMIContainer showHeader={true} showFooter={true}>
				<div className="w-full h-full flex items-center justify-center">
					<div className="text-center">
						<div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
						<p className="text-white text-xl">
							Cargando información del turno...
						</p>
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
						<p className="text-white text-xl mb-4">
							No se encontró información del último turno
						</p>
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
		<HMIContainer showHeader={false} showFooter={false}>
			<div className="w-full h-full flex items-center justify-center p-3">
				<div className="grid grid-cols-4 gap-6 w-full max-w-6xl h-full">
					{/* Panel lateral ultra-compacto */}
					<div className="col-span-1 flex flex-col gap-4 self-start pt-8 h-full">
						{/* Título como span estático */}
						<div className="text-center">
							<span
								className="inline-block px-4 text-xl font-bold"
								style={{
									backgroundColor: NEXUS_COLORS.status.orange,
									color: NEXUS_COLORS.white,
									borderRadius: 4,
								}}
							>
								ÚLTIMO TURNO
							</span>
						</div>

						{/* Espacio flexible */}
						<div className="flex-grow"></div>

						{/* Navegación a Utilidades con SmallSideTile */}
						<div className="flex justify-center">
							<SmallSideTile
								title="UTILIDADES"
								icon={<Settings size={36} />}
								onClick={() => navigate("/utilities")}
							/>
						</div>
					</div>

					{/* Contenido central */}
					<div className="col-span-3">
						<div className="w-full max-w-4xl space-y-4">
							{/* Turn Summary Cards */}
							<div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
								{/* Operator Card */}
								<div className="bg-gray-800 rounded-lg p-3 text-center min-h-0">
									<User size={24} className="mx-auto mb-1 text-blue-400" />
									<h3 className="text-xs font-medium text-gray-300 mb-1">
										Operador
									</h3>
									<p className="text-white font-semibold text-sm leading-tight">
										{turnInfo.operator}
									</p>
								</div>

								{/* Duration Card */}
								<div className="bg-gray-800 rounded-lg p-3 text-center min-h-0">
									<Clock size={24} className="mx-auto mb-1 text-green-400" />
									<h3 className="text-xs font-medium text-gray-300 mb-1">
										Duración
									</h3>
									<p className="text-white font-semibold text-sm leading-tight">
										{new Date(turnInfo.startTime).toLocaleDateString("es-CO")}
									</p>
									<p className="text-gray-400 text-xs leading-tight">
										{new Date(turnInfo.startTime).toLocaleTimeString("es-CO", {
											hour: "2-digit",
											minute: "2-digit",
										})}{" "}
										-{" "}
										{turnInfo.endTime &&
											new Date(turnInfo.endTime).toLocaleTimeString("es-CO", {
												hour: "2-digit",
												minute: "2-digit",
											})}
									</p>
								</div>

								{/* Sales Card */}
								<div className="bg-gray-800 rounded-lg p-3 text-center min-h-0">
									<DollarSign
										size={24}
										className="mx-auto mb-1 text-yellow-400"
									/>
									<h3 className="text-xs font-medium text-gray-300 mb-1">
										Ventas Totales
									</h3>
									<p className="text-white font-semibold text-sm leading-tight">
										{formatCurrency(turnInfo.totalSales)}
									</p>
								</div>

								{/* Volume Card */}
								<div className="bg-gray-800 rounded-lg p-3 text-center min-h-0">
									<Fuel size={24} className="mx-auto mb-1 text-purple-400" />
									<h3 className="text-xs font-medium text-gray-300 mb-1">
										Volumen Total
									</h3>
									<p className="text-white font-semibold text-sm leading-tight">
										{formatVolume(turnInfo.totalVolume)}
									</p>
								</div>
							</div>

							{/* Statistics Cards */}
							<div className="grid grid-cols-2 gap-3">
								{/* Transactions Card */}
								<div className="bg-gray-800 rounded-lg p-3">
									<div className="flex items-center justify-between">
										<div className="min-w-0 flex-1">
											<h3 className="text-xs font-medium text-gray-300 mb-1">
												Transacciones
											</h3>
											<p className="text-white font-semibold text-xl leading-tight">
												{turnInfo.transactionCount}
											</p>
										</div>
										<Receipt
											size={20}
											className="text-gray-400 flex-shrink-0 ml-2"
										/>
									</div>
								</div>

								{/* Average Sale Card */}
								<div className="bg-gray-800 rounded-lg p-3">
									<div className="flex items-center justify-between">
										<div className="min-w-0 flex-1">
											<h3 className="text-xs font-medium text-gray-300 mb-1">
												Venta Promedio
											</h3>
											<p className="text-white font-semibold text-xl leading-tight">
												{formatCurrency(
													turnInfo.transactionCount > 0
														? turnInfo.totalSales / turnInfo.transactionCount
														: 0,
												)}
											</p>
										</div>
										<TrendingUp
											size={20}
											className="text-gray-400 flex-shrink-0 ml-2"
										/>
									</div>
								</div>
							</div>

							{/* Recent Sales Table */}
							{showRecentSales && (
								<div className="bg-gray-800 rounded-lg p-3">
									<h3 className="text-base font-semibold text-white mb-3">
										Últimas Ventas del Turno
									</h3>
									<div className="space-y-1">
										{turnSales.map((sale, index) => (
											<div
												key={`${sale.fe}-${index}`}
												className="flex justify-between items-center py-1.5 border-b border-gray-700 last:border-b-0 text-sm"
											>
												<div className="min-w-0 flex-1 pr-2">
													<span className="text-white font-medium">
														{sale.producto}
													</span>
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
							)}

							{/* Turn Status */}
							<div className="bg-gray-800 rounded-lg p-3 text-center">
								<div
									className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${
										turnInfo.status === "closed"
											? "bg-green-900 text-green-200"
											: turnInfo.status === "active"
												? "bg-yellow-900 text-yellow-200"
												: "bg-red-900 text-red-200"
									}`}
								>
									<div
										className={`w-1.5 h-1.5 rounded-full mr-2 ${
											turnInfo.status === "closed"
												? "bg-green-400"
												: turnInfo.status === "active"
													? "bg-yellow-400"
													: "bg-red-400"
										}`}
									></div>
									Turno{" "}
									{turnInfo.status === "closed"
										? "Cerrado"
										: turnInfo.status === "active"
											? "Activo"
											: "Cancelado"}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</HMIContainer>
	);
};
