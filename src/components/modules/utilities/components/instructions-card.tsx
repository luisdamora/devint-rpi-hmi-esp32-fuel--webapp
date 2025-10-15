import React from "react";

interface InstructionsCardProps {
	title: string;
	instructions: string[];
}

export const InstructionsCard: React.FC<InstructionsCardProps> = ({
	title,
	instructions,
}) => (
	<div className="bg-gray-800 rounded-lg p-2">
		<h4 className="font-semibold text-white mb-2">{title}</h4>
		<ul className="text-gray-300 text-sm space-y-1">
			{instructions.map((instruction, index) => (
				<li key={index}>{instruction}</li>
			))}
		</ul>
	</div>
);
