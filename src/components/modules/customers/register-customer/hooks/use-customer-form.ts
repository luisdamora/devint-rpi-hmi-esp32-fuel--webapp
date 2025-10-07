import { useState } from "react";

export interface CustomerFormData {
	documentType: string;
	documentNumber: string;
	verificationDigit: string;
	name: string;
	email: string;
}

export const useCustomerForm = () => {
	const [formData, setFormData] = useState<CustomerFormData>({
		documentType: "",
		documentNumber: "",
		verificationDigit: "",
		name: "",
		email: "",
	});

	const handleDocumentTypeChange = (value: string) => {
		setFormData((prev) => ({ ...prev, documentType: value }));
	};

	const handleDocumentNumberChange = (value: string) => {
		setFormData((prev) => ({ ...prev, documentNumber: value }));
	};

	const handleVerificationDigitChange = (value: string) => {
		// Solo permite números y máximo 1 caracter
		if (/^\d*$/.test(value) && value.length <= 1) {
			setFormData((prev) => ({ ...prev, verificationDigit: value }));
		}
	};

	const handleNameChange = (value: string) => {
		setFormData((prev) => ({ ...prev, name: value }));
	};

	const handleEmailChange = (value: string) => {
		setFormData((prev) => ({ ...prev, email: value }));
	};

	const handleSubmit = () => {
		// TODO: Implementar lógica de registro
		console.log("Registrando cliente:", formData);
		// Aquí se podría agregar validación y envío a API
	};

	const resetForm = () => {
		setFormData({
			documentType: "",
			documentNumber: "",
			verificationDigit: "",
			name: "",
			email: "",
		});
	};

	return {
		formData,
		handleDocumentTypeChange,
		handleDocumentNumberChange,
		handleVerificationDigitChange,
		handleNameChange,
		handleEmailChange,
		handleSubmit,
		resetForm,
	};
};
