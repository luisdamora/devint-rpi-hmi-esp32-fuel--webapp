import React from "react";
import {
	DEFAULT_LAYOUT_CONFIG,
	getThemeConfig,
} from "@/lib/config/layout-config";
import type { HMILayoutProps } from "@/lib/types/modules";

export const HMILayout: React.FC<HMILayoutProps> = ({
	children,
	currentView,
	configuration = DEFAULT_LAYOUT_CONFIG,
}) => {
	const theme = getThemeConfig(configuration.theme);

	return (
		<div
			className={`min-h-screen ${theme.background} ${theme.text} flex flex-col`}
			style={
				{
					"--header-height": configuration.headerHeight,
					"--footer-height": configuration.footerHeight,
				} as React.CSSProperties
			}
		>
			{/* Header */}
			{configuration.showHeader && (
				<header
					className={`${theme.surface} ${theme.border} border-b flex items-center justify-between px-6 z-10`}
					style={{ height: "var(--header-height)" }}
				>
					<div className="flex items-center space-x-4">
						<div
							className="w-10 h-10 rounded-lg flex items-center justify-center"
							style={{ backgroundColor: configuration.primaryColor }}
						>
							<span className="text-white font-bold text-lg">POS</span>
						</div>
						<h1 className="text-xl font-semibold">Nexus POS</h1>
					</div>

					<div className="flex items-center space-x-6">
						<div className="text-sm">
							<span className={theme.textSecondary}>Vista actual:</span>
							<span className="ml-2 font-medium">
								{currentView || "Desconocida"}
							</span>
						</div>
						<div className="flex items-center space-x-2">
							<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
							<span className="text-sm">En línea</span>
						</div>
					</div>
				</header>
			)}

			{/* Main Content */}
			<main className="flex-1 overflow-hidden">
				<div className="h-full">{children}</div>
			</main>

			{/* Footer */}
			{configuration.showFooter && (
				<footer
					className={`${theme.surface} ${theme.border} border-t flex items-center justify-between px-6`}
					style={{ height: "var(--footer-height)" }}
				>
					<div className="flex items-center space-x-4">
						<span className={`text-sm ${theme.textSecondary}`}>v1.0.0</span>
						<span className={`text-sm ${theme.textSecondary}`}>•</span>
						<span className={`text-sm ${theme.textSecondary}`}>
							Caprinosol Cloud
						</span>
					</div>

					<div className="flex items-center space-x-6">
						<div className="text-sm">
							<span className={theme.textSecondary}>Sistema:</span>
							<span className="ml-2 font-medium">Operativo</span>
						</div>
						<div className="text-sm">
							<span className={theme.textSecondary}>
								Última sincronización:
							</span>
							<span className="ml-2 font-medium">Hace 2 min</span>
						</div>
					</div>
				</footer>
			)}
		</div>
	);
};
