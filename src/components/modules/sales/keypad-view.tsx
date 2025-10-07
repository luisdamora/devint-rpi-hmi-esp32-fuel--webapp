import React, { useState } from "react";
import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";

interface KeypadViewProps {
	mode?: "money" | "volume";
}

export const KeypadViewComponent: React.FC<KeypadViewProps> = ({
	mode = "money",
}) => {
	const { navigateBack } = useHMINavigation();
	const [value, setValue] = useState("0");
	const [isDecimal, setIsDecimal] = useState(false);

	const handleNumber = (num: string) => {
		if (value === "0") {
			setValue(num);
		} else {
			setValue(value + num);
		}
	};

	const handleDecimal = () => {
		if (!isDecimal) {
			setValue(value + ".");
			setIsDecimal(true);
		}
	};

	const handleClear = () => {
		setValue("0");
		setIsDecimal(false);
	};

	const handleBackspace = () => {
		if (value.length > 1) {
			setValue(value.slice(0, -1));
			if (value.slice(-1) === ".") {
				setIsDecimal(false);
			}
		} else {
			setValue("0");
		}
	};

	return (
		<div className="flex flex-col h-screen bg-gray-900">
			{/* Header */}
			<div className="bg-blue-600 text-white px-6 py-4">
				<div className="flex justify-between items-center">
					<h1 className="text-xl font-bold">
						{mode === "money" ? "Ingreso de Monto" : "Ingreso de Volumen"}
					</h1>
					<button
						type="button"
						onClick={navigateBack}
						className="text-white hover:text-gray-200"
					>
						← Atrás
					</button>
				</div>
			</div>

			{/* Display */}
			<div className="bg-gray-800 p-6">
				<div className="text-right">
					<div className="text-4xl font-bold text-white mb-2">
						{mode === "money" ? "$" : ""}
						{value}
						{mode === "volume" ? " L" : ""}
					</div>
					<div className="text-gray-400 text-sm">
						{mode === "money"
							? "Ingrese el monto"
							: "Ingrese el volumen en litros"}
					</div>
				</div>
			</div>

			{/* Keypad */}
			<div className="flex-1 p-6">
				<div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
					{/* Numbers */}
					{["7", "8", "9", "4", "5", "6", "1", "2", "3"].map((num) => (
						<button
							type="button"
							key={num}
							onClick={() => handleNumber(num)}
							className="bg-gray-700 hover:bg-gray-600 text-white text-2xl font-semibold py-6 rounded-lg transition-colors"
						>
							{num}
						</button>
					))}

					{/* Special buttons */}
					<button
						type="button"
						onClick={handleClear}
						className="bg-red-600 hover:bg-red-700 text-white py-6 rounded-lg transition-colors"
					>
						C
					</button>
					<button
						type="button"
						onClick={() => handleNumber("0")}
						className="bg-gray-700 hover:bg-gray-600 text-white text-2xl font-semibold py-6 rounded-lg transition-colors"
					>
						0
					</button>
					<button
						type="button"
						onClick={handleDecimal}
						className="bg-gray-700 hover:bg-gray-600 text-white text-2xl font-semibold py-6 rounded-lg transition-colors"
					>
						.
					</button>

					{/* Backspace */}
					<button
						type="button"
						onClick={handleBackspace}
						className="bg-orange-600 hover:bg-orange-700 text-white py-6 rounded-lg transition-colors col-span-3"
					>
						← Borrar
					</button>
				</div>
			</div>

			{/* Action Buttons */}
			<div className="p-6 bg-gray-800">
				<div className="flex space-x-4">
					<button
						type="button"
						onClick={navigateBack}
						className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
					>
						Cancelar
					</button>
					<button
						type="button"
						className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
					>
						Confirmar
					</button>
				</div>
			</div>
		</div>
	);
};
