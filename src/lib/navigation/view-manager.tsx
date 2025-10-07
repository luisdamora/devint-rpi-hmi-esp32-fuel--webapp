import React, { useEffect, useState } from "react";
import { HMILayout } from "@/components/layouts/hmi-layout";
import { DEFAULT_LAYOUT_CONFIG } from "@/lib/config/layout-config";
import { getViewById } from "@/lib/config/view-registry";
import type { HMIState, ViewManagerProps } from "@/lib/types/modules";

/**
 * View Manager Component
 * Handles navigation between different HMI views
 */
export const ViewManager: React.FC<ViewManagerProps> = ({
	initialView = "splash-screen",
	configuration = DEFAULT_LAYOUT_CONFIG,
}) => {
	const [state, setState] = useState<HMIState>({
		currentView: initialView,
		currentModule: "splash",
		isLoading: false,
		error: undefined,
	});

	const [navigationHistory, setNavigationHistory] = useState<string[]>([
		initialView,
	]);

	// Navigate to a specific view
	const navigateToView = (viewId: string, preserveHistory = true) => {
		const targetView = getViewById(viewId);

		if (!targetView) {
			setState((prev) => ({
				...prev,
				error: `Vista "${viewId}" no encontrada`,
			}));
			return;
		}

		setState((prev) => ({
			...prev,
			currentView: viewId,
			currentModule: targetView.module,
			previousView: prev.currentView,
			isLoading: false,
			error: undefined,
		}));

		if (preserveHistory) {
			setNavigationHistory((prev) => [...prev, viewId]);
		}
	};

	// Navigate back to previous view
	const navigateBack = () => {
		if (navigationHistory.length > 1) {
			const newHistory = [...navigationHistory];
			newHistory.pop(); // Remove current view
			const previousViewId = newHistory[newHistory.length - 1];

			setNavigationHistory(newHistory);

			setState((prev) => ({
				...prev,
				currentView: previousViewId,
				previousView: prev.currentView,
			}));
		}
	};

	// Reset to initial view
	const resetToInitial = () => {
		navigateToView(initialView, false);
		setNavigationHistory([initialView]);
	};

	// Handle view transitions with loading state
	const handleViewTransition = (viewId: string) => {
		setState((prev) => ({ ...prev, isLoading: true }));

		// Simulate loading delay for smooth transitions
		setTimeout(() => {
			navigateToView(viewId);
		}, 300);
	};

	// Get current view component
	const getCurrentViewComponent = () => {
		const view = getViewById(state.currentView);

		if (!view) {
			return (
				<div className="flex items-center justify-center h-full">
					<div className="text-center">
						<div className="text-6xl mb-4">❌</div>
						<h2 className="text-2xl font-bold mb-2">Vista no encontrada</h2>
						<p className="text-gray-600 mb-4">
							La vista "{state.currentView}" no existe
						</p>
						<button
							type="button"
							onClick={resetToInitial}
							className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
						>
							Volver al inicio
						</button>
					</div>
				</div>
			);
		}

		const Component = view.component;

		// Pass navigation props to components
		return (
			<Component
				{...{
					navigateTo: handleViewTransition,
					navigateBack,
					currentView: state.currentView,
					viewState: view.states[0]?.id || "default",
				}}
			/>
		);
	};

	// Auto-navigate from splash screen after delay
	useEffect(() => {
		if (state.currentView === "splash-screen") {
			const timer = setTimeout(() => {
				handleViewTransition("main-menu");
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, []);

	return (
		<HMILayout currentView={state.currentView} configuration={configuration}>
			{/* Loading Overlay */}
			{state.isLoading && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-6 flex items-center space-x-3">
						<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
						<span>Cargando...</span>
					</div>
				</div>
			)}

			{/* Error Display */}
			{state.error && (
				<div className="fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
					<div className="flex items-center space-x-3">
						<span>⚠️</span>
						<span>{state.error}</span>
						<button
							type="button"
							onClick={() =>
								setState((prev) => ({ ...prev, error: undefined }))
							}
							className="ml-4 text-red-200 hover:text-white"
						>
							✕
						</button>
					</div>
				</div>
			)}

			{/* Current View */}
			<div className="h-full">{getCurrentViewComponent()}</div>

			{/* Debug Panel (only in development) */}
			{import.meta.env.DEV && (
				<div className="fixed bottom-4 left-4 bg-black bg-opacity-80 text-white p-3 rounded-lg text-xs z-40">
					<div>Vista: {state.currentView}</div>
					<div>Módulo: {state.currentModule}</div>
					<div>Historial: {navigationHistory.length} vistas</div>
					<button
						type="button"
						onClick={navigateBack}
						className="mt-2 bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs"
					>
						Atrás
					</button>
				</div>
			)}
		</HMILayout>
	);
};

/**
 * Hook for view navigation
 */
export function useViewNavigation() {
	const [state, setState] = useState<HMIState>({
		currentView: "splash-screen",
		currentModule: "splash",
		isLoading: false,
	});

	return {
		currentView: state.currentView,
		currentModule: state.currentModule,
		isLoading: state.isLoading,
		navigateTo: (viewId: string) => {
			setState((prev) => ({ ...prev, isLoading: true }));
			setTimeout(() => {
				const view = getViewById(viewId);
				setState((prev) => ({
					...prev,
					currentView: viewId,
					currentModule: view?.module || "unknown",
					isLoading: false,
				}));
			}, 300);
		},
		reset: () => {
			setState({
				currentView: "splash-screen",
				currentModule: "splash",
				isLoading: false,
			});
		},
	};
}
