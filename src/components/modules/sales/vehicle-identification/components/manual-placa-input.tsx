import { AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";
import {
	getButtonClasses,
	getInputClasses,
	HMI_COLORS,
} from "@/lib/config/hmi-styles-config";

export interface ManualPlacaInputProps {
	onSubmit: (placa: string) => boolean;
	onValidate: (placa: string) => boolean;
}

/**
 * Input para ingreso manual de placa
 *
 * Componente optimizado HMI con:
 * - Validación en tiempo real
 * - Conversión automática a mayúsculas
 * - Feedback visual
 *
 * @example
 * ```tsx
 * <ManualPlacaInput
 *   onSubmit={(placa) => identifyManual(placa)}
 *   onValidate={(placa) => validatePlaca(placa)}
 * />
 * ```
 */
export const ManualPlacaInput: React.FC<ManualPlacaInputProps> = ({
	onSubmit,
	onValidate,
}) => {
	const [value, setValue] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isValid, setIsValid] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value.toUpperCase();
		setValue(newValue);

		// Validar en tiempo real
		if (newValue.length >= 6) {
			const valid = onValidate(newValue);
			setIsValid(valid);
			setError(valid ? null : "Formato inválido: Use ABC123");
		} else {
			setIsValid(false);
			setError(null);
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const success = onSubmit(value);
		if (!success) {
			setError("No se pudo identificar el vehículo");
		}
	};

	const inputState = error ? "error" : isValid ? "success" : "default";

	return (
		<form onSubmit={handleSubmit} className="space-y-3">
			{/* Input de placa */}
			<div>
				<label
					htmlFor="placa-input"
					className="block text-sm font-semibold text-gray-700 mb-1"
				>
					PLACA DEL VEHÍCULO
				</label>

				<div className="relative">
					<input
						id="placa-input"
						type="text"
						value={value}
						onChange={handleChange}
						placeholder="ABC123"
						maxLength={6}
						className={`${getInputClasses(inputState)} w-full text-center text-xl font-bold tracking-wider`}
						style={{
							letterSpacing: "0.2em",
						}}
					/>

					{/* Ícono de estado */}
					{value.length >= 6 && (
						<div className="absolute right-3 top-1/2 transform -translate-y-1/2">
							{isValid ? (
								<CheckCircle size={24} style={{ color: HMI_COLORS.success }} />
							) : (
								<AlertCircle size={24} style={{ color: HMI_COLORS.error }} />
							)}
						</div>
					)}
				</div>

				{/* Mensaje de error */}
				{error && (
					<p
						className="mt-1 text-sm font-medium"
						style={{ color: HMI_COLORS.error }}
					>
						{error}
					</p>
				)}

				{/* Hint */}
				{!error && value.length < 6 && (
					<p
						className="mt-1 text-sm"
						style={{ color: HMI_COLORS.textSecondary }}
					>
						Formato: 3 letras + 3 números (ej: ABC123)
					</p>
				)}
			</div>

			{/* Botón de confirmar */}
			<button
				type="submit"
				disabled={!isValid}
				className={`${getButtonClasses("lg", "primary")} w-full`}
			>
				CONFIRMAR PLACA
			</button>
		</form>
	);
};

export default ManualPlacaInput;
