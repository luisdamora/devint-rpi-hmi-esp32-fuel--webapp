import React from "react";
import { NEXUS_COLORS } from "@/lib/config/theme";

interface SideTileProps {
	title: string;
	icon: React.ReactNode;
	onClick?: () => void;
	ariaLabel?: string;
}

export const SideTile: React.FC<SideTileProps> = ({
	title,
	icon,
	onClick,
	ariaLabel,
}) => (
	<button
		type="button"
		onClick={onClick}
		aria-label={ariaLabel ?? title}
		className="group relative rounded-md border-2 p-3 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-transform hover:scale-[1.02] select-none"
		style={{ borderColor: "#EF4444", backgroundColor: "transparent" }}
	>
		<div
			className="absolute top-0 left-0 right-0 text-center font-semibold"
			style={{ transform: "translateY(-50%)", color: NEXUS_COLORS.white }}
		>
			<span
				className="inline-block px-4"
				style={{ backgroundColor: "#EF4444", borderRadius: 4 }}
			>
				{title}
			</span>
		</div>
		<div className="flex items-center justify-center h-28">
			<span className="text-6xl text-white" aria-hidden>
				{icon}
			</span>
		</div>
	</button>
);
