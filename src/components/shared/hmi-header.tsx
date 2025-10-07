import React from "react";
import { LogoBase } from "@/components/shared/logo-base";
import { HEADER_HEIGHT } from "@/lib/config/layout-dimensions";
import { NEXUS_COLORS, NEXUS_THEME_CONFIG } from "@/lib/config/theme";
import { cn } from "@/lib/utils";

export interface HMIHeaderProps {
	/** Texto de la estación, ej: "Estacion de Servicio Nexus" */
	stationName: string;
	/** Código de la EDS, ej: "99999" */
	stationCode?: string;
	/** Muestra reloj en vivo arriba a la derecha */
	showClock?: boolean;
	/** Alt del logo */
	logoAlt?: string;
	className?: string;
}

/**
 * HMIHeader: header según layout de referencia
 * - Izquierda: Logo grande
 * - Centro: etiqueta "EDS:" + nombre de la estación
 * - Derecha: fecha/hora (arriba) + código EDS
 */
export const HMIHeader: React.FC<HMIHeaderProps> = ({
	stationName,
	stationCode,
	showClock = true,
	logoAlt = "Nexus logo",
	className,
}) => {
	const [now, setNow] = React.useState<string>("");

	React.useEffect(() => {
		if (!showClock) return;
		const pad = (n: number) => n.toString().padStart(2, "0");
		const format = (d: Date) => {
			const day = pad(d.getDate());
			const month = pad(d.getMonth() + 1);
			const year = d.getFullYear();
			let h = d.getHours();
			const m = pad(d.getMinutes());
			const ampm = h >= 12 ? "pm" : "am";
			h = h % 12 || 12;
			return `${day}/${month}/${year} ${pad(h)}:${m} ${ampm}`;
		};
		const tick = () => setNow(format(new Date()));
		tick();
		const id = setInterval(tick, 1000);
		return () => clearInterval(id);
	}, [showClock]);

	return (
		<header
			className={cn(
				"w-full flex items-center justify-between px-4 border-b",
				className,
			)}
			style={{
				height: `${HEADER_HEIGHT}px`,
				backgroundColor: NEXUS_THEME_CONFIG.surface,
				borderColor: NEXUS_THEME_CONFIG.border,
				color: NEXUS_THEME_CONFIG.text,
			}}
		>
			{/* Logo - left */}
			<div className="flex items-center" style={{ height: "100%" }}>
				<LogoBase alt={logoAlt} className="h-10 w-auto" />
			</div>

			{/* Center text: EDS + name */}
			<div className="text-center flex-1 px-2">
				<span className="text-sm" style={{ color: NEXUS_COLORS.white }}>
					<span className="font-semibold mr-1">EDS:</span>
					{stationName}
				</span>
			</div>

			{/* Right: date/time (top) + code */}
			<div className="flex flex-col items-end leading-tight">
				{showClock && (
					<div className="text-xs" style={{ color: NEXUS_COLORS.white }}>
						{now}
					</div>
				)}
				{stationCode && (
					<div className="text-xs" style={{ color: NEXUS_COLORS.white }}>
						<span className="font-semibold mr-1">CODIGO EDS:</span>
						{stationCode}
					</div>
				)}
			</div>
		</header>
	);
};
