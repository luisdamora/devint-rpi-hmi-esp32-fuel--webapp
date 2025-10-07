import React from "react";
import {
	LAYOUT_DIMENSIONS,
	VIEWPORT_BACKGROUND,
} from "@/lib/config/layout-dimensions";
import { cn } from "@/lib/utils";

interface HMIFrameProps {
	children: React.ReactNode;
	className?: string;
}

/**
 * HMI Frame - Contenedor principal con dimensiones fijas 800x480px
 * Centrado vertical y horizontalmente en el viewport
 */
export const HMIFrame: React.FC<HMIFrameProps> = ({ children, className }) => {
	return (
		// Viewport container - ocupa todo el espacio disponible del padre
		<div
			className="w-full h-full flex items-center justify-center"
			style={{ backgroundColor: VIEWPORT_BACKGROUND }}
		>
			{/* HMI Frame - dimensiones fijas 800x480px */}
			<div
				className={cn(
					"relative bg-white shadow-2xl overflow-hidden border border-gray-200",
					className,
				)}
				style={{
					width: `${LAYOUT_DIMENSIONS.WIDTH}px`,
					height: `${LAYOUT_DIMENSIONS.HEIGHT}px`,
				}}
			>
				{children}
			</div>
		</div>
	);
};
