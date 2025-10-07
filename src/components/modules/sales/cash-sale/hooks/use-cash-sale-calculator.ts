import { useState } from "react";
import type { PaymentMode } from "../components/action-buttons";

export interface UseCashSaleCalculatorReturn {
	value: string;
	isDecimal: boolean;
	displayMoney: () => string;
	handleNumber: (num: string) => void;
	handleTripleZero: (mode: PaymentMode) => void;
	handleDecimal: () => void;
	handleClear: () => void;
	handleBackspace: () => void;
}

export const useCashSaleCalculator = (
	initialValue: string = "100000",
): UseCashSaleCalculatorReturn => {
	const [value, setValue] = useState(initialValue);
	const [isDecimal, setIsDecimal] = useState(false);

	const displayMoney = (): string => {
		const n = Number(value || 0);
		return n.toLocaleString("es-CO");
	};

	const handleNumber = (num: string): void => {
		// Si está en modo decimal y ya hay un punto, no permitir más números después del punto
		if (isDecimal && value.includes(".")) {
			const decimalPart = value.split(".")[1];
			if (decimalPart && decimalPart.length >= 1) {
				return; // Ya tiene un dígito decimal, no agregar más
			}
		}

		const v = value === "0" ? num : value + num;
		setValue(v);
	};

	const handleTripleZero = (mode: PaymentMode): void => {
		if (mode === "cash") {
			// Modo efectivo: multiplicar por 1000
			const numeric = value.replace(/\D/g, "");
			const multiplied = (Number(numeric || "0") * 1000).toString();
			setValue(multiplied);
		} else if (mode === "volume") {
			// Modo volumen: agregar punto decimal si no existe
			if (!isDecimal && !value.includes(".")) {
				setValue(value + ".");
				setIsDecimal(true);
			}
		}
	};

	const handleDecimal = (): void => {
		if (!isDecimal) {
			setValue(value + ".");
			setIsDecimal(true);
		}
	};

	const handleClear = (): void => {
		setValue("0");
		setIsDecimal(false);
	};

	const handleBackspace = (): void => {
		if (value.length > 1) {
			const v = value.slice(0, -1);
			setValue(v);
			if (value.slice(-1) === ".") setIsDecimal(false);
		} else {
			setValue("0");
		}
	};

	return {
		value,
		isDecimal,
		displayMoney,
		handleNumber,
		handleTripleZero,
		handleDecimal,
		handleClear,
		handleBackspace,
	};
};
