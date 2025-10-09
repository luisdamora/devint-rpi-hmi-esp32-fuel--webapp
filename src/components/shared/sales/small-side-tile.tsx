import React from "react";
import { NEXUS_COLORS } from "@/lib/config/theme";

interface SmallSideTileProps {
	title: string;
	icon: React.ReactNode;
	onClick?: () => void;
	color?: string;
	ariaLabel?: string;
	className?: string;
}

export const SmallSideTile: React.FC<SmallSideTileProps> = ({
	title,
	icon,
	onClick,
	color = NEXUS_COLORS.status.red,
	ariaLabel,
	className = "",
}) => (
	<button
		type="button"
		onClick={onClick}
		aria-label={ariaLabel ?? title}
		className={`group relative rounded-md border-2 py-2 px-6 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-transform hover:scale-[1.02] select-none ${className}`}
		style={{ borderColor: color, backgroundColor: "transparent" }}
	>
		<div
			className="absolute top-0 left-0 right-0 text-center font-semibold"
			style={{ transform: "translateY(-50%)", color: NEXUS_COLORS.white }}
		>
			<span
				className="inline-block px-3 text-sm"
				style={{ backgroundColor: color, borderRadius: 4 }}
			>
				{title}
			</span>
		</div>
		<div className="flex items-center justify-center h-16">
			<span className="text-4xl text-white" aria-hidden>
				{icon}
			</span>
		</div>
	</button>
);
