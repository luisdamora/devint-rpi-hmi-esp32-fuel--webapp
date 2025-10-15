import type { LucideIcon } from "lucide-react";
import React from "react";

interface StatisticsCardProps {
	title: string;
	value: string | number;
	icon: LucideIcon;
	iconColor?: string;
	iconSize?: number;
}

export const StatisticsCard: React.FC<StatisticsCardProps> = ({
	title,
	value,
	icon: Icon,
	iconColor = "text-gray-400",
	iconSize = 20,
}) => (
	<div className="bg-gray-800 rounded-lg p-3">
		<div className="flex items-center justify-between">
			<div className="min-w-0 flex-1">
				<h3 className="text-xs font-medium text-gray-300 mb-1">{title}</h3>
				<p className="text-white font-semibold text-xl leading-tight">
					{value}
				</p>
			</div>
			<Icon size={iconSize} className={`${iconColor} flex-shrink-0 ml-2`} />
		</div>
	</div>
);
