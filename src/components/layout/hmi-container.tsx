import React from "react";
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
			{children}
		</div>
	);
};
