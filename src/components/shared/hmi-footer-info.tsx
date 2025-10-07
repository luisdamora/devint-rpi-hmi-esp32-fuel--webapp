import React from "react";
import { NEXUS_COLORS } from "@/lib/config/theme";
import { cn } from "@/lib/utils";

interface HMIFooterInfoProps {
	className?: string;
	style?: React.CSSProperties;
	/** Si es true, usa fondo primario del theme; si es false, sin fondo */
	primaryBg?: boolean;
}

/**
 * HMIFooterInfo
 * Bloque reutilizable de información de contacto para el HMI.
 * Permite elegir si el fondo usa el color primario o ninguno.
 */
export const HMIFooterInfo: React.FC<HMIFooterInfoProps> = ({
	className,
	style,
	primaryBg = false,
}) => {
	const backgroundStyle: React.CSSProperties = primaryBg
		? { backgroundColor: NEXUS_COLORS.background.main }
		: {};
	// const textColor = primaryBg
	// 	? NEXUS_COLORS.white
	// 	: NEXUS_COLORS.background.dark;
	const textColor = NEXUS_COLORS.white;

	return (
		<div
			className={cn("w-full px-6 py-1", className)}
			style={{ ...backgroundStyle, ...style }}
		>
			<div
				className="flex items-center justify-center gap-8 text-sm"
				style={{ color: textColor }}
			>
				<span>✉ soporte@vpmnexus.com</span>
				<span>🌐 www.vpmnexus.com</span>
				<span>📞 +57-3184936241</span>
				<span>📞 +57-3164475985</span>
			</div>
		</div>
	);
};
