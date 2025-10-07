import React from "react";
import { BUTTON_STYLES } from "@/lib/config/theme";

interface CustomerFormProps {
	documentType: string;
	documentNumber: string;
	verificationDigit: string;
	name: string;
	email: string;
	onDocumentTypeChange: (value: string) => void;
	onDocumentNumberChange: (value: string) => void;
	onVerificationDigitChange: (value: string) => void;
	onNameChange: (value: string) => void;
	onEmailChange: (value: string) => void;
	onSubmit: () => void;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({
	documentType,
	documentNumber,
	verificationDigit,
	name,
	email,
	onDocumentTypeChange,
	onDocumentNumberChange,
	onVerificationDigitChange,
	onNameChange,
	onEmailChange,
	onSubmit,
}) => {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit();
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			{/* Tipo de Documento */}
			<div>
				<label
					htmlFor="documentType"
					className="block text-white font-semibold mb-2 text-sm uppercase tracking-wide"
				>
					Tipo de Documento:
				</label>
				<select
					id="documentType"
					value={documentType}
					onChange={(e) => onDocumentTypeChange(e.target.value)}
					className="w-full px-2 py-1 rounded-lg text-gray-900 font-semibold focus:outline-none focus:ring-4 focus:ring-blue-500 bg-white text-lg"
					style={{
						fontSize: "1.2rem",
						minHeight: "70px",
						WebkitAppearance: "none",
						MozAppearance: "none",
						appearance: "none",
						cursor: "pointer",
					}}
				>
					<option
						value=""
						disabled
						style={{ fontSize: "1.1rem", padding: "1.5rem", minHeight: "60px" }}
					>
						Seleccione tipo de documento...
					</option>
					<option
						value="CC"
						style={{ fontSize: "1.1rem", padding: "1.5rem", minHeight: "60px" }}
					>
						🆔 Cédula de Ciudadanía (CC)
					</option>
					<option
						value="NIT"
						style={{ fontSize: "1.1rem", padding: "1.5rem", minHeight: "60px" }}
					>
						🏢 NIT (Empresa)
					</option>
					<option
						value="CE"
						style={{ fontSize: "1.1rem", padding: "1.5rem", minHeight: "60px" }}
					>
						🌍 Cédula de Extranjería (CE)
					</option>
					<option
						value="TI"
						style={{ fontSize: "1.1rem", padding: "1.5rem", minHeight: "60px" }}
					>
						👶 Tarjeta de Identidad (TI)
					</option>
					<option
						value="PAS"
						style={{ fontSize: "1.1rem", padding: "1.5rem", minHeight: "60px" }}
					>
						📖 Pasaporte (PAS)
					</option>
				</select>
			</div>

			{/* Número de Identificación y DV */}
			<div className="flex gap-4">
				<div className="flex-1">
					<label
						htmlFor="documentNumber"
						className="block text-white font-semibold mb-2 text-sm uppercase tracking-wide"
					>
						Número de Identificación:
					</label>
					<input
						id="documentNumber"
						type="text"
						value={documentNumber}
						onChange={(e) => onDocumentNumberChange(e.target.value)}
						className="w-full px-4 py-3 rounded-md text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
						style={{ fontSize: "1.1rem" }}
						placeholder="Ingrese el número"
					/>
				</div>
				<div className="w-24">
					<label
						htmlFor="verificationDigit"
						className="block text-white font-semibold mb-2 text-sm uppercase tracking-wide"
					>
						DV:
					</label>
					<input
						id="verificationDigit"
						type="text"
						maxLength={1}
						value={verificationDigit}
						onChange={(e) => onVerificationDigitChange(e.target.value)}
						className="w-full px-4 py-3 rounded-md text-gray-900 font-medium text-center focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
						style={{ fontSize: "1.1rem" }}
						placeholder="0"
					/>
				</div>
			</div>

			{/* Nombre / Razón Social */}
			<div>
				<label
					htmlFor="name"
					className="block text-white font-semibold mb-2 text-sm uppercase tracking-wide"
				>
					Nombre / Razón Social:
				</label>
				<input
					id="name"
					type="text"
					value={name}
					onChange={(e) => onNameChange(e.target.value)}
					className="w-full px-4 py-3 rounded-md text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
					style={{ fontSize: "1.1rem" }}
					placeholder="Ingrese el nombre completo"
				/>
			</div>

			{/* Email para Factura Electrónica */}
			<div>
				<label
					htmlFor="email"
					className="block text-white font-semibold mb-2 text-sm uppercase tracking-wide"
				>
					Email para envío de Factura Electrónica:
				</label>
				<input
					id="email"
					type="email"
					value={email}
					onChange={(e) => onEmailChange(e.target.value)}
					className="w-full px-4 py-3 rounded-md text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
					style={{ fontSize: "1.1rem" }}
					placeholder="correo@ejemplo.com"
				/>
			</div>

			{/* Botón Registrar */}
			<div className="flex justify-center pt-4">
				<button
					type="submit"
					className={BUTTON_STYLES.success}
					style={{
						minWidth: "300px",
						fontSize: "1.25rem",
						padding: "1rem 2rem",
					}}
				>
					REGISTRAR
				</button>
			</div>
		</form>
	);
};
