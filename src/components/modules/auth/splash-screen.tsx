import React, { useEffect } from "react";
import logo from "@/assets/images/logo.png";
import { NEXUS_COLORS } from "@/lib/config/theme";
import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";

export const SplashScreen: React.FC = () => {
	const { goToMenu } = useHMINavigation();

	// Fecha/hora en vivo (es-CO, formato dd/MM/yyyy hh:mm am/pm)
	const [now, setNow] = React.useState<string>("");
	useEffect(() => {
		const formatDate = (d: Date) => {
			const pad = (n: number) => n.toString().padStart(2, "0");
			const day = pad(d.getDate());
			const month = pad(d.getMonth() + 1);
			const year = d.getFullYear();
			let hours = d.getHours();
			const minutes = pad(d.getMinutes());
			const ampm = hours >= 12 ? "pm" : "am";
			hours = hours % 12 || 12;
			return `${day}/${month}/${year} ${pad(hours)}:${minutes} ${ampm}`;
		};
		const tick = () => setNow(formatDate(new Date()));
		tick();
		const i = setInterval(tick, 1000);
		return () => clearInterval(i);
	}, []);

	// Auto-redirect al menú después de 3 segundos
	// useEffect(() => {
	// 	const timer = setTimeout(() => {
	// 		goToMenu();
	// 	}, 3000);
	// 	return () => clearTimeout(timer);
	// }, [goToMenu]);

	return (
		<div
			className="relative h-full w-full flex flex-col items-center justify-center bg-white"
			style={{ outline: `3px solid ${NEXUS_COLORS.background.dark}` }}
		>
			{/* Fecha/Hora (arriba derecha) */}
			<div
				className="absolute top-3 right-4 text-xs"
				style={{ color: NEXUS_COLORS.background.dark }}
			>
				{now}
			</div>

			{/* Marca Nexus centrada (imagen) */}
			<div className="flex items-center justify-center select-none px-6">
				<img
					src={logo}
					alt="Nexus logo"
					className="block w-full max-w-[720px]"
					// style={{ filter: "drop-shadow(2px 2px 0 rgba(31,41,55,0.6))" }}
				/>
			</div>

			{/* Footer con contacto */}
			<div className="absolute bottom-3 left-0 right-0 px-6">
				<div
					className="flex items-center justify-center gap-8 text-sm"
					style={{ color: NEXUS_COLORS.background.dark }}
				>
					<span>✉ soporte@vpmnexus.com</span>
					<span>🌐 www.vpmnexus.com</span>
					<span>📞 +57-3184936241</span>
					<span>📞 +57-3164475985</span>
				</div>
			</div>
		</div>
	);
};
