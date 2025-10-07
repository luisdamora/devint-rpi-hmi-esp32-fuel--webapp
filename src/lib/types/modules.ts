import type { ComponentType, ReactNode } from "react";

/**
 * Represents a visual state of a view
 */
export interface ViewState {
	id: string;
	name: string;
	filename: string;
}

/**
 * Represents a registered view in the HMI system
 */
export interface ViewRegistryItem {
	id: string;
	name: string;
	description: string;
	module: string;
	states: ViewState[];
	component: ComponentType<any>;
}

/**
 * Represents module configuration
 */
export interface ModuleConfig {
	id: string;
	name: string;
	description: string;
	icon?: string;
	order: number;
	enabled: boolean;
}


/**
 * Navigation item for HMI system
 */
export interface NavigationItem {
	id: string;
	label: string;
	icon?: string;
	targetView: string;
	moduleId: string;
	order: number;
	enabled: boolean;
}

/**
 * HMI System state
 */
export interface HMIState {
	currentView: string;
	currentModule: string;
	previousView?: string;
	isLoading: boolean;
	error?: string;
}

/**
 * Props for HMI Layout component
 */
export interface HMILayoutProps {
	children: ReactNode;
	currentView?: string;
}

/**
 * Props for View Manager component
 */
export interface ViewManagerProps {
	initialView?: string;
}
