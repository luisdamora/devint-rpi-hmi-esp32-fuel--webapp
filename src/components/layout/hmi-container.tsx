import React from "react";
import { HMIFooterInfo } from "@/components/shared/hmi-footer-info";
import { HMIHeader } from "@/components/shared/hmi-header";
import { NEXUS_COLORS } from "@/lib/config/theme";
import { cn } from "@/lib/utils";

interface HMIContainerProps {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
}

/**
 * HMIContainer
 * Contenedor base para vistas dentro del área principal del HMI.
 * Ocupa todo el espacio disponible y aplica padding horizontal por defecto.
 */
export const HMIContainer: React.FC<HMIContainerProps> = ({
	children,
	className,
	style,
}) => {
	return (
		<div
			className={cn("w-full h-full", className)}
			style={{ backgroundColor: NEXUS_COLORS.background.main, ...style }}
		>
			<HMIHeader stationName="Nexus POS" logoAlt="Nexus POS" />
			<div className="flex-1 overflow-hidden">{children}</div>
			<HMIFooterInfo primaryBg={true} />
		</div>
	);
};
