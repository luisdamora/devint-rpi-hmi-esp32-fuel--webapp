import { AlertCircle, ArrowLeft, CheckCircle, Printer } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { HMIContainer } from "@/components/layouts/hmi-container";
import { TouchInput } from "@/components/shared/touch-input";
import { BUTTON_STYLES, NEXUS_COLORS } from "@/lib/config/theme";
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
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
				);
			case "success":
				return <CheckCircle size={48} className="text-green-500" />;
			case "error":
				return <AlertCircle size={48} className="text-red-500" />;
			default:
				return <Printer size={48} className="text-white" />;
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
		<HMIContainer showHeader={true} showFooter={true}>
			<div className="w-full h-full flex items-center justify-center p-4">
				<div className="w-full max-w-xl space-y-4">
					{/* Header */}
					<div className="flex items-center justify-between">
						<button
							type="button"
							onClick={() => navigate("/utilities")}
							className="flex items-center text-white hover:text-gray-300 transition-colors"
						>
							<ArrowLeft size={24} className="mr-2" />
							Volver a Utilidades
						</button>
						<h1 className="text-xl font-bold text-white">Test de Impresión</h1>
					</div>

					{/* Status Display */}
					<div className="bg-gray-800 rounded-lg p-6 text-center">
						<div className="flex justify-center mb-4">{getStatusIcon()}</div>
						<h2 className="text-lg font-semibold text-white mb-2">
							{getStatusMessage()}
						</h2>
						{printResult && printResult.data?.timestamp && (
							<p className="text-gray-300 text-sm">
								Hora:{" "}
								{new Date(
									printResult.data.timestamp as string,
								).toLocaleString()}
							</p>
						)}
					</div>

					{/* Test Message Input */}
					<div className="space-y-3">
						<h3 className="text-base font-semibold text-white">
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
					<div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-3">
						<button
							type="button"
							onClick={handleTestPrint}
							disabled={printStatus === "printing" || !testMessage.trim()}
							className={`${BUTTON_STYLES.success} px-6 py-3`}
							style={{ minWidth: "160px" }}
						>
							{printStatus === "printing"
								? "IMPRIMIENDO..."
								: "IMPRIMIR PRUEBA"}
						</button>

						<button
							type="button"
							onClick={() => navigate("/utilities")}
							className={`${BUTTON_STYLES.secondary} px-6 py-3`}
							style={{ minWidth: "160px" }}
						>
							CANCELAR
						</button>
					</div>

					{/* Instructions */}
					<div className="bg-gray-800 rounded-lg p-3">
						<h4 className="font-semibold text-white mb-2">Instrucciones:</h4>
						<ul className="text-gray-300 text-sm space-y-1">
							<li>• Configure el mensaje de prueba en el campo de texto</li>
							<li>• Presione "IMPRIMIR PRUEBA" para iniciar la impresión</li>
							<li>• Verifique que la impresora esté conectada y encendida</li>
							<li>• El ticket de prueba mostrará la fecha y hora actual</li>
						</ul>
					</div>
				</div>
			</div>
		</HMIContainer>
	);
};
