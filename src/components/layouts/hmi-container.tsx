import React from "react";
import { HMIFooterInfo } from "@/components/shared/hmi-footer-info";
import { HMIHeader } from "@/components/shared/hmi-header";
import { NEXUS_COLORS } from "@/lib/config/theme";
import { cn } from "@/lib/utils";

interface HMIContainerProps {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
	showHeader?: boolean;
	showFooter?: boolean;
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
	showHeader = true,
	showFooter = true,
}) => {
	return (
		<div
			className={cn("w-full h-full flex flex-col", className)}
			style={{ backgroundColor: NEXUS_COLORS.background.main, ...style }}
		>
			{showHeader && <HMIHeader stationName="Nexus POS" logoAlt="Nexus POS" />}
			<div className="flex-1 min-h-0 w-full overflow-hidden p-2">
				{children}
			</div>
			{showFooter && <HMIFooterInfo primaryBg={true} />}
		</div>
	);
};
