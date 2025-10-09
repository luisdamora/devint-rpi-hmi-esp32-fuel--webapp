import { Home } from "lucide-react";
import React from "react";
import { useLocation } from "react-router";
import { HMIContainer } from "@/components/layouts/hmi-container";
import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";
import { AnimatedFuelIcon } from "@/components/shared/sales/animated-fuel-icon";

interface TransactionData {
	placa: string;
	mode: "CONTADO" | "CREDITO";
	totalAmount: number;
	paymentMethods: Array<{
		type: string;
		amount: number;
	}>;
	timestamp: string;
}

/**
 * TransactionStatusView - Pantalla de confirmación post-transacción
 *
 * Muestra un resumen de la transacción completada con un surtidor titilando.
 * Solo se muestra para transacciones en modo CONTADO.
 *
 * Características:
 * - Ícono de surtidor con animación de parpadeo
 * - Resumen completo de la transacción
 * - Botones para nueva venta o volver al menú
 */
export const TransactionStatusView: React.FC = () => {
	const { navigateTo } = useHMINavigation();
	const location = useLocation();
	const transactionData = location.state?.transactionData as TransactionData;

	return (
		<HMIContainer showHeader={false} showFooter={false}>
			<div className="w-full h-full flex items-center justify-center px-4">
				<div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl p-8">
					<h1 className="text-4xl font-bold text-green-600 text-center mb-8">
						✅ TRANSACCIÓN COMPLETADA
					</h1>

					<div className="grid grid-cols-2 gap-8">
						{/* Columna izquierda: Surtidor titilando */}
						<div className="flex items-center justify-center">
							<div className="relative">
								<AnimatedFuelIcon
									size={200}
									continuousAnimation={true}
									opacityRange={[0.3, 1]}
								/>
							</div>
						</div>

						{/* Columna derecha: Datos de la transacción */}
						<div className="space-y-4">
							<div className="border-b-2 border-gray-200 pb-2">
								<p className="text-sm text-gray-500">Placa</p>
								<p className="text-2xl font-bold">
									{transactionData?.placa || "N/A"}
								</p>
							</div>

							<div className="border-b-2 border-gray-200 pb-2">
								<p className="text-sm text-gray-500">Modo de Pago</p>
								<p className="text-xl font-semibold">
									{transactionData?.mode || "N/A"}
								</p>
							</div>

							<div className="border-b-2 border-gray-200 pb-2">
								<p className="text-sm text-gray-500">Monto Total</p>
								<p className="text-2xl font-bold text-green-600">
									$
									{transactionData?.totalAmount?.toLocaleString("es-CO") || "0"}
								</p>
							</div>

							{transactionData?.paymentMethods &&
								transactionData.paymentMethods.length > 0 && (
									<div className="border-b-2 border-gray-200 pb-2">
										<p className="text-sm text-gray-500 mb-2">
											Métodos de Pago
										</p>
										{transactionData.paymentMethods.map((method, idx) => (
											<p key={idx} className="text-lg">
												{method.type}: ${method.amount.toLocaleString("es-CO")}
											</p>
										))}
									</div>
								)}

							<div>
								<p className="text-sm text-gray-500">Fecha y Hora</p>
								<p className="text-lg">
									{transactionData?.timestamp
										? new Date(transactionData.timestamp).toLocaleString(
												"es-CO",
											)
										: new Date().toLocaleString("es-CO")}
								</p>
							</div>
						</div>
					</div>

					{/* Botones de acción */}
					<div className="flex justify-center gap-6 mt-8">
						<button
							type="button"
							onClick={() => navigateTo("cash-sale")}
							className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold rounded-lg shadow-lg transition-all duration-200 active:scale-95"
						>
							🛒 Nueva Venta
						</button>
						<button
							type="button"
							onClick={() => navigateTo("menu")}
							className="px-8 py-4 bg-gray-600 hover:bg-gray-700 text-white text-xl font-bold rounded-lg shadow-lg transition-all duration-200 active:scale-95 flex items-center gap-2"
						>
							<Home size={24} />
							Inicio
						</button>
					</div>
				</div>
			</div>
		</HMIContainer>
	);
};

export default TransactionStatusView;
