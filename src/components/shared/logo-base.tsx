import React from "react";
import logoSrc from "@/assets/images/logo.png";
import { cn } from "@/lib/utils";

export interface LogoBaseProps {
	alt?: string;
	className?: string;
	style?: React.CSSProperties;
}

/**
 * LogoBase
 * Componente base para renderizar el logo de Nexus desde assets.
 */
export const LogoBase: React.FC<LogoBaseProps> = ({
	alt = "Nexus logo",
	className,
	style,
}) => {
	return (
		<img
			src={logoSrc}
			alt={alt}
			className={cn("block", className)}
			style={style}
		/>
	);
};
