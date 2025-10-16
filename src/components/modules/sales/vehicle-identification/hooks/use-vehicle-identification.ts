import { useState, useEffect } from "react";
import type { IdentificationMethod, VehicleData } from "@/lib/hooks/use-transaction-context";

export interface UseVehicleIdentificationReturn {
	activeMethod: IdentificationMethod | null;
	isIdentified: boolean;
	vehicleData: VehicleData | null;
	isReading: boolean;
	error: string | null;
	setActiveMethod: (method: IdentificationMethod | null) => void;
	readRFID: () => Promise<void>;
	readIButton: () => Promise<void>;
	identifyManual: (placa: string) => boolean;
	validatePlaca: (placa: string) => boolean;
	resetIdentification: () => void;
}

/**
 * Hook para gestionar la identificación de vehículos
 *
 * Soporta tres métodos de identificación:
 * - Manual: Input de placa (teclado virtual)
 * - RFID: Lectura automática de tag RFID
 * - iButton: Lectura automática de llave de contacto
 *
 * @example
 * ```tsx
 * const {
 *   activeMethod,
 *   isIdentified,
 *   vehicleData,
 *   identifyManual
 * } = useVehicleIdentification();
 * ```
 */
export const useVehicleIdentification = (): UseVehicleIdentificationReturn => {
	const [activeMethod, setActiveMethod] = useState<IdentificationMethod | null>(null);
	const [isIdentified, setIsIdentified] = useState(false);
	const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
	const [isReading, setIsReading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	/**
	 * Simular lectura RFID
	 * En producción, esto se conectaría con el lector RFID físico
	 */
	const readRFID = async (): Promise<void> => {
		setIsReading(true);
		setError(null);

		// Simular espera de lectura (5 segundos)
		await new Promise((resolve) => setTimeout(resolve, 5000));

		// Simular lectura exitosa (90% probabilidad)
		if (Math.random() > 0.1) {
			const mockPlaca = "ABC" + Math.floor(Math.random() * 900 + 100);
			setVehicleData({
				placa: mockPlaca,
				identificationType: "RFID",
				vehicleId: `RFID-${Date.now()}`,
				isIdentified: true,
				identifiedAt: new Date().toISOString(),
			});
			setIsIdentified(true);
		} else {
			setError("No se pudo leer el tag RFID. Intente nuevamente.");
		}

		setIsReading(false);
	};

	/**
	 * Simular lectura iButton
	 * En producción, esto se conectaría con el lector iButton físico
	 */
	const readIButton = async (): Promise<void> => {
		setIsReading(true);
		setError(null);

		// Simular espera de lectura (3 segundos)
		await new Promise((resolve) => setTimeout(resolve, 3000));

		// Simular lectura exitosa (90% probabilidad)
		if (Math.random() > 0.1) {
			const mockPlaca = "DEF" + Math.floor(Math.random() * 900 + 100);
			setVehicleData({
				placa: mockPlaca,
				identificationType: "IBUTTON",
				vehicleId: `IBTN-${Date.now()}`,
				isIdentified: true,
				identifiedAt: new Date().toISOString(),
			});
			setIsIdentified(true);
		} else {
			setError("No se detectó llave iButton. Intente nuevamente.");
		}

		setIsReading(false);
	};

	/**
	 * Validar formato de placa colombiana
	 * Formato: ABC123 (3 letras mayúsculas + 3 números)
	 */
	const validatePlaca = (placa: string): boolean => {
		const PLACA_REGEX = /^[A-Z]{3}[0-9]{3}$/;
		return PLACA_REGEX.test(placa.toUpperCase());
	};

	/**
	 * Identificar vehículo manualmente mediante placa
	 */
	const identifyManual = (placa: string): boolean => {
		setError(null);

		if (!validatePlaca(placa)) {
			setError("Formato de placa inválido. Use: ABC123 (3 letras + 3 números)");
			return false;
		}

		setVehicleData({
			placa: placa.toUpperCase(),
			identificationType: "MANUAL",
			vehicleId: placa.toUpperCase(),
			isIdentified: true,
			identifiedAt: new Date().toISOString(),
		});
		setIsIdentified(true);
		return true;
	};

	/**
	 * Auto-activar lectura cuando se selecciona método automático
	 */
	useEffect(() => {
		if (activeMethod === "RFID" && !isIdentified && !isReading) {
			readRFID();
		} else if (activeMethod === "IBUTTON" && !isIdentified && !isReading) {
			readIButton();
		}
	}, [activeMethod]);

	/**
	 * Reset de identificación
	 */
	const resetIdentification = (): void => {
		setIsIdentified(false);
		setVehicleData(null);
		setError(null);
		setIsReading(false);
		setActiveMethod(null);
	};

	return {
		activeMethod,
		isIdentified,
		vehicleData,
		isReading,
		error,
		setActiveMethod,
		readRFID,
		readIButton,
		identifyManual,
		validatePlaca,
		resetIdentification,
	};
};
