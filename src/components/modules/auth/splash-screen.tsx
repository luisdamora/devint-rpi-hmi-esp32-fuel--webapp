import React, { useEffect } from "react";
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
	useEffect(() => {
		const timer = setTimeout(() => {
			goToMenu();
		}, 3000);
		return () => clearTimeout(timer);
	}, [goToMenu]);

	return (
		<div
			className="relative h-full w-full flex flex-col items-center justify-center bg-white"
			style={{ outline: `3px solid ${NEXUS_COLORS.background.dark}` }}
		>
			{/* Fecha/Hora (arriba derecha) */}
			<div className="absolute top-3 right-4 text-xs" style={{ color: NEXUS_COLORS.background.dark }}>
				{now}
			</div>

			{/* Marca Nexus centrada */}
			<div className="flex items-center justify-center select-none">
				{/* Texto "Ne" */}
				<span
					className="font-extrabold tracking-tight"
					style={{ color: NEXUS_COLORS.background.dark, fontSize: "6rem", lineHeight: 1 }}
				>
					Ne
				</span>
				{/* X estilizada */}
				<div className="mx-2 relative" aria-hidden>
					<svg
						width="120"
						height="120"
						viewBox="0 0 120 120"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						role="img"
						aria-label="Nexus brand mark"
					>
						<title>Nexus brand mark</title>
						<g filter="url(#ds)">
							<path d="M58 46 L88 38 L98 48 L70 56 Z" fill={NEXUS_COLORS.status.red} />
							<path d="M62 54 L74 70 L86 96 L76 104 L58 72 Z" fill={NEXUS_COLORS.status.red} />
							<path d="M52 58 L24 86 L34 102 L64 80 Z" fill={NEXUS_COLORS.status.red} />
							<path d="M34 38 L52 32 L72 56 L56 64 Z" fill={NEXUS_COLORS.status.red} />
						</g>
						<defs>
							<filter id="ds" x="0" y="0" width="120" height="120" colorInterpolationFilters="sRGB">
								<feDropShadow dx="2" dy="2" stdDeviation="1" floodColor="#1F2937" floodOpacity="0.6"/>
							</filter>
						</defs>
					</svg>
				</div>
				{/* Texto "us" */}
				<span
					className="font-extrabold tracking-tight"
					style={{ color: NEXUS_COLORS.background.dark, fontSize: "6rem", lineHeight: 1 }}
				>
					us
				</span>
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

