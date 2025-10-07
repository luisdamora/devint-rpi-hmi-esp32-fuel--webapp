import React, { useEffect } from "react";
import { NEXUS_COLORS } from "@/lib/config/theme";
import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";

export const SplashScreen: React.FC = () => {
	const { goToMenu } = useHMINavigation();

	// Auto-redirect to menu after 3 seconds
	useEffect(() => {
		const timer = setTimeout(() => {
			goToMenu();
		}, 3000);

		return () => clearTimeout(timer);
	}, [goToMenu]);

	return (
		<div
			className="flex flex-col items-center justify-center h-full"
			style={{ backgroundColor: NEXUS_COLORS.background.main }}
		>
			{/* Logo */}
			<div className="mb-6">
				<div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center">
					<span
						className="font-bold"
						style={{
							color: NEXUS_COLORS.primary.blue,
							fontSize: "2rem",
						}}
					>
						POS
					</span>
				</div>
			</div>

			{/* Title */}
			<h1
				className="font-bold mb-2"
				style={{
					color: NEXUS_COLORS.white,
					fontSize: "1.75rem",
				}}
			>
				NEXUS POS
			</h1>
			<p
				className="mb-6"
				style={{
					color: "#E5E7EB",
					fontSize: "1rem",
				}}
			>
				Sistema de Gestión de Ventas
			</p>

			{/* Version */}
			<p
				className="mb-8"
				style={{
					color: "#D1D5DB",
					fontSize: "0.75rem",
				}}
			>
				Versión 1.0.0
			</p>

			{/* Contact Info */}
			<div className="absolute bottom-10 left-0 right-0 px-6">
				<div
					className="flex items-center justify-center gap-4 text-xs"
					style={{ color: NEXUS_COLORS.white }}
				>
					<span>✉ soporte@nexuspos.com</span>
					<span>🌐 www.nexuspos.com</span>
					<span>📞 1-800-POS</span>
				</div>
			</div>

			{/* Loading indicator */}
			<div className="mt-8 flex gap-2">
				<div
					className="w-2 h-2 rounded-full animate-pulse"
					style={{ backgroundColor: NEXUS_COLORS.white }}
				/>
				<div
					className="w-2 h-2 rounded-full animate-pulse"
					style={{
						backgroundColor: NEXUS_COLORS.white,
						animationDelay: "75ms",
					}}
				/>
				<div
					className="w-2 h-2 rounded-full animate-pulse"
					style={{
						backgroundColor: NEXUS_COLORS.white,
						animationDelay: "150ms",
					}}
				/>
			</div>
		</div>
	);
};
