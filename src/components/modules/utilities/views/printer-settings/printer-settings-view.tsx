import {
	AlertCircle,
	ArrowLeft,
	CheckCircle,
	Save,
	Settings,
	TestTube,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { HMIContainer } from "@/components/layouts/hmi-container";
import { TouchInput } from "@/components/shared/touch-input";
import { TouchSelect } from "@/components/shared/touch-select";
import { BUTTON_STYLES } from "@/lib/config/theme";
import type { PrinterConfig, PrintResult } from "../../types";

const PAPER_WIDTH_OPTIONS = [
	{ value: "58", label: "58mm (tamaño pequeño)" },
	{ value: "80", label: "80mm (tamaño estándar)" },
	{ value: "110", label: "110mm (tamaño grande)" },
];

export const PrinterSettingsView: React.FC = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [testStatus, setTestStatus] = useState<
		"idle" | "testing" | "success" | "error"
	>("idle");
	const [testResult, setTestResult] = useState<PrintResult | null>(null);

	// Estado de configuración
	const [config, setConfig] = useState<PrinterConfig>({
		name: "Impresora Principal",
		ipAddress: "192.168.1.100",
		port: 9100,
		paperWidth: 80,
		font: "default",
		isActive: true,
	});

	const [originalConfig, setOriginalConfig] = useState<PrinterConfig>(config);

	useEffect(() => {
		// Cargar configuración guardada (simulado)
		const loadPrinterConfig = async () => {
			setIsLoading(true);
			try {
				// Simular carga de configuración
				await new Promise((resolve) => setTimeout(resolve, 1000));
				// Aquí iría la lógica real de carga desde almacenamiento/API
			} catch (error) {
				console.error("Error cargando configuración:", error);
			} finally {
				setIsLoading(false);
			}
		};

		loadPrinterConfig();
	}, []);

	const loadPrinterConfig = async () => {
		setIsLoading(true);
		try {
			// Simular carga de configuración
			await new Promise((resolve) => setTimeout(resolve, 1000));
			// Aquí iría la lógica real de carga desde almacenamiento/API
		} catch (error) {
			console.error("Error cargando configuración:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleConfigChange = (
		field: keyof PrinterConfig,
		value: string | number | boolean,
	) => {
		setConfig((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleSaveConfig = async () => {
		setIsLoading(true);
		try {
			// Simular guardado
			await new Promise((resolve) => setTimeout(resolve, 1500));

			setOriginalConfig(config);
			alert("Configuración guardada exitosamente");
		} catch (error) {
			console.error("Error guardando configuración:", error);
			alert("Error al guardar configuración");
		} finally {
			setIsLoading(false);
		}
	};

	const handleTestConnection = async () => {
		setTestStatus("testing");
		setTestResult(null);

		try {
			// Simular test de conexión
			await new Promise((resolve) => setTimeout(resolve, 2000));

			const result: PrintResult = {
				status: "success",
				message: "Conexión exitosa con la impresora",
				data: {
					ip: config.ipAddress,
					port: config.port,
					timestamp: new Date().toISOString(),
				},
			};

			setTestResult(result);
			setTestStatus("success");
		} catch (error) {
			const result: PrintResult = {
				status: "error",
				message: "No se pudo conectar con la impresora",
				data: {
					ip: config.ipAddress,
					port: config.port,
					error: error instanceof Error ? error.message : "Error desconocido",
				},
			};

			setTestResult(result);
			setTestStatus("error");
		}
	};

	const handleBackToUtilities = () => {
		navigate("/utilities");
	};

	const hasUnsavedChanges =
		JSON.stringify(config) !== JSON.stringify(originalConfig);

	const getTestStatusIcon = () => {
		switch (testStatus) {
			case "testing":
				return (
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
				);
			case "success":
				return <CheckCircle size={32} className="text-green-500" />;
			case "error":
				return <AlertCircle size={32} className="text-red-500" />;
			default:
				return <TestTube size={32} className="text-white" />;
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
						<h1 className="text-2xl font-bold text-white">
							Configuración de Impresora
						</h1>
					</div>

					{/* Loading State */}
					{isLoading && (
						<div className="bg-gray-800 rounded-lg p-8 text-center">
							<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
							<p className="text-white">Cargando configuración...</p>
						</div>
					)}

					{/* Configuration Form */}
					{!isLoading && (
						<div className="bg-gray-800 rounded-lg p-6 space-y-6">
							{/* Printer Name */}
							<TouchInput
								value={config.name}
								onChange={(value) => handleConfigChange("name", value)}
								label="Nombre de la Impresora"
								placeholder="Ingrese el nombre de la impresora"
								maxLength={50}
								useFixedDimensions={true}
							/>

							{/* IP Address and Port */}
							<div className="grid grid-cols-2 gap-4">
								<TouchInput
									value={config.ipAddress}
									onChange={(value) => handleConfigChange("ipAddress", value)}
									label="Dirección IP"
									placeholder="192.168.1.100"
									maxLength={15}
									keyboardMode="numeric"
									useFixedDimensions={true}
								/>
								<TouchInput
									value={config.port.toString()}
									onChange={(value) =>
										handleConfigChange("port", parseInt(value) || 9100)
									}
									label="Puerto"
									placeholder="9100"
									maxLength={5}
									keyboardMode="numeric"
									useFixedDimensions={true}
								/>
							</div>

							{/* Paper Width */}
							<TouchSelect
								value={config.paperWidth.toString()}
								options={PAPER_WIDTH_OPTIONS}
								onChange={(value) =>
									handleConfigChange("paperWidth", parseInt(value))
								}
								label="Ancho del Papel"
								placeholder="Seleccione el ancho del papel..."
								gridCols={1}
								useFixedDimensions={true}
							/>

							{/* Font Selection */}
							<TouchSelect
								value={config.font || "default"}
								options={[
									{ value: "default", label: "Fuente por defecto" },
									{ value: "small", label: "Fuente pequeña" },
									{ value: "large", label: "Fuente grande" },
								]}
								onChange={(value) => handleConfigChange("font", value)}
								label="Fuente"
								placeholder="Seleccione la fuente..."
								gridCols={1}
								useFixedDimensions={true}
							/>

							{/* Test Connection */}
							<div className="border-t border-gray-600 pt-4">
								<h3 className="text-lg font-semibold text-white mb-4">
									Test de Conexión
								</h3>
								<div className="flex items-center justify-between mb-4">
									<div className="flex items-center space-x-3">
										{getTestStatusIcon()}
										<div>
											<p className="text-white font-medium">
												Estado:{" "}
												{testStatus === "testing"
													? "Probando..."
													: testStatus === "success"
														? "Conectado"
														: testStatus === "error"
															? "Error de conexión"
															: "No probado"}
											</p>
											{testResult && (
												<p className="text-gray-300 text-sm">
													{testResult.message}
												</p>
											)}
										</div>
									</div>
									<button
										type="button"
										onClick={handleTestConnection}
										disabled={testStatus === "testing"}
										className={`${BUTTON_STYLES.primary} px-4 py-2`}
									>
										{testStatus === "testing"
											? "PROBANDO..."
											: "PROBAR CONEXIÓN"}
									</button>
								</div>
							</div>
						</div>
					)}

					{/* Action Buttons */}
					<div className="flex justify-center space-x-4">
						<button
							type="button"
							onClick={handleSaveConfig}
							disabled={isLoading || !hasUnsavedChanges}
							className={`${BUTTON_STYLES.success} px-8 py-3`}
							style={{ minWidth: "200px" }}
						>
							<Save size={20} className="mr-2" />
							{isLoading ? "GUARDANDO..." : "GUARDAR CONFIGURACIÓN"}
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

					{/* Unsaved Changes Warning */}
					{hasUnsavedChanges && (
						<div className="bg-yellow-900 border border-yellow-600 rounded-lg p-4">
							<p className="text-yellow-200 text-sm">
								⚠️ Tiene cambios sin guardar. Asegúrese de guardar la
								configuración antes de salir.
							</p>
						</div>
					)}
				</div>
			</div>
		</HMIContainer>
	);
};
