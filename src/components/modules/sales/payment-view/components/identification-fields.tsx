import type React from "react";
import { TouchInput } from "@/components/shared/touch-input";
import { cn } from "@/lib/utils";
import type { PaymentMode } from "../types";

/**
 * Props de los campos de identificación
 */
export interface IdentificationFieldsProps {
	/** Modo de pago activo (determina qué campos mostrar y editables) */
	mode: PaymentMode;
	/** Valor del campo placa */
	placa: string;
	/** Valor del campo ID factura electrónica */
	idFacturaElectronica: string;
	/** Valor del campo ID Puntos Colombia */
	idPuntosColombia: string;
	/** Estado del checkbox cupón */
	hasCoupon: boolean;
	/** Valor del campo ID promoción */
	idPromocion: string;
	/** Callback al cambiar placa */
	onPlacaChange: (value: string) => void;
	/** Callback al cambiar ID factura */
	onIdFacturaChange: (value: string) => void;
	/** Callback al cambiar ID Puntos */
	onIdPuntosChange: (value: string) => void;
	/** Callback al cambiar estado de cupón */
	onHasCouponChange: (checked: boolean) => void;
	/** Callback al cambiar ID promoción */
	onIdPromocionChange: (value: string) => void;
	/** Errores de validación por campo */
	validationErrors: Record<string, string>;
}

/**
 * IdentificationFields - Campos de identificación del vehículo y cliente
 *
 * Renderiza los campos de identificación de forma condicional según el modo:
 * - CONTADO: Todos los campos editables, cupón opcional
 * - CRÉDITO: Solo PLACA editable, otros campos readonly/disabled
 *
 * Campos incluidos:
 * - PLACA (obligatorio en ambos modos)
 * - ID FACTURA ELECTRONICA (opcional en CONTADO, readonly en CRÉDITO)
 * - ID PUNTOS COLOMBIA (opcional en CONTADO, readonly en CRÉDITO)
 * - Checkbox CUPÓN (solo visible en CONTADO)
 * - ID PROMOCION (solo visible si hasCoupon=true, obligatorio)
 *
 * @example
 * ```tsx
 * <IdentificationFields
 *   mode="CONTADO"
 *   placa={placa}
 *   onPlacaChange={setPlaca}
 *   // ... otros props
 *   validationErrors={errors}
 * />
 * ```
 */
export const IdentificationFields: React.FC<IdentificationFieldsProps> = ({
	mode,
	placa,
	idFacturaElectronica,
	idPuntosColombia,
	hasCoupon,
	idPromocion,
	onPlacaChange,
	onIdFacturaChange,
	onIdPuntosChange,
	onHasCouponChange,
	onIdPromocionChange,
	validationErrors,
}) => {
	const isCredito = mode === "CREDITO";

	return (
		<div className="space-y-4">
			{/* Grid de campos principales */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{/* PLACA - Siempre visible y obligatorio */}
				<div className="space-y-1">
					<TouchInput
						value={placa}
						onChange={onPlacaChange}
						label="PLACA *"
						placeholder="Ej: ABC123"
						maxLength={6}
						keyboardMode="full"
						disabled={false}
					/>
					{validationErrors.placa && (
						<p className="text-sm text-red-500 px-2">
							{validationErrors.placa}
						</p>
					)}
				</div>

				{/* ID FACTURA ELECTRONICA */}
				<div className="space-y-1">
					<TouchInput
						value={idFacturaElectronica}
						onChange={onIdFacturaChange}
						label="ID FACTURA ELECTRONICA"
						placeholder={isCredito ? "Generado automático" : "Opcional"}
						keyboardMode="numeric"
						disabled={isCredito}
						className={cn(isCredito && "opacity-60")}
					/>
					{validationErrors.idFacturaElectronica && (
						<p className="text-sm text-red-500 px-2">
							{validationErrors.idFacturaElectronica}
						</p>
					)}
				</div>

				{/* ID PUNTOS COLOMBIA */}
				<div className="space-y-1">
					<TouchInput
						value={idPuntosColombia}
						onChange={onIdPuntosChange}
						label="ID PUNTOS COLOMBIA"
						placeholder={isCredito ? "Generado automático" : "Opcional"}
						keyboardMode="numeric"
						disabled={isCredito}
						className={cn(isCredito && "opacity-60")}
					/>
					{validationErrors.idPuntosColombia && (
						<p className="text-sm text-red-500 px-2">
							{validationErrors.idPuntosColombia}
						</p>
					)}
				</div>
			</div>

			{/* Sección de CUPÓN - Solo visible en modo CONTADO */}
			{!isCredito && (
				<div className="space-y-3 border-t pt-4">
					{/* Checkbox CUPÓN */}
					<label className="flex items-center gap-3 cursor-pointer select-none">
						<input
							type="checkbox"
							checked={hasCoupon}
							onChange={(e) => onHasCouponChange(e.target.checked)}
							className={cn(
								"w-6 h-6 rounded border-2 border-gray-300",
								"focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
								"cursor-pointer transition-colors",
								hasCoupon && "bg-blue-500 border-blue-500",
							)}
						/>
						<span className="text-lg font-semibold text-gray-700">
							¿Aplicar cupón de descuento?
						</span>
					</label>

					{/* Campo ID PROMOCION - Solo visible si hasCoupon=true */}
					{hasCoupon && (
						<div className="space-y-1 pl-9">
							<TouchInput
								value={idPromocion}
								onChange={onIdPromocionChange}
								label="ID PROMOCIÓN *"
								placeholder="Mínimo 8 dígitos"
								keyboardMode="numeric"
								maxLength={20}
							/>
							{validationErrors.idPromocion && (
								<p className="text-sm text-red-500 px-2">
									{validationErrors.idPromocion}
								</p>
							)}
						</div>
					)}
				</div>
			)}
		</div>
	);
};
