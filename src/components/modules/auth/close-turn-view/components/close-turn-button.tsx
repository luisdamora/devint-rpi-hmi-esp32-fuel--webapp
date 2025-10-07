import React from "react";

interface CloseTurnButtonProps {
	onClick: () => void;
}

export const CloseTurnButton: React.FC<CloseTurnButtonProps> = ({
	onClick,
}) => {
	return (
		<div className="flex items-center justify-center">
			<button
				type="button"
				onClick={onClick}
				className="w-full max-w-lg font-bold py-6 rounded-md text-white text-3xl transition-transform hover:scale-[1.02]"
				style={{ backgroundColor: "#EF4444" }}
			>
				CERRAR TURNO
			</button>
		</div>
	);
};
