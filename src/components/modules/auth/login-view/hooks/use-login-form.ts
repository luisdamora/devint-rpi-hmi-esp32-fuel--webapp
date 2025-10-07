import { useState } from "react";
import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";
import {
	useSession,
	useNotifications,
	useLoadingState,
} from "@/lib/hooks/use-ui-store-helpers";

export const useLoginForm = () => {
	const { goToMenu } = useHMINavigation();
	const { login, isAuthenticated } = useSession();
	const { success, error } = useNotifications();
	const { isLoading, setLoading } = useLoadingState();

	const [operatorId, setOperatorId] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Validación básica
		if (!operatorId.trim()) {
			error("Por favor ingrese el ID del operador");
			return;
		}

		if (!password.trim()) {
			error("Por favor ingrese la contraseña");
			return;
		}

		setLoading(true);

		try {
			// Simular validación de credenciales (mock)
			await new Promise((resolve) => setTimeout(resolve, 800));

			// TODO: Aquí iría la lógica real de autenticación
			// const response = await api.login({ operatorId, password });

			// Por ahora, mock exitoso
			const operatorName = `Operador ${operatorId}`;

			// Hacer login en el store (auto-inicia turno)
			login(operatorName);

			// Mostrar notificación de éxito
			success(`Bienvenido ${operatorName}`);

			// Limpiar formulario
			setOperatorId("");
			setPassword("");

			// Navegar al menú
			setTimeout(() => {
				goToMenu();
			}, 500);
		} catch (err) {
			error("Error al iniciar sesión. Verifique sus credenciales.");
			console.error("Login error:", err);
		} finally {
			setLoading(false);
		}
	};

	return {
		operatorId,
		password,
		setOperatorId,
		setPassword,
		handleSubmit,
		isLoading,
		isAuthenticated,
	};
};
