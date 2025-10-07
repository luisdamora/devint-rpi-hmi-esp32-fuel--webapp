import React from "react";
import { HMIContainer } from "@/components/layout/hmi-container";
import { SideNavigation } from "../shared/components/side-navigation";
import { OperatorHeader } from "../shared/components/operator-header";
import { CloseTurnButton } from "./components/close-turn-button";
import { useCloseTurn } from "./hooks/use-close-turn";

export const CloseTurnViewComponent: React.FC = () => {
	const { handleCloseTurn } = useCloseTurn();

	return (
		<HMIContainer>
			<div className="w-full h-full flex items-center justify-center px-2">
				<div className="grid grid-cols-4 gap-4 w-full max-w-6xl">
					{/* Left side navigation */}
					<SideNavigation />

					{/* Center close turn button */}
					<div className="col-span-3">
						<div className="mx-auto max-w-2xl">
							<OperatorHeader />
							<CloseTurnButton onClick={handleCloseTurn} />
						</div>
					</div>
				</div>
			</div>
		</HMIContainer>
	);
};
