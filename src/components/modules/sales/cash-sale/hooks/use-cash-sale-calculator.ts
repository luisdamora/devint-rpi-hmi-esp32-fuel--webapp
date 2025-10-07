import { useState } from "react";

export interface UseCashSaleCalculatorReturn {
	value: string;
	isDecimal: boolean;
	displayMoney: () => string;
	handleNumber: (num: string) => void;
	handleTripleZero: () => void;
	handleDecimal: () => void;
	handleClear: () => void;
	handleBackspace: () => void;
}

export const useCashSaleCalculator = (initialValue: string = "100000"): UseCashSaleCalculatorReturn => {
	const [value, setValue] = useState(initialValue);
	const [isDecimal, setIsDecimal] = useState(false);

	const displayMoney = (): string => {
		const n = Number(value || 0);
		return n.toLocaleString("es-CO");
	};

	const handleNumber = (num: string): void => {
		const v = value === "0" ? num : value + num;
		setValue(v);
	};

	const handleTripleZero = (): void => {
		const numeric = value.replace(/\D/g, "");
		const multiplied = (Number(numeric || "0") * 1000).toString();
		setValue(multiplied);
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
