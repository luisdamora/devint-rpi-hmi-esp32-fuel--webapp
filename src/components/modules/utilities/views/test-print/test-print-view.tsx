import {
	AlertCircle,
	ArrowLeft,
	CheckCircle,
	Printer,
	Settings,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { HMIContainer } from "@/components/layouts/hmi-container";
import { SmallSideTile } from "@/components/shared/sales/small-side-tile";
import { TouchInput } from "@/components/shared/touch-input";
import { BUTTON_STYLES, NEXUS_COLORS } from "@/lib/config/theme";
import { InstructionsCard, StatusDisplay } from "../../components";
import type { PrintResult, PrintStatus } from "../../types";

export const TestPrintView: React.FC = () => {
	const navigate = useNavigate();
	const [printStatus, setPrintStatus] = useState<PrintStatus>("idle");
	const [printResult, setPrintResult] = useState<PrintResult | null>(null);
	const [testMessage, setTestMessage] = useState(
		"TICKET DE PRUEBA - NEXUS POS",
	);

	const handleTestPrint = async () => {
		setPrintStatus("printing");
		setPrintResult(null);

		try {
			// Simular impresión
			await new Promise((resolve) => setTimeout(resolve, 2000));

			const result: PrintResult = {
				status: "success",
				message: "Ticket de prueba impreso correctamente",
				data: {
					timestamp: new Date().toISOString(),
					message: testMessage,
				},
			};

			setPrintResult(result);
			setPrintStatus("success");
		} catch (error) {
			const result: PrintResult = {
				status: "error",
				message: "Error al imprimir ticket de prueba",
				data: {
					error: error instanceof Error ? error.message : "Error desconocido",
				},
			};

			setPrintResult(result);
			setPrintStatus("error");
		}
	};

	const handleBackToUtilities = () => {
		navigate("/utilities");
	};

	const getStatusIcon = () => {
		switch (printStatus) {
			case "printing":
				return (
					<div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
				);
			case "success":
				return <CheckCircle size={32} className="text-green-500" />;
			case "error":
				return <AlertCircle size={32} className="text-red-500" />;
			default:
				return <Printer size={32} className="text-white" />;
		}
	};

	const getStatusMessage = () => {
		switch (printStatus) {
			case "printing":
				return "Imprimiendo ticket de prueba...";
			case "success":
				return printResult?.message || "Impresión exitosa";
			case "error":
				return printResult?.message || "Error en la impresión";
			default:
				return "Listo para imprimir";
		}
	};

	return (
		<HMIContainer showHeader={false} showFooter={false}>
			<div className="w-full h-full flex items-center justify-center p-3">
				<div className="grid grid-cols-4 gap-6 w-full max-w-6xl">
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
								TEST IMPRESIÓN
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
						<div className="w-full max-w-lg space-y-3">
							{/* Status Display */}
							<StatusDisplay
								status={printStatus}
								title={getStatusMessage()}
								message={printResult?.message}
								timestamp={printResult?.data?.timestamp}
								icon={
									printStatus === "printing"
										? undefined
										: printStatus === "success"
											? CheckCircle
											: printStatus === "error"
												? AlertCircle
												: Printer
								}
							/>

							{/* Test Message Input */}
							<div className="space-y-2">
								<h3 className="text-sm font-semibold text-white mb-1">
									Mensaje de Prueba
								</h3>
								<TouchInput
									value={testMessage}
									onChange={setTestMessage}
									label="Texto a imprimir"
									placeholder="Ingrese el mensaje de prueba"
									maxLength={50}
									useFixedDimensions={true}
									disabled={printStatus === "printing"}
								/>
							</div>

							{/* Action Buttons */}
							<div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-2">
								<button
									type="button"
									onClick={handleTestPrint}
									disabled={printStatus === "printing" || !testMessage.trim()}
									className={`${BUTTON_STYLES.success} px-4 py-2`}
									style={{ minWidth: "120px" }}
								>
									{printStatus === "printing"
										? "IMPRIMIENDO..."
										: "IMPRIMIR PRUEBA"}
								</button>

								<button
									type="button"
									onClick={() => navigate("/utilities")}
									className={`${BUTTON_STYLES.secondary} px-4 py-2`}
									style={{ minWidth: "120px" }}
								>
									CANCELAR
								</button>
							</div>

							{/* Instructions */}
							<InstructionsCard
								title="Instrucciones:"
								instructions={[
									"• Configure el mensaje de prueba en el campo de texto",
									'• Presione "IMPRIMIR PRUEBA" para iniciar la impresión',
									"• Verifique que la impresora esté conectada y encendida",
									"• El ticket de prueba mostrará la fecha y hora actual",
								]}
							/>
						</div>
					</div>
				</div>
			</div>
		</HMIContainer>
	);
};
