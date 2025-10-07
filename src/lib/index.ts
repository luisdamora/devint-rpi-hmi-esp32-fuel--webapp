// Types

// Components
export { HMILayout } from "../components/layouts/hmi-layout";
export { CloseTurnViewComponent } from "../components/modules/auth/close-turn-view";
export { LoginViewComponent } from "../components/modules/auth/login-view";
export { MainMenu } from "../components/modules/auth/main-menu";
// Module Components
export { SplashScreen } from "../components/modules/auth/splash-screen";
export { PointsView } from "../components/modules/loyalty/points-view";
export { KeypadViewComponent } from "../components/modules/sales/keypad-view";
export { PaymentMethods } from "../components/modules/sales/payment-methods";
// Layout Configuration
export {
	ANIMATION_CONFIGS,
	DEFAULT_LAYOUT_CONFIG,
	getModuleConfig,
	getNavigationItems,
	getThemeConfig,
	MODULE_CONFIGS,
	NAVIGATION_ITEMS,
	SCREEN_CONFIGS,
	THEME_CONFIGS,
} from "./config/layout-config";
// View Registry
export {
	getAllModules,
	getNavigationViews,
	getViewById,
	getViewsByModule,
	VIEW_REGISTRY,
} from "./config/view-registry";
export { useViewNavigation, ViewManager } from "./navigation/view-manager";
export type {
	HMILayoutProps,
	HMIState,
	LayoutConfig,
	ModuleConfig,
	NavigationItem,
	ViewManagerProps,
	ViewRegistryItem,
	ViewState,
} from "./types/modules";
