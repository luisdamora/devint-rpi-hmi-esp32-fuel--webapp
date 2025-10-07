/**
 * Ejemplos de uso del componente TouchInput
 * Este archivo sirve como referencia para implementar TouchInput en formularios
 */

import React, { useState } from "react";
import { TouchInput } from "./index";

/**
 * Ejemplo básico de TouchInput
 */
export const TouchInputBasicExample: React.FC = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");

	return (
		<div className="p-8 space-y-6">
			<h1 className="text-white text-2xl font-bold">Ejemplos de TouchInput</h1>

			{/* Ejemplo 1: Input de texto simple */}
			<TouchInput
				value={name}
				onChange={setName}
				label="Nombre Completo:"
				placeholder="Ingrese su nombre"
				maxLength={50}
			/>

			{/* Ejemplo 2: Input de email */}
			<TouchInput
				value={email}
				onChange={setEmail}
				label="Correo Electrónico:"
				placeholder="correo@ejemplo.com"
				type="email"
				maxLength={100}
			/>

			{/* Ejemplo 3: Input de teléfono */}
			<TouchInput
				value={phone}
				onChange={setPhone}
				label="Teléfono:"
				placeholder="Ingrese su teléfono"
				type="tel"
				maxLength={15}
			/>

			{/* Mostrar valores */}
			<div className="mt-8 p-4 bg-gray-800 rounded-lg">
				<h2 className="text-white font-bold mb-2">Valores actuales:</h2>
				<p className="text-gray-300">Nombre: {name || "(vacío)"}</p>
				<p className="text-gray-300">Email: {email || "(vacío)"}</p>
				<p className="text-gray-300">Teléfono: {phone || "(vacío)"}</p>
			</div>
		</div>
	);
};

/**
 * Ejemplo de formulario completo con TouchInput
 */
export const TouchInputFormExample: React.FC = () => {
	const [formData, setFormData] = useState({
		documentNumber: "",
		name: "",
		address: "",
		email: "",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Formulario enviado:", formData);
		alert("Formulario enviado correctamente!");
	};

	return (
		<form onSubmit={handleSubmit} className="p-8 space-y-4">
			<h1 className="text-white text-2xl font-bold mb-6">
				Registro de Cliente
			</h1>

			<TouchInput
				value={formData.documentNumber}
				onChange={(value) =>
					setFormData({ ...formData, documentNumber: value })
				}
				label="Número de Documento:"
				placeholder="Ingrese el número de documento"
				maxLength={20}
				id="documentNumber"
			/>

			<TouchInput
				value={formData.name}
				onChange={(value) => setFormData({ ...formData, name: value })}
				label="Nombre / Razón Social:"
				placeholder="Ingrese el nombre completo"
				maxLength={100}
				id="name"
			/>

			<TouchInput
				value={formData.address}
				onChange={(value) => setFormData({ ...formData, address: value })}
				label="Dirección:"
				placeholder="Ingrese la dirección"
				maxLength={200}
				id="address"
			/>

			<TouchInput
				value={formData.email}
				onChange={(value) => setFormData({ ...formData, email: value })}
				label="Email:"
				placeholder="correo@ejemplo.com"
				type="email"
				maxLength={100}
				id="email"
			/>

			<div className="flex justify-center pt-4">
				<button
					type="submit"
					className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 active:bg-green-800 transition-colors"
				>
					REGISTRAR
				</button>
			</div>
		</form>
	);
};

/**
 * Ejemplo con dimensiones fijas HMI (800x480px)
 */
export const TouchInputWithFixedDimensions: React.FC = () => {
	const [value, setValue] = useState("");

	return (
		<div className="p-8">
			<h2 className="text-white text-xl font-bold mb-4">
				TouchInput con Dimensiones Fijas (800x480px)
			</h2>
			<TouchInput
				value={value}
				onChange={setValue}
				label="Ingrese su texto:"
				placeholder="Toque para escribir..."
				maxLength={100}
				useFixedDimensions={true}
			/>
			<p className="text-gray-400 mt-4 text-sm">
				El modal tiene dimensiones máximas de 800x480px (HMI estándar)
			</p>
		</div>
	);
};
