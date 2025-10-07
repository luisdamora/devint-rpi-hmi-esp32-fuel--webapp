/**
 * Ejemplo de uso del componente TouchSelect
 * Este archivo sirve como referencia para implementar TouchSelect en otros formularios
 */

import React, { useState } from "react";
import { TouchSelect, type TouchSelectOption } from "./touch-select";

export const TouchSelectExample: React.FC = () => {
	const [selectedCountry, setSelectedCountry] = useState("");
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

	// Ejemplo 1: Selector de países (2 columnas)
	const countryOptions: TouchSelectOption[] = [
		{
			value: "CO",
			label: "Colombia",
			icon: "🇨🇴",
			description: "República de Colombia",
		},
		{
			value: "US",
			label: "Estados Unidos",
			icon: "🇺🇸",
			description: "United States of America",
		},
		{
			value: "MX",
			label: "México",
			icon: "🇲🇽",
			description: "Estados Unidos Mexicanos",
		},
		{
			value: "AR",
			label: "Argentina",
			icon: "🇦🇷",
			description: "República Argentina",
		},
	];

	// Ejemplo 2: Métodos de pago (3 columnas)
	const paymentOptions: TouchSelectOption[] = [
		{
			value: "cash",
			label: "Efectivo",
			icon: "💵",
			description: "Pago en efectivo",
		},
		{
			value: "card",
			label: "Tarjeta",
			icon: "💳",
			description: "Débito o crédito",
		},
		{
			value: "transfer",
			label: "Transferencia",
			icon: "🏦",
			description: "Transferencia bancaria",
		},
		{
			value: "qr",
			label: "Código QR",
			icon: "📱",
			description: "Pago móvil QR",
		},
		{
			value: "wallet",
			label: "Billetera Digital",
			icon: "💰",
			description: "Nequi, Daviplata, etc.",
		},
		{
			value: "check",
			label: "Cheque",
			icon: "📝",
			description: "Pago con cheque",
		},
	];

	return (
		<div className="p-8 space-y-8">
			<h1 className="text-white text-2xl font-bold">
				Ejemplos de TouchSelect
			</h1>

			{/* Ejemplo 1 */}
			<div>
				<TouchSelect
					value={selectedCountry}
					options={countryOptions}
					onChange={setSelectedCountry}
					label="País de Origen:"
					placeholder="Seleccione su país..."
					gridCols={2}
				/>
				{selectedCountry && (
					<p className="text-white mt-2">
						País seleccionado: {selectedCountry}
					</p>
				)}
			</div>

			{/* Ejemplo 2 */}
			<div>
				<TouchSelect
					value={selectedPaymentMethod}
					options={paymentOptions}
					onChange={setSelectedPaymentMethod}
					label="Método de Pago:"
					placeholder="¿Cómo desea pagar?"
					gridCols={3}
				/>
				{selectedPaymentMethod && (
					<p className="text-white mt-2">
						Método seleccionado: {selectedPaymentMethod}
					</p>
				)}
			</div>
		</div>
	);
};

// Ejemplo de uso en un formulario real
export const FormWithTouchSelect: React.FC = () => {
	const [formData, setFormData] = useState({
		vehicleType: "",
		fuelType: "",
		serviceType: "",
	});

	const vehicleOptions: TouchSelectOption[] = [
		{ value: "car", label: "Automóvil", icon: "🚗" },
		{ value: "truck", label: "Camión", icon: "🚚" },
		{ value: "motorcycle", label: "Motocicleta", icon: "🏍️" },
		{ value: "bus", label: "Bus", icon: "🚌" },
	];

	const fuelOptions: TouchSelectOption[] = [
		{
			value: "regular",
			label: "Corriente",
			icon: "⛽",
			description: "Gasolina corriente 87 octanos",
		},
		{
			value: "premium",
			label: "Extra",
			icon: "⭐",
			description: "Gasolina extra 91+ octanos",
		},
		{
			value: "diesel",
			label: "Diesel",
			icon: "🚛",
			description: "ACPM / Diesel",
		},
	];

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Formulario enviado:", formData);
	};

	return (
		<form onSubmit={handleSubmit} className="p-8 space-y-6">
			<TouchSelect
				value={formData.vehicleType}
				options={vehicleOptions}
				onChange={(value) =>
					setFormData({ ...formData, vehicleType: value })
				}
				label="Tipo de Vehículo:"
				placeholder="Seleccione el tipo de vehículo"
				gridCols={4}
			/>

			<TouchSelect
				value={formData.fuelType}
				options={fuelOptions}
				onChange={(value) => setFormData({ ...formData, fuelType: value })}
				label="Tipo de Combustible:"
				placeholder="Seleccione el combustible"
				gridCols={3}
			/>

			<button
				type="submit"
				className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-xl hover:bg-green-700"
			>
				Continuar
			</button>
		</form>
	);
};
