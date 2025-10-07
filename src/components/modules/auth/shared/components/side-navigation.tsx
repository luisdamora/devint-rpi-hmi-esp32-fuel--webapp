import React from "react";
import { Calendar, Home } from "lucide-react";
import { SideTile } from "./side-tile";
import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";

export const SideNavigation: React.FC = () => {
	const { navigateTo } = useHMINavigation();

	return (
		<div className="col-span-1 flex flex-col gap-6 self-start pt-8">
			<SideTile
				title="TURNOS"
				icon={<Calendar size={64} />}
				onClick={() => navigateTo("close-turn")}
			/>
			<SideTile
				title="INICIO"
				icon={<Home size={64} />}
				onClick={() => navigateTo("menu")}
			/>
		</div>
	);
};
