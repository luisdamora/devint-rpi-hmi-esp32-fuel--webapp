import React from "react";
import { TouchInput } from "@/components/shared/touch-input";
import { TouchSelect } from "@/components/shared/touch-select";
import { BUTTON_STYLES } from "@/lib/config/theme";
import { documentTypeOptions } from "../types/document-type-options";

interface CustomerFormProps {
	documentType: string;
	documentNumber: string;
	name: string;
	email: string;
	onDocumentTypeChange: (value: string) => void;
	onDocumentNumberChange: (value: string) => void;
	onNameChange: (value: string) => void;
	onEmailChange: (value: string) => void;
	onSubmit: () => void;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({
	documentType,
	documentNumber,
	name,
	email,
	onDocumentTypeChange,
	onDocumentNumberChange,
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
			<TouchSelect
				value={documentType}
				options={documentTypeOptions}
				onChange={onDocumentTypeChange}
				label="Tipo de Documento"
				placeholder="Seleccione tipo de documento..."
				gridCols={2}
				useFixedDimensions={true}
			/>

			{/* Número de Identificación y DV */}
			<div className="flex gap-4">
				<TouchInput
					className="flex-1"
					value={documentNumber}
					onChange={onDocumentNumberChange}
					label="Número de Identificación"
					placeholder="Ingrese el número"
					maxLength={10}
					id="documentNumber"
					keyboardMode="numeric"
					useFixedDimensions
				/>
				{/* <TouchInput
					className="w-24"
					value={verificationDigit}
					onChange={onVerificationDigitChange}
					label="DV:"
					placeholder="0"
					maxLength={1}
					id="verificationDigit"
					useFixedDimensions
				/> */}
			</div>

			{/* Nombre / Razón Social */}
			<TouchInput
				value={name}
				onChange={onNameChange}
				label="Nombre / Razón Social"
				placeholder="Ingrese el nombre completo"
				maxLength={100}
				id="name"
				useFixedDimensions
			/>

			{/* Email para Factura Electrónica */}
			<TouchInput
				value={email}
				onChange={onEmailChange}
				label="Email para envío de Factura Electrónica"
				placeholder="correo@ejemplo.com"
				maxLength={100}
				id="email"
				useFixedDimensions
			/>

			{/* Botón Registrar */}
			<div className="flex justify-center pt-1">
				<button
					type="submit"
					className={BUTTON_STYLES.success}
					style={{
						minWidth: "300px",
						fontSize: "1.25rem",
						padding: "0.5rem 1rem",
					}}
				>
					REGISTRAR
				</button>
			</div>
		</form>
	);
};
