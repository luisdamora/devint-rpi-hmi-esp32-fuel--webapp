import { CreditCard } from "lucide-react";
import React, { useEffect, useState } from "react";

interface AnimatedCreditIconProps {
	size?: number;
	initialColor?: string;
	finalColor?: string;
	animationDuration?: number;
	blinkSpeed?: number;
	continuousAnimation?: boolean;
	opacityRange?: [number, number];
	className?: string;
}

export const AnimatedCreditIcon: React.FC<AnimatedCreditIconProps> = ({
	size = 80,
	initialColor = "text-orange-500",
	finalColor = "text-orange-600",
	animationDuration = 3000,
	blinkSpeed = 1.5,
	continuousAnimation = false,
	opacityRange = [0.45, 1],
	className = "",
}) => {
	const [isAnimationComplete, setIsAnimationComplete] = useState(false);

	useEffect(() => {
		if (continuousAnimation) return;

		const timer = setTimeout(() => {
			setIsAnimationComplete(true);
		}, animationDuration);

		return () => clearTimeout(timer);
	}, [animationDuration, continuousAnimation]);

	const currentColor = isAnimationComplete && !continuousAnimation ? finalColor : initialColor;
	const shouldAnimate = continuousAnimation || !isAnimationComplete;
	const [minOpacity, maxOpacity] = opacityRange;

	return (
		<CreditCard
			size={size}
			className={`${currentColor} ${className}`}
			style={
				shouldAnimate
					? {
							animation: `blink ${blinkSpeed}s ease-in-out infinite`,
					  }
					: {}
			}
		>
			<style>{`
				@keyframes blink {
					0%, 100% { opacity: ${maxOpacity}; }
					50% { opacity: ${minOpacity}; }
				}
			`}</style>
		</CreditCard>
	);
};