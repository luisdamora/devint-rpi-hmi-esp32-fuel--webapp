import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";

export const useCloseTurn = () => {
	const { goToMenu } = useHMINavigation();

	const handleCloseTurn = () => {
		// TODO: Logic to close turn
		goToMenu();
	};

	return {
		handleCloseTurn,
	};
};
