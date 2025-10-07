import React from "react";
import logoPuntosColombia from "@/assets/images/puntos-colombia.png";

interface IconPuntosColombiaProps {
	size?: number;
	className?: string;
}

export const IconPuntosColombia: React.FC<IconPuntosColombiaProps> = ({
	size = 64,
	className = "",
}) => {
	return (
		<img
			src={logoPuntosColombia}
			alt="Puntos Colombia"
			width={size}
			height={size}
			className={className}
			style={{
				width: size,
				height: size,
				objectFit: "contain",
			}}
		/>
	);
};
