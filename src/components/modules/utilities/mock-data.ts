import type { SaleRecord } from "./types";

/**
 * Datos de ejemplo para la tabla de últimas ventas
 * Estos datos simulan ventas reales del mercado colombiano
 */
export const mockSalesData: SaleRecord[] = [
	{
		fe: "#FE001234",
		idPuntos: "PTS-2024-001",
		idPromo: "PROMO-10",
		placa: "ABC-123",
		producto: "Gasolina Corriente",
		dinero: 125000,
		volumen: 25.5,
	},
	{
		fe: "#FE001235",
		idPuntos: "PTS-2024-002",
		idPromo: "PROMO-15",
		placa: "DEF-456",
		producto: "Diesel",
		dinero: 180000,
		volumen: 40.0,
	},
	{
		fe: "#FE001236",
		idPuntos: "PTS-2024-003",
		idPromo: "PROMO-10",
		placa: "GHI-789",
		producto: "ACPM",
		dinero: 95000,
		volumen: 18.2,
	},
	{
		fe: "#FE001237",
		idPuntos: "PTS-2024-004",
		idPromo: "PROMO-20",
		placa: "JKL-012",
		producto: "Gasolina Extra",
		dinero: 210000,
		volumen: 35.8,
	},
	{
		fe: "#FE001238",
		idPuntos: "PTS-2024-005",
		idPromo: "PROMO-10",
		placa: "MNO-345",
		producto: "Gasolina Corriente",
		dinero: 67000,
		volumen: 13.5,
	},
];
