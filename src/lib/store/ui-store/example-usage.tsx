/**
 * Ejemplos de Uso del UI Store
 *
 * Este archivo muestra diferentes formas de usar el UI Store en componentes
 */

import React from "react";
import {
	useLoadingState,
	useMenuTheme,
	useNotifications,
	useSession,
} from "@/lib/hooks/use-ui-store-helpers";
import { uiStoreSelectors, useUIStore } from "./ui-store";

// ============================================================================
// Ejemplo 1: Uso directo del store
// ============================================================================

export const DirectStoreUsageExample: React.FC = () => {
	// Obtener todo el estado
	const store = useUIStore();

	return (
		<div>
			<p>Turno activo: {store.isTurnActive ? "Sí" : "No"}</p>
			<p>Operador: {store.operatorName ?? "Sin asignar"}</p>
			<button type="button" onClick={() => store.login("Operador 1")}>
				Login
			</button>
			<button type="button" onClick={() => store.closeTurn()}>
				Cerrar Turno
			</button>
		</div>
	);
};

// ============================================================================
// Ejemplo 2: Uso con selectores optimizados
// ============================================================================

export const OptimizedSelectorsExample: React.FC = () => {
	// Solo se re-renderiza cuando cambian estos valores específicos
	const isTurnActive = useUIStore(uiStoreSelectors.isTurnActive);
	const borderColor = useUIStore(uiStoreSelectors.menuBorderColor);
	const sessionInfo = useUIStore(uiStoreSelectors.sessionInfo);

	return (
		<div style={{ borderColor, padding: 16 }}>
			<h3>Estado de Sesión</h3>
			<p>Autenticado: {sessionInfo.isAuthenticated ? "Sí" : "No"}</p>
			<p>Turno: {isTurnActive ? "Activo" : "Inactivo"}</p>
			<p>Operador: {sessionInfo.operatorName}</p>
		</div>
	);
};

// ============================================================================
// Ejemplo 3: Uso con hooks personalizados (RECOMENDADO)
// ============================================================================

export const CustomHooksExample: React.FC = () => {
	const {
		isAuthenticated,
		isTurnActive,
		operatorName,
		login,
		logout,
		closeTurn,
	} = useSession();
	const { borderColor } = useMenuTheme();
	const { notify, success, error } = useNotifications();

	const handleLogin = () => {
		try {
			login("Juan Pérez");
			success("Sesión iniciada correctamente");
		} catch (err) {
			error("Error al iniciar sesión");
		}
	};

	const handleCloseTurn = () => {
		closeTurn("Cierre manual");
		notify("Turno cerrado", "info");
	};

	return (
		<div style={{ borderColor, padding: 16 }}>
			<h2>Panel de Control</h2>

			{!isAuthenticated ? (
				<button type="button" onClick={handleLogin}>
					Iniciar Sesión
				</button>
			) : (
				<>
					<p>Bienvenido, {operatorName}</p>
					<p>Estado del turno: {isTurnActive ? "Activo ✅" : "Inactivo ❌"}</p>

					{isTurnActive && (
						<button type="button" onClick={handleCloseTurn}>
							Cerrar Turno
						</button>
					)}

					<button type="button" onClick={logout}>
						Cerrar Sesión
					</button>
				</>
			)}
		</div>
	);
};

// ============================================================================
// Ejemplo 4: Componente de Login completo
// ============================================================================

export const LoginComponent: React.FC = () => {
	const [operatorInput, setOperatorInput] = React.useState("");
	const { login, isAuthenticated, operatorName } = useSession();
	const { isLoading, setLoading } = useLoadingState();
	const { success, error } = useNotifications();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!operatorInput.trim()) {
			error("Por favor ingrese un nombre de operador");
			return;
		}

		setLoading(true);

		try {
			// Simular llamada async
			await new Promise((resolve) => setTimeout(resolve, 1000));

			login(operatorInput);
			success(`Bienvenido ${operatorInput}`);
			setOperatorInput("");
		} catch (_err) {
			error("Error al iniciar sesión");
		} finally {
			setLoading(false);
		}
	};

	if (isAuthenticated) {
		return (
			<div>
				<p>Sesión activa: {operatorName}</p>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				value={operatorInput}
				onChange={(e) => setOperatorInput(e.target.value)}
				placeholder="Nombre del operador"
				disabled={isLoading}
			/>
			<button type="submit" disabled={isLoading}>
				{isLoading ? "Iniciando..." : "Iniciar Sesión"}
			</button>
		</form>
	);
};

