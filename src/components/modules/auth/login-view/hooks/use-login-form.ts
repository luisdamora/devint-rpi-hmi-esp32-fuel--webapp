import { useState } from "react";
import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";

export const useLoginForm = () => {
	const { goToMenu } = useHMINavigation();
	const [operatorId, setOperatorId] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: validar credenciales (mock). Por ahora navegar al menú.
		goToMenu();
	};

	return {
		operatorId,
		password,
		setOperatorId,
		setPassword,
		handleSubmit,
	};
};
