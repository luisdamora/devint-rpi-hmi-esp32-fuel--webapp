import React, { useState } from "react";
import { ArrowLeft, Printer, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router";
import { HMIContainer } from "@/components/layouts/hmi-container";
import { TouchInput } from "@/components/shared/touch-input";
import { NEXUS_COLORS } from "@/lib/config/theme";
import { BUTTON_STYLES } from "@/lib/config/theme";
import type { PrintResult, PrintStatus } from "../../types";

export const TestPrintView: React.FC = () => {
	const navigate = useNavigate();
	const [printStatus, setPrintStatus] = useState<PrintStatus>('idle');
	const [printResult, setPrintResult] = useState<PrintResult | null>(null);
	const [testMessage, setTestMessage] = useState("TICKET DE PRUEBA - NEXUS POS");

	const handleTestPrint = async () => {
		setPrintStatus('printing');
		setPrintResult(null);

		try {
			// Simular impresión
			await new Promise(resolve => setTimeout(resolve, 2000));

			const result: PrintResult = {
				status: 'success',
				message: 'Ticket de prueba impreso correctamente',
				data: {
					timestamp: new Date().toISOString(),
					message: testMessage
				}
			};

			setPrintResult(result);
			setPrintStatus('success');
		} catch (error) {
			const result: PrintResult = {
				status: 'error',
				message: 'Error al imprimir ticket de prueba',
				data: { error: error instanceof Error ? error.message : 'Error desconocido' }
			};

			setPrintResult(result);
			setPrintStatus('error');
		}
	};

	const handleBackToUtilities = () => {
		navigate("/utilities");
	};

	const getStatusIcon = () => {
		switch (printStatus) {
			case 'printing':
				return <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>;
			case 'success':
				return <CheckCircle size={64} className="text-green-500" />;
			case 'error':
				return <AlertCircle size={64} className="text-red-500" />;
			default:
				return <Printer size={64} className="text-white" />;
		}
	};

	const getStatusMessage = () => {
		switch (printStatus) {
			case 'printing':
				return 'Imprimiendo ticket de prueba...';
			case 'success':
				return printResult?.message || 'Impresión exitosa';
			case 'error':
				return printResult?.message || 'Error en la impresión';
			default:
				return 'Listo para imprimir';
		}
	};

	return (
		<HMIContainer showHeader={true} showFooter={true}>
			<div className="w-full h-full flex items-center justify-center p-4">
				<div className="w-full max-w-2xl space-y-6">
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
						<h1 className="text-2xl font-bold text-white">Test de Impresión</h1>
					</div>

					{/* Status Display */}
					<div className="bg-gray-800 rounded-lg p-8 text-center">
						<div className="flex justify-center mb-4">
							{getStatusIcon()}
						</div>
						<h2 className="text-xl font-semibold text-white mb-2">
							{getStatusMessage()}
						</h2>
						{printResult && (
							<p className="text-gray-300 text-sm">
								{printResult.data?.timestamp &&
									`Hora: ${new Date(printResult.data.timestamp).toLocaleString()}`
								}
							</p>
						)}
					</div>

					{/* Test Message Input */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-white">Mensaje de Prueba</h3>
						<TouchInput
							value={testMessage}
							onChange={setTestMessage}
							label="Texto a imprimir"
							placeholder="Ingrese el mensaje de prueba"
							maxLength={50}
							useFixedDimensions={true}
							disabled={printStatus === 'printing'}
						/>
					</div>

					{/* Action Buttons */}
					<div className="flex justify-center space-x-4">
						<button
							type="button"
							onClick={handleTestPrint}
							disabled={printStatus === 'printing' || !testMessage.trim()}
							className={`${BUTTON_STYLES.success} px-8 py-3`}
							style={{ minWidth: "200px" }}
						>
							{printStatus === 'printing' ? 'IMPRIMIENDO...' : 'IMPRIMIR PRUEBA'}
						</button>

						<button
							type="button"
							onClick={handleBackToUtilities}
							className={`${BUTTON_STYLES.secondary} px-8 py-3`}
							style={{ minWidth: "200px" }}
						>
							CANCELAR
						</button>
					</div>

					{/* Instructions */}
					<div className="bg-gray-800 rounded-lg p-4">
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