// ============================================================================
// Ejemplo 5: Menu con tiles dinámicos
// ============================================================================

export const DynamicMenuExample: React.FC = () => {
	const { borderColor, isTurnActive } = useMenuTheme();

	const menuItems = [
		{ id: "sales", label: "Ventas", requiresTurn: true },
		{ id: "inventory", label: "Inventario", requiresTurn: true },
		{ id: "settings", label: "Configuración", requiresTurn: false },
	];

	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "repeat(3, 1fr)",
				gap: 16,
			}}
		>
			{menuItems.map((item) => {
				const disabled = item.requiresTurn && !isTurnActive;

				return (
					<button
						key={item.id}
						type="button"
						disabled={disabled}
						style={{
							borderColor,
							borderWidth: 2,
							borderStyle: "solid",
							padding: 16,
							opacity: disabled ? 0.5 : 1,
							cursor: disabled ? "not-allowed" : "pointer",
						}}
					>
						{item.label}
					</button>
				);
			})}
		</div>
	);
};

// ============================================================================
// Ejemplo 6: Notificaciones
// ============================================================================

export const NotificationsExample: React.FC = () => {
	const { notification, success, error, info, warning, clear } =
		useNotifications();

	return (
		<div>
			<h3>Sistema de Notificaciones</h3>

			<div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
				<button type="button" onClick={() => success("Operación exitosa")}>
					Success
				</button>
				<button type="button" onClick={() => error("Ocurrió un error")}>
					Error
				</button>
				<button type="button" onClick={() => info("Información general")}>
					Info
				</button>
				<button type="button" onClick={() => warning("Advertencia")}>
					Warning
				</button>
			</div>

			{notification && (
				<div
					style={{
						padding: 16,
						backgroundColor:
							notification.type === "success"
								? "#22C55E"
								: notification.type === "error"
									? "#EF4444"
									: notification.type === "warning"
										? "#F59E0B"
										: "#3B82F6",
						color: "white",
						borderRadius: 4,
					}}
				>
					<p>{notification.message}</p>
					<button type="button" onClick={clear}>
						Cerrar
					</button>
				</div>
			)}
		</div>
	);
};

// ============================================================================
// Ejemplo 7: Acceso imperativo al store (fuera de componentes)
// ============================================================================

/**
 * Puedes acceder al store de forma imperativa para casos especiales
 * como servicios, utilidades, o funciones fuera de componentes React
 */
export const imperativeStoreAccess = () => {
	// Obtener estado actual
	const currentState = useUIStore.getState();
	console.log("Estado actual:", currentState);

	// Ejecutar acciones
	if (!currentState.isTurnActive) {
		currentState.startTurn();
		console.log("Turno iniciado");
	}

	// Suscribirse a cambios
	const unsubscribe = useUIStore.subscribe((state, prevState) => {
		if (state.isTurnActive !== prevState.isTurnActive) {
			console.log("Estado de turno cambió:", state.isTurnActive);
		}
	});

	// Limpiar suscripción cuando sea necesario
	return unsubscribe;
};

// ============================================================================
// Ejemplo 8: Debug Component
// ============================================================================

export const DebugStoreComponent: React.FC = () => {
	const store = useUIStore();

	return (
		<details style={{ padding: 16, border: "1px solid #ccc" }}>
			<summary style={{ cursor: "pointer", fontWeight: "bold" }}>
				🐛 Estado del Store (Debug)
			</summary>
			<pre style={{ fontSize: 12, overflow: "auto" }}>
				{JSON.stringify(store, null, 2)}
			</pre>
			<button
				type="button"
				onClick={() => store.resetAll()}
				style={{ marginTop: 8 }}
			>
				Reset Store
			</button>
		</details>
	);
};
