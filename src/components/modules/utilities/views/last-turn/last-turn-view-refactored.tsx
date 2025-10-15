import {
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
import { NEXUS_COLORS } from "@/lib/config/theme";
import { SummaryCard, StatisticsCard, StatusBadge, SalesTable } from "../components";
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
				await new Promise((resolve) => setTimeout(resolve, 1500));

				const lastTurn: TurnInfo = {
					id: "turn-001",
					startTime: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
					endTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
					operator: "María González",
					totalSales: mockSalesData.reduce((sum, sale) => sum + sale.dinero, 0),
					totalVolume: mockSalesData.reduce((sum, sale) => sum + sale.volumen, 0),
					transactionCount: mockSalesData.length,
					status: "closed",
				};

				setTurnInfo(lastTurn);
				setTurnSales(mockSalesData.slice(0, 5));
			} catch (error) {
				console.error("Error cargando datos del turno:", error);
			} finally {
				setIsLoading(false);
			}
		};

		loadLastTurnData();
	}, []);

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
						<p className="text-white text-xl mb-4">
							No se encontró información del último turno
						</p>
						<button
							type="button"
							onClick={() => navigate("/utilities")}
							className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
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
								<SummaryCard
									title="Operador"
									value={turnInfo.operator}
									icon={User}
									iconColor="text-blue-400"
								/>

								<SummaryCard
									title="Duración"
									value={new Date(turnInfo.startTime).toLocaleDateString("es-CO")}
									icon={Clock}
									iconColor="text-green-400"
									subValue={`${new Date(turnInfo.startTime).toLocaleTimeString("es-CO", {
										hour: "2-digit",
										minute: "2-digit",
									})} - ${
										turnInfo.endTime
											? new Date(turnInfo.endTime).toLocaleTimeString("es-CO", {
													hour: "2-digit",
													minute: "2-digit",
											  })
											: ""
									}`}
								/>

								<SummaryCard
									title="Ventas Totales"
									value={formatCurrency(turnInfo.totalSales)}
									icon={DollarSign}
									iconColor="text-yellow-400"
								/>

								<SummaryCard
									title="Volumen Total"
									value={formatVolume(turnInfo.totalVolume)}
									icon={Fuel}
									iconColor="text-purple-400"
								/>
							</div>

							{/* Statistics Cards */}
							<div className="grid grid-cols-2 gap-3">
								<StatisticsCard
									title="Transacciones"
									value={turnInfo.transactionCount}
									icon={Receipt}
								/>

								<StatisticsCard
									title="Venta Promedio"
									value={formatCurrency(
										turnInfo.transactionCount > 0
											? turnInfo.totalSales / turnInfo.transactionCount
											: 0,
									)}
									icon={TrendingUp}
								/>
							</div>

							{/* Recent Sales Table */}
							{showRecentSales && (
								<SalesTable
									sales={turnSales}
									formatCurrency={formatCurrency}
									formatVolume={formatVolume}
									title="Últimas Ventas del Turno"
								/>
							)}

							{/* Turn Status */}
							<StatusBadge
								status={turnInfo.status}
								text={`Turno ${turnInfo.status === "closed" ? "Cerrado" : turnInfo.status === "active" ? "Activo" : "Cancelado"}`}
							/>
						</div>
					</div>
				</div>
			</div>
		</HMIContainer>
	);
};
