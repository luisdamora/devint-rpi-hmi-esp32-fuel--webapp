import React from "react";
import { NEXUS_COLORS } from "@/lib/config/theme";

interface AdminRouteProps {
	children: React.ReactNode;
}

/**
 * AdminRoute - Wrapper para rutas administrativas
 * Usa todo el viewport con estilos consistentes al sistema
 */
export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
	return (
		<div
			className="min-h-screen flex flex-col"
			style={{ backgroundColor: NEXUS_COLORS.background.main }}
		>
			{/* Admin Header */}
			<header
				className="px-6 py-4 flex items-center justify-between border-b"
				style={{
					backgroundColor: NEXUS_COLORS.background.dark,
					borderColor: NEXUS_COLORS.neutral.gray700,
				}}
			>
				<div className="flex items-center space-x-4">
					<div
						className="w-10 h-10 rounded-lg flex items-center justify-center"
						style={{ backgroundColor: NEXUS_COLORS.primary.blue }}
					>
						<span className="text-white font-bold text-lg">POS</span>
					</div>
					<h1
						className="text-xl font-semibold"
						style={{ color: NEXUS_COLORS.white }}
					>
						Nexus POS - Administración
					</h1>
				</div>

				<div className="flex items-center space-x-4">
					<div className="flex items-center space-x-2">
						<div
							className="w-2 h-2 rounded-full animate-pulse"
							style={{ backgroundColor: NEXUS_COLORS.status.green }}
						></div>
						<span style={{ color: NEXUS_COLORS.white, fontSize: "0.875rem" }}>
							Sistema Activo
						</span>
					</div>
				</div>
			</header>

			{/* Admin Content */}
			<main className="flex-1 p-6">
				<div
					className="h-full rounded-lg p-6"
					style={{
						backgroundColor: NEXUS_COLORS.white,
						boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
					}}
				>
					{children}
				</div>
			</main>

			{/* Admin Footer */}
			<footer
				className="px-6 py-3 border-t flex items-center justify-between"
				style={{
					backgroundColor: NEXUS_COLORS.background.dark,
					borderColor: NEXUS_COLORS.neutral.gray700,
				}}
			>
				<div className="flex items-center space-x-4">
					<span
						className="text-sm"
						style={{ color: NEXUS_COLORS.neutral.gray400 }}
					>
						v1.0.0
					</span>
					<span
						className="text-sm"
						style={{ color: NEXUS_COLORS.neutral.gray400 }}
					>
						•
					</span>
					<span
						className="text-sm"
						style={{ color: NEXUS_COLORS.neutral.gray400 }}
					>
						Caprinosol Cloud
					</span>
				</div>

				<div className="text-sm">
					<span
						className="mr-1"
						style={{ color: NEXUS_COLORS.neutral.gray400 }}
					>
						Panel Administrativo
					</span>
					<span className="font-medium" style={{ color: NEXUS_COLORS.white }}>
						Nexus POS
					</span>
				</div>
			</footer>
		</div>
	);
};
