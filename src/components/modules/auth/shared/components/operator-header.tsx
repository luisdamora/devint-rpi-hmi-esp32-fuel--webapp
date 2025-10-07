import React from "react";

interface OperatorHeaderProps {
	operatorName?: string;
}

export const OperatorHeader: React.FC<OperatorHeaderProps> = ({
	operatorName = "SEBASTIAN RESTREPO BUSTAMANTE",
}) => (
	<div className="text-center mb-4">
		<h3 className="text-white font-semibold tracking-wide">VENDEDOR</h3>
		<p className="text-white text-xl font-bold">{operatorName}</p>
	</div>
);
