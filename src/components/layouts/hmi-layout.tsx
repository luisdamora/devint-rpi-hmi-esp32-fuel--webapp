import React from "react";
import { Link } from "react-router";
import { FOOTER_HEIGHT, HEADER_HEIGHT } from "@/lib/config/layout-dimensions";
import { NEXUS_THEME_CONFIG } from "@/lib/config/theme";
import type { HMILayoutProps } from "@/lib/types/modules";

export const HMILayout: React.FC<HMILayoutProps> = ({
	children,
	currentView,
}) => {
	return (
		<div
			className="flex flex-col h-full min-h-screen"
			style={{ backgroundColor: NEXUS_THEME_CONFIG.background }}
		>
			{/* Header - 60px fixed height */}
			<header
				className="flex items-center justify-between px-4 z-10 border-b"
				style={{
					height: `${HEADER_HEIGHT}px`,
					backgroundColor: NEXUS_THEME_CONFIG.surface,
					borderColor: NEXUS_THEME_CONFIG.border,
				}}
			>
				<div className="flex items-center space-x-3">
					<div
						className="w-8 h-8 rounded flex items-center justify-center"
						style={{ backgroundColor: NEXUS_THEME_CONFIG.primary }}
					>
						<span className="text-white font-bold text-sm">POS</span>
					</div>
					<h1
						className="text-sm font-semibold"
						style={{ color: NEXUS_THEME_CONFIG.text }}
					>
						Nexus POS
					</h1>
				</div>

				<div className="flex items-center space-x-3">
					<div className="text-xs">
						<span style={{ color: NEXUS_THEME_CONFIG.textSecondary }}>
							{currentView || "HMI"}
						</span>
					</div>
					<div className="flex items-center space-x-1">
						<div
							className="w-2 h-2 rounded-full animate-pulse"
							style={{ backgroundColor: NEXUS_THEME_CONFIG.success }}
						></div>
						<span
							className="text-xs"
							style={{ color: NEXUS_THEME_CONFIG.text }}
						>
							Activo
						</span>
					</div>
				</div>
			</header>

			{/* Main Content - flexible height */}
			<main
				className="flex-1 overflow-hidden flex items-center justify-center"
				style={{ backgroundColor: NEXUS_THEME_CONFIG.background }}
			>
				{children}
			</main>

			{/* Footer - 40px fixed height */}
			<footer
				className="flex items-center justify-between px-4 border-t"
				style={{
					height: `${FOOTER_HEIGHT}px`,
					backgroundColor: NEXUS_THEME_CONFIG.surface,
					borderColor: NEXUS_THEME_CONFIG.border,
				}}
			>
				<div className="flex items-center space-x-2">
					<span
						className="text-xs"
						style={{ color: NEXUS_THEME_CONFIG.textSecondary }}
					>
						v1.0.0
					</span>
					<span
						className="text-xs"
						style={{ color: NEXUS_THEME_CONFIG.textSecondary }}
					>
						•
					</span>
					<span
						className="text-xs"
						style={{ color: NEXUS_THEME_CONFIG.textSecondary }}
					>
						Caprinosol Cloud
					</span>
				</div>

				{/* Footer Nav - links a hijos de routes.tsx */}
				<nav className="hidden md:flex items-center gap-3">
					{[
						{ to: "/splash", label: "Splash" },
						{ to: "/menu", label: "Menú" },
						{ to: "/login", label: "Login" },
						{ to: "/keypad", label: "Teclado" },
						{ to: "/payment", label: "Pago" },
						{ to: "/loyalty", label: "Puntos" },
						{ to: "/close-turn", label: "Cerrar Turno" },
					].map((item) => (
						<Link
							key={item.to}
							to={item.to}
							className="text-xs px-2 py-1 rounded hover:underline"
							style={{ color: NEXUS_THEME_CONFIG.textSecondary }}
						>
							{item.label}
						</Link>
					))}
				</nav>

				<div className="flex items-center space-x-3">
					<div className="text-xs">
						<span
							className="mr-1"
							style={{ color: NEXUS_THEME_CONFIG.textSecondary }}
						>
							Sistema:
						</span>
						<span
							className="font-medium"
							style={{ color: NEXUS_THEME_CONFIG.text }}
						>
							Operativo
						</span>
					</div>
				</div>
			</footer>
		</div>
	);
};
