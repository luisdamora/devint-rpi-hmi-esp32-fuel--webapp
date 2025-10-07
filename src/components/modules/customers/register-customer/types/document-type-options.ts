import type { TouchSelectOption } from "@/components/shared/touch-select";

// Opciones de tipo de documento
export const documentTypeOptions: TouchSelectOption[] = [
	{
		value: "CC",
		label: "Cédula de Ciudadanía (CC)",
		icon: "🆔",
		description: "Documento de identidad para ciudadanos colombianos",
	},
	{
		value: "NIT",
		label: "NIT (Empresa)",
		icon: "🏢",
		description: "Número de Identificación Tributaria para empresas",
	},
	{
		value: "CE",
		label: "Cédula de Extranjería (CE)",
		icon: "🌍",
		description: "Documento para extranjeros residentes en Colombia",
	},
	{
		value: "PAS",
		label: "Pasaporte (PAS)",
		icon: "📖",
		description: "Documento de viaje internacional",
	},
];
