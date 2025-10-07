import React from "react";
import { HMIContainer } from "@/components/layout/hmi-container";
import { SideNavigation, OperatorHeader } from "../shared/components";
import { CloseTurnButton } from "./components";
import { useCloseTurn } from "./hooks";

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
